"""Tiny layout engine for print artwork.

Text is shaped with HarfBuzz (real kerning + OpenType features, like a browser)
and every glyph is converted to vector outlines, so the output needs no fonts.
Pages are described once in millimetres (trim coordinates, y pointing down)
and written out as a CMYK PDF for print, an RGB PDF for previews and SVG.
"""

from dataclasses import dataclass, field
from pathlib import Path
import urllib.request

import uharfbuzz as hb
from reportlab import rl_config
from fontTools.pens.basePen import BasePen

PT = 25.4 / 72  # one typographic point in millimetres

FONT_DIR = Path(__file__).resolve().parent / "fonts"
FONT_URLS = {
    "Archivo[wdth,wght].ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/archivo/Archivo%5Bwdth,wght%5D.ttf",
    "Inter[opsz,wght].ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf",
    "JetBrainsMono[wght].ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf",
}


def font_path(name):
    path = FONT_DIR / name
    if not path.exists():
        FONT_DIR.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(FONT_URLS[name], path)
    return path


# ---------------------------------------------------------------- colours

@dataclass(frozen=True)
class Ink:
    """One colour, defined twice: sRGB for screens, CMYK (0-100) for press."""
    rgb: str
    cmyk: tuple

    @property
    def rgb01(self):
        h = self.rgb.lstrip("#")
        return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


# ---------------------------------------------------------------- fonts

class _OutlinePen(BasePen):
    """Collects a glyph as move/line/cubic/close (quadratics become cubics)."""

    def __init__(self):
        super().__init__(glyphSet=None)
        self.ops = []

    def _moveTo(self, p):
        self.ops.append(("M", p))

    def _lineTo(self, p):
        self.ops.append(("L", p))

    def _curveToOne(self, p1, p2, p3):
        self.ops.append(("C", p1, p2, p3))

    def _closePath(self):
        self.ops.append(("Z",))

    def _endPath(self):
        self.ops.append(("Z",))


class Face:
    def __init__(self, file, variations, features=None):
        self.hb_face = hb.Face(hb.Blob.from_file_path(str(font_path(file))))
        self.font = hb.Font(self.hb_face)
        self.font.set_variations(variations)
        self.upem = self.hb_face.upem
        self.features = {"kern": True, **(features or {})}
        self._outlines = {}

    def outline(self, gid):
        if gid not in self._outlines:
            pen = _OutlinePen()
            self.font.draw_glyph_with_pen(gid, pen)
            self._outlines[gid] = pen.ops
        return self._outlines[gid]

    def extents(self, gid):
        e = self.font.get_glyph_extents(gid)
        # x_min, y_min, x_max, y_max in font units, y up
        return e.x_bearing, e.y_bearing + e.height, e.x_bearing + e.width, e.y_bearing


@dataclass
class Style:
    face: Face
    size: float            # points
    tracking: float = 0.0  # em, like CSS letter-spacing
    ink: Ink = None
    pairs: dict = None     # extra space between two characters, em: {"KA": .03}


@dataclass
class Glyph:
    face: Face
    gid: int
    x: float      # mm, trim coordinates
    y: float      # mm, baseline, y down
    scale: float  # mm per font unit
    ink: Ink


@dataclass
class Line:
    """A shaped line of one or more styled runs, positioned at x=0 baseline=0."""
    glyphs: list
    advance: float  # mm, without the trailing letter-spacing
    ink_left: float
    ink_right: float
    ink_top: float      # mm above baseline (positive)
    ink_bottom: float   # mm below baseline (positive)


def shape(runs):
    """runs: [(text, Style), ...] -> Line"""
    glyphs, x = [], 0.0
    last_tracking = 0.0
    for text, st in runs:
        f = st.face
        buf = hb.Buffer()
        buf.add_codepoints([ord(ch) for ch in text])
        buf.guess_segment_properties()
        hb.shape(f.font, buf, f.features)
        size_mm = st.size * PT
        k = size_mm / f.upem
        clusters = [i.cluster for i in buf.glyph_infos]
        for n, (info, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
            glyphs.append(Glyph(f, info.codepoint, x + pos.x_offset * k, -pos.y_offset * k, k, st.ink))
            x += pos.x_advance * k
            # CSS letter-spacing: added after every character (cluster end)
            if n + 1 == len(clusters) or clusters[n + 1] != clusters[n]:
                x += st.tracking * size_mm
                pair = text[clusters[n]:clusters[n] + 2]
                if st.pairs and pair in st.pairs:
                    x += st.pairs[pair] * size_mm
        last_tracking = st.tracking * size_mm
    advance = x - last_tracking
    xs0, xs1, top, bottom = [], [], [0.0], [0.0]
    for g in glyphs:
        x0, y0, x1, y1 = g.face.extents(g.gid)
        if x1 > x0:
            xs0.append(g.x + x0 * g.scale)
            xs1.append(g.x + x1 * g.scale)
            top.append(y1 * g.scale - g.y)
            bottom.append(-y0 * g.scale + g.y)
    return Line(glyphs, advance,
                min(xs0) if xs0 else 0.0, max(xs1) if xs1 else 0.0,
                max(top), max(bottom))


# ---------------------------------------------------------------- pages

@dataclass
class Page:
    name: str
    width: float
    height: float
    bleed: float
    background: Ink
    items: list = field(default_factory=list)

    def rect(self, x, y, w, h, ink):
        self.items.append(("rect", x, y, w, h, ink))

    def hline(self, x0, x1, y, weight, ink):
        self.rect(x0, y - weight / 2, x1 - x0, weight, ink)

    def vline(self, x, y0, y1, weight, ink):
        self.rect(x - weight / 2, y0, weight, y1 - y0, ink)

    def text(self, x, y, runs, align="left", optical=False):
        """Place shaped text with its baseline at y.

        align: left | right | center (by advance width).
        optical=True aligns the actual ink edge instead of the advance box,
        so big type sits exactly on the margin.
        """
        line = runs if isinstance(runs, Line) else shape(runs)
        if align == "left":
            dx = x - (line.ink_left if optical else 0.0)
        elif align == "right":
            dx = x - (line.ink_right if optical else line.advance)
        else:
            dx = x - ((line.ink_left + line.ink_right) / 2 if optical else line.advance / 2)
        for g in line.glyphs:
            self.items.append(("glyph", Glyph(g.face, g.gid, g.x + dx, g.y + y, g.scale, g.ink)))
        return line, dx


def glyph_ops(g, ox, oy, flip_height=None):
    """Glyph outline in page millimetres. flip_height turns y up (PDF)."""
    out = []
    for op in g.face.outline(g.gid):
        pts = []
        for (u, v) in op[1:]:
            px = ox + g.x + u * g.scale
            py = oy + g.y - v * g.scale
            if flip_height is not None:
                py = flip_height - py
            pts.append((px, py))
        out.append((op[0], pts))
    return out


# ---------------------------------------------------------------- output

def write_pdf(pages, path, mode="cmyk", trim_only=False):
    from reportlab.pdfgen import canvas
    from reportlab.lib.units import mm

    class Canvas(canvas.Canvas):
        # reportlab opens every page with an empty text object that sets a
        # (non-embedded) Helvetica; printers' preflight flags that, so skip it.
        def _make_preamble(self):
            self._preamble = "1 0 0 1 0 0 cm"

    first = pages[0]
    b = 0.0 if trim_only else first.bleed
    W, H = first.width + 2 * b, first.height + 2 * b
    rl_config.useA85 = 0
    c = Canvas(str(path), pagesize=(W * mm, H * mm),
                      enforceColorSpace="cmyk" if mode == "cmyk" else "rgb",
                      pageCompression=1)
    c.setTitle("ALAZ — Kartvizit")
    c.setAuthor("ALAZ")
    c.setCreator("ALAZ kartvizit generator")

    def fill(ink):
        if mode == "cmyk":
            c.setFillColorCMYK(*[v / 100 for v in ink.cmyk])
        else:
            c.setFillColorRGB(*ink.rgb01)

    for page in pages:
        if not trim_only:
            t = [b * mm, b * mm, (b + page.width) * mm, (b + page.height) * mm]
            c.setTrimBox(t)
            c.setBleedBox([0, 0, W * mm, H * mm])
        fill(page.background)
        c.rect(0, 0, W * mm, H * mm, stroke=0, fill=1)
        for item in page.items:
            if item[0] == "rect":
                _, x, y, w, h, ink = item
                fill(ink)
                c.rect((b + x) * mm, (H - (b + y + h)) * mm, w * mm, h * mm, stroke=0, fill=1)
            else:
                g = item[1]
                fill(g.ink)
                p = c.beginPath()
                for op, pts in glyph_ops(g, b, b, flip_height=H):
                    pts = [(px * mm, py * mm) for px, py in pts]
                    if op == "M":
                        p.moveTo(*pts[0])
                    elif op == "L":
                        p.lineTo(*pts[0])
                    elif op == "C":
                        p.curveTo(*pts[0], *pts[1], *pts[2])
                    else:
                        p.close()
                c.drawPath(p, stroke=0, fill=1, fillMode=0)  # non-zero winding
        c.showPage()
    c.save()


def write_svg(page, path, trim_only=False):
    b = 0.0 if trim_only else page.bleed
    W, H = page.width + 2 * b, page.height + 2 * b
    f = lambda v: f"{v:.4f}".rstrip("0").rstrip(".")
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{f(W)}mm" height="{f(H)}mm" viewBox="0 0 {f(W)} {f(H)}">',
           f'<rect width="{f(W)}" height="{f(H)}" fill="{page.background.rgb}"/>']
    for item in page.items:
        if item[0] == "rect":
            _, x, y, w, h, ink = item
            out.append(f'<rect x="{f(b + x)}" y="{f(b + y)}" width="{f(w)}" height="{f(h)}" fill="{ink.rgb}"/>')
        else:
            g = item[1]
            d = []
            for op, pts in glyph_ops(g, b, b):
                d.append(op + " ".join(f"{f(px)} {f(py)}" for px, py in pts))
            out.append(f'<path fill="{g.ink.rgb}" d="{"".join(d)}"/>')
    out.append("</svg>")
    Path(path).write_text("\n".join(out))
