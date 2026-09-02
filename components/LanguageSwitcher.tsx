"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage, type Locale } from "@/lib/i18n";

const LANGUAGES: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "pt-br", label: "Português" },
];

const GlobeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.5 2.7 3.8 5.9 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.9-3.8-9s1.3-6.3 3.8-9z" />
  </svg>
);

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 font-body text-xs uppercase tracking-[0.15em] text-red-soft transition-colors hover:text-gold-soft"
      >
        <GlobeIcon />
        {current.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 border border-line bg-bg">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setLocale(lang.code);
                setOpen(false);
              }}
              className="block w-full whitespace-nowrap px-4 py-2 text-left font-body text-xs uppercase tracking-[0.15em] text-red-soft transition-colors hover:bg-surface hover:text-gold-soft"
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}