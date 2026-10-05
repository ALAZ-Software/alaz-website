"""Build every deliverable of the business card.

    python build.py [output-dir]   (default: brand/kartvizit)

For each Bidolubaskı format it writes a front and a back print PDF (CMYK,
2 mm bleed, text as outlines) plus SVGs, and one PNG overview of all formats.
"""
import sys
import tempfile
from pathlib import Path

import pymupdf
from PIL import Image, ImageDraw, ImageFilter

import design
from engine import write_pdf, write_svg

OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent
PX_PER_MM = 16


def rasterise(pdf_path):
    zoom = PX_PER_MM * 25.4 / 72
    out = []
    for page in pymupdf.open(pdf_path):
        pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
        out.append(Image.frombytes("RGB", (pix.width, pix.height), pix.samples))
    return out


def overview(cards):
    """Every format, front above back, on a light table with soft shadows."""
    pad, gap = 12 * PX_PER_MM, 10 * PX_PER_MM
    width = 2 * pad + sum(f.width for f, _ in cards) * PX_PER_MM + gap * (len(cards) - 1)
    height = 2 * pad + max(f.height for f, _ in cards) * 2 * PX_PER_MM + gap
    size = (round(width), round(height))
    canvas = Image.new("RGB", size, (226, 226, 224))
    shadow = Image.new("L", size, 0)
    d = ImageDraw.Draw(shadow)
    spots, x = [], pad
    for fmt, (front, back) in cards:
        for i, img in enumerate((front, back)):
            y = pad + i * (img.height + gap)
            spots.append((img, round(x), round(y)))
            d.rectangle((x + 6, y + 20, x + img.width + 6, y + img.height + 20), fill=120)
        x += fmt.width * PX_PER_MM + gap
    shadow = shadow.filter(ImageFilter.GaussianBlur(2.2 * PX_PER_MM))
    canvas.paste(Image.new("RGB", size, (150, 150, 148)), (0, 0), shadow)
    for img, x, y in spots:
        canvas.paste(img, (x, y))
    return canvas


def main():
    pdf_dir, svg_dir, png_dir = OUT / "bidolubaski", OUT / "svg", OUT / "onizleme"
    for d in (pdf_dir, svg_dir, png_dir):
        d.mkdir(parents=True, exist_ok=True)

    cards = []
    for fmt in design.FORMATS:
        pages = design.sides(fmt)
        for page in pages:
            write_pdf([page], pdf_dir / f"ALAZ-kartvizit-{page.name}.pdf", mode="cmyk")
            write_svg(page, svg_dir / f"ALAZ-kartvizit-{page.name}.svg")
        with tempfile.TemporaryDirectory() as tmp:
            rgb = Path(tmp) / "preview.pdf"
            write_pdf(pages, rgb, mode="rgb", trim_only=True)
            cards.append((fmt, rasterise(rgb)))
    overview(cards).save(png_dir / "ALAZ-kartvizit-onizleme.png", optimize=True)


if __name__ == "__main__":
    main()
