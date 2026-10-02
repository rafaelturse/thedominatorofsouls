import type { LocalizedString } from "./i18n";

export type BlogPost = {
  slug: string;
  date: LocalizedString;
  category: LocalizedString;
  title: LocalizedString;
  excerpt: LocalizedString;
  cover: string;
  tags: LocalizedString[];
  readingTimeMinutes: number;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "novo-modelo-de-capas",
    date: { "pt-br": "Out-01-2026", en: "Oct-01-2026" },
    category: { "pt-br": "Design", en: "Design" },
    title: { "pt-br": "Novo Modelo de Capas", en: "New Cover Design System" },
    excerpt: {
      "pt-br":
        "Um novo modelo de capas foi desenvolvido para a série — agora cada capa é estilizada conforme o subtítulo de seu respectivo livro, dando identidade visual própria a cada volume.",
      en:
        "A new cover design system was developed for the series — now each cover is styled according to its book's subtitle, giving its own visual identity to every volume.",
    },
    cover: "/img/books/the-memories-of-berdox-vol2-the-hunt-cover-en.jpg",
    tags: [
      { "pt-br": "Design", en: "Design" },
      { "pt-br": "Capas", en: "Covers" },
    ],
    readingTimeMinutes: 2,
  },
  {
    slug: "o-prologo-chega-ao-publico",
    date: { "pt-br": "Set-14-2026", en: "Sep-14-2026" },
    category: { "pt-br": "Lançamento", en: "Release" },
    title: { "pt-br": "O Prólogo Chega ao Público", en: "The Prologue Goes Public" },
    excerpt: {
      "pt-br":
        "O site e o Wattpad ganharam o prólogo de Fragmentados como amostra gratuita — agora qualquer leitor pode mergulhar nas primeiras páginas antes mesmo de decidir comprar o livro completo.",
      en:
        "The site and Wattpad received the prologue of Fragmented as a free sample — now any reader can dive into the opening pages before deciding to pick up the full book.",
    },
    cover: "/img/books/the-memories-of-berdox-vol1-fragmented-cover-en.jpg",
    tags: [
      { "pt-br": "Amostra", en: "Sample" },
      { "pt-br": "Wattpad", en: "Wattpad" },
    ],
    readingTimeMinutes: 3,
  },
  {
    slug: "forjando-e-dando-vida",
    date: { "pt-br": "2019 — 2026", en: "2019 — 2026" },
    category: { "pt-br": "Bastidores", en: "Behind the Scenes" },
    title: { "pt-br": "Forjando e Dando Vida", en: "Forging and Bringing to Life" },
    excerpt: {
      "pt-br":
        "Sete anos de trabalho paralelo deram forma a um universo inteiro — mundos, raças, mitologias, e o nascimento da saga As Memórias de Berdox.",
      en:
        "Seven years of work gave shape to an entire universe — worlds, races, mythologies, and the birth of the Memories of Berdox saga.",
    },
    cover: "/img/books/the-memories-of-berdox-vol1-fragmented-cover-en.jpg",
    tags: [
      { "pt-br": "Worldbuilding", en: "Worldbuilding" },
      { "pt-br": "Processo Criativo", en: "Creative Process" },
    ],
    readingTimeMinutes: 6,
  },
];