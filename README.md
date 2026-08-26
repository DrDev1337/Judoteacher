# JudoStudy

Studieapp för de tolv tekniker som krävs för gul-vitt bälte (6 kyu) och gult
bälte (5 kyu) enligt Svenska Judoförbundets graderingsfordringar.

Mobilanpassad, helt utan backend. All progress ligger i webbläsarens
`localStorage`. Gränssnittet är på svenska.

Flikar: **Studera** (guidat steg för steg), **Tekniker** (lista med detaljer),
**Flashcards**, **Quiz** och **Ordlista**.

## Kom igång

```bash
npm install
npm run dev      # utvecklingsserver på http://localhost:5173
npm run build    # produktionsbygge till dist/
npm run preview  # servera dist/ lokalt
```

Node 18 eller senare.

## Projektstruktur

```
index.html
.github/workflows/
  deploy.yml              bygger och publicerar till GitHub Pages
assets/icon.svg           källa till appikonen
public/
  .nojekyll               hindrar GitHub Pages från att köra Jekyll
  manifest.json           PWA-manifest
  sw.js                   service worker, cachar bara appens eget skal
  icons/                  färdiggenererade ikoner
scripts/
  generate-icons.mjs      renderar om ikonerna från assets/icon.svg
  video-candidates.js     framsökta kandidatvideor, overifierade
  pick-videos.mjs         provar kandidaterna och skriver src/videos.js
  verify-videos.mjs       kontrollerar video-id mot YouTube
src/
  illustrations.js        egna teknikbilder, tomt från början
  main.jsx                startpunkt, registrerar service workern
  App.jsx                 skal, flikar, progress
  theme.js                designtokens
  storage.js              localStorage
  videos.js               kopplingen teknik till YouTube-id
  data/techniques.js      de tolv teknikerna
  data/glossary.js        ordlistan
  components/
    StudyMode.jsx TechniqueList.jsx Flashcards.jsx Quiz.jsx
    Glossary.jsx VideoEmbed.jsx Illustration.jsx ui.jsx
```

## Sparad progress

Allt ligger under nyckeln `judo-gult-v1` i `localStorage`:

```json
{
  "mastered": ["o-goshi", "o-uchi-gari"],
  "best": 8,
  "study": { "i": 3, "step": 2 }
}
```

`mastered` är de tekniker som markerats som klara, `best` är bästa
quizresultatet och `study` är var i studieläget man var senast. Läsning och
skrivning är synkron och inslagen i `try/catch`, Safari i privat läge kastar
annars när man skriver.

Vill du nollställa: töm webbplatsens data i webbläsaren, eller kör
`localStorage.removeItem('judo-gult-v1')` i konsolen.

## Fylla i videor

`src/videos.js` mappar varje teknik till ett YouTube-id. **Alla tolv är i
dagsläget `null`**, eftersom miljön appen byggdes i inte når YouTube och inget
id därför har kunnat verifieras. Appen fungerar ändå: en teknik utan id visar
en sökläk till YouTube i stället för en inbäddad spelare.

### Snabbaste vägen: låt skriptet välja

`scripts/video-candidates.js` innehåller fem till sex framsökta kandidater per
teknik. Överst ligger Kodokans officiella serie **KODOKAN x IJF ACADEMY 100
Techniques**, som finns för elva av de tolv teknikerna, därefter en
sammanhängande demoserie och sedan övriga instruktionsvideor. Kandidaterna är
**inte** verifierade. Kör:

```bash
npm run pick-videos
```

Skriptet provar kandidaterna i tur och ordning och skriver in det första id som
klarar alla tre kraven: videon finns, är publik och tillåter inbäddning. Övriga
blir `null`. Det skriver ut titel och kanal för varje vald video, så titta
igenom listan innan du committar, ett id kan vara tekniskt giltigt men ändå
vara en dålig demonstration.

```bash
npm run pick-videos -- --dry    # visa bara vad som skulle väljas
npm run pick-videos -- --keep   # rör inte tekniker som redan har ett id
```

Skriptet vägrar skriva om det inte fick ett enda riktigt svar från YouTube, så
en blockerad brandvägg kan inte råka nolla en fungerande lista. Vill du styra
valet själv, till exempel använda de videor din klubb eller Svenska
Judoförbundet länkar, lägger du in det id:t överst i teknikens lista i
`scripts/video-candidates.js`.

Två tekniker är inte egna tekniker bland Kodokans 100: `mune-gatame` räknas som
en variant i familjen yoko-shiho-gatame, och `eri-seoi-nage` är en greppvariant
av seoi-nage. För dem ligger teknikspecifika videor först, eftersom rätt teknik
väger tyngre än rätt källa, och den närmaste officiella sist i listan.

### Fylla i för hand

1. Leta upp en bra demonstrationsvideo. Använd helst Kodokans officiella kanal
   (KODOKANJUDOInstitute), till exempel serien **KODOKAN x IJF ACADEMY 100
   Techniques**, eller en annan seriös instruktionskanal som ett nationsförbund
   eller en välkänd instruktör.
2. Ta id:t ur adressen. I `https://www.youtube.com/watch?v=AbCdEfGhIjK` är id:t
   `AbCdEfGhIjK`, elva tecken.
3. Kontrollera att videon går att bädda in. Vissa kanaler stänger av det. Öppna
   `https://www.youtube-nocookie.com/embed/<id>` direkt i webbläsaren, spelas
   den där fungerar den i appen.
4. Skriv in id:t i `src/videos.js`.
5. Kör kontrollen:

   ```bash
   npm run verify-videos
   ```

   Skriptet kollar varje ifyllt id mot YouTube: att videon finns och är publik,
   och att inbäddning är tillåten. Det listar också vilka tekniker som saknar
   id. Avslutskod 1 om något id är trasigt, så det går att köra i CI.

Kan du inte verifiera en bra inbäddningsbar video: låt den vara `null`. Gissa
aldrig ett id, en trasig inbäddning är sämre än sökläkken.

Notera att `mune-gatame` ibland ligger under varianter av
`kuzure-yoko-shiho-gatame`, välj den demonstration som ligger närmast.

### Förhandsbild och dataåtgång

Rutan visar YouTubes förhandsbild (`i.ytimg.com/vi/<id>/hqdefault.jpg`) så att
man ser vilken teknik det är utan att spela upp något. Bilden är några tiotal
kilobyte mot spelarens dryga halva megabyte, och laddas `lazy`, så bara de
rutor man faktiskt rullar fram hämtas. Går bilden inte att hämta faller rutan
tillbaka på enbart namn och play-knapp, utan trasig bildikon.

Själva spelaren laddas fortfarande först vid tryck. Innan dess görs alltså ett
bildanrop per synlig ruta, men inget anrop till spelaren. Rutan är alltid 16:9
och tar sin plats direkt, så varken bilden eller inbäddningen orsakar hopp i
layouten.

## Illustrationer

Varje teknik kan ha en egen bild, som visas under videon både i Studera steg 2
och i Tekniker. Alla tolv är `null` från början, och då renderas ingenting.

Lägg till en bild i två steg:

1. Lägg filen i `public/illustrations/`, till exempel `o-goshi.jpg`.
2. Peka ut den i `src/illustrations.js`:

   ```js
   'o-goshi': 'illustrations/o-goshi.jpg',
   ```

Sökvägen är relativ till appens bas, så den fungerar både i roten och under
`/Judoteacher/`. En fullständig `https://`-adress fungerar också, men då hämtas
bilden från den sajten varje gång någon öppnar tekniken, på deras bandbredd,
och slutar fungera om de flyttar filen.

Vill du ange fotograf eller källa fyller du i `CREDITS` i samma fil, texten
visas som bildtext under bilden.

Går bilden inte att hämta försvinner den tyst, så en felstavad sökväg lämnar
inget hål i sidan. Alt-texten skrivs automatiskt från teknikens namn.

Liggande format passar bäst, bilden visas i full bredd utan beskärning. Håll
filerna små, appen används mest på mobil.

**Upphovsrätt:** lägg bara in bilder du har rätt att använda, egna foton, egna
teckningar, eller bilder du fått tillstånd att publicera. Illustrationerna på
judoguide.se är deras, och varken kopiering eller hotlänkning är fri att göra
utan att fråga dem. Varje teknik länkar dit i stället.

## Ikoner

De färdiga ikonerna ligger incheckade i `public/icons`. Ändrar du
`assets/icon.svg` renderar du om dem med:

```bash
npm run icons
```

Skriptet använder en lokal Chrome eller Chromium. Hittas ingen automatiskt,
peka ut den med `CHROME_PATH=/sökväg/till/chrome npm run icons`.

## Lägg till på hemskärmen (iOS)

Öppna sajten i Safari, tryck på dela och välj **Lägg till på hemskärmen**.
Appen startar då i helskärm utan Safaris adressfält, med bältesikonen och mörk
statusrad. Manifestet anger `display: standalone` och `theme_color` `#0d111e`.

Service workern cachar bara appens egna filer så att den startar utan nät. Vid
installationen läser den ut de hashade filnamnen under `assets/` ur
`index.html`, så precachen träffar rätt bygge. Allt som ligger på annan domän,
YouTube inräknat, går alltid direkt till nätet och hamnar aldrig i cachen.

## Deploy

Bygget är sökvägsoberoende. `vite.config.js` sätter `base: './'` och manifest,
service worker och ikoner refereras relativt, så samma `dist` fungerar i roten
på en domän, under en underkatalog som `/Judoteacher/` och på en egen domän.
Du behöver inte ändra någon sökväg när du byter värd.

### GitHub Pages

`.github/workflows/deploy.yml` bygger och publicerar automatiskt.

1. Gå till **Settings, Pages** i repot och sätt **Source** till
   **GitHub Actions**. Det är den inställning workflowen förutsätter.
2. Pusha till `main`, eller kör workflowen manuellt under fliken **Actions**
   med **Run workflow**.
3. Sajten hamnar på `https://<användare>.github.io/<repo>/`, alltså
   `https://drdev1337.github.io/Judoteacher/` för det här repot.

Workflowen kör `npm ci` och `npm run build` på Node 20 och laddar upp `dist`.
Den triggar på push till `main` och går även att köra manuellt.
`public/.nojekyll` följer med i bygget så att Pages inte kör innehållet genom
Jekyll.

Publiceringen sker från `main`. Miljön `github-pages` släpper bara igenom de
grenar som står under **Settings, Environments, github-pages**, så en deploy
från en utvecklingsgren avvisas innan jobbet startar.

Sätter du en egen domän under **Settings, Pages** fungerar bygget som det är,
eftersom sökvägarna är relativa.

### Vercel

Repot innehåller också en `vercel.json` med SPA-rewrite och cache-headers.

1. Gå till [vercel.com/new](https://vercel.com/new) och importera repot.
2. Vercel känner igen Vite av sig självt. Kontrollera annars:
   Framework Preset `Vite`, Build Command `npm run build`, Output Directory
   `dist`.
3. Tryck **Deploy**. Inga miljövariabler behövs.

Eller via CLI:

```bash
npm i -g vercel
vercel          # förhandsversion
vercel --prod   # skarpt
```

## Innehåll och upphovsrätt

Teknikbeskrivningarna är skrivna för den här appen. Illustrationer och de
officiella stegen finns hos [judoguide.se](https://www.judoguide.se/), dit
länkar varje teknik. Inga bilder därifrån kopieras eller hotlänkas.

Videor bäddas in från YouTube via `youtube-nocookie.com` och spelas upp från
YouTube, de laddas inte ned eller lagras.
