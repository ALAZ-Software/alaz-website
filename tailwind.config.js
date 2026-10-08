/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}'],
  future: {
    // Hover styles only on devices that can hover: touch never gets a stuck hover state.
    hoverOnlyWhenSupported: true,
  },
  theme: {
    // Desktop-first breakpoints: the site is designed at 1440 and collapses downwards.
    screens: {
      wide: { min: '1681px' },
      laptop: { max: '1200px' },
      tablet: { max: '1000px' },
      mobile: { max: '760px' },
      xs: { max: '470px' },
    },
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        ink: 'var(--ink)',
        surface: 'var(--surface-1)',
        'surface-2': 'var(--surface-2)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        fg: 'var(--fg-1)',
        'fg-2': 'var(--fg-2)',
        'fg-3': 'var(--fg-3)',
        'fg-4': 'var(--fg-4)',
        // Legacy aliases still used by a few utilities.
        mute: 'var(--fg-3)',
        dim: 'var(--fg-4)',
        ember: 'var(--ember)',
        'ember-soft': 'var(--ember-soft)',
        'ember-hot': 'var(--ember-hot)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        inout: 'var(--ease-inout)',
      },
      transitionDuration: {
        fast: '200ms',
        base: '600ms',
      },
    },
  },
  plugins: [],
};
