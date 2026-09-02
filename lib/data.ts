import type { LocalizedString } from "./i18n";

/* ############ */
/* ### NAV #### */
/* ############ */

export type NavItem = { label: LocalizedString; href: string; comingSoon?: boolean };

export const NAV_ITEMS: NavItem[] = [
  { label: { "pt-br": "Home", en: "Home" }, href: "/" },
  { label: { "pt-br": "Universo", en: "Universe" }, href: "/universe", comingSoon: true },
  { label: { "pt-br": "Jogo", en: "Game" }, href: "/game", comingSoon: true },
  { label: { "pt-br": "Store", en: "Store" }, href: "/store", comingSoon: true },
  { label: { "pt-br": "Galerias", en: "Gallery" }, href: "/gallery", comingSoon: true },
  { label: { "pt-br": "Contato", en: "Contact" }, href: "/contact", comingSoon: false },
  { label: { "pt-br": "Sobre", en: "About" }, href: "/about", comingSoon: false },
];

/* ################# */
/* ### LANGUAGE #### */
/* ################# */

export type Language = { code: string; label: string };

export const LANGUAGES: Language[] = [
  { code: "en", label: "English" },
  { code: "pt-br", label: "Português" },
];

/* ############## */
/* ### HEAD #### */
/* ############## */

export const SITE = {
  name: "O Dominador de Almas",
  nameEn: "The Dominator of Souls",
  title: {
    "pt-br": "O Dominador de Almas",
    en: "The Dominator of Souls",
  } as LocalizedString,
  tagline: {
    "pt-br": "Um universo de aventuras épicas",
    en: "A universe of epic adventures",
  } as LocalizedString,
  symbol: "/symbols/the-dominator-of-souls-separator-symbol.svg",
};

/* ############## */
/* ### FOOTER ### */
/* ############## */

export type Contact = { label: string; href: string };

export const contacts: Contact[] = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100075906499422" },
  { label: "Instagram", href: "https://www.instagram.com/thedominatorofsouls" },
  { label: "X", href: "https://x.com/dominatorofsoul" },
  { label: "Author", href: "https://www.rafaelturse.com" },
];

/* ############## */
/* ### GENRE ### */
/* ############## */

export type Genre = { label: LocalizedString; description: LocalizedString };

export const genres: Genre[] = [
  {
    label: { "pt-br": "Aventura", en: "Adventure" },
    description: {
      "pt-br": "Jornadas que te farão conhecer novos lugares, até mesmo dentro de você",
      en: "Journeys that will lead you to discover new places, even within yourself",
    },
  },
  {
    label: { "pt-br": "RPG", en: "RPG" },
    description: {
      "pt-br": "Classes, progressões, decisões e sistemas complexos aplicados sobre densos enredos",
      en: "Classes, progressions, decisions, and complex systems applied to dense storylines",
    },
  },
  {
    label: { "pt-br": "Romance", en: "Romance" },
    description: {
      "pt-br": "Vínculos eternos que criam laços capazes de atravessar qualquer limite imposto",
      en: "Eternal bonds that create ties capable of crossing any imposed limit",
    },
  },
  {
    label: { "pt-br": "Guerra", en: "War" },
    description: {
      "pt-br": "Conflitos pessoais, políticos e religiosos que impulsionam a roda da história",
      en: "Personal, political, and religious conflicts that drive the wheel of history",
    },
  },
];

/* ############## */
/* ### BOOKS ### */
/* ############## */

export type BookStatus = "published" | "upcoming";
export type Store = { label: LocalizedString; href: string };

export type Book = {
  slug: string;
  title: LocalizedString;
  volumeLabel: LocalizedString;
  series: LocalizedString;
  status: BookStatus;
  release: LocalizedString;
  pageCount?: number;
  synopsis: LocalizedString;
  cover?: LocalizedString;
  stores?: Store[];
};
const SERIES: LocalizedString = {
  "pt-br": "O Dominador de Almas",
  en: "The Dominator of Souls",
};

const UPCOMING_SYNOPSIS: LocalizedString = {
  "pt-br": "Detalhes serão anunciados perto do lançamento.",
  en: "Details will be announced closer to release.",
};

const TBA: LocalizedString = { "pt-br": "A definir", en: "TBA" };

export const books: Book[] = [
  {
    slug: "fragmentados",
    title: {
      "pt-br": "As Memórias de Berdox — Volume 1 — Fragmentados",
      en: "The Memories of Berdox — Volume 1 — Fragmented",
    },
    volumeLabel: { "pt-br": "Volume 1", en: "Volume 1" },
    series: SERIES,
    status: "published",
    release: { "pt-br": "Set-2026", en: "Sep-2026" },
    pageCount: 137,
    synopsis: {
      "pt-br":
        "Enquanto todos vivem suas vidas conforme lhes cabe, grupos secretos agem nas sombras disputando poder e controle dentro de um jogo cuja presença na superfície, do que é então conhecido, serve justamente para encobrir aquilo que deve permanecer oculto...",
      en: "While everyone lives their lives as they see fit, secret groups act in the shadows, fighting for power and control within a game whose presence on the surface — in what is otherwise known — serves precisely to conceal what must remain hidden...",
    },
    cover: {
      "pt-br": "/books/the-memories-of-berdox-vol1-fragmented-cover-pt.jpg",
      en: "/books/the-memories-of-berdox-vol1-fragmented-cover-en.jpg",
    },
    stores: [
      { label: { "pt-br": "Brasil", en: "Brazil" }, href: "https://www.amazon.com.br/dp/B0HHFJ496J" },
      { label: { "pt-br": "Estados Unidos", en: "United States" }, href: "https://www.amazon.com/dp/B0HHFJ496J" },
      { label: { "pt-br": "Canadá", en: "Canada" }, href: "https://www.amazon.ca/dp/B0HHFJ496J" },
      { label: { "pt-br": "México", en: "Mexico" }, href: "https://www.amazon.com.mx/dp/B0HHFJ496J" },
      { label: { "pt-br": "Alemanha", en: "Germany" }, href: "https://www.amazon.de/dp/B0HHFJ496J" },
      { label: { "pt-br": "Espanha", en: "Spain" }, href: "https://www.amazon.es/dp/B0HHFJ496J" },
      { label: { "pt-br": "França", en: "France" }, href: "https://www.amazon.fr/dp/B0HHFJ496J" },
      { label: { "pt-br": "Itália", en: "Italy" }, href: "https://www.amazon.it/dp/B0HHFJ496J" },
      { label: { "pt-br": "Reino Unido", en: "United Kingdom" }, href: "https://www.amazon.co.uk/dp/B0HHFJ496J" },
      { label: { "pt-br": "Holanda", en: "Netherlands" }, href: "https://www.amazon.nl/dp/B0HHFJ496J" },
      { label: { "pt-br": "Polônia", en: "Poland" }, href: "https://www.amazon.pl/dp/B0HHFJ496J" },
      { label: { "pt-br": "Suécia", en: "Sweden" }, href: "https://www.amazon.se/dp/B0HHFJ496J" },
      { label: { "pt-br": "Bélgica", en: "Belgium" }, href: "https://www.amazon.com.be/dp/B0HHFJ496J" },
      { label: { "pt-br": "Turquia", en: "Turkey" }, href: "https://www.amazon.com.tr/dp/B0HHFJ496J" },
      { label: { "pt-br": "Japão", en: "Japan" }, href: "https://www.amazon.co.jp/dp/B0HHFJ496J" },
      { label: { "pt-br": "Índia", en: "India" }, href: "https://www.amazon.in/dp/B0HHFJ496J" },
      { label: { "pt-br": "Austrália", en: "Australia" }, href: "https://www.amazon.com.au/dp/B0HHFJ496J" },
      { label: { "pt-br": "Singapura", en: "Singapore" }, href: "https://www.amazon.sg/dp/B0HHFJ496J" },
      { label: { "pt-br": "Emirados Árabes", en: "United Arab Emirates" }, href: "https://www.amazon.ae/dp/B0HHFJ496J" },
      { label: { "pt-br": "Arábia Saudita", en: "Saudi Arabia" }, href: "https://www.amazon.sa/dp/B0HHFJ496J" },
      { label: { "pt-br": "Egito", en: "Egypt" }, href: "https://www.amazon.eg/dp/B0HHFJ496J" },
    ],
  },
  {
    slug: "volume-2",
    title: { "pt-br": "As Memórias de Berdox — Volume 2", en: "The Memories of Berdox — Volume 2" },
    volumeLabel: { "pt-br": "Volume 2", en: "Volume 2" },
    series: SERIES,
    status: "upcoming",
    release: { "pt-br": "Dez-2026", en: "Dec-2026" },
    synopsis: UPCOMING_SYNOPSIS,
  },
  {
    slug: "volume-3",
    title: { "pt-br": "As Memórias de Berdox — Volume 3", en: "The Memories of Berdox — Volume 3" },
    volumeLabel: { "pt-br": "Volume 3", en: "Volume 3" },
    series: SERIES,
    status: "upcoming",
    release: TBA,
    synopsis: UPCOMING_SYNOPSIS,
  },
  {
    slug: "volume-4",
    title: { "pt-br": "As Memórias de Berdox — Volume 4", en: "The Memories of Berdox — Volume 4" },
    volumeLabel: { "pt-br": "Volume 4", en: "Volume 4" },
    series: SERIES,
    status: "upcoming",
    release: TBA,
    synopsis: UPCOMING_SYNOPSIS,
  },
  {
    slug: "volume-5",
    title: { "pt-br": "As Memórias de Berdox — Volume 5", en: "The Memories of Berdox — Volume 5" },
    volumeLabel: { "pt-br": "Volume 5", en: "Volume 5" },
    series: SERIES,
    status: "upcoming",
    release: TBA,
    synopsis: UPCOMING_SYNOPSIS,
  },
  {
    slug: "volume-6",
    title: { "pt-br": "As Memórias de Berdox — Volume 6", en: "The Memories of Berdox — Volume 6" },
    volumeLabel: { "pt-br": "Volume 6", en: "Volume 6" },
    series: SERIES,
    status: "upcoming",
    release: TBA,
    synopsis: UPCOMING_SYNOPSIS,
  },
  {
    slug: "volume-7",
    title: { "pt-br": "As Memórias de Berdox — Volume 7", en: "The Memories of Berdox — Volume 7" },
    volumeLabel: { "pt-br": "Volume 7", en: "Volume 7" },
    series: SERIES,
    status: "upcoming",
    release: TBA,
    synopsis: UPCOMING_SYNOPSIS,
  },
  {
    slug: "volume-8",
    title: { "pt-br": "As Memórias de Berdox — Volume 8", en: "The Memories of Berdox — Volume 8" },
    volumeLabel: { "pt-br": "Volume 8", en: "Volume 8" },
    series: SERIES,
    status: "upcoming",
    release: TBA,
    synopsis: UPCOMING_SYNOPSIS,
  },
];

/* ############## */
/* ### ABOUT ### */
/* ############## */


export const ABOUT = {
  title: { "pt-br": "Sobre", en: "About" } as LocalizedString,
  heading: { "pt-br": "Nota do Autor", en: "Author's Note" } as LocalizedString,
  subtitle: {
    "pt-br": "Um pequeno vislumbre sobre a obra",
    en: "A small glimpse into the work",
  } as LocalizedString,
  paragraphs: [
    {
      "pt-br":
        "O Dominador de Almas não é somente um livro, mas sim um grande universo fundamentado sobre pilares da inovação, que por sua vez, não teriam outro sustento senão na solidez da tradição.",
      en: "The Dominator of Souls is not just a book, but a vast universe built on pillars of innovation — pillars that could stand on nothing but the solidity of tradition.",
    },
    {
      "pt-br":
        "Os diversos livros que irão compor esta obra, expandirão seus horizontes através do compromisso em criar histórias de enredos robustos e personagens icônicos que, atravessando aventuras épicas, certamente deixarão suas marcas por onde passarem, inclusive nos próprios leitores.",
      en: "The many books that will make up this work will expand its horizons through a commitment to crafting stories with robust plots and iconic characters — characters who, through epic adventures, will surely leave their mark wherever they go, including on the readers themselves.",
    },
    {
      "pt-br":
        "Tudo está sendo moldado para causar um grande impacto em quem se arriscar a se aventurar por essas páginas, que em repouso, anseiam por serem descobertas, a densidade do que está escondido nelas só pode ser consumida verdadeiramente por quem realmente tem ávido espírito de luta! E a estes, desejo que a chama de suas almas queime ainda mais poderosamente, para que assim, possam voar sempre mais alto.",
      en: "Everything is being shaped to leave a lasting impact on whoever dares to venture through these pages — pages that, at rest, long to be discovered. The depth of what lies hidden within them can only truly be grasped by those with an eager fighting spirit! To them, I wish that the flame of their souls burns ever more powerfully, so that they may always fly higher.",
    },
  ] as LocalizedString[],
  signature: { "pt-br": "— O Autor", en: "— The Author" } as LocalizedString,
};
