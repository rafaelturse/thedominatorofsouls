"use client";

import Link from "next/link";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { BookmarkIcon, MoreIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";
import BookCover from "@/components/book/BookCover";
import SynopsisPreview from "@/components/book/SynopsisPreview";

type BookInfoCompactProps = {
  book: Book;
  showNewBadge?: boolean;
};

export default function BookInfoCompact({ book, showNewBadge = false }: BookInfoCompactProps) {
  const { t, ui } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start">
      <BookCover book={book} />

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

        <SynopsisPreview book={book} />

        <div className="mt-6 flex items-center justify-end gap-4 border-t border-line py-5">
          <Link
            href={ROUTES.bookDetail(book.slug)}
            className="flex items-center gap-2 border border-red-soft bg-red-soft px-4 py-2 text-ink transition-colors hover:bg-transparent hover:text-red-soft"
          >
            <MoreIcon />
            <span className="font-body text-xs uppercase tracking-[0.2em]">{t(ui.more)}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}