"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "pt-br" | "en";
export type LocalizedString = Record<Locale, string>;

const STORAGE_KEY = "dos-locale";

const UI = {
  menu: { "pt-br": "Menu", en: "Menu" },
  close: { "pt-br": "Fechar", en: "Close" },
  collectionTitle: { "pt-br": "Coleção", en: "Collection" },
  comingSoon: { "pt-br": "Em breve", en: "Coming soon" },
  featuredTitle: { "pt-br": "Em Destaque na Loja", en: "Featured in Store" },
  newBadge: { "pt-br": "Novo", en: "New" },
  buyOnAmazon: { "pt-br": "Comprar na Amazon", en: "Buy on Amazon" },
  pagesSuffix: { "pt-br": "páginas", en: "pages" },
  publishedOn: { "pt-br": "Publicado em", en: "Published on" },
  aboutAuthor: { "pt-br": "Sobre o autor", en: "About the author" },
  more: { "pt-br": "Mais", en: "More" },
  viewImage: { "pt-br": "Ver imagem", en: "View image" },
  exploreTitle: { "pt-br": "Veja Mais", en: "See More" },
  exploreStore: { "pt-br": "Loja", en: "Store" },
  exploreStoreDesc: {
    "pt-br": "A lendária estante de livros do Dominador de Almas",
    en: "The legendary Dominator of Souls' bookshelf",
  },
  exploreUniverse: { "pt-br": "Universo", en: "Universe" },
  exploreUniverseDesc: {
    "pt-br": "Mais sobre personagens, locais e mitologia",
    en: "More about characters, places, and mythology",
  },
  exploreAuthor: { "pt-br": "Autor", en: "Author" },
  exploreAuthorDesc: {
    "pt-br": "Conheça quem dá vida ao Dominador de Almas",
    en: "Meet the person behind the Dominator of Souls",
  },
  exploreAbout: { "pt-br": "Sobre", en: "About" },
  exploreAboutDesc: {
    "pt-br": "Uma pequeno vislumbre da obra",
    en: "A small glimpse into the work",
  },
} satisfies Record<string, LocalizedString>;

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (dict: LocalizedString) => string;
  ui: typeof UI;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "pt-br" || stored === "en") {
      setLocaleState(stored);
    }
  }, []);

  function setLocale(next: Locale) {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  function t(dict: LocalizedString) {
    return dict[locale];
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, ui: UI }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}