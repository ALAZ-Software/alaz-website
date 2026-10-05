"""Build every deliverable of the business card.

    python build.py [output-dir]   (default: brand/kartvizit)

Writes print PDFs (CMYK, 3 mm bleed, text as outlines), SVGs and PNG previews.
"""
import sys
import tempfile
from pathlib import Path

import pymupdf
from PIL import Image, ImageDraw, ImageFilter

import design
from engine import write_pdf, write_svg

OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent
PREVIEW_PX_PER_MM = 24  # ~610 dpi


def rasterise(pdf_path, px_per_mm):
    doc = pymupdf.open(pdf_path)
    zoom = px_per_mm * 25.4 / 72
    images = []
    for page in doc:
        pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
        images.append(Image.frombytes("RGB", (pix.width, pix.height), pix.samples))
    return images


def mockup(front, back, px_per_mm):
    """Both sides on a light table with soft shadows."""
    pad, gap = round(16 * px_per_mm), round(10 * px_per_mm)
    cw, ch = front.size
    size = (2 * pad + 2 * cw + gap, 2 * pad + ch)
    canvas = Image.new("RGB", size, (226, 226, 224))
    shadow = Image.new("L", size, 0)
    d = ImageDraw.Draw(shadow)
    off = round(1.2 * px_per_mm)
    for x in (pad, pad + cw + gap):
        d.rectangle((x + off * .3, pad + off, x + cw + off * .3, pad + ch + off), fill=120)
    shadow = shadow.filter(ImageFilter.GaussianBlur(2.2 * px_per_mm))
    canvas.paste(Image.new("RGB", size, (150, 150, 148)), (0, 0), shadow)
    canvas.paste(front, (pad, pad))
    canvas.paste(back, (pad + cw + gap, pad))
    return canvas


def main():
    pages = design.pages()
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "svg").mkdir(exist_ok=True)
    (OUT / "onizleme").mkdir(exist_ok=True)

    write_pdf(pages, OUT / "ALAZ-kartvizit-baski.pdf", mode="cmyk")
    for page in pages:
        write_pdf([page], OUT / f"ALAZ-kartvizit-{page.name}.pdf", mode="cmyk")
        write_svg(page, OUT / "svg" / f"ALAZ-kartvizit-{page.name}.svg")

    with tempfile.TemporaryDirectory() as tmp:
        rgb = Path(tmp) / "preview.pdf"
        write_pdf(pages, rgb, mode="rgb", trim_only=True)
        trimmed = rasterise(rgb, PREVIEW_PX_PER_MM)
    for page, img in zip(pages, trimmed):
        img.save(OUT / "onizleme" / f"ALAZ-kartvizit-{page.name}.png", optimize=True)
    mockup(*trimmed, PREVIEW_PX_PER_MM).save(OUT / "onizleme" / "ALAZ-kartvizit-mockup.png", optimize=True)


if __name__ == "__main__":
    main()
