"use client";

import { useState } from "react";
import Hero from "@/components/page/Hero";
import PageHeader from "@/components/page/PageHeader";
import ExploreLinks from "@/components/link/ExploreLinks";
import UniverseTabs from "@/components/universe/UniverseTabs";
import GlossarySection from "@/components/universe/GlossarySection";
import { UNIVERSE_PAGE } from "@/lib/universe";
import type { UniverseOptionId } from "@/lib/universe";
import { useLanguage } from "@/lib/i18n";
import { UniverseIcon } from "@/lib/icons";

export default function UniversePage() {
  const { t, ui } = useLanguage();
  const [active, setActive] = useState<UniverseOptionId>("glossary");

  return (
    <div>
      <Hero />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-6 sm:pb-20 sm:pt-8">
        <PageHeader
          title={UNIVERSE_PAGE.title}
          heading={UNIVERSE_PAGE.heading}
          subtitle={UNIVERSE_PAGE.subtitle}
        />

        <div className="mt-16">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="text-gold-soft">
              <UniverseIcon />
            </span>
            <h1 className="font-display uppercase text-lg text-ink">{t(ui.universeExploreTitle)}</h1>
          </div>

          <div className="mt-6">
            <UniverseTabs active={active} onSelect={setActive} />
          </div>

          <div className="mt-8">
            {active === "glossary" && <GlossarySection />}
          </div>
        </div>

        <ExploreLinks count={4} />
      </div>
    </div>
  );
}