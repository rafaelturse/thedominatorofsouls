"use client";

import { useLanguage } from "@/lib/i18n";
import type { Book } from "@/lib/data";
import StoreDropdown from "@/components/StoreDropdown";

type ReaderEndPageProps = {
  book: Book;
};

export default function ReaderEndPage({ book }: ReaderEndPageProps) {
  const { t, ui } = useLanguage();

  const titleParts = t(book.title).split("—").map((p) => p.trim());
  const bookName = titleParts[0];
  const volumeSubtitle = titleParts.slice(1).join(" — ");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 overflow-y-auto px-12 py-14 text-center sm:px-16 sm:py-20">
      <div>
        <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">
          {t(book.series)}
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
          {bookName}
        </h2>
        <p className="mt-2 font-body text-sm uppercase tracking-[0.2em] text-muted">
          {volumeSubtitle}
        </p>
      </div>

      <div>
        <p className="font-body text-xs lowercase tracking-[0.3em] text-muted">por</p>
        <p className="mt-2 font-display text-2xl text-ink sm:text-3xl">Rafael Turse</p>
      </div>

      <div className="max-w-md">
        <p className="font-body text-sm leading-relaxed text-muted">{t(ui.thankYouPrologue)}</p>
        <p className="mt-2 font-body text-sm leading-relaxed text-muted">{t(ui.fullWorkAvailable)}</p>
      </div>

      {book.stores && book.stores.length > 0 && (
        <StoreDropdown stores={book.stores} align="center" />
      )}
    </div>
  );
}