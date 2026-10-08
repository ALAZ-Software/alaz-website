// The site's own three-glyph icon set, drawn to sit next to Archivo 900.
// arrow = internal link (→), external = leaves the site (↗), down = scroll hint,
// left = back, check = selected, plus/close = open and close.
const PATHS = {
  arrow: 'M4 12h15M13 6l6 6-6 6',
  external: 'M7 17 17 7M8 7h9v9',
  down: 'M12 4v15M6 13l6 6 6-6',
  left: 'M20 12H5M11 6l-6 6 6 6',
  check: 'm5 12 5 5 9-10',
  plus: 'M12 5v14M5 12h14',
  close: 'M6 6l12 12M18 6 6 18',
};

export default function Icon({ name = 'arrow', size = 16, strokeWidth = 2.2, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={`flex-none ${className}`} aria-hidden="true" focusable="false">
      <path d={PATHS[name] ?? PATHS.arrow} />
    </svg>
  );
}
