"use client";

import Link from "next/link";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { ArchiveIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";

export default function CollectionStrip({ books }: { books: Book[] }) {
  const { t, ui } = useLanguage();

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-gold-soft">
          <ArchiveIcon />
        </span>
        <h1 className="font-display uppercase text-lg text-ink">{t(ui.collectionTitle)}</h1>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6">
        {books.map((book) => {
          const card = (
            <div
              className={`group flex flex-col items-center gap-3 p-2 transition-all duration-300 ${book.status === "published"
                  ? "hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.7)]"
                  : "opacity-60"
                }`}
            >
              <div
                className={`aspect-[2/3] w-full overflow-hidden border transition-colors duration-300 ${book.status === "published"
                    ? "border-transparent group-hover:border-gold-soft"
                    : "border-transparent"
                  }`}
              >
                {book.cover ? (
                  <img src={t(book.cover)} alt={t(book.title)} className="h-full w-full object-contain" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-card px-2 text-center font-body text-[10px] uppercase tracking-[0.15em] text-muted transition-all duration-300 group-hover:bg-red-soft group-hover:font-bold group-hover:text-gold-soft">
                    {t(ui.comingSoon)}
                  </div>
                )}
              </div>
              <span className="font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors duration-300 group-hover:text-gold-soft">
                {t(book.volumeLabel)}
              </span>
            </div>
          );

          return book.status === "published" ? (
            <Link key={book.slug} href={ROUTES.bookDetail(book.slug)}>
              {card}
            </Link>
          ) : (
            <div key={book.slug}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}