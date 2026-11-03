"use client";

import { usePathname } from "next/navigation";
import type { LocalizedString } from "@/lib/i18n";
import { CommunityIcon, NewsIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";
import NavMenu, { type NavMenuSection } from "./NavMenu";

const SOCIAL_LABEL: LocalizedString = { "pt-br": "Social", en: "Social" };
const JOIN_HEADING: LocalizedString = { "pt-br": "Participar", en: "Join in" };
const BLOG_LABEL: LocalizedString = { "pt-br": "Blog", en: "Blog" };
const COMMUNITY_LABEL: LocalizedString = { "pt-br": "Comunidade", en: "Community" };

const SECTIONS: NavMenuSection[] = [
  {
    heading: JOIN_HEADING,
    items: [
      { href: ROUTES.blog, label: BLOG_LABEL, icon: NewsIcon },
      { href: ROUTES.community, label: COMMUNITY_LABEL, icon: CommunityIcon },
    ],
  },
];

export default function SocialMenu() {
  const pathname = usePathname();
  const isActive = pathname === ROUTES.community || pathname.startsWith(ROUTES.blog);

  return <NavMenu label={SOCIAL_LABEL} sections={SECTIONS} isActive={isActive} />;
}