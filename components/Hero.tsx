"use client";

import { SITE } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div
      className="relative overflow-hidden pb-30"
      style={{
        background: "linear-gradient(180deg, #111 0%, #0c0c0c 60%, #030303 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(50, 50, 50, 0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(50, 50, 50, 0.40) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 60%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 60%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 py-10 text-center">
        <h1 className="mt-22 font-display text-6xl tracking-[0.03em] text-ink sm:text-7xl">{t(SITE.title)}</h1>
        <p className="mt-4 font-body text-xs uppercase tracking-[0.4em] text-gold-soft">{t(SITE.tagline)}</p>
        <div className="w-52"><img src={SITE.symbol} alt={SITE.name} /></div>
      </div>
    </div>
  );
}