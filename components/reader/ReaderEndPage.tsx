"use client";

import { useLanguage } from "@/lib/i18n";
import type { Book } from "@/lib/data";
import BookIdentity from "./BookIdentity";
import StoreDropdown from "@/components/StoreDropdown";

type ReaderEndPageProps = {
  book: Book;
};

export default function ReaderEndPage({ book }: ReaderEndPageProps) {
  const { t, ui } = useLanguage();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 overflow-y-auto px-12 py-14 text-center sm:px-16 sm:py-20">
      <BookIdentity book={book} />

      <div className="max-w-md">
        <p className="font-body text-sm leading-relaxed text-muted">{t(ui.thankYouPrologue)}</p>
        <p className="mt-2 font-body text-sm leading-relaxed text-muted">{t(ui.fullWorkAvailable)}</p>
      </div>

      <p className="font-display text-lg text-red-soft">{t(ui.thankYouWarrior)}</p>

      {book.stores && book.stores.length > 0 && (
        <StoreDropdown stores={book.stores} align="center" />
      )}
    </div>
  );
}