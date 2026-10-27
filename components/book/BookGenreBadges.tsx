"use client";

import type { Book } from "@/lib/data";
import { useLanguage, type LocalizedString } from "@/lib/i18n";

type BookGenreBadgesProps = {
  book: Book;
  onTagClick?: (tag: LocalizedString) => void;
};

const BADGE_CLASS =
  "inline-block rounded-full border border-red-soft bg-red-soft px-3 py-1 font-body text-[9px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft";

export default function BookGenreBadges({ book, onTagClick }: BookGenreBadgesProps) {
  const { t } = useLanguage();

  if (!book.genres || book.genres.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-end">
      {book.genres.map((genre, i) =>
        onTagClick ? (
          <button
            key={i}
            type="button"
            onClick={() => onTagClick(genre)}
            className={`${BADGE_CLASS} cursor-pointer`}
          >
            {t(genre)}
          </button>
        ) : (
          <span key={i} className={`${BADGE_CLASS} cursor-default`}>
            {t(genre)}
          </span>
        ),
      )}
    </div>
  );
}