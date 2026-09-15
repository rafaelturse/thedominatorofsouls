"use client";

import Hero from "@/components/Hero";
import PageHeader from "@/components/PageHeader";
import ExploreLinks from "@/components/ExploreLinks";
import { PRIVACY_PAGE } from "@/lib/privacy";
import { useLanguage } from "@/lib/i18n";

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div>
      <Hero />

      <div className="relative z-10 mx-auto max-w-3xl px-5 pb-16 pt-6 sm:pb-20 sm:pt-8">
        <PageHeader
          title={PRIVACY_PAGE.title}
          heading={PRIVACY_PAGE.heading}
          subtitle={PRIVACY_PAGE.subtitle}
        />

        <div
          className="mt-10 rounded-3xl p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-12"
          style={{ backgroundColor: "#111" }}
        >
          <p className="text-center font-body text-xs uppercase tracking-[0.2em] text-muted">
            {t(PRIVACY_PAGE.lastUpdated)}
          </p>

          <div className="mt-8 flex flex-col gap-8">
            {PRIVACY_PAGE.sections.map((section, i) => (
              <div key={i}>
                <h2 className="font-display text-xl text-gold-soft">{t(section.heading)}</h2>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted sm:text-base">
                  {t(section.body)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <ExploreLinks ids={["community", "author", "about"]} />
      </div>
    </div>
  );
}