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
 *
 * Platshållaren visar YouTubes förhandsbild, så att man ser vilken teknik
 * det är utan att spela upp något. Bilden är några tiotal kilobyte mot
 * spelarens dryga halva megabyte, och laddas lazy så att bara de rutor man
 * faktiskt rullar fram hämtas. Går bilden inte att hämta faller rutan
 * tillbaka på enbart namn och play-knapp.
 *
 * Saknas ett id i VIDEOS visas i stället sökläkken till YouTube.
 */
export default function VideoEmbed({ technique, compact = false }) {
  const [playing, setPlaying] = useState(false);
  const [thumbBroken, setThumbBroken] = useState(false);
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
        {!thumbBroken && (
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            onError={() => setThumbBroken(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
        {!thumbBroken && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(13,17,30,0.85) 0%, rgba(13,17,30,0.35) 45%, rgba(13,17,30,0.15) 100%)',
            }}
          />
        )}
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
          <span
            style={{
              fontSize: compact ? 14 : 15,
              fontWeight: 700,
              color: C.white,
              textShadow: '0 1px 6px rgba(0,0,0,0.7)',
            }}
          >
            {technique.jp}
          </span>
          <span
            style={{
              fontSize: 12,
              color: thumbBroken ? C.faint : 'rgba(255,255,255,0.82)',
              textShadow: thumbBroken ? 'none' : '0 1px 5px rgba(0,0,0,0.7)',
            }}
          >
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
