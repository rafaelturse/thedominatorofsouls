"use client";

import { useLanguage } from "@/lib/i18n";
import type { Book } from "@/lib/data";

type BookIdentityProps = {
  book: Book;
};

export default function BookIdentity({ book }: BookIdentityProps) {
  const { t, ui } = useLanguage();

  const titleParts = t(book.title).split("—").map((p) => p.trim());
  const bookName = titleParts[0];
  const volumeSubtitle = titleParts.slice(1).join(" — ");

  return (
    <>
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
        <p className="font-body text-xs lowercase tracking-[0.3em] text-muted">{t(ui.byAuthorLabel)}</p>
        <p className="mt-2 font-display text-2xl text-ink sm:text-3xl">Rafael Turse</p>
      </div>
    </>
  );
}