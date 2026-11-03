"use client";

import { useRef, useState } from "react";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import { CloseIcon, MagnifierIcon } from "@/lib/icons";

const LABEL: LocalizedString = { "pt-br": "Buscar", en: "Search" };
const CLEAR_LABEL: LocalizedString = { "pt-br": "Limpar busca", en: "Clear search" };

export default function HeaderSearch() {
  const { t } = useLanguage();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClear() {
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <form
      role="search"
      onSubmit={(event) => event.preventDefault()}
      className="relative w-full"
    >
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label={t(LABEL)}
        className="h-9 w-full appearance-none border-0 border-b border-line bg-transparent pl-1 pr-14 font-body text-xs tracking-[0.1em] text-ink transition-colors focus:border-gold-soft focus:outline-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label={t(CLEAR_LABEL)}
          className="absolute right-8 top-1/2 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center text-red-soft transition-colors hover:text-gold-soft"
        >
          <CloseIcon size={12} />
        </button>
      )}

      <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-muted">
        <MagnifierIcon />
      </span>
    </form>
  );
}