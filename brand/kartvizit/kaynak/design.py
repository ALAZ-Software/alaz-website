"""ALAZ business card, front and back, in every format Bidolubaskı prints.

Both sides share one skeleton taken from the site's hero section:
a mono label on top, one huge Archivo Black statement ending in a grey
square period, a hairline rule, and mono text at the bottom, all over the
four-column hairline grid.
"""

from dataclasses import dataclass

from engine import PT, Face, Ink, Page, Style, shape

# ---------------------------------------------------------------- formats (mm)

@dataclass(frozen=True)
class Format:
    name: str      # used in file names
    width: float   # trim size
    height: float
    bleed: float = 3.0   # Bidolubaskı template: 82x50 card on a 88x56 page
    margin: float = 5.5  # template's safe line is 5 mm inside the cut

    @property
    def vertical(self):
        return self.height > self.width


FORMATS = [
    Format("8.2x5-yatay", 82, 50),
    Format("8.2x5-dikey", 50, 82),
    Format("9x5-yatay", 90, 50),
    Format("9x5-dikey", 50, 90),
]

# ---------------------------------------------------------------- tokens (src/app/globals.css)
BG = Ink("#0a0a0a", (0, 0, 0, 100))        # --ink; Bidolubaskı asks for K100 black
WHITE = Ink("#ffffff", (0, 0, 0, 0))
GRID = Ink("#1a1a1a", (0, 0, 0, 88))        # hero grid, rgba(255,255,255,.065)
RULE = Ink("#404040", (0, 0, 0, 72))        # hero rule, rgba(255,255,255,.22)
LABEL = Ink("#a6a6a6", (0, 0, 0, 40))       # hero mono rows
DOT = Ink("#858585", (0, 0, 0, 57))         # period of the ALAZ. wordmark
DOT_HEADING = Ink("#777777", (0, 0, 0, 65)) # period of the "START PROJECT." heading

ARCHIVO_BLACK = Face("Archivo[wdth,wght].ttf", {"wght": 900, "wdth": 100})
MONO = Face("JetBrainsMono[wght].ttf", {"wght": 500})

LABEL_PT = 5.5
CONTACT_PT = 6.5
CAP_MONO = 0.73
ROW_PITCH = 4.3      # stacked contact rows
LABEL_PITCH = 3.4    # stacked label lines

PERSON = {
    "name": ("MUSTAFA", "KAHRAMAN"),
    "role": "FOUNDER & DEVELOPER",
    "phone": "+90 542 677 22 25",
    "email": "hello@alaz.pro",
    "web": "alaz.pro",
}
STUDIO = ("INDEPENDENT SOFTWARE", "ARCHITECTURE STUDIO")
EST = "EST. 2026"


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


class Card:
    def __init__(self, fmt, side):
        self.f = fmt
        self.W, self.H, self.M = fmt.width, fmt.height, fmt.margin
        self.page = Page(f"{fmt.name}-{side}", self.W, self.H, fmt.bleed, BG)
        for i in (1, 2, 3):
            self.page.vline(self.W * i / 4, -fmt.bleed, self.H + fmt.bleed, 0.12, GRID)
        self.top = self.M + CAP_MONO * LABEL_PT * PT
        self.bottom = self.H - self.M

    def rule_above(self, first_baseline, size):
        """Hairline 3 mm above the first bottom line; returns the statement baseline."""
        y = first_baseline - CAP_MONO * size * PT - 3.0
        self.page.hline(self.M, self.W - self.M, y, 0.15, RULE)
        return y - 4.2

    def spread(self, y, items):
        """flex justify-between: first item on the left margin, last on the right."""
        lines = [shape(r) for r in items]
        gap = (self.W - 2 * self.M - sum(l.advance for l in lines)) / (len(lines) - 1)
        x = self.M
        for line in lines:
            self.page.text(x, y, line)
            x += line.advance + gap


def front(fmt):
    c = Card(fmt, "on")
    p, M, W = c.page, c.M, c.W
    # status square + label, as in the hero's top-left corner
    s = 0.6 * LABEL_PT * PT
    p.rect(M, c.top - CAP_MONO * LABEL_PT * PT / 2 - s / 2, s, s, WHITE)
    p.text(M + s + LABEL_PT * PT, c.top, [("SYSTEM_ACTIVE", mono())])

    if fmt.vertical:
        first = c.bottom - LABEL_PITCH
        p.text(M, first, [(STUDIO[0], mono())])
        p.text(M, c.bottom, [(STUDIO[1], mono())])
    else:
        first = c.bottom
        p.text(M, c.bottom, [(" ".join(STUDIO), mono())])
    p.text(W - M, c.bottom, [(EST, mono())], align="right")
    statement = c.rule_above(first, LABEL_PT)

    # wordmark, exactly as the hero h1: ALAZ + a .7em grey period
    wordmark = lambda size: [("ALAZ", black(size)), (".", black(size * .7, DOT, -.1))]
    p.text(M, statement, wordmark(fit(wordmark, W - 2 * M)), optical=True)
    return p


def back(fmt):
    c = Card(fmt, "arka")
    p, M, W = c.page, c.M, c.W
    p.text(M, c.top, [("// " + PERSON["role"], mono())])

    contact = mono(CONTACT_PT, WHITE, .04)
    values = [PERSON["phone"], PERSON["email"], PERSON["web"]]
    if fmt.vertical:
        first = c.bottom - ROW_PITCH * (len(values) - 1)
        for i, v in enumerate(values):
            p.text(M, first + i * ROW_PITCH, [(v, contact)])
    else:
        first = c.bottom
        c.spread(c.bottom, [[(v, contact)] for v in values])
    statement = c.rule_above(first, CONTACT_PT)

    name_first, name_last = PERSON["name"]
    heading = lambda size: [(name_last, black(size, **NAME_SPACING)), (".", black(size, DOT_HEADING, **NAME_SPACING))]
    size = fit(heading, W - 2 * M)
    p.text(M, statement - .86 * size * PT, [(name_first, black(size, **NAME_SPACING))], optical=True)
    p.text(M, statement, heading(size), optical=True)
    return p


def sides(fmt):
    return [front(fmt), back(fmt)]
