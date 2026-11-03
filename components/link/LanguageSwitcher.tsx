"use client";

import { useLanguage, type Locale, type LocalizedString } from "@/lib/i18n";
import { ChevronRightIcon, GlobeIcon } from "@/lib/icons";
import { useHoverMenu } from "./useHoverMenu";

const LANGUAGES: { code: Locale; short: string; label: string }[] = [
  { code: "en", short: "EN", label: "English" },
  { code: "pt-br", short: "BR", label: "Português" },
];

const HEADING: LocalizedString = { "pt-br": "Idioma", en: "Language" };

export default function LanguageSwitcher() {
  const { t, locale, setLocale } = useLanguage();
  const { open, close, containerProps, onTriggerClick } = useHoverMenu();
  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  return (
    <div {...containerProps} className="relative">
      <button
        type="button"
        onClick={onTriggerClick}
        aria-expanded={open}
        aria-label={current.label}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-body text-xs uppercase tracking-[0.15em] transition-colors hover:bg-surface hover:text-gold-soft ${open ? "bg-surface text-gold-soft" : "text-red-soft"
          }`}
      >
        <GlobeIcon />
        {current.short}
        <span className={`flex transition-transform duration-200 ${open ? "rotate-90" : ""}`}>
          <ChevronRightIcon />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-10 w-64 pt-3">
          <div className="relative rounded-2xl border border-line bg-header p-2 shadow-dropdown">
            <span
              aria-hidden="true"
              className="absolute -top-1.5 right-8 h-3 w-3 rotate-45 border-l border-t border-line bg-header"
            />

            <p className="px-3 pb-1 pt-3 font-body text-[10px] uppercase tracking-[0.25em] text-muted">
              {t(HEADING)}
            </p>

            {LANGUAGES.map((lang) => {
              const selected = lang.code === locale;

              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLocale(lang.code);
                    close();
                  }}
                  className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-surface"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-body text-[10px] uppercase tracking-[0.1em] transition-colors group-hover:border-red-soft group-hover:text-red-soft ${selected ? "border-gold-soft text-gold-soft" : "border-line text-muted"
                      }`}
                  >
                    {lang.short}
                  </span>
                  <span
                    className={`font-body text-sm transition-colors group-hover:text-gold-soft ${selected ? "text-gold-soft" : "text-ink"
                      }`}
                  >
                    {lang.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}