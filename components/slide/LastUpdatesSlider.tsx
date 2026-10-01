"use client";

import Link from "next/link";
import { useState } from "react";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { SettingsIcon, MoreIcon, SearchIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";
import { TIMELINE_EVENTS } from "@/lib/timeline";
import { useAutoSlide } from "./useAutoSlide";
import SlideProgressDot from "./SlideProgressDot";

const SLIDE_INTERVAL_MS = 10000;

export default function LastUpdatesSlider({ book }: { book: Book }) {
  const { t, ui, locale } = useLanguage();
  const [zoomOpen, setZoomOpen] = useState(false);

  const timelineSlides = TIMELINE_EVENTS.slice(0, 2).map((event) => ({
    date: t(event.date),
    title: t(event.title),
    body: event.description[locale],
    anchor: `${ROUTES.timeline}#timeline-event-${TIMELINE_EVENTS.indexOf(event)}`,
  }));

  const totalSlides = 1 + timelineSlides.length;
  const { active, progress, select, dragHandlers } = useAutoSlide(totalSlides, SLIDE_INTERVAL_MS);

  return (
    <div className="mt-16">
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <span className="text-gold-soft">
          <SettingsIcon />
        </span>
        <h1 className="font-display uppercase text-lg text-ink">{t(ui.inTheWorksTitle)}</h1>
      </div>

      <div
        className="mt-6 rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-10"
        style={{ backgroundColor: "#111" }}
      >
        <div
          className="cursor-grab select-none active:cursor-grabbing"
          {...dragHandlers}
        >
          <div className="flex min-h-[260px] flex-col justify-center sm:min-h-[220px]">
            {active === 0 ? (
              <div className="flex flex-col items-center gap-10 sm:flex-row-reverse sm:items-start">
                {book.cover && (
                  <div className="group flex shrink-0 flex-col items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setZoomOpen(true)}
                      className="w-24 cursor-pointer overflow-hidden border border-transparent transition-colors duration-300 hover:border-gold-soft sm:w-28"
                    >
                      <img
                        src={t(book.cover)}
                        alt={t(book.title)}
                        className="aspect-[2/3] w-full object-contain"
                        draggable={false}
                      />
                    </button>
                    <span className="flex items-center gap-1.5 font-body text-[10px] uppercase tracking-[0.15em] text-red-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <SearchIcon size={12} />
                      {t(ui.viewImage)}
                    </span>
                  </div>
                )}

                <div className="w-full text-center sm:text-left">
                  <p className="font-body text-sm leading-relaxed text-muted sm:text-base">
                    {t(ui.inTheWorksText)}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">
                  {timelineSlides[active - 1].date}
                </p>
                <h3 className="mt-2 font-display text-2xl text-ink">
                  {timelineSlides[active - 1].title}
                </h3>
                <div className="mt-2 font-body text-sm leading-relaxed text-muted sm:text-base">
                  {timelineSlides[active - 1].body}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
          <div className="flex items-center gap-3">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <SlideProgressDot
                key={i}
                isActive={i === active}
                progress={i === active ? progress : 0}
                onClick={() => select(i)}
              />
            ))}
          </div>

          <Link
            href={active === 0 ? `${ROUTES.timeline}#timeline-top` : timelineSlides[active - 1].anchor}
            className="flex items-center gap-2 border border-red-soft bg-red-soft px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
          >
            <MoreIcon size={14} />
            {t(ui.more)}
          </Link>
        </div>
      </div>

      {zoomOpen && book.cover && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            className="absolute right-6 top-6 font-body text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold-soft"
          >
            {t(ui.close)}
          </button>
          <img
            src={t(book.cover)}
            alt={t(book.title)}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}