import type { Book } from "./books";
import { berdox } from "./books/berdox";
import type { LocalizedString } from "./i18n";

export type BookGroup = {
  id: string;
  name: LocalizedString;
  description?: LocalizedString;
  emptyMessage?: LocalizedString;
  books: Book[];
};

export const COLLECTION_GROUPS: BookGroup[] = [
  {
    id: berdox.id,
    name: berdox.name,
    description: berdox.description,
    books: berdox.books,
  },
  {
    id: "ecos",
    name: { "pt-br": "Ecos", en: "Echoes" },
    emptyMessage: {
      "pt-br": "Os volumes de Ecos serão anunciados em breve.",
      en: "The volumes of Echoes will be announced soon.",
    },
    books: [],
  },
];