"use client";

import type { EchoCard } from "@/lib/echoes";
import { useLanguage } from "@/lib/i18n";
import { MoreIcon } from "@/lib/icons";

type EchoCardItemProps = {
  card: EchoCard;
  onReadMore?: (entryId: string) => void;
};

export default function EchoCardItem({ card, onReadMore }: EchoCardItemProps) {
  const { t, ui } = useLanguage();

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-card sm:flex-row">
      <img
        src={card.cover}
        alt={t(card.title)}
        className="aspect-[16/9] w-full object-cover sm:aspect-auto sm:w-48"
      />

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-red-soft">{t(card.category)}</p>

        <h2 className="mt-3 font-display text-2xl text-ink sm:text-3xl">{t(card.title)}</h2>

        <p className="mt-3 font-body text-base leading-relaxed text-muted">{t(card.excerpt)}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {card.tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-red-soft px-3 py-1 font-body text-[10px] uppercase tracking-[0.15em] text-ink"
            >
              {t(tag)}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-end border-t border-line pt-5">
            <button
              type="button"
              onClick={() => onReadMore?.(card.entryId)}
              className="flex cursor-pointer items-center gap-2 border border-red-soft bg-red-soft px-4 py-2 text-ink transition-colors hover:bg-transparent hover:text-red-soft"
            >
              <MoreIcon />
              <span className="font-body text-xs uppercase tracking-[0.2em]">{t(ui.blogReadMore)}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}