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
    <header className="sticky top-0 z-50 border-b border-line bg-header md:fixed md:inset-x-0 md:top-0 md:border-b-0 md:bg-transparent md:px-5 md:pt-4">
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

      <div className="mx-auto hidden max-w-6xl items-center px-5 py-4 md:relative md:flex md:justify-start md:gap-4 md:rounded-2xl md:border md:border-line md:px-3 md:py-2 md:shadow-card md:before:absolute md:before:inset-0 md:before:-z-10 md:before:rounded-[inherit] md:before:bg-header/70 md:before:backdrop-blur-md md:before:content-[''] lg:gap-8 lg:px-5">
        <HeaderLogo />

        <nav className="flex items-center gap-0.5 md:flex-1 lg:gap-1">
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

          <div className="ml-auto lg:hidden">
            <HeaderSearch variant="compact" />
          </div>

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