"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";
import { useHoverMenu } from "./useHoverMenu";

const TIMELINE_LABEL: LocalizedString = { "pt-br": "Linha do Tempo", en: "Timeline" };

export default function AboutMenu() {
  const pathname = usePathname();
  const { t, ui } = useLanguage();
  const { open, close, containerProps, onTriggerClick } = useHoverMenu();

  const isActive =
    pathname === ROUTES.about || pathname === ROUTES.privacy || pathname === ROUTES.timeline;

  return (
    <div {...containerProps} className="relative">
      <button
        type="button"
        onClick={onTriggerClick}
        aria-expanded={open}
        className={`flex items-center gap-1 font-body text-xs uppercase tracking-[0.15em] transition-colors hover:text-gold-soft ${isActive ? "text-gold-soft" : "text-muted"
          }`}
      >
        {t(ui.aboutLabel)}
        <span className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}>›</span>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-10 w-max min-w-40 -translate-x-1/2 pt-2">
          <div className="border border-line bg-header shadow-dropdown">
            <Link
              href={ROUTES.about}
              onClick={close}
              className="block whitespace-nowrap border-b border-line px-4 py-2.5 text-left font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:bg-surface hover:text-gold-soft"
            >
              {t(ui.aboutLabel)}
            </Link>
            <Link
              href={ROUTES.privacy}
              onClick={close}
              className="block whitespace-nowrap border-b border-line px-4 py-2.5 text-left font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:bg-surface hover:text-gold-soft"
            >
              {t(ui.privacyLabel)}
            </Link>
            <Link
              href={ROUTES.timeline}
              onClick={close}
              className="block whitespace-nowrap px-4 py-2.5 text-left font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:bg-surface hover:text-gold-soft"
            >
              {t(TIMELINE_LABEL)}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}