"use client";

import { useLanguage } from "@/lib/i18n";
import type { Book } from "@/lib/data";
import { MedalIcon } from "@/lib/icons";
import BookInfoCompact from "@/components/book/BookInfoCompact";

type SpotlightCarouselProps = {
  featured: Book;
  secondary: Book | null;
};

export default function SpotlightCarousel({ featured, secondary }: SpotlightCarouselProps) {
  const { t, ui } = useLanguage();
  const current = secondary ?? featured;
  const showNewBadge = current.slug === featured.slug;

  return (
    <div className="mt-16">
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <span className="text-gold-soft">
          <MedalIcon />
        </span>
        <h1 className="font-display uppercase text-lg text-ink">{t(ui.featuredTitle)}</h1>
      </div>

      <div
        className="mt-6 rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-10"
        style={{ backgroundColor: "#111" }}
      >
        <div className="flex min-h-[500px] flex-col justify-center">
          <BookInfoCompact book={current} showNewBadge={showNewBadge} />
        </div>
      </div>
    </div>
  );
}