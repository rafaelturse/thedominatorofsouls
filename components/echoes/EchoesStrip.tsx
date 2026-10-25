"use client";

import { useLanguage } from "@/lib/i18n";
import { ArchiveIcon } from "@/lib/icons";
import { ECHOES, type EchoEntry } from "@/lib/echoes";
import HorizontalScroller from "@/components/page/HorizontalScroller";

type EchoesStripProps = {
  collapsed?: boolean;
  currentId?: string;
  onSelect?: (entry: EchoEntry) => void;
};

export default function EchoesStrip({ collapsed = false, currentId, onSelect }: EchoesStripProps) {
  const { t, ui } = useLanguage();

  const itemClass = collapsed ? "w-36 shrink-0 sm:w-40" : undefined;

  const items = ECHOES.entries.map((entry) => {
    const isComingSoon = entry.comingSoon ?? !entry.cover;
    const isCurrent = entry.id === currentId;

    const card = (
      <div
        className={`group flex flex-col items-center gap-3 p-2 transition-all duration-300 ${isCurrent ? "-translate-y-2" : ""
          } ${!isComingSoon && entry.cover
            ? "hover:-translate-y-1.5 hover:shadow-lift"
            : "opacity-60"
          }`}
      >
        <div className="relative w-full">
          {entry.cover ? (
            <img
              src={entry.cover}
              alt={t(entry.title)}
              className={`aspect-[5/8] w-full border object-cover transition-colors duration-300 ${isCurrent
                ? "border-gold-soft"
                : !isComingSoon
                  ? "border-transparent group-hover:border-gold-soft"
                  : "border-transparent"
                }`}
            />
          ) : (
            <div className="relative flex aspect-[5/8] h-full w-full items-center justify-center overflow-hidden border border-line bg-book-soon px-2 text-center">
              <div className="absolute inset-x-0 bottom-0 h-1 bg-red-soft transition-all duration-500 ease-out group-hover:h-full" />
              <span className="relative z-10 font-body text-[10px] uppercase tracking-[0.15em] text-muted transition-colors duration-300 group-hover:font-bold group-hover:text-gold-soft">
                {t(ui.comingSoon)}
              </span>
            </div>
          )}
        </div>

        <span
          className={`w-full text-center font-body text-xs uppercase leading-tight tracking-[0.15em] transition-colors duration-300 group-hover:text-gold-soft ${isCurrent ? "text-gold-soft" : "text-muted"
            }`}
        >
          {t(entry.title)}
        </span>
      </div>
    );

    if (!entry.cover) {
      return <div key={entry.id} className={itemClass}>{card}</div>;
    }

    return (
      <button
        key={entry.id}
        type="button"
        onClick={() => onSelect?.(entry)}
        className={`cursor-pointer text-left ${itemClass ?? ""}`}
      >
        {card}
      </button>
    );
  });

  const list = collapsed ? (
    <HorizontalScroller>{items}</HorizontalScroller>
  ) : (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6">{items}</div>
  );

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-gold-soft">
          <ArchiveIcon />
        </span>
        <h1 className="font-display uppercase text-lg text-ink">{t(ECHOES.heading)}</h1>
      </div>

      <div className="mt-6 rounded-3xl bg-card p-6 shadow-card sm:p-10">{list}</div>
    </div>
  );
}