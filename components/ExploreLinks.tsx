"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

type IconProps = { size?: number };

const StoreIcon = ({ size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z" />
  </svg>
);

const UniverseIcon = ({ size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="9,4 15,6 21,4 21,17 15,19 9,17 3,19 3,6" />
    <rect x="8.7" y="4.3" width="0.6" height="12.9" fill="#111" />
    <rect x="14.7" y="6.3" width="0.6" height="12.9" fill="#111" />
  </svg>
);

const AuthorIcon = ({ size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
    <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
  </svg>
);

const AboutIcon = ({ size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10m0 5a1 1 0 0 0 -1 1v8a1 1 0 0 0 2 0v-8a1 1 0 0 0 -1 -1" />
  </svg>
);

export type ExploreLinkId = "store" | "universe" | "author" | "about";

type LinkLabelKey = "exploreStore" | "exploreUniverse" | "exploreAuthor" | "exploreAbout";
type LinkDescKey = "exploreStoreDesc" | "exploreUniverseDesc" | "exploreAuthorDesc" | "exploreAboutDesc";

type LinkInfo = {
  icon: (props: IconProps) => React.JSX.Element;
  labelKey: LinkLabelKey;
  descKey: LinkDescKey;
  href: string;
  external: boolean;
};

const ALL_LINKS: Record<ExploreLinkId, LinkInfo> = {
  store: { icon: StoreIcon, labelKey: "exploreStore", descKey: "exploreStoreDesc", href: "/store", external: false },
  universe: { icon: UniverseIcon, labelKey: "exploreUniverse", descKey: "exploreUniverseDesc", href: "/universo", external: false },
  author: { icon: AuthorIcon, labelKey: "exploreAuthor", descKey: "exploreAuthorDesc", href: "https://rafaelturse.com", external: true },
  about: { icon: AboutIcon, labelKey: "exploreAbout", descKey: "exploreAboutDesc", href: "/sobre", external: false },
};

export default function ExploreLinks({ ids }: { ids: ExploreLinkId[] }) {
  const { t, ui } = useLanguage();

  const gridCols = ids.length >= 4 ? "sm:grid-cols-4" : "sm:grid-cols-3";

  return (
    <div className="mt-20">
      <h1 className="font-display uppercase text-lg text-ink">{t(ui.exploreTitle)}</h1>

      <div className={`mt-6 grid grid-cols-1 gap-6 ${gridCols}`}>
        {ids.map((id) => {
          const item = ALL_LINKS[id];
          const Icon = item.icon;
          const content = (
            <div className="group flex min-h-[260px] flex-col items-center justify-center gap-4 rounded-3xl bg-card p-10 text-center shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-out hover:-translate-y-1">

              <span className="text-gold-soft transition-colors duration-300 ease-out group-hover:text-red-soft">
                <Icon />
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