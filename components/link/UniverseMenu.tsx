"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";

const UNIVERSE_LABEL: LocalizedString = { "pt-br": "Universo", en: "Universe" };
const ECHOES_LABEL: LocalizedString = { "pt-br": "Ecos", en: "Echoes" };

export default function UniverseMenu() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isActive = pathname === ROUTES.universe || pathname === ROUTES.echoes;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 font-body text-xs uppercase tracking-[0.15em] transition-colors hover:text-gold-soft ${isActive ? "text-gold-soft" : "text-muted"
          }`}
      >
        {t(UNIVERSE_LABEL)}
        <span className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}>›</span>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-10 mt-2 w-40 -translate-x-1/2 border border-line bg-header shadow-dropdown">
          <Link
            href={ROUTES.universe}
            onClick={() => setOpen(false)}
            className="block border-b border-line px-4 py-2.5 text-left font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:bg-surface hover:text-gold-soft"
          >
            {t(UNIVERSE_LABEL)}
          </Link>
          <Link
            href={ROUTES.echoes}
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-left font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:bg-surface hover:text-gold-soft"
          >
            {t(ECHOES_LABEL)}
          </Link>
        </div>
      )}
    </div>
  );
}