"use client";

import Hero from "@/components/Hero";
import CommunityLinks from "@/components/CommunityLinks";
import { COMMUNITY_PAGE } from "@/lib/community";
import { useLanguage } from "@/lib/i18n";

export default function CommunityPage() {
  const { t } = useLanguage();

  return (
    <div>
      <Hero />
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pb-28 sm:pt-20">
        <header className="text-center">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-gold-soft">
            {t(COMMUNITY_PAGE.title)}
          </p>
          <h1 className="mt-5 font-display text-5xl tracking-[0.05em] text-ink sm:text-6xl">
            {t(COMMUNITY_PAGE.heading)}
          </h1>
          <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-muted">
            {t(COMMUNITY_PAGE.subtitle)}
          </p>
        </header>

        <CommunityLinks />
      </div>
    </div>
  );
}