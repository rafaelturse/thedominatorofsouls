import type { LocalizedString } from "./i18n";

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
  fullSynopsisHeading?: LocalizedString;
  fullSynopsis?: LocalizedString[];
  cover?: LocalizedString;
  stores?: Store[];
  openingChapterTitle?: LocalizedString;
  openingChapter?: LocalizedString[];
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
    pageCount: 139,
    synopsis: {
      "pt-br":
        "Enquanto todos vivem suas vidas conforme lhes cabe, grupos secretos agem nas sombras disputando poder e controle dentro de um jogo cuja presença na superfície, do que é então conhecido, serve justamente para encobrir aquilo que deve permanecer oculto...",
      en: "While everyone lives their lives as they see fit, secret groups act in the shadows, fighting for power and control within a game whose presence on the surface — in what is otherwise known — serves precisely to conceal what must remain hidden...",
    },
    fullSynopsisHeading: {
      "pt-br": "Um Pequeno Vislumbre Sobre a Obra",
      en: "A Small Glimpse Into the Work",
    },
    fullSynopsis: [
      {
        "pt-br":
          "O Dominador de Almas não é somente um livro, mas sim um imenso universo fundamentado sobre pilares da inovação, que por sua vez, não teriam outro sustento senão a própria solidez da tradição.",
        en: "The Dominator of Souls is not just a book, but an immense universe built on pillars of innovation — pillars that could have no other foundation than the very solidity of tradition.",
      },
      {
        "pt-br":
          "Os diversos livros que irão compor esta obra, expandirão seus horizontes através do compromisso em criar histórias de enredos robustos e personagens icônicos que, atravessando aventuras épicas, certamente deixarão suas marcas por onde passarem, inclusive nos próprios leitores.",
        en: "The many books that will make up this work will expand its horizons through a commitment to crafting stories with robust plots and iconic characters — characters who, through epic adventures, will surely leave their mark wherever they go, including on the readers themselves.",
      },
      {
        "pt-br":
          "Tudo está sendo moldado para causar um grande impacto em quem se arriscar a se aventurar por essas páginas, que em repouso, anseiam por serem descobertas, assim, a densidade do que está escondido nelas só pode ser consumida verdadeiramente por quem realmente tem ávido espírito de luta! E a estes, desejo que a chama ardente de suas almas queime ainda mais poderosamente, para que então, possam voar sempre mais alto.",
        en: "Everything is being shaped to leave a lasting impact on whoever dares to venture through these pages — pages that, at rest, long to be discovered. And so, the depth of what lies hidden within them can only truly be grasped by those with an eager fighting spirit! To them, I wish that the burning flame of their souls burns ever more powerfully, so that they may always fly higher.",
      },
      {
        "pt-br":
          "Enquanto todos vivem suas vidas conforme lhes cabe, grupos secretos agem nas sombras disputando poder e controle dentro de um jogo cuja presença na superfície, do que é então conhecido, serve justamente para encobrir aquilo que deve permanecer oculto.",
        en: "While everyone lives their lives as they see fit, secret groups act in the shadows, fighting for power and control within a game whose presence on the surface — in what is otherwise known — serves precisely to conceal what must remain hidden.",
      },
      {
        "pt-br":
          "Prelúdio do Épico",
        en: "Prelude to the Epic",
      },
      {
        "pt-br":
          "Prelúdio do Épico - Suas ações, contudo, não podem mais ser simplesmente contidas como antigamente foram, à medida que os rancores aumentam, acordos estão sendo desfeitos e novas leis estão sendo escritas, os costumes já não são o suficiente... as novas gerações trazem consigo a iminência de mudanças que desafiam a ordem dos antigos e o equilíbrio vigente do mundo, entretanto, quando é que a civilização esteve realmente estável? Os livros escritos pela humanidade contam somente as histórias que convêm serem contadas, contudo, a pureza da verdade não tem nascente em nenhum deles, nenhuma de suas incontáveis páginas é realmente sincera ou lúcida sobre o que realmente aconteceu, e o que alguns mais seletos desejam conhecer, está registrado apenas nas Memórias de Berdox.",
        en: "Their actions, however, can no longer simply be contained as they once were. As grudges deepen, agreements are unraveling, and new laws are being written, old customs are no longer enough... the new generations carry with them the imminence of changes that challenge the order of the old and the prevailing balance of the world — and yet, when has civilization ever truly been stable? The books written by humanity tell only the stories that are convenient to tell, yet the purity of truth springs from none of them; not a single one of their countless pages is truly honest or lucid about what actually happened. And what only a select few wish to know is recorded solely in the Memories of Berdox.",
      },
    ],
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