// Featured Google reviews. Copy real reviews from the Google Maps listing here, word for word
// (keep the original language). Cards appear automatically; with an empty list only the rating summary shows.
//
// Example:
// { author: "Anna S.", rating: 5, text: "Best kottu in Göteborg!", date: "2026-09" },

export type Review = {
  author: string;
  rating: number;
  text: string;
  date?: string;
};

export const reviews: Review[] = [];
