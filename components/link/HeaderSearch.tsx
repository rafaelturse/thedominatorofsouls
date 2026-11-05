"use client";

import { useCallback, useMemo, useRef, useState, type FormEvent } from "react";
import TagPanel from "@/components/tags/TagPanel";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import { CloseIcon, MagnifierIcon } from "@/lib/icons";
import { SEARCH_PANEL_LABELS, searchContent } from "@/lib/search";

const LABEL: LocalizedString = { "pt-br": "Buscar", en: "Search" };
const CLEAR_LABEL: LocalizedString = { "pt-br": "Limpar busca", en: "Clear search" };

const MIN_QUERY_LENGTH = 2;

type HeaderSearchProps = {
  variant?: "bar" | "drawer";
  onNavigate?: () => void;
};

export default function HeaderSearch({ variant = "bar", onNavigate }: HeaderSearchProps) {
  const { t } = useLanguage();
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDrawer = variant === "drawer";

  const closePanel = useCallback(() => setPanelOpen(false), []);

  const results = useMemo(
    () => (panelOpen ? searchContent(submitted, t) : []),
    [panelOpen, submitted, t],
  );

  function runSearch() {
    const query = value.trim();
    if (query.length < MIN_QUERY_LENGTH) {
      inputRef.current?.focus();
      return;
    }
    setSubmitted(query);
    setPanelOpen(true);
  }

  function handleClear() {
    setValue("");
    inputRef.current?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runSearch();
  }

  const inputClass = isDrawer
    ? "h-12 w-full appearance-none rounded-xl border border-line bg-black/40 pl-11 pr-11 font-body text-sm text-ink transition-colors placeholder:text-muted focus:border-gold-soft focus:outline-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
    : "h-9 w-full appearance-none border-0 border-b border-transparent bg-transparent pl-1 pr-14 font-body text-xs tracking-[0.1em] text-ink transition-colors focus:border-gold-soft focus:outline-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none";

  const clearClass = isDrawer
    ? "absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center text-red-soft transition-colors hover:text-gold-soft"
    : "absolute right-8 top-1/2 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center text-red-soft transition-colors hover:text-gold-soft";

  const lensClass = isDrawer
    ? "absolute left-3 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center text-muted transition-colors hover:text-gold-soft"
    : "absolute right-1 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center text-muted transition-colors hover:text-gold-soft";

  return (
    <>
      <form role="search" onSubmit={handleSubmit} className="relative w-full">
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-label={t(LABEL)}
          placeholder={isDrawer ? t(LABEL) : undefined}
          className={inputClass}
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label={t(CLEAR_LABEL)}
            className={clearClass}
          >
            <CloseIcon size={12} />
          </button>
        )}

        <button type="button" onClick={runSearch} aria-label={t(LABEL)} className={lensClass}>
          <MagnifierIcon />
        </button>
      </form>

      <TagPanel
        open={panelOpen}
        tag={submitted}
        prefix=""
        items={results}
        onClose={closePanel}
        onNavigate={onNavigate}
        heading={t(SEARCH_PANEL_LABELS.heading)}
        emptyMessage={t(SEARCH_PANEL_LABELS.empty)}
        closeLabel={t(SEARCH_PANEL_LABELS.close)}
      />
    </>
  );
}