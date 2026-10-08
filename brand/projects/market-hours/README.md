# Market Hours banner

`build_banner.py` draws the project cover shown on alaz.pro (1920×1200, 16:10) in the
Market Hours app's own look: tactical HUD, `#04060A` void, emerald for open markets, cyan for the
London / New York killzone, JetBrains Mono, bracketed glass panels, dot-matrix world map with the
day/night terminator.

The banner is a fixed snapshot (Tue 8 Dec 2026, 14:42:11 UTC): NYSE, LSE, Xetra and BIST open,
Sydney and Tokyo closed, killzone active. Change `SNAPSHOT` and the `EXCHANGES` / `SESSIONS` tables
in the script to show another moment.

```bash
pip install pillow          # plus playwright with a chromium for the render
python build_banner.py out.png
# the site uses it as public/projects/market-hours/cover.jpg (JPEG q92, 4:4:4)
```

`assets/`: the app icon and JetBrains Mono (OFL) from the Market Hours repos, and Natural Earth
110m land polygons (public domain).
