"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { ROUTES, EXTERNAL_LINKS } from "@/lib/routes";
import {
  StoreIcon,
  UniverseIcon,
  AuthorFilledIcon,
  AboutIcon,
  CommunityIcon,
  ShieldIcon,
  GridIcon,
  ClipboardListIcon,
  NewsIcon,
  type IconProps,
} from "@/lib/icons";

export type ExploreLinkId = "store" | "universe" | "author" | "about" | "community" | "privacy" | "timeline" | "blog";

type LinkLabelKey =
  | "exploreStore"
  | "exploreUniverse"
  | "exploreAuthor"
  | "exploreAbout"
  | "exploreCommunity"
  | "explorePrivacy"
  | "exploreTimeline"
  | "exploreBlog";
type LinkDescKey =
  | "exploreStoreDesc"
  | "exploreUniverseDesc"
  | "exploreAuthorDesc"
  | "exploreAboutDesc"
  | "exploreCommunityDesc"
  | "explorePrivacyDesc"
  | "exploreTimelineDesc"
  | "exploreBlogDesc";

type LinkInfo = {
  icon: (props: IconProps) => React.JSX.Element;
  labelKey: LinkLabelKey;
  descKey: LinkDescKey;
  href: string;
  external: boolean;
};

const ALL_LINKS: Record<ExploreLinkId, LinkInfo> = {
  store: { icon: StoreIcon, labelKey: "exploreStore", descKey: "exploreStoreDesc", href: ROUTES.store, external: false },
  universe: { icon: UniverseIcon, labelKey: "exploreUniverse", descKey: "exploreUniverseDesc", href: ROUTES.universe, external: false },
  author: { icon: AuthorFilledIcon, labelKey: "exploreAuthor", descKey: "exploreAuthorDesc", href: EXTERNAL_LINKS.authorSite, external: true },
  about: { icon: AboutIcon, labelKey: "exploreAbout", descKey: "exploreAboutDesc", href: ROUTES.about, external: false },
  community: { icon: CommunityIcon, labelKey: "exploreCommunity", descKey: "exploreCommunityDesc", href: ROUTES.community, external: false },
  privacy: { icon: ShieldIcon, labelKey: "explorePrivacy", descKey: "explorePrivacyDesc", href: ROUTES.privacy, external: false },
  timeline: { icon: ClipboardListIcon, labelKey: "exploreTimeline", descKey: "exploreTimelineDesc", href: ROUTES.timeline, external: false },
  blog: { icon: NewsIcon, labelKey: "exploreBlog", descKey: "exploreBlogDesc", href: ROUTES.blog, external: false },
};

const ALL_IDS = Object.keys(ALL_LINKS) as ExploreLinkId[];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ExploreLinks({ count }: { count: number }) {
  const { t, ui } = useLanguage();
  const pathname = usePathname();
  const [ids, setIds] = useState<ExploreLinkId[]>([]);

  useEffect(() => {
    const candidates = ALL_IDS.filter((id) => ALL_LINKS[id].href !== pathname);
    setIds(shuffle(candidates).slice(0, count));
  }, [pathname, count]);

  if (ids.length === 0) return null;

  const gridCols = ids.length >= 4 ? "sm:grid-cols-4" : "sm:grid-cols-3";

  return (
    <div className="mt-20">
      <div className="flex items-center gap-2">
        <span className="text-gold-soft">
          <GridIcon />
        </span>
        <h1 className="font-display uppercase text-lg text-ink">{t(ui.exploreTitle)}</h1>
      </div>

      <div className={`mt-6 grid grid-cols-1 gap-6 ${gridCols}`}>
        {ids.map((id) => {
          const item = ALL_LINKS[id];
          const Icon = item.icon;
          const content = (
            <div className="group flex min-h-[260px] flex-col items-center justify-center gap-4 rounded-3xl bg-card p-10 text-center shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-out hover:-translate-y-1">
              <span className="text-gold-soft transition-colors duration-300 ease-out group-hover:text-red-soft">
                <Icon size={32} />
              </span>
              <p className="font-display text-base uppercase tracking-[0.2em] text-ink transition-colors duration-300 ease-out group-hover:text-gold-soft">
                {t(ui[item.labelKey])}
              </p>
              <p className="font-body text-sm leading-relaxed text-muted">
                {t(ui[item.descKey])}
              </p>
            </div>
          );

          return item.external ? (
            <Link key={id} href={item.href} target="_blank" rel="noopener noreferrer">
              {content}
            </Link>
          ) : (
            <Link key={id} href={item.href}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}