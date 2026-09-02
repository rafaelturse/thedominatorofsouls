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
  pagesSuffix: { "pt-br": "Páginas", en: "Pages" },
  publishedOn: { "pt-br": "Publicado em", en: "Published on" },
  aboutAuthor: { "pt-br": "Sobre o Autor", en: "About the author" },
  more: { "pt-br": "Mais", en: "More" },
  viewImage: { "pt-br": "Ver imagem", en: "View image" },
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