"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { NAV_ITEMS } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { MenuIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";
import LanguageSwitcher from "./LanguageSwitcher";
import AboutMenu from "./AboutMenu";
import UniverseMenu from "./UniverseMenu";
import SocialMenu from "./SocialMenu";
import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import MobileMenu from "./MobileMenu";
import { NESTED_NAV_HREFS } from "./navSections";

export default function Header() {
  const pathname = usePathname();
  const { t, ui } = useLanguage();
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => setOpen(false), []);

  const desktopNavItems = NAV_ITEMS.filter((item) => !NESTED_NAV_HREFS.includes(item.href));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-header lg:fixed lg:inset-x-0 lg:top-0 lg:border-b-0 lg:bg-transparent lg:px-5 lg:pt-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer justify-self-start text-gold-soft transition-colors hover:text-red-soft"
          aria-label={t(ui.menu)}
        >
          <MenuIcon />
        </button>

        <HeaderLogo size={36} />

        <div className="justify-self-end">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="mx-auto hidden max-w-6xl items-center justify-center px-5 py-4 md:flex lg:relative lg:justify-start lg:gap-8 lg:rounded-2xl lg:border lg:border-line lg:py-2 lg:shadow-card lg:before:absolute lg:before:inset-0 lg:before:-z-10 lg:before:rounded-[inherit] lg:before:bg-header/70 lg:before:backdrop-blur-md lg:before:content-['']">
        <div className="hidden lg:block">
          <HeaderLogo />
        </div>

        <nav className="flex items-center gap-1 lg:flex-1">
          {desktopNavItems.map((item) =>
            item.href === ROUTES.about ? (
              <AboutMenu key={item.href} />
            ) : item.href === ROUTES.community ? (
              <SocialMenu key={item.href} />
            ) : item.href === ROUTES.universe && !item.comingSoon ? (
              <UniverseMenu key={item.href} />
            ) : item.comingSoon ? (
              <span
                key={item.href}
                className="px-3 py-2 font-body text-xs uppercase tracking-[0.15em] text-line"
              >
                {t(item.label)}
              </span>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 font-body text-xs uppercase tracking-[0.15em] transition-colors hover:bg-surface hover:text-gold-soft ${pathname === item.href ? "text-gold-soft" : "text-muted"
                  }`}
              >
                {t(item.label)}
              </Link>
            )
          )}
          <div className="hidden lg:ml-4 lg:block lg:flex-1">
            <HeaderSearch />
          </div>
          <div className="ml-3">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>

      <MobileMenu open={open} onClose={closeMenu} />
    </header>
  );
}