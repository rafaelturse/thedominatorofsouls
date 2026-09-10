export const ROUTES = {
  home: "/",
  community: "/community",
  universe: "/universe",
  game: "/game",
  store: "/store",
  gallery: "/gallery",
  about: "/about",
  bookDetail: (slug: string) => `/books/${slug}#book-details`,
} as const;

export const EXTERNAL_LINKS = {
  authorSite: "https://rafaelturse.com",
  facebook: {
    "pt-br": "https://www.facebook.com/profile.php?id=61592815315141",
    en: "https://www.facebook.com/profile.php?id=100075906499422",
  },
  instagram: {
    "pt-br": "https://www.instagram.com/odominadordealmas/?hl=en",
    en: "https://www.instagram.com/thedominatorofsouls",
  },
  x: {
    "pt-br": "https://x.com/dominadordealma",
    en: "https://x.com/dominatorofsoul",
  },
  whatsapp: {
    "pt-br": "https://whatsapp.com/channel/0029Vb8Vgz4B4hdWGRhHH02t",
    en: "https://whatsapp.com/channel/0029VbD4VjbA2pLG5qaf233a",
  },
  wattpad: "https://www.wattpad.com/user/RafaelTurse",
} as const;