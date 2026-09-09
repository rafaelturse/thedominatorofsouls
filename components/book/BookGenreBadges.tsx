"use client";

import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function BookGenreBadges({ book }: { book: Book }) {
  const { t } = useLanguage();

  if (!book.genres || book.genres.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-end">
      {book.genres.map((genre, i) => (
        <span
          key={i}
          className="inline-block cursor-default rounded-full border border-red-soft bg-red-soft px-3 py-1 font-body text-[9px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
        >
          {t(genre)}
        </span>
      ))}
    </div>
  );
}