// Regular trading sessions of the nine exchanges Market Hours covers, in each exchange's own
// time zone, so daylight saving is handled by Intl. Holidays and half days are not modelled
// here (markethours.live has them); the UI says "regular sessions" for that reason.
// Ordered with the sun: Sydney opens the day, New York closes it.
export const EXCHANGES = [
  { id: 'ASX', tz: 'Australia/Sydney', sessions: [['10:00', '16:00']] },
  { id: 'TSE', tz: 'Asia/Tokyo', sessions: [['09:00', '11:30'], ['12:30', '15:30']] },
  { id: 'SSE', tz: 'Asia/Shanghai', sessions: [['09:30', '11:30'], ['13:00', '15:00']] },
  { id: 'HKEX', tz: 'Asia/Hong_Kong', sessions: [['09:30', '12:00'], ['13:00', '16:00']] },
  { id: 'NSE', tz: 'Asia/Kolkata', sessions: [['09:15', '15:30']] },
  { id: 'BIST', tz: 'Europe/Istanbul', sessions: [['10:00', '18:00']] },
  { id: 'XETRA', tz: 'Europe/Berlin', sessions: [['09:00', '17:30']] },
  { id: 'LSE', tz: 'Europe/London', sessions: [['08:00', '16:30']] },
  { id: 'NYSE', tz: 'America/New_York', sessions: [['09:30', '16:00']] },
];

// Spot forex trades around the clock from Sunday 17:00 to Friday 17:00, New York time.
export const FOREX = { id: 'FX', tz: 'America/New_York', opens: [0, '17:00'], closes: [5, '17:00'] };

const formatters = new Map();
function wall(t, tz) {
  let f = formatters.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    formatters.set(tz, f);
  }
  const p = {};
  for (const { type, value } of f.formatToParts(new Date(t))) p[type] = Number(value);
  return { y: p.year, mo: p.month, d: p.day, h: p.hour % 24, mi: p.minute, s: p.second };
}

// Offset of a zone at an instant: its wall clock read as if it were UTC, minus the instant.
function offset(t, tz) {
  const w = wall(t, tz);
  return Date.UTC(w.y, w.mo - 1, w.d, w.h, w.mi, w.s) - Math.floor(t / 1000) * 1000;
}

// The instant at which a zone's wall clock shows y-mo-d hh:mm (two passes settle DST edges).
export function zonedTime(y, mo, d, hh, mm, tz) {
  const guess = Date.UTC(y, mo - 1, d, hh, mm);
  const first = guess - offset(guess, tz);
  const second = guess - offset(first, tz);
  return second;
}

const hm = (s) => s.split(':').map(Number);

// The local calendar day `k` days from today in `tz`, with its weekday (0 = Sunday).
function localDay(now, tz, k) {
  const w = wall(now, tz);
  const day = new Date(Date.UTC(w.y, w.mo - 1, w.d + k));
  return { y: day.getUTCFullYear(), mo: day.getUTCMonth() + 1, d: day.getUTCDate(), wd: day.getUTCDay() };
}

// { state: 'open' | 'lunch' | 'closed', next: 'close' | 'lunch' | 'open' | 'reopen', ms } for an exchange.
export function exchangeStatus(ex, now = Date.now()) {
  for (let k = -1; k <= 8; k++) {
    const day = localDay(now, ex.tz, k);
    if (day.wd === 0 || day.wd === 6) continue;
    const spans = ex.sessions.map(([a, b]) => [zonedTime(day.y, day.mo, day.d, ...hm(a), ex.tz), zonedTime(day.y, day.mo, day.d, ...hm(b), ex.tz)]);
    for (let i = 0; i < spans.length; i++) {
      const [start, end] = spans[i];
      if (now >= start && now < end) return { state: 'open', next: i < spans.length - 1 ? 'lunch' : 'close', ms: end - now };
      if (start > now) return i > 0 && now >= spans[i - 1][1]
        ? { state: 'lunch', next: 'reopen', ms: start - now }
        : { state: 'closed', next: 'open', ms: start - now };
    }
  }
  return { state: 'closed', next: 'open', ms: 0 };
}

export function forexStatus(now = Date.now()) {
  const { tz } = FOREX;
  const at = (k, time) => { const day = localDay(now, tz, k); return { wd: day.wd, t: zonedTime(day.y, day.mo, day.d, ...hm(time), tz) }; };
  // Walk forward through the coming week for the next weekly open and close.
  let nextOpen = null; let nextClose = null;
  for (let k = 0; k <= 8 && !(nextOpen && nextClose); k++) {
    const o = at(k, FOREX.opens[1]); const c = at(k, FOREX.closes[1]);
    if (!nextOpen && o.wd === FOREX.opens[0] && o.t > now) nextOpen = o.t;
    if (!nextClose && c.wd === FOREX.closes[0] && c.t > now) nextClose = c.t;
  }
  return nextClose < nextOpen ? { state: 'open', next: 'close', ms: nextClose - now } : { state: 'closed', next: 'open', ms: nextOpen - now };
}
