// Facts taken from yummyceylon.se — language-neutral, shared by both translations.
export const site = {
  name: "Yummy Ceylon",
  address: "Aröds industriväg 28, 417 05 Göteborg",
  // Real location link supplied by the owner (directions to the restaurant).
  mapsUrl:
    "https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=se&sa=X&geocode=KRFHGQIA9U9GMQpQuWS5s1Hu&daddr=Ar%C3%B6ds+Industriv%C3%A4g+28,+417+05+G%C3%B6teborg",
  mapsQuery: "Yummy Ceylon, Aröds Industriväg 28, 417 05 Göteborg",
  email: "info@yummyceylon.se",
  hours: "11:00 – 19:00",
  // Per weekday, 1 = Monday … 7 = Sunday. Days not listed aren't shown.
  openingHours: [
    { day: 1, open: "11:00", close: "19:00" },
    { day: 2, open: "11:00", close: "19:00" },
    { day: 3, open: "11:00", close: "19:00" },
    { day: 4, open: "11:00", close: "19:00" },
    { day: 5, open: "11:00", close: "19:00" },
    { day: 6, open: "11:00", close: "19:00" },
  ],
  timeZone: "Europe/Stockholm",
  lunchHours: "11:00 – 14:00",
  menuUrl: "https://yummyceylon.se/menu/",
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/yummyceylon.se/" },
    { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61565596497818" },
  ],
  buffet: { adult: 119, adultWithDrink: 129, kid: 80, kidWithDrink: 89 },
  // Elfsight "Google Reviews" widget IDs (from the embed code: class="elfsight-app-<ID>").
  // One ID is enough; add a second if you make a Swedish-language widget. Empty = widget off.
  elfsight: { en: "4be328de-a25d-4e8f-854c-7ea99ee04b0f", sv: "" },
  // Snapshot from the Google Maps listing (Oct 2026) — update by hand when it changes.
  google: {
    rating: 4.7,
    count: 139,
    reviewsUrl: "https://www.google.com/maps/search/?api=1&query=Yummy+Ceylon+AB+Sweden+Gothenburg",
  },
};
