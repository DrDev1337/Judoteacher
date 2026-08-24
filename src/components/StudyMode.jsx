import { TECHNIQUES } from '../data/techniques.js';
import { C, R, btn, btnPrimary, card } from '../theme.js';
import { Label, Pill, Bullets, Steps, LinkRow } from './ui.jsx';
import VideoEmbed from './VideoEmbed.jsx';

const STEPS = [
  { key: 'namn', title: 'Namnet' },
  { key: 'funktion', title: 'Så fungerar den' },
  { key: 'stegen', title: 'Stegen' },
  { key: 'misstag', title: 'Vanliga misstag' },
  { key: 'kontroll', title: 'Kontroll' },
];

export const STUDY_STEPS = STEPS.length;

export default function StudyMode({ study, setStudy, mastered, toggleMastered }) {
  const i = Math.min(Math.max(study.i, 0), TECHNIQUES.length - 1);
  const step = Math.min(Math.max(study.step, 0), STEPS.length - 1);
  const t = TECHNIQUES[i];
  const isMastered = mastered.includes(t.id);

  const go = (nextI, nextStep) => {
    setStudy({ i: nextI, step: nextStep });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const next = () => {
    if (step < STEPS.length - 1) go(i, step + 1);
    else if (i < TECHNIQUES.length - 1) go(i + 1, 0);
  };

  const prev = () => {
    if (step > 0) go(i, step - 1);
    else if (i > 0) go(i - 1, STEPS.length - 1);
  };

  const atStart = i === 0 && step === 0;
  const atEnd = i === TECHNIQUES.length - 1 && step === STEPS.length - 1;

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <Label>
            Teknik {i + 1} av {TECHNIQUES.length}
          </Label>
          <Pill tone={t.grade === '6' ? 'neutral' : 'yellow'}>{t.gradeLabel}</Pill>
        </div>

        <h2 style={{ margin: '10px 0 2px', fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em' }}>
          {t.jp}
        </h2>
        <div style={{ fontSize: 15, color: C.dim }}>
          {t.sv} <span style={{ color: C.faint }}>({t.kanji})</span>
        </div>

        <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
          {STEPS.map((s, n) => (
            <button
              key={s.key}
              type="button"
              onClick={() => go(i, n)}
              aria-label={`Gå till steg ${n + 1}, ${s.title}`}
              aria-current={n === step ? 'step' : undefined}
              style={{
                flex: 1,
                height: 6,
                padding: 0,
                borderRadius: R.pill,
                border: 'none',
                cursor: 'pointer',
                background: n === step ? C.yellow : n < step ? C.yellowLine : C.line,
              }}
            />
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 13, fontWeight: 700, color: C.yellow }}>
          Steg {step + 1}: {STEPS[step].title}
        </div>
      </div>

      <div style={{ ...card, display: 'grid', gap: 14 }}>
        {step === 0 && (
          <>
            <div style={{ display: 'grid', gap: 10 }}>
              {t.parts.map(([word, meaning]) => (
                <div
                  key={word}
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'baseline',
                    padding: '10px 12px',
                    borderRadius: R.sm,
                    background: C.panelAlt,
                    border: `1px solid ${C.lineSoft}`,
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 800, color: C.yellow, minWidth: 88 }}>
                    {word}
                  </span>
                  <span style={{ fontSize: 15, color: C.text }}>{meaning}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 14, color: C.dim, lineHeight: 1.6 }}>
              Namnet beskriver tekniken. Kan du orden känner du igen dem i alla andra
              tekniknamn också.
            </div>
            <div>
              <Pill>{t.group}</Pill>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <VideoEmbed technique={t} />
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65 }}>{t.how}</p>
            <LinkRow technique={t} />
          </>
        )}

        {step === 2 && (
          <>
            <Steps items={t.steps} />
            <div style={{ height: 1, background: C.lineSoft }} />
            <Label>Detaljer som gör skillnad</Label>
            <Bullets items={t.tips} marker="→" color={C.yellow} />
          </>
        )}

        {step === 3 && (
          <>
            <Bullets items={t.mistakes} marker="✕" color={C.red} />
            <div
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: C.dim,
                padding: 12,
                borderRadius: R.sm,
                background: C.panelAlt,
                border: `1px solid ${C.lineSoft}`,
              }}
            >
              Gå igenom listan i huvudet nästa gång du övar tekniken. Att veta vad som
              brukar gå fel är halva rättningen.
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.5 }}>{t.check}</div>
            <div style={{ fontSize: 14, color: C.dim, lineHeight: 1.6 }}>
              Svara för dig själv innan du går vidare. Är du säker på tekniken, markera
              den som klar.
            </div>
            <button
              type="button"
              onClick={() => toggleMastered(t.id)}
              style={{
                ...btn,
                width: '100%',
                background: isMastered ? C.greenSoft : C.panelAlt,
                borderColor: isMastered ? 'rgba(74,222,128,0.35)' : C.line,
                color: isMastered ? C.green : C.text,
              }}
            >
              {isMastered ? '✓ Markerad som klar' : 'Jag kan den här tekniken'}
            </button>
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="button"
          onClick={prev}
          disabled={atStart}
          style={{ ...btn, flex: 1, opacity: atStart ? 0.35 : 1 }}
        >
          Föregående
        </button>
        <button
          type="button"
          onClick={next}
          disabled={atEnd}
          style={{ ...btnPrimary, flex: 2, opacity: atEnd ? 0.35 : 1 }}
        >
          {atEnd ? 'Klart' : 'Nästa'}
        </button>
      </div>

      <button
        type="button"
        onClick={() => go(0, 0)}
        style={{
          background: 'none',
          border: 'none',
          color: C.faint,
          fontSize: 13,
          padding: 6,
          cursor: 'pointer',
        }}
      >
        Börja om från teknik 1
      </button>
    </div>
  );
}
