import { C, R, label } from '../theme.js';
import { VIDEOS } from '../videos.js';

export function Label({ children, style }) {
  return <div style={{ ...label, ...style }}>{children}</div>;
}

export function Pill({ children, tone = 'neutral', style }) {
  const tones = {
    neutral: { bg: C.panelAlt, fg: C.dim, bd: C.line },
    yellow: { bg: C.yellowSoft, fg: C.yellow, bd: C.yellowLine },
    green: { bg: C.greenSoft, fg: C.green, bd: 'rgba(74,222,128,0.35)' },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        padding: '4px 9px',
        borderRadius: R.pill,
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.bd}`,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function Chip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: 'inherit',
        fontSize: 13,
        fontWeight: 600,
        padding: '8px 14px',
        borderRadius: R.pill,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        border: `1px solid ${active ? C.yellowLine : C.line}`,
        background: active ? C.yellowSoft : 'transparent',
        color: active ? C.yellow : C.dim,
      }}
    >
      {children}
    </button>
  );
}

export function LinkRow({ technique }) {
  const video = VIDEOS[technique.id];
  const linkStyle = {
    flex: '1 1 140px',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 600,
    textDecoration: 'none',
    padding: '11px 12px',
    borderRadius: R.md,
    border: `1px solid ${C.line}`,
    background: C.panelAlt,
    color: C.text,
  };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <a href={technique.guide} target="_blank" rel="noopener noreferrer" style={linkStyle}>
        judoguide.se ↗
      </a>
      {video && (
        <a
          href={`https://www.youtube.com/watch?v=${video}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...linkStyle,
            color: C.yellow,
            borderColor: C.yellowLine,
            background: C.yellowSoft,
          }}
        >
          YouTube ↗
        </a>
      )}
    </div>
  );
}

export function Bullets({ items, marker = '•', color = C.dim }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 9 }}>
      {items.map((it, n) => (
        <li key={n} style={{ display: 'flex', gap: 10, fontSize: 15, lineHeight: 1.55, color: C.text }}>
          <span style={{ color, flexShrink: 0, fontWeight: 700 }}>{marker}</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function Steps({ items }) {
  return (
    <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
      {items.map((it, n) => (
        <li key={n} style={{ display: 'flex', gap: 12, fontSize: 15, lineHeight: 1.55 }}>
          <span
            style={{
              flexShrink: 0,
              width: 24,
              height: 24,
              borderRadius: R.pill,
              background: C.yellowSoft,
              border: `1px solid ${C.yellowLine}`,
              color: C.yellow,
              fontSize: 12,
              fontWeight: 800,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {n + 1}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}
