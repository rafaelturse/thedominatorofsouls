"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS } from "@/lib/data";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";
import { HomeIcon } from "@/lib/icons";
import LanguageSwitcher from "./LanguageSwitcher";
import AboutMenu from "./AboutMenu";
import UniverseMenu from "./UniverseMenu";
import SocialMenu from "./SocialMenu";

const UNIVERSE_LABEL: LocalizedString = { "pt-br": "Universo", en: "Universe" };
const ECHOES_LABEL: LocalizedString = { "pt-br": "Ecos", en: "Echoes" };
const CONTENT_LABEL: LocalizedString = { "pt-br": "Conteúdo", en: "Content" };
const SOCIAL_LABEL: LocalizedString = { "pt-br": "Social", en: "Social" };
const BLOG_LABEL: LocalizedString = { "pt-br": "Blog", en: "Blog" };
const COMMUNITY_LABEL: LocalizedString = { "pt-br": "Comunidade", en: "Community" };
const TIMELINE_LABEL: LocalizedString = { "pt-br": "Linha do Tempo", en: "Timeline" };

const NESTED_HREFS: string[] = [ROUTES.blog, ROUTES.timeline];

type MobileSubLink = { href: string; label: LocalizedString };

export default function Header() {
  const pathname = usePathname();
  const { t, ui } = useLanguage();
  const [open, setOpen] = useState(false);

  const desktopNavItems = NAV_ITEMS.filter((item) => !NESTED_HREFS.includes(item.href));
  const mobileNavItems = desktopNavItems.filter((item) => item.href !== ROUTES.home);

  const mobileGroups: Record<string, { label: LocalizedString; links: MobileSubLink[] }> = {
    [ROUTES.universe]: {
      label: CONTENT_LABEL,
      links: [
        { href: ROUTES.universe, label: UNIVERSE_LABEL },
        { href: ROUTES.echoes, label: ECHOES_LABEL },
      ],
    },
    [ROUTES.community]: {
      label: SOCIAL_LABEL,
      links: [
        { href: ROUTES.blog, label: BLOG_LABEL },
        { href: ROUTES.community, label: COMMUNITY_LABEL },
      ],
    },
    [ROUTES.about]: {
      label: ui.aboutLabel,
      links: [
        { href: ROUTES.about, label: ui.aboutLabel },
        { href: ROUTES.privacy, label: ui.privacyLabel },
        { href: ROUTES.timeline, label: TIMELINE_LABEL },
      ],
    },
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-header">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 md:justify-center">
        <div className="flex items-center gap-4 md:hidden">
          <Link
            href={ROUTES.home}
            aria-label={t(ui.menu)}
            className={`transition-colors hover:text-gold-soft ${pathname === ROUTES.home ? "text-gold-soft" : "text-muted"
              }`}
          >
            <HomeIcon size={20} />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-gold-soft transition-colors hover:text-red-soft"
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
        </div>

        <nav className="hidden items-center gap-6 md:flex">
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

        <div className="md:hidden">
          <LanguageSwitcher />
        </div>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-line px-5 py-4 md:hidden">
          {mobileNavItems.map((item) => {
            const group = mobileGroups[item.href];

            if (group && !item.comingSoon) {
              return (
                <div key={item.href} className="flex flex-col">
                  <span className="border-b border-line py-3 font-body text-xs uppercase tracking-[0.15em] text-muted">
                    {t(group.label)}
                  </span>
                  {group.links.map((link, i) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`py-3 pl-4 font-body text-xs uppercase tracking-[0.15em] transition-colors hover:text-gold-soft ${pathname === link.href ? "text-gold-soft" : "text-muted"
                        } ${item.href === ROUTES.about && i === group.links.length - 1 ? "" : "border-b border-line"
                        }`}
                    >
                      — {t(link.label)}
                    </Link>
                  ))}
                </div>
              );
            }

            if (item.comingSoon) {
              return (
                <span
                  key={item.href}
                  className="border-b border-line py-3 font-body text-xs uppercase tracking-[0.15em] text-line"
                >
                  {t(item.label)}
                </span>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-line py-3 font-body text-xs uppercase tracking-[0.15em] transition-colors hover:text-gold-soft ${pathname === item.href ? "text-gold-soft" : "text-muted"
                  }`}
              >
                {t(item.label)}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}