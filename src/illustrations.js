// Illustration per teknik, eller null.
//
// Två sorters värden fungerar:
//
//   1. En lokal fil som du lagt i public/illustrations/:
//        'o-goshi': 'illustrations/o-goshi.jpg'
//      Sökvägen är relativ till appens bas, så den fungerar både i roten
//      och under /Judoteacher/ på GitHub Pages.
//
//   2. En fullständig URL till en bild på en annan sajt:
//        'o-goshi': 'https://example.org/bilder/o-goshi.jpg'
//      Observera att bilden då hämtas från den sajten varje gång någon
//      öppnar tekniken, på deras bandbredd, och slutar fungera om de
//      flyttar filen.
//
// UPPHOVSRÄTT: lägg bara in bilder du har rätt att använda. Egna foton,
// egna teckningar, eller bilder du fått tillstånd att publicera. Bilder
// från judoguide.se och liknande sajter är deras, och att kopiera eller
// hotlänka dem kräver deras tillstånd. Varje teknik länkar redan dit.
//
// Saknas bild visas ingenting, och layouten ser ut som förut.
export const ILLUSTRATIONS = {
  'o-soto-otoshi': null,
  'o-uchi-gari': null,
  'o-goshi': null,
  'kuzure-kesa-gatame': null,
  'mune-gatame': null,
  'ko-soto-gari': null,
  'ko-uchi-gari': null,
  'hiza-guruma': null,
  'eri-seoi-nage': null,
  'koshi-guruma': null,
  'kami-shiho-gatame': null,
  'tate-shiho-gatame': null,
};

// Bildtext per teknik, valfri. Bra ställe att ange fotograf eller källa.
export const CREDITS = {};
