// Kandidatvideor per teknik, framsökta men INTE verifierade.
//
// Den här filen är bara råmaterial till scripts/pick-videos.mjs. Inget id
// härifrån hamnar i src/videos.js utan att först ha kontrollerats mot
// YouTube: att videon finns, är publik och tillåter inbäddning.
//
// Ordningen är prioritetsordning. Först i varje lista ligger videor ur en
// sammanhängande demoserie som täcker kyu-graderna, därefter övriga
// instruktionsvideor. Lägg gärna till egna id överst i en lista.
export const CANDIDATES = {
  'o-soto-otoshi': [
    ['CYH7zR_yqq4', 'Osoto-otoshi, Demo'],
    ['6l21bOXyJ3o', 'Judo, Osoto-otoshi'],
    ['N-7F-po7ULE', 'Judo basics tutorial: Osoto-otoshi'],
    ['Qw9Ubzn15Gk', 'O Soto Otoshi, Judo'],
    ['76rGbNBNwzU', 'O Soto Otoshi (técnicas do judô)'],
  ],
  'o-uchi-gari': [
    ['A6-lTECSR3c', 'Ouchi-gari, Demo'],
    ['I3BWf1ZoIuc', 'Ouchi-gari, basic principles'],
    ['mdil4t_oFR8', 'Judo, O-uchi-gari demonstrated by Kosei Inoue'],
    ['j-CZwLBdqjk', 'How to do Ouchi Gari (major inner reap)'],
    ['WpjFuOnayeM', 'Basic O Uchi Gari demonstration, 4 directions'],
  ],
  'o-goshi': [
    ['Mwz5At87OxE', 'O-goshi, Demo'],
    ['64DMmlZZ1pk', 'O Goshi, major hip throw'],
    ['SzvNadh7zMs', 'O Goshi judo throw tutorial, yellow belt'],
    ['xBX37KpLg-I', 'Technique Tuesday, O-Goshi'],
    ['Fv9ZR9V1l1Q', 'O Goshi, large hip throw 2.0'],
  ],
  'kuzure-kesa-gatame': [
    ['GcAh8oFd1PI', 'Kuzure-kesa-gatame, Demo'],
    ['B8TfODeMBiw', 'How to do Kuzure-Kesa-Gatame'],
    ['6ggYO18mwJE', 'Judo básico, Kuzure Kesa Gatame'],
    ['ehVhmQqXjlM', 'Kuzure Kesa Gatame, variation of scarf hold 2.0'],
    ['9LwgMBBFmR0', 'Kuzure-Kesa-Gatame tips'],
  ],
  'mune-gatame': [
    ['lIt5vywPBF0', 'Mune-gatame, Demo'],
    ['sHszeDpg20Y', 'Mune Gatame'],
    ['61v6kUYT84U', 'No gi judo, Mune Gatame (chest hold)'],
    ['Pz5t--7Rvpk', 'Mune Gatame, an in-depth look'],
    ['MSBKvF4r340', 'Mune Gatame and Yoko Shiho Gatame'],
  ],
  'ko-soto-gari': [
    ['T3rSf8CcHg4', 'Kosoto-gari, Demo'],
    ['yYcufUMAlMU', 'Ko Soto Gari, 100 techniques du judo'],
    ['FMSTkwOMhHs', 'Ko Soto Gari, Judo'],
    ['M4zbLZSVT2Q', 'Ko-soto-gari and combinations'],
  ],
  'ko-uchi-gari': [
    ['5E20xuzaXNw', 'Kouchi-gari, Demo'],
    ['V2OSlIelCCo', 'Ko Uchi Gari, minor inner reap'],
    ['pcOUSRzuFbs', 'How to do Kouchi-Gari'],
    ['wptYR7hYw7Q', 'Ko-Uchi-Gari, small inner reap'],
  ],
  'hiza-guruma': [
    ['a1RZvytW3OI', 'Hiza-guruma, Demo'],
    ['t1jVrUAJp4o', 'Hiza Guruma, knee wheel'],
    ['YBjuTiovVCQ', 'Hiza Guruma, Judo'],
    ['Er0etPfyjdM', 'Hiza-Guruma, knee wheel'],
    ['97WMrPZN9U4', 'Judo lesson 4, Hiza Guruma'],
  ],
  'eri-seoi-nage': [
    ['Uu5tW20Yy3I', 'Judo Art: Eri Seoi Nage'],
    ['xHHPJOQW9GA', 'Judo básico, Eri Seoi Nage em 4 direções'],
    ['vOpRNSg1O14', 'Eri Seoi Nage'],
    ['Td8loYWxk2k', 'Eri Seoi Nage'],
    ['yjpECT3pRSU', 'Nomenclature judo, te waza: Eri Seoi Nage'],
  ],
  'koshi-guruma': [
    ['psG_Xx8NiIA', 'Koshi-guruma, Demo'],
    ['2-5vEDYfNU4', 'Koshi Guruma, hip wheel'],
    ['iKI6diFMi34', 'Koshi-Guruma, hip wheel'],
    ['R8Hdiaavqmg', 'Koshi Guruma, judo hip wheel'],
    ['dlVHpC8VMkg', 'Koshi Guruma, hip wheel 2.0'],
  ],
  'kami-shiho-gatame': [
    ['2evEh7OBnBg', 'Kami-shiho-gatame, Demo'],
    ['TsJcz6M4eLg', 'Kami Shiho Gatame, upper four corner hold'],
    ['zy_0XpBpDbY', 'How to do Kami-Shiho-Gatame'],
    ['ZYmR3HUOsKA', 'Kami-Shiho-Gatame, top four corners hold'],
    ['K99wpre6wbE', 'No gi judo, Kami Shiho Gatame'],
  ],
  'tate-shiho-gatame': [
    ['XjWzNxlKH1M', 'Tate-shiho-gatame, Demo'],
    ['_BL7xDMpJCg', 'How to do Tate-Shiho-Gatame'],
    ['P7YTvS0ADr8', 'Judo vertical hold, Tate shiho gatame'],
    ['HgZpUWO5hV0', 'Tate Shiho Gatame'],
    ['UCx1Pvvemo0', 'Judo: Tate Shiho Gatame and escapes'],
  ],
};
