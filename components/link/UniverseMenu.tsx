"use client";

import { usePathname } from "next/navigation";
import type { LocalizedString } from "@/lib/i18n";
import { BookIcon, QuoteIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";
import NavMenu, { type NavMenuSection } from "./NavMenu";

const CONTENT_LABEL: LocalizedString = { "pt-br": "Conteúdo", en: "Content" };
const EXPLORE_HEADING: LocalizedString = { "pt-br": "Explorar", en: "Explore" };
const UNIVERSE_LABEL: LocalizedString = { "pt-br": "Universo", en: "Universe" };
const ECHOES_LABEL: LocalizedString = { "pt-br": "Ecos", en: "Echoes" };

const SECTIONS: NavMenuSection[] = [
  {
    heading: EXPLORE_HEADING,
    items: [
      { href: ROUTES.universe, label: UNIVERSE_LABEL, icon: BookIcon },
      { href: ROUTES.echoes, label: ECHOES_LABEL, icon: QuoteIcon },
    ],
  },
];

export default function UniverseMenu() {
  const pathname = usePathname();
  const isActive = pathname === ROUTES.universe || pathname === ROUTES.echoes;

  return <NavMenu label={CONTENT_LABEL} sections={SECTIONS} isActive={isActive} />;
}