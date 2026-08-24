// Väljer ut en inbäddningsbar video per teknik och skriver src/videos.js.
//
// Kandidaterna i scripts/video-candidates.js är framsökta men overifierade.
// Det här skriptet provar dem i tur och ordning mot YouTube och tar det
// första id som klarar alla tre kraven:
//   1. videon finns och är publik (oEmbed svarar 200)
//   2. inbäddning är tillåten ("playableInEmbed":true på watch-sidan)
//   3. id:t har giltigt format
// Klarar ingen kandidat kraven blir tekniken null, och appen visar sökläkken.
//
// Kör: npm run pick-videos
// Flaggor:
//   --keep    rör inte tekniker som redan har ett id i src/videos.js
//   --dry     skriv ingenting, visa bara vad som skulle väljas
//
// Kräver nätåtkomst till youtube.com. Skriptet vägrar skriva om det inte
// fick ett enda svar därifrån, så en blockerad brandvägg kan inte råka
// nolla en fungerande videolista.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { CANDIDATES } from './video-candidates.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TARGET = join(ROOT, 'src', 'videos.js');
const args = new Set(process.argv.slice(2));
const KEEP = args.has('--keep');
const DRY = args.has('--dry');

const { VIDEOS: CURRENT } = await import(TARGET);

// Bara 200 och 404 räknas som bevis på att vi faktiskt nådde YouTube. En
// proxy eller brandvägg svarar typiskt 403 eller 407, och det får inte
// misstas för "videon finns inte".
let reachedYouTube = false;
const reached = (status) => {
  if (status === 200 || status === 404) reachedYouTube = true;
};

async function probe(id) {
  if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return { ok: false, why: 'ogiltigt id-format' };

  let meta;
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        `https://www.youtube.com/watch?v=${id}`
      )}&format=json`
    );
    reached(res.status);
    if (!res.ok) return { ok: false, why: `finns inte eller är privat (${res.status})` };
    meta = await res.json();
  } catch (e) {
    return { ok: false, why: `nätfel: ${e.message}` };
  }

  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${id}`, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'en' },
    });
    reached(res.status);
    if (!res.ok) return { ok: false, why: `watch-sidan svarade ${res.status}` };
    const html = await res.text();
    if (html.includes('"playableInEmbed":false')) {
      return { ok: false, why: 'inbäddning avstängd' };
    }
    if (!html.includes('"playableInEmbed":true')) {
      return { ok: false, why: 'kunde inte avgöra inbäddning' };
    }
  } catch (e) {
    return { ok: false, why: `nätfel: ${e.message}` };
  }

  return { ok: true, title: meta.title, by: meta.author_name };
}

const chosen = {};
for (const [key, list] of Object.entries(CANDIDATES)) {
  if (KEEP && CURRENT[key]) {
    chosen[key] = CURRENT[key];
    console.log(`= ${key}\n    behåller ${CURRENT[key]}`);
    continue;
  }

  chosen[key] = null;
  console.log(`\n${key}`);
  for (const [id, label] of list) {
    const r = await probe(id);
    if (r.ok) {
      chosen[key] = id;
      console.log(`  OK  ${id}  ${r.title}${r.by ? '  (' + r.by + ')' : ''}`);
      break;
    }
    console.log(`  --  ${id}  ${label}: ${r.why}`);
  }
  if (!chosen[key]) console.log('  ingen kandidat klarade kraven, blir null');
}

const hits = Object.values(chosen).filter(Boolean).length;

if (!reachedYouTube) {
  console.error(
    '\nNådde aldrig youtube.com, bara fel från nätet eller en proxy.\n' +
      'Skriver ingenting, så en blockerad brandvägg kan inte nolla listan.\n' +
      'Kontrollera nätåtkomsten och kör igen.'
  );
  process.exit(1);
}

if (hits === 0) {
  console.error(
    '\nIngen enda kandidat gick att bädda in. Det är osannolikt och tyder\n' +
      'på ett problem med körningen snarare än med videorna. Skriver ingenting.'
  );
  process.exit(1);
}

const header = readFileSync(TARGET, 'utf8').split('export const VIDEOS')[0];
const body = Object.keys(CANDIDATES)
  .map((k) => `  ${JSON.stringify(k)}: ${chosen[k] ? JSON.stringify(chosen[k]) : 'null'},`)
  .join('\n');
const out = `${header}export const VIDEOS = {\n${body}\n};\n`;

console.log(`\n${hits} av ${Object.keys(CANDIDATES).length} tekniker fick en verifierad video.`);

if (DRY) {
  console.log('--dry angavs, src/videos.js lämnas orörd.');
} else {
  writeFileSync(TARGET, out);
  console.log('Skrev src/videos.js. Titta igenom titlarna ovan innan du committar.');
}
