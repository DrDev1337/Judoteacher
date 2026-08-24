// Tekniker för 6 kyu (gul-vitt) och 5 kyu (gult bälte) enligt
// Svenska Judoförbundets graderingsfordringar (se judoguide.se/graderingar).
//
// Fältförklaring:
//   id        stabil nyckel, används av VIDEOS i src/videos.js och av judoguide-länken
//   jp        japanskt namn
//   sv        svensk översättning
//   kanji     japanska tecken
//   grade     '6' = gul-vitt, '5' = gult bälte
//   family    'nage' = kast, 'ne' = markteknik
//   group     kodokans undergrupp
//   parts     namnet uppdelat ord för ord
//   how       kort förklaring av principen ("Så fungerar den")
//   steps     utförandet i ordning
//   tips      detaljer som gör tekniken bättre
//   mistakes  vanliga fel
//   check     kontrollfråga i studieläget

const guideUrl = (id) =>
  'https://www.judoguide.se/tekniker/' +
  (id.charAt(0).toUpperCase() + id.slice(1)) +
  '/';

const RAW = [
  {
    id: 'o-soto-otoshi',
    jp: 'O-soto-otoshi',
    sv: 'Stor yttre fällning',
    kanji: '大外落',
    grade: '6',
    family: 'nage',
    group: 'Ashi-waza (bentekniker)',
    parts: [
      ['o', 'stor'],
      ['soto', 'yttre'],
      ['otoshi', 'fällning, att tappa ned'],
    ],
    how:
      'Du bryter ukes balans rakt bakåt och sätter ned ditt eget ben som ett hinder utanför ukes ben. Uke faller bakåt över benet. Till skillnad från o-soto-gari sveper du inte bort benet, du placerar ditt ben och fäller uke över det.',
    steps: [
      'Ta ett vanligt grepp, krage och ärm, och gå snett framåt mot ukes högra sida.',
      'Dra ukes högra sida bakåt och uppåt med kragehanden så att vikten hamnar på ukes högra ben.',
      'Ställ ditt vänstra ben stadigt vid sidan av ukes högra fot, det är ditt stödben.',
      'För ditt högra ben bakom ukes högra ben och sätt ned det på mattan, knä mot knä.',
      'Fäll uke bakåt över ditt ben genom att köra kragehanden nedåt bakåt och behålla ärmgreppet.',
      'Följ med ned i balans och behåll ärmgreppet för att kunna fortsätta i markkamp.',
    ],
    tips: [
      'Blicken och bröstet följer med i kastriktningen, titta inte ned på benen.',
      'Kastet går diagonalt bakåt, inte rakt ned i mattan.',
      'Ditt ben ska stå på mattan när uke faller, det är skillnaden mot o-soto-gari.',
    ],
    mistakes: [
      'Att sätta ned benet för långt bort så att uke kan kliva ur.',
      'Att bara trycka med händerna utan att först bryta balansen bakåt.',
      'Att släppa ärmgreppet i fallet, uke landar då okontrollerat.',
    ],
    check: 'Vad är skillnaden mellan o-soto-otoshi och o-soto-gari?',
  },
  {
    id: 'o-uchi-gari',
    jp: 'O-uchi-gari',
    sv: 'Stor inre skörd',
    kanji: '大内刈',
    grade: '6',
    family: 'nage',
    group: 'Ashi-waza (bentekniker)',
    parts: [
      ['o', 'stor'],
      ['uchi', 'inre'],
      ['gari', 'skörd, att meja av'],
    ],
    how:
      'Du hakar ditt ben innanför ukes ben och mejar bort det snett bakåt medan händerna för uke bakåt. Uke tappar sitt bakre stöd och faller på rygg.',
    steps: [
      'Kom nära uke och bryt balansen bakåt så att vikten går ned i ukes hälar.',
      'Kliv in med ditt vänstra ben mellan ukes fötter.',
      'Haka ditt högra ben innanför ukes vänstra ben, vadens insida mot vadens insida.',
      'Meja ukes ben snett bakåt i en båge medan du kör kragehanden bakåt och nedåt.',
      'Fortsätt framåt med kroppen så att uke landar på rygg och du behåller kontrollen.',
    ],
    tips: [
      'Håll bröstet nära uke, avstånd gör att skörden tappar kraft.',
      'Benet sveper i en båge snett bakåt, inte rakt bakåt.',
      'Händerna gör lika mycket arbete som benet.',
    ],
    mistakes: [
      'Att sträcka sig efter benet på för långt avstånd.',
      'Att skörda utan att först ha brutit balansen bakåt.',
      'Att luta sig bakåt själv, då faller du i stället för uke.',
    ],
    check: 'Åt vilket håll ska balansbrytningen (kuzushi) gå i o-uchi-gari?',
  },
  {
    id: 'o-goshi',
    jp: 'O-goshi',
    sv: 'Stort höftkast',
    kanji: '大腰',
    grade: '6',
    family: 'nage',
    group: 'Koshi-waza (höfttekniker)',
    parts: [
      ['o', 'stor'],
      ['goshi', 'höft (koshi)'],
    ],
    how:
      'Du vänder in och sätter din höft lågt framför och under ukes tyngdpunkt. Höften blir en hävstång och uke rullar över den framåt.',
    steps: [
      'Bryt ukes balans framåt uppåt med ärmhanden.',
      'Släpp kragegreppet och för din högra arm runt ukes midja, lågt på ryggen.',
      'Vänd in med två eller tre steg så att du står med ryggen mot uke, fötterna innanför ukes fötter.',
      'Böj knäna så att din höft kommer under ukes tyngdpunkt, ni står tätt mot varandra.',
      'Sträck benen, lyft med höften och dra runt med ärmhanden.',
      'Rulla uke över höften och behåll ärmgreppet hela vägen ned.',
    ],
    tips: [
      'Ingen luft mellan er, kontakten rygg mot mage bär hela kastet.',
      'Kraften kommer från benen, inte från ryggen.',
      'Din höft ska vara bredare än ukes, gå in tillräckligt djupt.',
    ],
    mistakes: [
      'Att gå in med höften för högt, uke sätter sig då bakom dig.',
      'Att böja sig framåt i ryggen i stället för att böja knäna.',
      'Att glömma balansbrytningen och försöka lyfta uke rakt upp.',
    ],
    check: 'Var ska din höft vara i förhållande till ukes tyngdpunkt?',
  },
  {
    id: 'kuzure-kesa-gatame',
    jp: 'Kuzure-kesa-gatame',
    sv: 'Varierat sidohållningsgrepp',
    kanji: '崩袈裟固',
    grade: '6',
    family: 'ne',
    group: 'Osaekomi-waza (hållningsgrepp)',
    parts: [
      ['kuzure', 'varierad, bruten form'],
      ['kesa', 'munkens axelskärp'],
      ['gatame', 'grepp, låsning (katame)'],
    ],
    how:
      'En variant av kesa-gatame. I stället för att hålla om ukes nacke går din arm under ukes axel. Du kontrollerar uke från sidan med bröstet tungt över ukes bröstkorg.',
    steps: [
      'Sitt vid ukes högra sida med höften nära ukes midja.',
      'För din högra arm under ukes högra axel och greppa i axelpartiet eller ta hand mot mattan.',
      'Kläm ukes högra arm mellan din vänstra arm och din sida.',
      'Sprid benen brett, ett framåt och ett bakåt, som en stadig triangel.',
      'Lägg bröstet tungt över ukes bröstkorg och håll huvudet lågt.',
    ],
    tips: [
      'Tyngden ska ligga på uke, inte på dina egna knän.',
      'Brett benställ ger stabilitet åt båda hållen.',
      'Titta mot ukes fötter, det håller ditt huvud lågt.',
    ],
    mistakes: [
      'Att sitta upp högt, då blir det lätt för uke att rulla dig.',
      'Att ha benen samlade, du tappar balansen vid första bryggan.',
      'Att glömma klämma ukes arm, uke kan då vända mot dig.',
    ],
    check: 'Vad skiljer kuzure-kesa-gatame från vanlig kesa-gatame?',
  },
  {
    id: 'mune-gatame',
    jp: 'Mune-gatame',
    sv: 'Bröstgrepp',
    kanji: '胸固',
    grade: '6',
    family: 'ne',
    group: 'Osaekomi-waza (hållningsgrepp)',
    parts: [
      ['mune', 'bröst'],
      ['gatame', 'grepp, låsning (katame)'],
    ],
    how:
      'Du ligger tvärs över ukes bröstkorg med bröst mot bröst och kontrollerar ukes ena arm och huvud. Greppet räknas som en variant i familjen yoko-shiho-gatame och används ofta som övergång dit.',
    steps: [
      'Ta position vid ukes sida, vinkelrätt mot uke.',
      'Lägg bröstet tvärs över ukes bröstkorg, bröst mot bröst.',
      'För ena armen under ukes nacke, den andra under ukes närmsta arm.',
      'Knyt ihop greppet så att ukes arm och huvud sitter fast som ett paket.',
      'Sprid benen brett med tårna i mattan och tryck tyngden framåt in i uke.',
    ],
    tips: [
      'Höften ska vara låg, nästan i mattan.',
      'Håll ukes arm intill dig, den armen är ukes viktigaste försvar.',
      'Följ med i sidled när uke bryggar, flytta fötterna i stället för att spänna emot.',
    ],
    mistakes: [
      'Att ligga för högt upp mot ukes huvud, du tappar tyngden.',
      'Att lämna glapp mellan brösten så att uke får in armen.',
      'Att stödja med knäna i mattan i stället för att belasta uke.',
    ],
    check: 'Vilken kroppsdel av dig ska ligga mot ukes bröstkorg?',
  },
  {
    id: 'ko-soto-gari',
    jp: 'Ko-soto-gari',
    sv: 'Liten yttre skörd',
    kanji: '小外刈',
    grade: '5',
    family: 'nage',
    group: 'Ashi-waza (bentekniker)',
    parts: [
      ['ko', 'liten'],
      ['soto', 'yttre'],
      ['gari', 'skörd, att meja av'],
    ],
    how:
      'Du sveper bort ukes fot utifrån, från utsidan av hälen, i samma ögonblick som ukes vikt går ned i just den foten. Ett litet kast som helt bygger på rätt timing.',
    steps: [
      'Styr uke i sidled eller bakåt så att vikten samlas på ukes ena fot.',
      'Kliv ut vid sidan av den belastade foten.',
      'Sätt din fotsula mot utsidan av ukes häl.',
      'Skörda foten i ukes rörelseriktning, snett bakåt.',
      'Kör samtidigt händerna nedåt bakåt och följ ned uke i kontroll.',
    ],
    tips: [
      'Timing före kraft, foten ska bort precis när uke belastar den.',
      'Sopa med hela fotsulan, inte med tårna.',
      'Håll din egen balans över ditt stödben.',
    ],
    mistakes: [
      'Att sparka på ukes ben i stället för att sopa bort foten.',
      'Att skörda för tidigt, innan vikten hunnit ned i foten.',
      'Att luta sig bakåt och dra ned sig själv i fallet.',
    ],
    check: 'Vad avgör om ko-soto-gari fungerar, kraft eller timing?',
  },
  {
    id: 'ko-uchi-gari',
    jp: 'Ko-uchi-gari',
    sv: 'Liten inre skörd',
    kanji: '小内刈',
    grade: '5',
    family: 'nage',
    group: 'Ashi-waza (bentekniker)',
    parts: [
      ['ko', 'liten'],
      ['uchi', 'inre'],
      ['gari', 'skörd, att meja av'],
    ],
    how:
      'Du sveper bort ukes fot inifrån, i riktning rakt bakåt eller snett bakåt. Ukes ben glider undan och uke sätter sig bakåt. Fungerar mycket bra i kombination med o-uchi-gari och seoi-nage.',
    steps: [
      'Bryt ukes balans bakåt så att vikten går ned i ukes högra häl.',
      'Kliv in nära med ditt vänstra ben.',
      'Sätt din högra fotsula mot insidan av ukes högra häl.',
      'Sopa foten rakt bakåt i ukes rörelseriktning, som att sopa golvet.',
      'Kör händerna nedåt bakåt och följ med uke ned i markkamp.',
    ],
    tips: [
      'Sopet går längs mattan, lyft inte benet högt.',
      'Skörda den fot som uke just belastar.',
      'Kombinera direkt vidare om uke tar sig ur, ko-uchi-gari öppnar ofta för nästa kast.',
    ],
    mistakes: [
      'Att sopa den obelastade foten, ingenting händer då.',
      'Att stå för långt bort och nå med tårna.',
      'Att glömma händerna, benet ensamt fäller ingen.',
    ],
    check: 'Från vilket håll kommer sopet i ko-uchi-gari, inifrån eller utifrån?',
  },
  {
    id: 'hiza-guruma',
    jp: 'Hiza-guruma',
    sv: 'Knähjul',
    kanji: '膝車',
    grade: '5',
    family: 'nage',
    group: 'Ashi-waza (bentekniker)',
    parts: [
      ['hiza', 'knä'],
      ['guruma', 'hjul (kuruma)'],
    ],
    how:
      'Du blockerar ukes knä med din fotsula och roterar uke runt den punkten som ett hjul runt sitt nav. Ukes överkropp fortsätter framåt medan benet står stilla.',
    steps: [
      'Bryt ukes balans snett framåt så att uke tar ett steg.',
      'Kliv ut åt sidan med ditt stödben, tyngden på det benet.',
      'Sätt din fotsula mot utsidan av ukes knä, strax under knäskålen.',
      'Rotera med händerna, ärmhanden uppåt runt och kragehanden nedåt.',
      'Fortsätt rotationen så att uke faller framåt runt blockeringen.',
    ],
    tips: [
      'Foten blockerar, den sparkar inte.',
      'Rotationen kommer från händerna och överkroppen, som att vrida ett ratt.',
      'Ditt stödben ska vara böjt och stabilt, håll balansen.',
    ],
    mistakes: [
      'Att sätta foten för högt på låret eller för lågt på vaden.',
      'Att trycka rakt framåt i stället för att rotera.',
      'Att stå med rak rygg och stel överkropp, då uteblir hjulrörelsen.',
    ],
    check: 'Var på ukes ben placeras din fot i hiza-guruma?',
  },
  {
    id: 'eri-seoi-nage',
    jp: 'Eri-seoi-nage',
    sv: 'Kragskulderkast',
    kanji: '襟背負投',
    grade: '5',
    family: 'nage',
    group: 'Te-waza (handtekniker)',
    parts: [
      ['eri', 'krage, slag'],
      ['seoi', 'att bära på ryggen'],
      ['nage', 'kast'],
    ],
    how:
      'En variant av seoi-nage där du greppar ukes krage i stället för att gå in med armen under ukes armhåla. Du vänder in under uke, laddar uke på ryggen och kastar framåt över axeln.',
    steps: [
      'Bryt ukes balans framåt uppåt med ärmhanden.',
      'Byt din högra hand till ett grepp i ukes krage, tummen inåt, armbågen nära din kropp.',
      'Vänd in med snabba steg så att du står med ryggen mot uke, knäna böjda.',
      'Dra in uke tätt mot din rygg med båda händerna, ukes bröst mot din rygg.',
      'Sträck benen, lyft och rotera framåt så att uke går över din axel.',
      'Behåll ärmgreppet så att uke landar kontrollerat.',
    ],
    tips: [
      'Armbågen på kragehanden hålls under ukes arm, inte utanför.',
      'Håll ryggen rak och lyft med benen.',
      'Vändningen ska vara snabb, kastet lever på farten.',
    ],
    mistakes: [
      'Att gå in för grunt så att uke hamnar bakom dig.',
      'Att böja sig framåt tidigt, då dras du ned framåt.',
      'Att släppa ärmgreppet i kastet, uke tappar kontrollen i landningen.',
    ],
    check: 'Vad skiljer eri-seoi-nage från morote-seoi-nage?',
  },
  {
    id: 'koshi-guruma',
    jp: 'Koshi-guruma',
    sv: 'Höfthjul',
    kanji: '腰車',
    grade: '5',
    family: 'nage',
    group: 'Koshi-waza (höfttekniker)',
    parts: [
      ['koshi', 'höft'],
      ['guruma', 'hjul (kuruma)'],
    ],
    how:
      'Som o-goshi, men du håller om ukes nacke i stället för om midjan. Uke roterar runt din höft som ett hjul runt sitt nav. Nackgreppet gör att ukes överkropp följer med tidigt.',
    steps: [
      'Bryt ukes balans framåt.',
      'För din högra arm runt ukes nacke och dra ned ukes huvud mot din axel.',
      'Vänd in med ryggen mot uke, höften lågt och tvärs framför ukes höft.',
      'Håll ukes bröst tätt mot din rygg, ingen luft emellan.',
      'Sträck benen och rotera, uke hjulas över din höft.',
      'Behåll ärmgreppet ned i landningen.',
    ],
    tips: [
      'Höften ska ligga tvärs över ukes höftlinje, inte snett.',
      'Nackgreppet drar, det stryper inte.',
      'Böj knäna djupt, kraften kommer nedifrån.',
    ],
    mistakes: [
      'Att dra i huvudet utan att sätta höften på plats.',
      'Att gå in med höften för högt eller för smalt.',
      'Att räta på benen innan uke är laddad på höften.',
    ],
    check: 'Vad är den stora skillnaden mellan koshi-guruma och o-goshi?',
  },
  {
    id: 'kami-shiho-gatame',
    jp: 'Kami-shiho-gatame',
    sv: 'Övre fyrpunktsgrepp',
    kanji: '上四方固',
    grade: '5',
    family: 'ne',
    group: 'Osaekomi-waza (hållningsgrepp)',
    parts: [
      ['kami', 'övre'],
      ['shiho', 'fyra sidor, fyra riktningar'],
      ['gatame', 'grepp, låsning (katame)'],
    ],
    how:
      'Du kontrollerar uke uppifrån ukes huvud. Båda dina armar går ned längs ukes sidor och greppar bältet eller jackans nedre kant. Din bröstkorg ligger tungt över ukes bröst.',
    steps: [
      'Placera dig ovanför ukes huvud, vänd mot ukes fötter.',
      'För båda armarna under ukes axlar, längs sidorna.',
      'Greppa ukes bälte eller jackans nedre kant på båda sidor.',
      'Lägg bröstet mot ukes bröst och pressa ukes axlar mot mattan.',
      'Sprid benen brett åt sidorna eller sitt på tårna, håll höften låg.',
    ],
    tips: [
      'Håll armbågarna nära ukes kropp så att uke inte får in dem som spak.',
      'Flytta fötterna i sidled när uke bryggar, gå med rörelsen.',
      'Huvudet lågt, gärna vänt åt sidan intill ukes bröstben.',
    ],
    mistakes: [
      'Att ha knäna nära ukes axlar, uke kan då hitta utrymme att vända.',
      'Att sitta upp och tappa bröstkontakten.',
      'Att lämna armbågarna vida, uke skapar då plats att rulla ut.',
    ],
    check: 'Var greppar dina händer i kami-shiho-gatame?',
  },
  {
    id: 'tate-shiho-gatame',
    jp: 'Tate-shiho-gatame',
    sv: 'Ridande fyrpunktsgrepp',
    kanji: '縦四方固',
    grade: '5',
    family: 'ne',
    group: 'Osaekomi-waza (hållningsgrepp)',
    parts: [
      ['tate', 'lodrät, ridande'],
      ['shiho', 'fyra sidor, fyra riktningar'],
      ['gatame', 'grepp, låsning (katame)'],
    ],
    how:
      'Du sitter grensle över uke, längs ukes kropp, och kontrollerar huvud och en arm. Benen hakas runt ukes lår så att uke inte kan vrida sig ut.',
    steps: [
      'Ta position grensle över ukes mage, vänd mot ukes huvud.',
      'Haka dina fötter innanför eller runt ukes lår.',
      'För ena armen under ukes nacke och kontrollera huvudet.',
      'Kläm ukes ena arm mot ditt huvud eller din axel.',
      'Lägg tyngden framåt över ukes bröst och håll höften låg.',
    ],
    tips: [
      'Låg tyngdpunkt, sitt inte upprätt.',
      'Fötterna aktiva och hakade, det är de som stoppar ukes vridning.',
      'Kontrollera minst en av ukes armar, annars får uke fäste.',
    ],
    mistakes: [
      'Att sitta högt och rakt upp, du blir lätt att välta.',
      'Att låta fötterna ligga löst på mattan.',
      'Att lämna båda ukes armar fria.',
    ],
    check: 'Vad gör dina ben i tate-shiho-gatame?',
  },
];

export const TECHNIQUES = RAW.map((t) => ({
  ...t,
  gradeLabel: t.grade === '6' ? 'Gul-vitt, 6 kyu' : 'Gult, 5 kyu',
  familyLabel: t.family === 'nage' ? 'Kast' : 'Markteknik',
  guide: guideUrl(t.id),
  search:
    'https://www.youtube.com/results?search_query=' +
    encodeURIComponent('judo ' + t.jp),
}));

export const BY_ID = Object.fromEntries(TECHNIQUES.map((t) => [t.id, t]));
