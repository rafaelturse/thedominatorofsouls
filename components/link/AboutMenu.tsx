"use client";

import { usePathname } from "next/navigation";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import { ArchiveIcon, FeatherIcon, ShieldIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";
import NavMenu, { type NavMenuSection } from "./NavMenu";

const INFO_HEADING: LocalizedString = { "pt-br": "Informações", en: "Information" };
const TIMELINE_LABEL: LocalizedString = { "pt-br": "Linha do Tempo", en: "Timeline" };

export default function AboutMenu() {
  const pathname = usePathname();
  const { ui } = useLanguage();

  const isActive =
    pathname === ROUTES.about || pathname === ROUTES.privacy || pathname === ROUTES.timeline;

  const sections: NavMenuSection[] = [
    {
      heading: INFO_HEADING,
      items: [
        { href: ROUTES.about, label: ui.aboutLabel, icon: FeatherIcon },
        { href: ROUTES.privacy, label: ui.privacyLabel, icon: ShieldIcon },
        { href: ROUTES.timeline, label: TIMELINE_LABEL, icon: ArchiveIcon },
      ],
    },
  ];

  return <NavMenu label={ui.aboutLabel} sections={sections} isActive={isActive} />;
}