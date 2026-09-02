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
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-center px-5 py-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="border border-line px-3 py-1 font-body text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:border-gold-soft hover:text-gold-soft md:hidden"
        >
          {open ? t(ui.close) : t(ui.menu)}
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