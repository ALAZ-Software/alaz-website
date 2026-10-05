// Display headings scale with the viewport, so a long word (ENGINEERING, MÜHENDİSLİĞİ, a long
// project name) can end up wider than the screen. `fit()` estimates the em width of the widest
// word; the `.fit` class in globals.css caps the font size so that word always fits its column.

// Advance widths in em for the display face (Archivo 900, also used for 800), measured in Chrome.
const ADVANCE = {
  A: 0.778, B: 0.778, C: 0.778, Ç: 0.778, D: 0.778, E: 0.722, F: 0.667, G: 0.833, Ğ: 0.833, H: 0.833,
  I: 0.369, İ: 0.369, J: 0.667, K: 0.833, L: 0.667, M: 0.972, N: 0.833, O: 0.833, Ö: 0.833, P: 0.722,
  Q: 0.833, R: 0.778, S: 0.722, Ş: 0.722, T: 0.722, U: 0.833, Ü: 0.833, V: 0.778, W: 1, X: 0.778,
  Y: 0.778, Z: 0.722,
  a: 0.667, b: 0.667, c: 0.667, ç: 0.667, d: 0.667, e: 0.667, f: 0.378, g: 0.667, ğ: 0.667, h: 0.667,
  i: 0.319, ı: 0.319, j: 0.316, k: 0.667, l: 0.319, m: 1, n: 0.667, o: 0.667, ö: 0.667, p: 0.667,
  q: 0.667, r: 0.444, s: 0.611, ş: 0.611, t: 0.444, u: 0.667, ü: 0.667, v: 0.611, w: 0.944, x: 0.667,
  y: 0.611, z: 0.556,
  '.': 0.333, ',': 0.333, ':': 0.333, ';': 0.333, '!': 0.333, '?': 0.611, "'": 0.278, '’': 0.278,
  '-': 0.333, '–': 0.5, '—': 1, '/': 0.306, '&': 0.889, '(': 0.389, ')': 0.389, '%': 1,
};
const DIGIT = 0.667;
const UNKNOWN = 0.85;
// The loosest letter-spacing a display heading uses; tighter tracking only makes words narrower.
const TRACKING = -0.05;

const wordEm = (word) =>
  [...word].reduce((sum, ch) => sum + (ADVANCE[ch] ?? (/\d/.test(ch) ? DIGIT : UNKNOWN)) + TRACKING, 0);

// `text` is a string or an array of lines; `suffix` is glued to the last word (the grey period).
// Returns the inline style for an element with the `.fit` class.
export function fit(text, suffix = '') {
  const words = `${[text].flat().join(' ')}${suffix}`.split(/\s+/).filter(Boolean);
  const em = Math.max(1, ...words.map(wordEm));
  return { '--fit-em': (em * 1.03).toFixed(3) };
}
