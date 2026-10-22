"use client";

import Hero from "@/components/page/Hero";
import ExploreLinks from "@/components/link/ExploreLinks";
import { ABOUT } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import AuthorSignature from "@/components/page/AuthorSignature";
import PageHeader from "@/components/page/PageHeader";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div>
      <Hero />

      <div className="relative z-10 mx-auto max-w-3xl px-5 pb-16 pt-6 sm:pb-20 sm:pt-8">
        <PageHeader title={ABOUT.title} heading={ABOUT.heading} subtitle={ABOUT.subtitle} />

        <div className="mt-10 rounded-3xl bg-card p-8 shadow-card sm:p-12">
          <div className="flex flex-col gap-6">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className="font-body text-sm leading-relaxed text-muted sm:text-base">
                {t(p)}
              </p>
            ))}
            <AuthorSignature align="end" />
          </div>
        </div>

        <ExploreLinks count={3} />
      </div>
    </div>
  );
}