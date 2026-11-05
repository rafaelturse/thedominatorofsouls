"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { ChevronRightIcon, CloseIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";
import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import {
  NESTED_NAV_HREFS,
  SOCIAL_MENU,
  UNIVERSE_MENU,
  getAboutMenu,
  isMenuActive,
  type NavMenuDefinition,
} from "./navSections";

const TRANSITION_MS = 300;

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { t, ui } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const groups: Record<string, NavMenuDefinition> = {
    [ROUTES.universe]: UNIVERSE_MENU,
    [ROUTES.community]: SOCIAL_MENU,
    [ROUTES.about]: getAboutMenu(ui),
  };

  const items = NAV_ITEMS.filter((item) => !NESTED_NAV_HREFS.includes(item.href));

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(frame);
    }
    setShown(false);
    const timer = window.setTimeout(() => setMounted(false), TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mounted]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-10 flex md:hidden" role="dialog" aria-modal="true" aria-label={t(ui.menu)}>
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${shown ? "opacity-100" : "opacity-0"
          }`}
        onClick={onClose}
      />

      <aside
        className={`relative flex h-full w-full max-w-md flex-col overflow-y-auto border-r border-line bg-header transition-transform duration-300 ease-out ${shown ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 pt-4">
          <button
            type="button"
            onClick={onClose}
            aria-label={t(ui.close)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center justify-self-start rounded-lg bg-surface text-muted transition-colors hover:text-gold-soft"
          >
            <CloseIcon size={18} />
          </button>
          <HeaderLogo size={44} onClick={onClose} />
          <span />
        </div>

        <div className="px-5 pt-6">
          <HeaderSearch variant="drawer" onNavigate={onClose} />
        </div>

        <nav className="flex flex-col px-5 pb-10 pt-4">
          {items.map((item) => {
            const group = groups[item.href];

            if (group && !item.comingSoon) {
              const isOpen = expanded === item.href;
              const active = isMenuActive(pathname, group);

              return (
                <div key={item.href} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : item.href)}
                    aria-expanded={isOpen}
                    className={`flex w-full cursor-pointer items-center justify-between py-4 font-body text-sm uppercase tracking-[0.15em] transition-colors hover:text-gold-soft ${active || isOpen ? "text-gold-soft" : "text-ink"
                      }`}
                  >
                    {t(group.label)}
                    <span
                      className={`flex opacity-60 transition-transform duration-200 ${isOpen ? "-rotate-90" : "rotate-90"
                        }`}
                    >
                      <ChevronRightIcon size={12} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mb-3 rounded-xl bg-black/40 px-4 pb-2 pt-4">
                      {group.sections.map((section) => (
                        <div key={section.heading.en}>
                          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-muted">
                            {t(section.heading)}
                          </p>
                          {section.items.map((link) => {
                            const linkActive =
                              pathname === link.href || pathname.startsWith(`${link.href}/`);

                            return (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={onClose}
                                className={`block py-3 font-body text-sm transition-colors hover:text-gold-soft ${linkActive ? "text-gold-soft" : "text-ink"
                                  }`}
                              >
                                {t(link.label)}
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (item.comingSoon) {
              return (
                <span
                  key={item.href}
                  className="border-b border-line py-4 font-body text-sm uppercase tracking-[0.15em] text-line"
                >
                  {t(item.label)}
                </span>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`border-b border-line py-4 font-body text-sm uppercase tracking-[0.15em] transition-colors hover:text-gold-soft ${pathname === item.href ? "text-gold-soft" : "text-ink"
                  }`}
              >
                {t(item.label)}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}