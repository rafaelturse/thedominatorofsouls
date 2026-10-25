"use client";

import { useLanguage } from "@/lib/i18n";
import { MoreIcon } from "@/lib/icons";
import type { EchoCard } from "@/lib/echoes";

export default function EchoCardItem({ card }: { card: EchoCard }) {
  const { t, ui } = useLanguage();

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-card sm:flex-row">
      <div className="aspect-[16/9] w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-48">
        <img
          src={card.cover}
          alt={t(card.title)}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-red-soft">
            {t(card.category)}
          </span>
        </div>

        <h3 className="mt-5 font-display text-xl text-ink sm:text-2xl">{t(card.title)}</h3>

        <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-muted sm:text-base">
          {t(card.excerpt)}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {card.tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-red-soft px-2.5 py-0.5 font-body text-[10px] uppercase tracking-[0.1em] text-ink"
            >
              {t(tag)}
            </span>
          ))}
        </div>

        <div className="mt-6 flex justify-end border-t border-line pt-5">
          <span
            aria-disabled="true"
            className="flex cursor-not-allowed items-center gap-2 border border-line px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-muted opacity-50"
          >
            <MoreIcon size={14} />
            {t(ui.blogReadMore)}
          </span>
        </div>
      </div>
    </div>
  );
}