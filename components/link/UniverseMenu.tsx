"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";
import { useHoverMenu } from "./useHoverMenu";

const CONTENT_LABEL: LocalizedString = { "pt-br": "Conteúdo", en: "Content" };
const UNIVERSE_LABEL: LocalizedString = { "pt-br": "Universo", en: "Universe" };
const ECHOES_LABEL: LocalizedString = { "pt-br": "Ecos", en: "Echoes" };

export default function UniverseMenu() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { open, close, containerProps, onTriggerClick } = useHoverMenu();

  const isActive = pathname === ROUTES.universe || pathname === ROUTES.echoes;

  return (
    <div {...containerProps} className="relative">
      <button
        type="button"
        onClick={onTriggerClick}
        aria-expanded={open}
        className={`flex items-center gap-1 font-body text-xs uppercase tracking-[0.15em] transition-colors hover:text-gold-soft ${isActive ? "text-gold-soft" : "text-muted"
          }`}
      >
        {t(CONTENT_LABEL)}
        <span className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}>›</span>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-10 w-max min-w-40 -translate-x-1/2 pt-2">
          <div className="border border-line bg-header shadow-dropdown">
            <Link
              href={ROUTES.universe}
              onClick={close}
              className="block whitespace-nowrap border-b border-line px-4 py-2.5 text-left font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:bg-surface hover:text-gold-soft"
            >
              {t(UNIVERSE_LABEL)}
            </Link>
            <Link
              href={ROUTES.echoes}
              onClick={close}
              className="block whitespace-nowrap px-4 py-2.5 text-left font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:bg-surface hover:text-gold-soft"
            >
              {t(ECHOES_LABEL)}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}