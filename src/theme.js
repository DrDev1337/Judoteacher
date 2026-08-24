// Design tokens. Dark indigo surface with belt yellow as the single accent.
export const C = {
  bg: '#0d111e',
  panel: '#151b2e',
  panelAlt: '#1b2239',
  line: '#26304d',
  lineSoft: '#1f2740',
  text: '#e8ecf7',
  dim: '#97a1bd',
  faint: '#6b769a',
  yellow: '#f5c518',
  yellowSoft: 'rgba(245, 197, 24, 0.14)',
  yellowLine: 'rgba(245, 197, 24, 0.38)',
  green: '#4ade80',
  greenSoft: 'rgba(74, 222, 128, 0.14)',
  red: '#f87171',
  redSoft: 'rgba(248, 113, 113, 0.14)',
  white: '#ffffff',
};

export const R = { sm: 8, md: 12, lg: 16, pill: 999 };

export const F = {
  stack:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
};

export const card = {
  background: C.panel,
  border: `1px solid ${C.line}`,
  borderRadius: R.md,
  padding: 16,
};

export const btn = {
  fontFamily: 'inherit',
  fontSize: 15,
  fontWeight: 600,
  padding: '12px 16px',
  borderRadius: R.md,
  border: `1px solid ${C.line}`,
  background: C.panelAlt,
  color: C.text,
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
};

export const btnPrimary = {
  ...btn,
  background: C.yellow,
  borderColor: C.yellow,
  color: '#1a1400',
};

export const btnGhost = {
  ...btn,
  background: 'transparent',
};

export const label = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: C.faint,
};
