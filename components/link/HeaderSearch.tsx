"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import TagPanel from "@/components/tags/TagPanel";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import { CloseIcon, MagnifierIcon } from "@/lib/icons";
import { SEARCH_PANEL_LABELS, searchContent } from "@/lib/search";

const LABEL: LocalizedString = { "pt-br": "Buscar", en: "Search" };
const CLEAR_LABEL: LocalizedString = { "pt-br": "Limpar busca", en: "Clear search" };

const MIN_QUERY_LENGTH = 2;

type HeaderSearchProps = {
  variant?: "bar" | "drawer" | "compact";
  onNavigate?: () => void;
};

export default function HeaderSearch({ variant = "bar", onNavigate }: HeaderSearchProps) {
  const { t } = useLanguage();
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isCompact = variant === "compact";
  const boxed = variant === "drawer" || isCompact;

  const closePanel = useCallback(() => setPanelOpen(false), []);

  const results = useMemo(
    () => (panelOpen ? searchContent(submitted, t) : []),
    [panelOpen, submitted, t],
  );

  useEffect(() => {
    if (!isCompact || !dropdownOpen) return;
    inputRef.current?.focus();

    function onPointerDown(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDropdownOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isCompact, dropdownOpen]);

  function runSearch() {
    const query = value.trim();
    if (query.length < MIN_QUERY_LENGTH) {
      inputRef.current?.focus();
      return;
    }
    setSubmitted(query);
    setPanelOpen(true);
    if (isCompact) setDropdownOpen(false);
  }

  function handleClear() {
    setValue("");
    inputRef.current?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runSearch();
  }

  const inputClass = boxed
    ? "h-12 w-full appearance-none rounded-xl border border-line bg-black/40 pl-11 pr-11 font-body text-sm text-ink transition-colors placeholder:text-muted focus:border-gold-soft focus:outline-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
    : "h-9 w-full appearance-none border-0 border-b border-transparent bg-transparent pl-1 pr-14 font-body text-xs tracking-[0.1em] text-ink transition-colors focus:border-gold-soft focus:outline-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none";

  const clearClass = boxed
    ? "absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center text-red-soft transition-colors hover:text-gold-soft"
    : "absolute right-8 top-1/2 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center text-red-soft transition-colors hover:text-gold-soft";

  const lensClass = boxed
    ? "absolute left-3 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center text-muted transition-colors hover:text-gold-soft"
    : "absolute right-1 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center text-muted transition-colors hover:text-gold-soft";

  const form = (
    <form role="search" onSubmit={handleSubmit} className="relative w-full">
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label={t(LABEL)}
        placeholder={boxed ? t(LABEL) : undefined}
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
  );

  const resultsPanel = (
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
  );

  if (isCompact) {
    return (
      <>
        <div ref={wrapperRef} className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((current) => !current)}
            aria-label={t(LABEL)}
            aria-expanded={dropdownOpen}
            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-surface hover:text-gold-soft ${dropdownOpen ? "text-gold-soft" : "text-muted"
              }`}
          >
            <MagnifierIcon />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full z-10 w-72 pt-6">
              <div className="relative rounded-2xl border border-line bg-header/70 p-3 shadow-dropdown backdrop-blur-md">
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 right-3 h-3 w-3 rotate-45 border-l border-t border-line bg-header/70 [clip-path:polygon(0_0,100%_0,0_100%)]"
                />
                {form}
              </div>
            </div>
          )}
        </div>

        {resultsPanel}
      </>
    );
  }

  return (
    <>
      {form}
      {resultsPanel}
    </>
  );
}