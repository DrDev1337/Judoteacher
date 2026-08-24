import { useState } from 'react';
import { VIDEOS } from '../videos.js';
import { C, R } from '../theme.js';

// 16:9-ruta som alltid reserverar sin plats i layouten, så att inbäddningen
// aldrig orsakar hopp i sidan (ingen layout shift).
const frame = {
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  borderRadius: R.md,
  overflow: 'hidden',
  background: C.panelAlt,
  border: `1px solid ${C.line}`,
};

function PlayIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" fill="#1a1400" />
    </svg>
  );
}

/**
 * Klick för att ladda: iframen skapas först när användaren trycker på
 * platshållaren, så att mobildata inte går åt i onödan.
 * Saknas ett id i VIDEOS visas i stället sökläkken till YouTube.
 */
export default function VideoEmbed({ technique, compact = false }) {
  const [playing, setPlaying] = useState(false);
  const id = VIDEOS[technique.id];

  if (!id) {
    return (
      <div style={{ ...frame, display: 'grid', placeItems: 'center', padding: 16 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: C.dim, marginBottom: 10, lineHeight: 1.5 }}>
            Ingen inbäddad video är inlagd för {technique.jp} ännu.
          </div>
          <a
            href={technique.search}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              fontSize: 14,
              fontWeight: 600,
              color: C.yellow,
              textDecoration: 'none',
              padding: '10px 14px',
              borderRadius: R.md,
              border: `1px solid ${C.yellowLine}`,
              background: C.yellowSoft,
            }}
          >
            Se video ↗
          </a>
        </div>
      </div>
    );
  }

  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Spela video: ${technique.jp}`}
        style={{
          ...frame,
          display: 'block',
          padding: 0,
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          <span
            style={{
              width: 56,
              height: 56,
              borderRadius: R.pill,
              background: C.yellow,
              display: 'grid',
              placeItems: 'center',
              paddingLeft: 3,
              boxShadow: '0 6px 22px rgba(0,0,0,0.45)',
            }}
          >
            <PlayIcon />
          </span>
          <span style={{ fontSize: compact ? 14 : 15, fontWeight: 700, color: C.text }}>
            {technique.jp}
          </span>
          <span style={{ fontSize: 12, color: C.faint }}>
            Tryck för att ladda videon
          </span>
        </span>
      </button>
    );
  }

  return (
    <div style={frame}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1&playsinline=1`}
        title={technique.jp}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
      />
    </div>
  );
}
