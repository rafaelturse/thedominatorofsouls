export const ROUTES = {
  home: "/",
  universe: "/universe",
  game: "/game",
  store: "/store",
  gallery: "/gallery",
  about: "/about",
  bookDetail: (slug: string) => `/books/${slug}#book-details`,
} as const;

export const EXTERNAL_LINKS = {
  authorSite: "https://rafaelturse.com",
  facebook: "https://www.facebook.com/profile.php?id=100075906499422",
  instagram: "https://www.instagram.com/thedominatorofsouls",
  x: "https://x.com/dominatorofsoul",
} as const;