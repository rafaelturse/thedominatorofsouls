import type { LocalizedString, Locale } from "./i18n";

export type BookFormat = "hardcover" | "paperback" | "ebook" | "audiobook";
export type BookStatus = "published" | "upcoming";
export type Store = { label: LocalizedString; href: LocalizedString };

export type Book = {
  slug: string;
  title: LocalizedString;
  volumeLabel: LocalizedString;
  series: LocalizedString;
  status: BookStatus;
  release: LocalizedString;
  pageCount?: Record<Locale, number>;
  formats?: BookFormat[];
  genres?: LocalizedString[];
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
    pageCount: { "pt-br": 145, en: 143 },
    formats: ["ebook", "paperback", "hardcover", "audiobook"],
    genres: [
      { "pt-br": "Fantasia Épica", en: "Epic Fantasy" },
      { "pt-br": "Ficção Fantástica", en: "Fantasy Fiction" },
      { "pt-br": "Aventura", en: "Adventure" }
    ],
    synopsis: {
      "pt-br":
        "Em uma mansão isolada na costa inglesa, um garoto testemunha o pior pesadelo que uma criança pode viver — e sobrevive apenas para carregar, para sempre, a marca de uma promessa sussurrada por algo que não deveria existir...",
      en: "In an isolated mansion on the English coast, a boy witnesses the worst nightmare a child can live through — and survives only to carry, forever, the mark of a promise whispered by something that should not exist...",
    },
    fullSynopsisHeading: {
      "pt-br": "Uma noite tempestuosa que mudou tudo...",
      en: "A stormy night that changed everything...",
    },
    fullSynopsis: [
      {
        "pt-br":
          "Em uma mansão isolada na costa inglesa, um garoto testemunha o pior pesadelo que uma criança pode viver — e sobrevive apenas para carregar, para sempre, a marca de uma promessa sussurrada por algo que não deveria existir. Uma luz que queima seus olhos, uma voz que jamais esquecerá e um único propósito que agora define cada batida do seu coração: vingança!",
        en: "In an isolated mansion on the English coast, a boy witnesses the worst nightmare a child can live through — and survives only to carry, forever, the mark of a promise whispered by something that should not exist. A light that burns his eyes, a voice he will never forget, and a single purpose that now defines every beat of his heart: vengeance!",
      },
      {
        "pt-br":
          "O mundo ao seu redor, no entanto, não está pronto para acreditar na verdade que ele viu... Sozinho, ferido e cercado por quem deveria protegê-lo, Alfred Mainfield descobrirá que sobreviver à tragédia foi apenas o primeiro passo de uma jornada muito mais perigosa.",
        en: "The world around him, however, is not ready to believe the truth he saw... Alone, wounded, and surrounded by those who should protect him, Alfred Mainfield will discover that surviving the tragedy was only the first step of a far more dangerous journey.",
      },
      {
        "pt-br":
          "Enquanto isso, longe dali, nas sombras de uma organização secreta que move os fios do destino sem que ninguém perceba, o lendário Dan enfrenta uma batalha muito mais íntima — algo que desperta dentro dele pode estar ligado, de formas que ele ainda não compreende, ao mesmo pesadelo que consumiu a vida de um garoto inocente.",
        en: "Meanwhile, far from there, in the shadows of a secret organization that pulls the strings of fate without anyone noticing, the legendary Dan faces a far more intimate battle — something awakening within him may be connected, in ways he does not yet understand, to the very same nightmare that consumed the life of an innocent boy.",
      },
      {
        "pt-br": "Duas jornadas. Um só destino entrelaçado pelas sombras!",
        en: "Two journeys. One destiny, woven together by the shadows!",
      },
      {
        "pt-br":
          "As Memórias de Berdox – Volume 1: Fragmentados é o primeiro capítulo de uma saga de fantasia épica do universo de O Dominador de Almas, cuja trajetória contém todos os tipos de jornadas. Esta primeira aventura trata de perda, sobrevivência e o preço que se paga para transformar dor em propósito.",
        en: "The Memories of Berdox – Volume 1: Fragmented is the first chapter of an epic fantasy saga set in the universe of The Dominator of Souls, a series whose path holds every kind of journey. This first adventure is about loss, survival, and the price paid to turn pain into purpose.",
      },
    ],
    cover: {
      "pt-br": "/img/books/the-memories-of-berdox-vol1-fragmented-cover-pt.jpg",
      en: "/img/books/the-memories-of-berdox-vol1-fragmented-cover-en.jpg",
    },
    stores: [
      { label: { "pt-br": "Brasil", en: "Brazil" }, href: { "pt-br": "https://www.amazon.com.br/dp/B0HHFJ496J", en: "https://www.amazon.com.br/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Estados Unidos", en: "United States" }, href: { "pt-br": "https://www.amazon.com/dp/B0HHFJ496J", en: "https://www.amazon.com/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Canadá", en: "Canada" }, href: { "pt-br": "https://www.amazon.ca/dp/B0HHFJ496J", en: "https://www.amazon.ca/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "México", en: "Mexico" }, href: { "pt-br": "https://www.amazon.com.mx/dp/B0HHFJ496J", en: "https://www.amazon.com.mx/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Alemanha", en: "Germany" }, href: { "pt-br": "https://www.amazon.de/dp/B0HHFJ496J", en: "https://www.amazon.de/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Espanha", en: "Spain" }, href: { "pt-br": "https://www.amazon.es/dp/B0HHFJ496J", en: "https://www.amazon.es/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "França", en: "France" }, href: { "pt-br": "https://www.amazon.fr/dp/B0HHFJ496J", en: "https://www.amazon.fr/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Itália", en: "Italy" }, href: { "pt-br": "https://www.amazon.it/dp/B0HHFJ496J", en: "https://www.amazon.it/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Reino Unido", en: "United Kingdom" }, href: { "pt-br": "https://www.amazon.co.uk/dp/B0HHFJ496J", en: "https://www.amazon.co.uk/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Holanda", en: "Netherlands" }, href: { "pt-br": "https://www.amazon.nl/dp/B0HHFJ496J", en: "https://www.amazon.nl/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Polônia", en: "Poland" }, href: { "pt-br": "https://www.amazon.pl/dp/B0HHFJ496J", en: "https://www.amazon.pl/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Suécia", en: "Sweden" }, href: { "pt-br": "https://www.amazon.se/dp/B0HHFJ496J", en: "https://www.amazon.se/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Bélgica", en: "Belgium" }, href: { "pt-br": "https://www.amazon.com.be/dp/B0HHFJ496J", en: "https://www.amazon.com.be/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Turquia", en: "Turkey" }, href: { "pt-br": "https://www.amazon.com.tr/dp/B0HHFJ496J", en: "https://www.amazon.com.tr/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Japão", en: "Japan" }, href: { "pt-br": "https://www.amazon.co.jp/dp/B0HHFJ496J", en: "https://www.amazon.co.jp/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Índia", en: "India" }, href: { "pt-br": "https://www.amazon.in/dp/B0HHFJ496J", en: "https://www.amazon.in/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Austrália", en: "Australia" }, href: { "pt-br": "https://www.amazon.com.au/dp/B0HHFJ496J", en: "https://www.amazon.com.au/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Singapura", en: "Singapore" }, href: { "pt-br": "https://www.amazon.sg/dp/B0HHFJ496J", en: "https://www.amazon.sg/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Emirados Árabes", en: "United Arab Emirates" }, href: { "pt-br": "https://www.amazon.ae/dp/B0HHFJ496J", en: "https://www.amazon.ae/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Arábia Saudita", en: "Saudi Arabia" }, href: { "pt-br": "https://www.amazon.sa/dp/B0HHFJ496J", en: "https://www.amazon.sa/dp/B0HK4RNHYR" } },
      { label: { "pt-br": "Egito", en: "Egypt" }, href: { "pt-br": "https://www.amazon.eg/dp/B0HHFJ496J", en: "https://www.amazon.eg/dp/B0HK4RNHYR" } },
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