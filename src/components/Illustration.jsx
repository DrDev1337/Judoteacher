import { useState } from 'react';
import { ILLUSTRATIONS, CREDITS } from '../illustrations.js';
import { C, R } from '../theme.js';

// Löser en lokal sökväg mot appens bas, men lämnar fullständiga URL:er ifred.
function resolve(src) {
  if (/^https?:\/\//i.test(src) || src.startsWith('data:')) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`;
}

/**
 * Teknikillustration. Renderar ingenting alls när tekniken saknar bild, och
 * försvinner tyst om bilden inte går att hämta, så att en trasig sökväg
 * aldrig lämnar ett hål i sidan.
 */
export default function Illustration({ technique }) {
  const [broken, setBroken] = useState(false);
  const src = ILLUSTRATIONS[technique.id];
  if (!src || broken) return null;

  const credit = CREDITS[technique.id];

  return (
    <figure style={{ margin: 0 }}>
      <img
        src={resolve(src)}
        alt={`Illustration av ${technique.jp}, ${technique.sv.toLowerCase()}`}
        loading="lazy"
        decoding="async"
        onError={() => setBroken(true)}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          borderRadius: R.md,
          border: `1px solid ${C.line}`,
          background: C.panelAlt,
        }}
      />
      {credit && (
        <figcaption style={{ fontSize: 12, color: C.faint, marginTop: 7, lineHeight: 1.5 }}>
          {credit}
        </figcaption>
      )}
    </figure>
  );
}
