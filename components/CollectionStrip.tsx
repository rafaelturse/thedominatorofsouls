"use client";

import Link from "next/link";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { ArchiveIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";

type CollectionStripProps = {
  books: Book[];
  featuredSlug?: string;
  onSelectSecondary?: (book: Book) => void;
};

export default function CollectionStrip({ books, featuredSlug, onSelectSecondary }: CollectionStripProps) {
  const { t, ui } = useLanguage();

  function handleClick(e: React.MouseEvent, book: Book) {
    if (!onSelectSecondary) return;

    e.preventDefault();

    if (book.slug === featuredSlug) {
      onSelectSecondary(book);
      document.getElementById("spotlight-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (!book.cover) {
      return;
    }

    onSelectSecondary(book);
    document.getElementById("spotlight-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
          const isComingSoon = book.comingSoon ?? !book.cover;

          const card = (
            <div
              className={`group flex flex-col items-center gap-3 p-2 transition-all duration-300 ${!isComingSoon && book.cover
                ? "hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.7)]"
                : "opacity-60"
                }`}
            >
              <div
                className={`relative aspect-[2/3] w-full overflow-hidden border transition-colors duration-300 ${!isComingSoon && book.cover
                  ? "border-transparent group-hover:border-gold-soft"
                  : "border-transparent"
                  }`}
              >
                {book.cover ? (
                  <>
                    <img src={t(book.cover)} alt={t(book.title)} className="h-full w-full object-contain" />
                    {isComingSoon && (
                      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-red-soft/70 transition-all duration-500 ease-out group-hover:h-full" />
                        <span className="relative z-10 px-2 text-center font-body text-[10px] uppercase tracking-[0.15em] text-muted opacity-0 transition-all duration-300 group-hover:font-bold group-hover:text-gold-soft group-hover:opacity-100">
                          {t(ui.comingSoon)}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-card px-2 text-center">
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-red-soft transition-all duration-500 ease-out group-hover:h-full" />
                    <span className="relative z-10 font-body text-[10px] uppercase tracking-[0.15em] text-muted transition-colors duration-300 group-hover:font-bold group-hover:text-gold-soft">
                      {t(ui.comingSoon)}
                    </span>
                  </div>
                )}
              </div>
              <span className="w-full text-center font-body text-xs uppercase leading-tight tracking-[0.15em] text-muted transition-colors duration-300 group-hover:text-gold-soft">
                {t(book.volumeLabel)}
              </span>
            </div>
          );

          if (onSelectSecondary) {
            const isActionable = book.slug === featuredSlug || !!book.cover;

            if (!isActionable) {
              return <div key={book.slug}>{card}</div>;
            }

            return (
              <Link
                key={book.slug}
                href={ROUTES.bookDetail(book.slug)}
                onClick={(e) => handleClick(e, book)}
              >
                {card}
              </Link>
            );
          }

          const isClickable = !isComingSoon && !!book.cover;

          return isClickable ? (
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