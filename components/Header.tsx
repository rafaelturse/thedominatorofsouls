"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS, SITE } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const pathname = usePathname();
  const { t, ui } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 md:justify-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-gold-soft transition-colors hover:text-red-soft md:hidden"
          aria-label={open ? t(ui.close) : t(ui.menu)}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) =>
            item.comingSoon ? (
              <span
                key={item.href}
                className="font-body text-xs uppercase tracking-[0.15em] text-line"
              >
                {t(item.label)}
              </span>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`font-body text-xs uppercase tracking-[0.15em] transition-colors hover:text-gold-soft ${pathname === item.href ? "text-gold-soft" : "text-muted"
                  }`}
              >
                {t(item.label)}
              </Link>
            )
          )}
          <LanguageSwitcher />
        </nav>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-line px-5 py-4 md:hidden">
          {NAV_ITEMS.map((item) =>
            item.comingSoon ? (
              <span
                key={item.href}
                className="border-b border-line py-3 font-body text-xs uppercase tracking-[0.15em] text-line last:border-none"
              >
                {t(item.label)}
              </span>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-gold-soft last:border-none"
              >
                {t(item.label)}
              </Link>
            )
          )}
          <div className="pt-3">
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}