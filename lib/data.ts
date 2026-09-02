/* ############ */
/* ### NAV #### */
/* ############ */

export type NavItem = { label: string; href: string; comingSoon?: boolean };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Universo", href: "/universe", comingSoon: true },
  { label: "Jogo", href: "/game", comingSoon: true },
  { label: "Loja", href: "/store", comingSoon: true },
  { label: "Galeria", href: "/gallery", comingSoon: true },
  { label: "Autor", href: "/author", comingSoon: true },
  { label: "Contato", href: "/contact", comingSoon: false },
  { label: "Sobre", href: "/about", comingSoon: true },
];

/* ################# */
/* ### LANGUAGE #### */
/* ################# */

export type Language = { code: string; label: string };

export const LANGUAGES: Language[] = [
  { code: "pt-br", label: "PT-BR" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
];

/* ############## */
/* ### HEAD #### */
/* ############## */

export const SITE = {
  name: "O Dominador de Almas",
  nameEn: "Um universo de aventuras épicas",
  tagline: "Um imenso universo forjado por aventuras épicas",
  symbol: "/symbols/the-dominator-of-souls-separator-symbol.svg",
};

/* ############## */
/* ### GENRE ### */
/* ############## */

export type Genre = { label: string; description: string };

export const genres: Genre[] = [
  { label: "Aventura", description: "Jornadas que te farão conhecer novos lugares, até mesmo dentro de você" },
  { label: "RPG", description: "Classes, progressões, decisões e sistemas complexos aplicados sobre enredos densos" },
  { label: "Romance", description: "Vínculos eternos que criam laços capazes de atravessar qualquer limite" },
  { label: "Guerra", description: "Conflitos pessoais, políticos e religiosos que impulsionam a roda da história" },
];

/* ############## */
/* ### BOOKS ### */
/* ############## */

export type BookStatus = "published" | "upcoming";
export type Store = { label: string; href: string };

export type Book = {
  slug: string;
  title: string;
  series: string;
  status: BookStatus;
  release: string;
  pageCount?: number;
  synopsis: string;
  cover?: string;
  stores?: Store[];
};

export const books: Book[] = [
  {
    slug: "fragmentados",
    title: "As Memórias de Berdox — Volume 1 — Fragmentados",
    series: "O Dominador de Almas",
    status: "published",
    release: "Set-2026",
    pageCount: 137,
    synopsis:
      "Enquanto todos vivem suas vidas conforme lhes cabe, grupos secretos agem nas sombras disputando poder e controle dentro de um jogo cuja presença na superfície, do que é então conhecido, serve justamente para encobrir aquilo que deve permanecer oculto... ",
    cover: "/books/the-memories-of-berdox-vol1-fragmented-cover-pt.jpg",
    stores: [
      { label: "Brasil", href: "https://www.amazon.com.br/dp/B0HHFJ496J" },
      { label: "Estados Unidos", href: "https://www.amazon.com/dp/B0HHFJ496J" },
      { label: "Canadá", href: "https://www.amazon.ca/dp/B0HHFJ496J" },
      { label: "México", href: "https://www.amazon.com.mx/dp/B0HHFJ496J" },
      { label: "Alemanha", href: "https://www.amazon.de/dp/B0HHFJ496J" },
      { label: "Espanha", href: "https://www.amazon.es/dp/B0HHFJ496J" },
      { label: "França", href: "https://www.amazon.fr/dp/B0HHFJ496J" },
      { label: "Itália", href: "https://www.amazon.it/dp/B0HHFJ496J" },
      { label: "Reino Unido", href: "https://www.amazon.co.uk/dp/B0HHFJ496J" },
      { label: "Holanda", href: "https://www.amazon.nl/dp/B0HHFJ496J" },
      { label: "Polônia", href: "https://www.amazon.pl/dp/B0HHFJ496J" },
      { label: "Suécia", href: "https://www.amazon.se/dp/B0HHFJ496J" },
      { label: "Bélgica", href: "https://www.amazon.com.be/dp/B0HHFJ496J" },
      { label: "Turquia", href: "https://www.amazon.com.tr/dp/B0HHFJ496J" },
      { label: "Japão", href: "https://www.amazon.co.jp/dp/B0HHFJ496J" },
      { label: "Índia", href: "https://www.amazon.in/dp/B0HHFJ496J" },
      { label: "Austrália", href: "https://www.amazon.com.au/dp/B0HHFJ496J" },
      { label: "Singapura", href: "https://www.amazon.sg/dp/B0HHFJ496J" },
      { label: "Emirados Árabes", href: "https://www.amazon.ae/dp/B0HHFJ496J" },
      { label: "Arábia Saudita", href: "https://www.amazon.sa/dp/B0HHFJ496J" },
      { label: "Egito", href: "https://www.amazon.eg/dp/B0HHFJ496J" },
    ],
  },
  {
    slug: "volume-2",
    title: "As Memórias de Berdox — Volume 2",
    series: "O Dominador de Almas",
    status: "upcoming",
    release: "Dez-2026",
    synopsis: "Detalhes serão anunciados perto do lançamento.",
  },
  {
    slug: "volume-3",
    title: "As Memórias de Berdox — Volume 3",
    series: "O Dominador de Almas",
    status: "upcoming",
    release: "A definir",
    synopsis: "Detalhes serão anunciados perto do lançamento.",
  },
  {
    slug: "volume-4",
    title: "As Memórias de Berdox — Volume 4",
    series: "O Dominador de Almas",
    status: "upcoming",
    release: "A definir",
    synopsis: "Detalhes serão anunciados perto do lançamento.",
  },
  {
    slug: "volume-5",
    title: "As Memórias de Berdox — Volume 5",
    series: "O Dominador de Almas",
    status: "upcoming",
    release: "A definir",
    synopsis: "Detalhes serão anunciados perto do lançamento.",
  },
  {
    slug: "volume-6",
    title: "As Memórias de Berdox — Volume 6",
    series: "O Dominador de Almas",
    status: "upcoming",
    release: "A definir",
    synopsis: "Detalhes serão anunciados perto do lançamento.",
  },
  {
    slug: "volume-7",
    title: "As Memórias de Berdox — Volume 7",
    series: "O Dominador de Almas",
    status: "upcoming",
    release: "A definir",
    synopsis: "Detalhes serão anunciados perto do lançamento.",
  },
  {
    slug: "volume-8",
    title: "As Memórias de Berdox — Volume 8",
    series: "O Dominador de Almas",
    status: "upcoming",
    release: "A definir",
    synopsis: "Detalhes serão anunciados perto do lançamento.",
  },
];

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