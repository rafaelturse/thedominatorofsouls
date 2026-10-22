import { books, type Book } from "./books";
import type { LocalizedString } from "./i18n";

export type BookGroup = {
  id: string;
  name: LocalizedString;
  description?: LocalizedString;
  emptyMessage?: LocalizedString;
  books: Book[];
};

function pick(slugs: string[]): Book[] {
  return slugs
    .map((slug) => books.find((b) => b.slug === slug))
    .filter((b): b is Book => !!b);
}

export const COLLECTION_GROUPS: BookGroup[] = [
  {
    id: "berdox",
    name: { "pt-br": "As Memórias de Berdox", en: "The Memories of Berdox" },
    description: {
      "pt-br":
        "Saga de fantasia épica do universo de O Dominador de Almas. Perda, sobrevivência e o preço de transformar dor em propósito.",
      en: "An epic fantasy saga from the universe of The Dominator of Souls. Loss, survival, and the price of turning pain into purpose.",
    },
    books: pick([
      "fragmentados",
      "volume-2",
      "volume-3",
      "volume-4",
      "volume-5",
      "volume-6",
      "volume-7",
      "volume-8",
    ]),
  },
  {
    id: "ecos",
    name: { "pt-br": "Ecos", en: "Echoes" },
    emptyMessage: {
      "pt-br": "Os volumes de Ecos serão anunciados em breve.",
      en: "The volumes of Echoes will be announced soon.",
    },
    books: pick([]),
  },
];