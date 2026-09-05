"use client";

import Hero from "@/components/Hero";
import ExploreLinks from "@/components/ExploreLinks";
import { ABOUT } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import AuthorSignature from "@/components/AuthorSignature";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div>
      <Hero />

      <div className="relative z-10 mx-auto max-w-3xl px-5 pb-16 pt-6 sm:pb-20 sm:pt-8">
        <header className="text-center">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-gold-soft">
            {t(ABOUT.title)}
          </p>
          <h1 className="mt-5 font-display text-5xl tracking-[0.05em] text-ink sm:text-6xl">
            {t(ABOUT.heading)}
          </h1>
          <p className="mx-auto mt-6 max-w-md uppercase font-body text-sm leading-relaxed text-red-soft">
            {t(ABOUT.subtitle)}
          </p>
        </header>

        <div
          className="mt-10 rounded-3xl p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-12"
          style={{ backgroundColor: "#111" }}
        >
          <div className="flex flex-col gap-6">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className="font-body text-sm leading-relaxed text-muted sm:text-base">
                {t(p)}
              </p>
            ))}
            <AuthorSignature align="end" />
          </div>
        </div>

        <ExploreLinks ids={["store", "universe", "author"]} />
      </div>
    </div>
  );
}