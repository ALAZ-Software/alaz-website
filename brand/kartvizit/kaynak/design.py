"""ALAZ business card, front and back.

Both sides share one skeleton taken from the site's hero section:
a mono label row on top, one huge Archivo Black statement ending in a grey
square period, a hairline rule, and a mono row at the bottom, all over the
four-column hairline grid.
"""

from engine import PT, Face, Ink, Page, Style, shape

# ---------------------------------------------------------------- format (mm)
W, H = 85.0, 55.0   # trim size
BLEED = 3.0
M = 5.0             # margin / safe area

# ---------------------------------------------------------------- tokens (src/app/globals.css)
BG = Ink("#0a0a0a", (60, 40, 40, 100))      # --ink; rich black on press
WHITE = Ink("#ffffff", (0, 0, 0, 0))
GRID = Ink("#1a1a1a", (0, 0, 0, 100))       # hero grid, rgba(255,255,255,.065)
RULE = Ink("#404040", (0, 0, 0, 90))        # hero rule, rgba(255,255,255,.22)
LABEL = Ink("#a6a6a6", (0, 0, 0, 40))       # hero mono rows
DOT = Ink("#858585", (0, 0, 0, 57))         # period of the ALAZ. wordmark
DOT_HEADING = Ink("#777777", (0, 0, 0, 65)) # period of the "START PROJECT." heading

ARCHIVO_BLACK = Face("Archivo[wdth,wght].ttf", {"wght": 900, "wdth": 100})
MONO = Face("JetBrainsMono[wght].ttf", {"wght": 500})

LABEL_PT = 5.5
CONTACT_PT = 6.5
CAP_ARCHIVO = 0.688
CAP_MONO = 0.73

PERSON = {
    "name": ("MUSTAFA", "KAHRAMAN"),
    "role": "FOUNDER & DEVELOPER",
    "phone": "+90 542 677 22 25",
    "email": "hello@alaz.pro",
    "web": "alaz.pro",
}

# ---------------------------------------------------------------- shared skeleton
TOP = M + CAP_MONO * LABEL_PT * PT                 # baseline of the top row
BOTTOM = H - M                                     # baseline of the bottom row
RULE_Y = BOTTOM - CAP_MONO * CONTACT_PT * PT - 3.0
STATEMENT = RULE_Y - 4.2                           # baseline of the big type


def mono(size=LABEL_PT, ink=LABEL, tracking=.085):
    return Style(MONO, size, tracking, ink)


def black(size, ink=WHITE, tracking=-.02, pairs=None):
    return Style(ARCHIVO_BLACK, size, tracking, ink, pairs)


# The name runs at tracking 0 and opens K-A, which Archivo kerns into touching;
# every letter pair keeps at least ~0.3 mm of black between it on press.
NAME_SPACING = {"tracking": 0.0, "pairs": {"KA": .055}}


def fit(runs_at, width):
    """Point size at which runs_at(size) spans `width` mm of ink."""
    probe = shape(runs_at(10))
    return 10 * width / (probe.ink_right - probe.ink_left)


def base(name):
    page = Page(name, W, H, BLEED, BG)
    for i in (1, 2, 3):
        page.vline(W * i / 4, -BLEED, H + BLEED, 0.12, GRID)
    page.hline(M, W - M, RULE_Y, 0.15, RULE)
    return page


def spread(page, y, runs_list):
    """flex justify-between: first item on the left margin, last on the right."""
    lines = [shape(r) for r in runs_list]
    gap = (W - 2 * M - sum(l.advance for l in lines)) / (len(lines) - 1)
    x = M
    for line in lines:
        page.text(x, y, line)
        x += line.advance + gap


def front():
    page = base("on")
    # top row: status square + label, page index
    s = 0.6 * LABEL_PT * PT
    page.rect(M, TOP - CAP_MONO * LABEL_PT * PT / 2 - s / 2, s, s, WHITE)
    page.text(M + s + LABEL_PT * PT, TOP, [("SYSTEM_ACTIVE", mono())])
    page.text(W - M, TOP, [("01 / 02", mono())], align="right")
    # wordmark, exactly as the hero h1: ALAZ + a .7em grey period
    wordmark = lambda size: [("ALAZ", black(size)), (".", black(size * .7, DOT, -.1))]
    size = fit(wordmark, W - 2 * M)
    page.text(M, STATEMENT, wordmark(size), optical=True)
    # bottom row
    page.text(M, BOTTOM, [("INDEPENDENT SOFTWARE ARCHITECTURE STUDIO", mono())])
    page.text(W - M, BOTTOM, [("EST. 2025", mono())], align="right")
    return page


def back():
    page = base("arka")
    page.text(M, TOP, [("// " + PERSON["role"], mono())])
    page.text(W - M, TOP, [("02 / 02", mono())], align="right")
    first, last = PERSON["name"]
    heading = lambda size: [(last, black(size, **NAME_SPACING)), (".", black(size, DOT_HEADING, **NAME_SPACING))]
    size = fit(heading, W - 2 * M)
    page.text(M, STATEMENT - .86 * size * PT, [(first, black(size, **NAME_SPACING))], optical=True)
    page.text(M, STATEMENT, heading(size), optical=True)
    contact = mono(CONTACT_PT, WHITE, .04)
    spread(page, BOTTOM, [[(PERSON["phone"], contact)], [(PERSON["email"], contact)], [(PERSON["web"], contact)]])
    return page


def pages():
    return [front(), back()]
