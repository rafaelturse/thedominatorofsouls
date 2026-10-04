import type { LocalizedString } from "./i18n";

export type BlogPost = {
  slug: string;
  date: LocalizedString;
  category: LocalizedString;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString[];
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
    content: [
      {
        "pt-br": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        "pt-br": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        en: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        "pt-br": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        en: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
    ],
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
    content: [
      {
        "pt-br": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        "pt-br": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        en: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        "pt-br": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        en: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
    ],
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
    content: [
      {
        "pt-br": "Ao longo de sete anos de trabalho paralelo, foram desenvolvidas toneladas de linhas descrevendo todo o universo de The Dominator of Souls — seus mundos, cenários, fauna, flora, mecanismos de classes, tempo, energia, poderes, raças, espécies, mitologias, planetas, reinos, domínios, regiões, países, cidades, sociedades, povos, personagens, motivações, itens, armas e armaduras, jogos de tabuleiro, jogos de cartas e até mesmo este website!",
        en: "Over seven years of parallel work, countless lines were written describing the entire universe of The Dominator of Souls — its worlds, settings, fauna, flora, class mechanics, time, energy, powers, races, species, mythologies, planets, kingdoms, domains, regions, countries, cities, societies, peoples, characters, motivations, items, weapons and armor, board games, card games, and even this very website!",
      },
      {
        "pt-br": "O que deveria ser o universo de um único livro se tornou uma plataforma completíssima, pronta para receber todo tipo de história possível!",
        en: "What was meant to be the universe of a single book became a full-fledged platform, ready to hold every kind of story imaginable!",
      },
      {
        "pt-br": "Com a base preparada, a imaginação então tomou asas, e as primeiras histórias começaram a ser projetadas — tudo esquematizado para que houvesse conexões entre todas elas. Dessa forma, uma infinidade de conteúdo foi escrita e distribuída corretamente, até que tudo fizesse sentido! Com essa grande massa em mãos, comecei então um ciclo de aprimoramento e passei a confeccionar os livros, dando início à saga As Memórias de Berdox, que até então é uma série planejada para ser contada em 6 livros!",
        en: "With the foundation in place, imagination took flight, and the first stories began to be shaped — everything mapped out so that connections would run between them all. In this way, an immense amount of content was written and carefully arranged until everything made sense! With that body of work in hand, I began a cycle of refinement and started crafting the books themselves, giving rise to the saga The Memories of Berdox, which is currently planned to span 6 books!",
      },
    ],
  },
];