"use client";

import { useState } from "react";
import { LANGUAGES } from "@/lib/data";

export default function LanguageSwitcher() {
  const [current, setCurrent] = useState(LANGUAGES[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="border border-line px-3 py-1 font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:border-gold-soft hover:text-gold-soft"
      >
        {current.label}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 border border-line bg-bg">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setCurrent(lang);
                setOpen(false);
                // TODO: sem roteamento por idioma ainda — só troca o rótulo exibido
              }}
              className="block w-full whitespace-nowrap px-4 py-2 text-left font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:bg-surface hover:text-gold-soft"
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}