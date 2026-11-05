import type { LocalizedString } from "@/lib/i18n";
import {
  ArchiveIcon,
  BookIcon,
  CommunityIcon,
  FeatherIcon,
  NewsIcon,
  QuoteIcon,
  ShieldIcon,
} from "@/lib/icons";
import { ROUTES } from "@/lib/routes";
import type { NavMenuSection } from "./NavMenu";

export type NavMenuDefinition = {
  label: LocalizedString;
  sections: NavMenuSection[];
};

type AboutLabels = {
  aboutLabel: LocalizedString;
  privacyLabel: LocalizedString;
};

export const NESTED_NAV_HREFS: string[] = [ROUTES.blog, ROUTES.timeline];

export const UNIVERSE_MENU: NavMenuDefinition = {
  label: { "pt-br": "Conteúdo", en: "Content" },
  sections: [
    {
      heading: { "pt-br": "Explorar", en: "Explore" },
      items: [
        { href: ROUTES.universe, label: { "pt-br": "Universo", en: "Universe" }, icon: BookIcon },
        { href: ROUTES.echoes, label: { "pt-br": "Ecos", en: "Echoes" }, icon: QuoteIcon },
      ],
    },
  ],
};

export const SOCIAL_MENU: NavMenuDefinition = {
  label: { "pt-br": "Social", en: "Social" },
  sections: [
    {
      heading: { "pt-br": "Participar", en: "Join in" },
      items: [
        { href: ROUTES.blog, label: { "pt-br": "Blog", en: "Blog" }, icon: NewsIcon },
        { href: ROUTES.community, label: { "pt-br": "Comunidade", en: "Community" }, icon: CommunityIcon },
      ],
    },
  ],
};

export function getAboutMenu(ui: AboutLabels): NavMenuDefinition {
  return {
    label: ui.aboutLabel,
    sections: [
      {
        heading: { "pt-br": "Informações", en: "Information" },
        items: [
          { href: ROUTES.about, label: ui.aboutLabel, icon: FeatherIcon },
          { href: ROUTES.privacy, label: ui.privacyLabel, icon: ShieldIcon },
          {
            href: ROUTES.timeline,
            label: { "pt-br": "Linha do Tempo", en: "Timeline" },
            icon: ArchiveIcon,
          },
        ],
      },
    ],
  };
}

export function isMenuActive(pathname: string, menu: NavMenuDefinition): boolean {
  return menu.sections.some((section) =>
    section.items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)),
  );
}