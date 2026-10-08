"""Market Hours banner for alaz.pro (1920x1200, 16:10).

Draws the app's tactical HUD: dot-matrix world map with the day/night terminator,
exchange nodes (green open, cyan killzone, slate closed), the London / New York
killzone arc and a session strip. Colours, type and bracket panels come from the
Market Hours app (lib/ui/theme/tactical_colors.dart, web app/globals.css).

    python build_banner.py [out.png] [--hero]

--hero leaves out the title, clock and session cards: a calm backdrop for the project page,
where the page prints its own title over the image.

Needs: pillow, playwright (with a chromium). The snapshot time below is fixed so
the banner always shows the same, plausible moment (London / New York overlap).
"""
import json
import math
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
ASSETS = HERE / "assets"
HERO = "--hero" in sys.argv
_args = [a for a in sys.argv[1:] if not a.startswith("--")]
OUT = Path(_args[0]) if _args else HERE / ("market-hours-hero.png" if HERO else "market-hours-banner.png")

W, H = 1920, 1200
SNAPSHOT = datetime(2026, 12, 8, 14, 42, 11, tzinfo=timezone.utc)  # Tuesday, winter time: London/NY killzone 13-17 UTC

# ---- map frame: equirectangular, lon -180..180, lat LAT_N..LAT_S
LAT_N, LAT_S = 76.0, -40.0
MAP_TOP = 275
PX_PER_DEG = W / 360
MAP_H = (LAT_N - LAT_S) * PX_PER_DEG

def project(lon, lat):
    return (lon + 180) * PX_PER_DEG, MAP_TOP + (LAT_N - lat) * PX_PER_DEG

# ---- sun position at the snapshot (NOAA low-precision formulas, plenty for a banner)
def sun(dt):
    doy = dt.timetuple().tm_yday
    minutes = dt.hour * 60 + dt.minute + dt.second / 60
    g = 2 * math.pi / 365 * (doy - 1 + (dt.hour - 12) / 24)
    eqtime = 229.18 * (0.000075 + 0.001868 * math.cos(g) - 0.032077 * math.sin(g)
                       - 0.014615 * math.cos(2 * g) - 0.040849 * math.sin(2 * g))
    dec = (0.006918 - 0.399912 * math.cos(g) + 0.070257 * math.sin(g) - 0.006758 * math.cos(2 * g)
           + 0.000907 * math.sin(2 * g) - 0.002697 * math.cos(3 * g) + 0.00148 * math.sin(3 * g))
    lon_s = (720 - minutes - eqtime) / 4  # longitude with the sun overhead
    return math.degrees(dec), (lon_s + 180) % 360 - 180


DEC, LON_S = sun(SNAPSHOT)

def altitude_sin(lon, lat):
    h = math.radians(lon - LON_S)
    la, de = math.radians(lat), math.radians(DEC)
    return math.sin(la) * math.sin(de) + math.cos(la) * math.cos(de) * math.cos(h)

# ---- land mask -> dot matrix
def land_mask(res=10):  # pixels per degree
    gj = json.loads((ASSETS / "land-110m.geojson").read_text())
    img = Image.new("L", (360 * res, 180 * res), 0)
    d = ImageDraw.Draw(img)
    pt = lambda c: [((x + 180) * res, (90 - y) * res) for x, y in c]
    for f in gj["features"]:
        g = f["geometry"]
        polys = [g["coordinates"]] if g["type"] == "Polygon" else g["coordinates"]
        for rings in polys:
            d.polygon(pt(rings[0]), fill=255)
            for hole in rings[1:]:
                d.polygon(pt(hole), fill=0)
    return img

STEP = 1.6  # degrees per dot
def dots():
    mask = land_mask()
    cols = int(360 / STEP)
    rows = int((LAT_N - LAT_S) / STEP)
    small = mask.crop((0, int((90 - LAT_N) * 10), 360 * 10, int((90 - LAT_S) * 10))).resize((cols, rows), Image.BOX)
    out = []
    for r in range(rows):
        for c in range(cols):
            if small.getpixel((c, r)) < 110:
                continue
            lon, lat = -180 + (c + .5) * STEP, LAT_N - (r + .5) * STEP
            x, y = project(lon, lat)
            s = altitude_sin(lon, lat)
            out.append((x, y, s))
    return out

# ---- terminator curve
def terminator():
    pts = []
    tan_d = math.tan(math.radians(DEC))
    for i in range(0, 721):
        lon = -180 + i * 0.5
        lat = math.degrees(math.atan(-math.cos(math.radians(lon - LON_S)) / tan_d))
        pts.append(project(lon, max(min(lat, LAT_N + 10), LAT_S - 10)))
    return pts

def night_polygon():
    """Night side polygon clipped to the map frame (night is on the pole side opposite the sun)."""
    curve = terminator()
    north_is_night = DEC < 0  # sun in the south: northern high latitudes are dark
    edge_y = MAP_TOP - 40 if north_is_night else MAP_TOP + MAP_H + 40
    poly = [(0, edge_y)] + curve + [(W, edge_y)]
    return poly

# ---- markets at the snapshot: NYSE (14:30-21:00 UTC), LSE and Xetra (08:00-16:30), BIST (07:00-15:00) are open
EXCHANGES = [  # id, label, lon, lat, state, label side
    ("nyse", "NYSE", -74.006, 40.713, "kill", "left"),
    ("lse", "LSE", -0.128, 51.508, "kill", "left"),
    ("xetra", "XETRA", 8.682, 50.110, "kill", "right"),
    ("bist", "BIST", 28.98, 41.01, "open", "right"),
    ("nse", "NSE", 72.83, 19.07, "closed", "right"),
    ("sse", "SSE", 121.47, 31.23, "closed", "up"),
    ("hkex", "HKEX", 114.17, 22.32, "closed", "left"),
    ("tse", "TSE", 139.69, 35.68, "closed", "right"),
    ("asx", "ASX", 151.21, -33.87, "closed", "left"),
]
SESSIONS = [  # name, UTC start, UTC end (may wrap), state
    ("SYDNEY", 20, 5, "closed"),
    ("TOKYO", 0, 9, "closed"),
    ("LONDON", 8, 17, "open"),
    ("NEW YORK", 13, 22, "open"),
]
KILL = (13, 17)
NOW_H = SNAPSHOT.hour + SNAPSHOT.minute / 60 + SNAPSHOT.second / 3600


def bar_segments(a, b):
    return [(a, b)] if a < b else [(a, 24), (0, b)]


def svg_map():
    parts = []
    for x, y, s in dots():
        if s > 0.03:
            fill, op, r = "#52a69a", .80, 2.3
        elif s > -0.12:
            fill, op, r = "#366a68", .66, 2.2
        else:
            fill, op, r = "#22394a", .55, 2.1
        parts.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{fill}" opacity="{op}"/>')
    night = " ".join(f"{x:.1f},{y:.1f}" for x, y in night_polygon())
    term = " ".join(f"{x:.1f},{y:.1f}" for x, y in terminator())
    ex = {e[0]: project(e[2], e[3]) for e in EXCHANGES}

    # killzone arc London <-> New York
    (x1, y1), (x2, y2) = ex["nyse"], ex["lse"]
    cx, cy = (x1 + x2) / 2, min(y1, y2) - 120
    arc = f"M{x1:.1f},{y1:.1f} Q{cx:.1f},{cy:.1f} {x2:.1f},{y2:.1f}"

    nodes = []
    for id_, label, lon, lat, state, side in EXCHANGES:
        x, y = ex[id_]
        col = {"kill": "#00f0ff", "open": "#00ff88", "closed": "#475569"}[state]
        ring = {"kill": "#06b6d4", "open": "#10b981", "closed": "#334155"}[state]
        if state != "closed":
            nodes.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="40" fill="none" stroke="{ring}" stroke-width="2" opacity=".28"/>')
            nodes.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="24" fill="none" stroke="{ring}" stroke-width="2" opacity=".55"/>')
            nodes.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="16" fill="{ring}" opacity=".25" filter="url(#blur6)"/>')
        nodes.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{9 if state != "closed" else 6}" fill="{col}" stroke="#04060a" stroke-width="2"/>')
        tc = {"kill": "#67e8f9", "open": "#6ee7b7", "closed": "#64748b"}[state]
        fs, pad = 26, 8
        tw = len(label) * 15.6 + 2 * pad
        if side == "right":
            bx, by = x + 22, y - 17
        elif side == "left":
            bx, by = x - 22 - tw, y - 17
        else:  # up
            bx, by = x - tw / 2 + 4, y - 62
        edge_x = bx if side != "left" else bx + tw
        nodes.append(f'<rect x="{bx:.1f}" y="{by:.1f}" width="{tw:.1f}" height="34" fill="#04060a" opacity=".82"/>')
        nodes.append(f'<rect x="{edge_x - (0 if side != "left" else 2):.1f}" y="{by:.1f}" width="2" height="34" fill="{col}"/>')
        nodes.append(f'<text x="{bx + pad + (4 if side != "left" else 0):.1f}" y="{by + 25:.1f}" font-size="{fs}" letter-spacing="3" fill="{tc}">{label}</text>')

    # Label above the apex of the quadratic arc
    mx, my = cx, 0.25 * y1 + 0.5 * cy + 0.25 * y2 + 74
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" style="position:absolute;inset:0">
<defs>
  <filter id="blur6" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="glowc" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <clipPath id="frame"><rect x="0" y="{MAP_TOP}" width="{W}" height="{MAP_H:.0f}"/></clipPath>
</defs>
<g clip-path="url(#frame)">
  <polygon points="{night}" fill="#000" opacity=".38"/>
  {"".join(parts)}
  <polyline points="{term}" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3 9" stroke-linecap="round" opacity=".7"/>
</g>
<path d="{arc}" fill="none" stroke="#00f0ff" stroke-width="3" stroke-dasharray="14 10" opacity=".9" filter="url(#glowc)"/>
{"".join(nodes)}
<g font-family="JetBrains Mono, monospace" font-weight="600" text-anchor="middle">
  <text x="{mx:.1f}" y="{my - 16:.1f}" font-size="24" letter-spacing="5" fill="#67e8f9" filter="url(#glowc)">KILLZONE</text>
</g>
</svg>'''


def session_cards():
    cards = []
    for name, a, b, state in SESSIONS:
        live = state == "open"
        in_kill = live and name in ("LONDON", "NEW YORK")
        col = "#34d399" if live else "#fb7185"
        segs = "".join(
            f'<i class="seg {"on" if live else ""}" style="left:{s/24*100:.2f}%;width:{(e-s)/24*100:.2f}%"></i>'
            for s, e in bar_segments(a, b))
        kill = (f'<i class="kill" style="left:{KILL[0]/24*100:.2f}%;width:{(KILL[1]-KILL[0])/24*100:.2f}%"></i>'
                if in_kill else "")
        cards.append(f'''<section class="hud card">
  <b class="br"></b>
  <header><h3>{name}</h3><span style="color:{col}">{"● OPEN" if live else "○ CLOSED"}</span></header>
  <div class="track">{segs}{kill}<i class="now" style="left:{NOW_H/24*100:.2f}%"></i></div>
  <footer><span>00</span><span>06</span><span>12</span><span>18</span><span>24 UTC</span></footer>
</section>''')
    return "".join(cards)


def html():
    clock = SNAPSHOT.strftime("%H:%M:%S")
    icon = (ASSETS / "app-icon.png").as_uri()
    font = (ASSETS / "jetbrains-mono-latin.woff2").as_uri()
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face {{ font-family:'JetBrains Mono'; font-weight:100 800; src:url('{font}') format('woff2'); }}
* {{ box-sizing:border-box; margin:0; padding:0; }}
html,body {{ width:{W}px; height:{H}px; background:#04060a; overflow:hidden; }}
body {{ position:relative; font-family:'JetBrains Mono',monospace; color:#cbd5e1; font-variant-numeric:tabular-nums; }}
.bg {{ position:absolute; inset:0;
  background:
    radial-gradient(ellipse 60% 50% at 40% 52%, rgba(16,185,129,.09), transparent 70%),
    radial-gradient(ellipse 40% 40% at 78% 60%, rgba(6,182,212,.07), transparent 70%),
    linear-gradient(rgba(16,185,129,.045) 1px, transparent 1px) 0 0/48px 48px,
    linear-gradient(90deg, rgba(16,185,129,.045) 1px, transparent 1px) 0 0/48px 48px, #04060a; }}
.crt {{ position:absolute; inset:0; pointer-events:none; z-index:9;
  background: repeating-linear-gradient(0deg, rgba(0,0,0,.20) 0 1px, transparent 1px 3px),
              radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.6) 100%); }}
.hud {{ position:absolute; border:1px solid rgba(255,255,255,.10);
  background:linear-gradient(180deg, rgba(10,14,23,.90), rgba(4,6,10,.94)); }}
.hud::before, .hud::after, .hud .br::before, .hud .br::after {{ content:""; position:absolute; width:16px; height:16px; border:0 solid rgba(16,185,129,.8); }}
.hud::before {{ left:-1px; top:-1px; border-left-width:2px; border-top-width:2px; }}
.hud::after {{ right:-1px; top:-1px; border-right-width:2px; border-top-width:2px; }}
.hud .br {{ position:absolute; inset:0; }}
.hud .br::before {{ left:-1px; bottom:-1px; border-left-width:2px; border-bottom-width:2px; }}
.hud .br::after {{ right:-1px; bottom:-1px; border-right-width:2px; border-bottom-width:2px; }}
.glow-g {{ text-shadow:0 0 8px rgba(16,185,129,.7), 0 0 26px rgba(0,255,136,.28); }}
.glow-c {{ text-shadow:0 0 8px rgba(6,182,212,.75), 0 0 26px rgba(0,240,255,.3); }}
.brand {{ left:72px; top:132px; display:flex; align-items:center; gap:28px; }}
.brand img {{ width:104px; height:104px; border:1px solid rgba(16,185,129,.35); display:block; }}
.brand h1 {{ font-size:50px; font-weight:700; letter-spacing:.12em; color:#6ee7b7; line-height:1.05; text-transform:uppercase; }}
.brand h1 u {{ text-decoration:none; color:#34d399; }}
.brand p {{ font-size:24px; letter-spacing:.12em; color:rgba(103,232,249,.85); margin-top:8px; text-transform:uppercase; }}
.brand small {{ display:block; font-size:22px; letter-spacing:.06em; color:#94a3b8; margin-top:8px; }}
.brand small em {{ font-style:normal; color:#34d399; }}
.clock {{ right:72px; top:128px; width:600px; height:146px; padding:18px 28px 16px; }}
.clock .t {{ font-size:76px; font-weight:600; letter-spacing:.04em; color:#6ee7b7; line-height:1; display:flex; align-items:baseline; gap:18px; }}
.clock .t small {{ font-size:26px; letter-spacing:.14em; color:#94a3b8; font-weight:500; }}
.clock .m {{ margin-top:12px; font-size:24px; letter-spacing:.12em; color:#67e8f9; font-weight:600; white-space:nowrap; }}
.strip {{ left:72px; right:72px; top:915px; height:164px; display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }}
.strip .card {{ position:relative; padding:18px 22px 14px; }}
.card header {{ display:flex; justify-content:space-between; align-items:baseline; font-size:25px; letter-spacing:.12em; }}
.card h3 {{ font-size:27px; font-weight:700; color:#f1f5f9; letter-spacing:.12em; }}
.track {{ position:relative; height:16px; margin-top:16px; background:rgba(255,255,255,.07); }}
.track .seg {{ position:absolute; top:0; bottom:0; background:#1e293b; }}
.track .seg.on {{ background:#10b981; box-shadow:0 0 14px rgba(16,185,129,.55); }}
.track .kill {{ position:absolute; top:-5px; bottom:-5px; background:rgba(6,182,212,.22); border-left:2px solid #06b6d4; border-right:2px solid #06b6d4; }}
.track .now {{ position:absolute; top:-9px; bottom:-9px; width:3px; margin-left:-1px; background:#f8fafc; box-shadow:0 0 12px #fff; }}
.card footer {{ display:flex; justify-content:space-between; margin-top:10px; font-size:17px; letter-spacing:.08em; color:#64748b; }}
.tag {{ position:absolute; left:72px; top:{MAP_TOP + MAP_H - 6:.0f}px; font-size:18px; letter-spacing:.14em; color:#475569; }}
</style></head><body>
<div class="bg"></div>
{svg_map()}
{chrome(icon, clock)}
<div class="crt"></div>
</body></html>'''


def chrome(icon, clock):
    """Title block, clock and session cards: the part of the banner that is text."""
    if HERO:
        return ""
    return f'''<div class="brand" style="position:absolute">
  <img src="{icon}" alt="">
  <div>
    <h1 class="glow-g">Market Hours<u>_</u></h1>
    <p>Forex &amp; Stocks · Tactical World Market Map</p>
    <small>Forex: <em>2/4 sessions open</em> &nbsp; Exchanges: <em>4/9 open</em></small>
  </div>
</div>
<section class="hud clock"><b class="br"></b>
  <div class="t glow-g">{clock}<small>UTC</small></div>
  <div class="m glow-c">● LONDON / NY KILLZONE ACTIVE</div>
</section>
<div class="strip" style="position:absolute">{session_cards()}</div>'''


def main():
    page = HERE / "_banner.html"
    page.write_text(html())
    shot = r"""
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const [html, out] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: %d, height: %d }, deviceScaleFactor: 1 });
await p.goto('file://' + html, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(400);
await p.screenshot({ path: out });
await b.close();
""" % (W, H)
    with tempfile.NamedTemporaryFile("w", suffix=".mjs", delete=False) as f:
        f.write(shot)
    subprocess.run(["node", f.name, str(page), str(OUT)], check=True)
    page.unlink()
    print(OUT, f"sun dec {DEC:.2f} lon {LON_S:.2f}")


if __name__ == "__main__":
    main()
