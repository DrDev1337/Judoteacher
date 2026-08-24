// Kontrollerar id:na i src/videos.js mot YouTube.
//
// För varje ifyllt id kontrolleras två saker:
//   1. att videon finns och är publik (oEmbed svarar 200)
//   2. att den går att bädda in (playableInEmbed i watch-sidans data)
//
// Kör: npm run verify-videos
// Avslutar med kod 1 om något id är trasigt, så att det går att köra i CI.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { VIDEOS } = await import(join(ROOT, 'src', 'videos.js'));

const ids = Object.keys(VIDEOS);
const filled = ids.filter((k) => VIDEOS[k]);
const empty = ids.filter((k) => !VIDEOS[k]);

async function check(key, id) {
  if (!/^[A-Za-z0-9_-]{11}$/.test(id)) {
    return { key, id, ok: false, why: 'id har fel format, ska vara 11 tecken' };
  }

  const oembed = await fetch(
    `https://www.youtube.com/oembed?url=${encodeURIComponent(
      `https://www.youtube.com/watch?v=${id}`
    )}&format=json`
  ).catch(() => null);

  if (!oembed || !oembed.ok) {
    return { key, id, ok: false, why: 'videon finns inte eller är inte publik' };
  }
  const meta = await oembed.json();

  const watch = await fetch(`https://www.youtube.com/watch?v=${id}`, {
    headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'en' },
  }).catch(() => null);

  if (!watch || !watch.ok) {
    return { key, id, ok: false, why: 'kunde inte hämta watch-sidan', title: meta.title };
  }
  const html = await watch.text();

  if (html.includes('"playableInEmbed":false')) {
    return { key, id, ok: false, why: 'inbäddning är avstängd för videon', title: meta.title };
  }
  if (!html.includes('"playableInEmbed":true')) {
    return {
      key,
      id,
      ok: null,
      why: 'kunde inte avgöra inbäddning, testa manuellt',
      title: meta.title,
    };
  }
  return { key, id, ok: true, why: 'går att bädda in', title: meta.title, by: meta.author_name };
}

console.log(`${filled.length} av ${ids.length} tekniker har ett video-id.\n`);

let bad = 0;
for (const key of filled) {
  const r = await check(key, VIDEOS[key]);
  const mark = r.ok === true ? 'OK  ' : r.ok === null ? '??  ' : 'FEL ';
  if (r.ok === false) bad++;
  console.log(`${mark}${key.padEnd(20)} ${r.id}  ${r.why}`);
  if (r.title) console.log(`    ${r.title}${r.by ? '  (' + r.by + ')' : ''}`);
}

if (empty.length) {
  console.log(`\nSaknar id (${empty.length}), appen visar sökläk i stället:`);
  for (const key of empty) console.log(`  - ${key}`);
}

if (bad) {
  console.log(`\n${bad} id fungerar inte. Byt ut dem eller sätt tillbaka null.`);
  process.exit(1);
}
console.log('\nInga trasiga id.');
