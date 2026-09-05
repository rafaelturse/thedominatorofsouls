"use client";

import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { BookmarkIcon } from "@/lib/icons";
import BookCover from "@/components/BookCover";
import Synopsis from "@/components/Synopsis";
import BookDetails from "@/components/BookDetails";
import StoreDropdown from "@/components/StoreDropdown";

type BookInfoProps = {
  book: Book;
  showNewBadge?: boolean;
  showMoreLink?: boolean;
  showSampleButton?: boolean;
  onReadSample?: () => void;
  synopsisMaxHeightClass?: string;
};

export default function BookInfo({
  book,
  showNewBadge = false,
  showMoreLink = false,
  showSampleButton = false,
  onReadSample,
  synopsisMaxHeightClass,
}: BookInfoProps) {
  const { t, ui } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start">
      <BookCover book={book} showSampleButton={showSampleButton} onReadSample={onReadSample} />

      <div className="w-full text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          <div className="flex items-center gap-2">
            <span className="text-gold-soft">
              <BookmarkIcon />
            </span>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">
              {t(book.series)}
            </p>
          </div>
          {showNewBadge && book.status === "published" && (
            <span className="inline-block cursor-default border border-red-soft px-2 py-0.5 font-body text-[10px] uppercase tracking-[0.2em] text-red-soft transition-shadow duration-300 hover:shadow-[0_0_12px_rgba(177,69,60,0.7)]">
              {t(ui.newBadge)}
            </span>
          )}
        </div>

        <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          {t(book.title)}
        </h2>

        <Synopsis book={book} maxHeightClass={synopsisMaxHeightClass} />

        <BookDetails book={book} hideMore={!showMoreLink} />

        {book.stores && book.stores.length > 0 && (
          <StoreDropdown stores={book.stores} align="end" />
        )}
      </div>
    </div>
  );
}