"use client";

import { SITE } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div className="hero-bg relative overflow-hidden pb-30">
      <div aria-hidden className="hero-grid absolute inset-0" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 py-10 text-center">
        <h1 className="mt-22 font-display text-6xl tracking-[0.03em] text-ink sm:text-7xl">{t(SITE.title)}</h1>
        <p className="mt-4 font-body text-xs uppercase tracking-[0.4em] text-gold-soft">{t(SITE.tagline)}</p>
        <div className="w-52"><img src={SITE.symbol} alt={SITE.name} /></div>
      </div>
    </div>
  );
}