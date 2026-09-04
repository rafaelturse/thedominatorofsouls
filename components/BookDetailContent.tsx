"use client";

import Link from "next/link";
import { useState } from "react";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { BookmarkIcon, QuoteIcon, SearchIcon, BookIcon } from "@/lib/icons";
import Hero from "@/components/Hero";
import GenreStrip from "@/components/GenreStrip";
import BookDetails from "@/components/BookDetails";

export default function BookDetailContent({ book }: { book: Book }) {
  const { t, ui } = useLanguage();
  const [zoomOpen, setZoomOpen] = useState(false);
  const [storesOpen, setStoresOpen] = useState(false);

  return (
    <div>
      <Hero />
      <GenreStrip />

      <div className="relative z-10 mx-auto max-w-5xl mt-30 px-5 pb-20 pt-6 sm:pb-28 sm:pt-8">
        <div className="flex items-center gap-2">
          <span className="text-gold-soft">
            <BookIcon />
          </span>
          <h1 className="font-display uppercase text-lg text-ink">{t(ui.bookDetailsTitle)}</h1>
        </div>

        <div
          className="mt-4 rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-10"
          style={{ backgroundColor: "#111" }}
        >
          <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start">
            <div className="group flex shrink-0 flex-col items-center gap-3 sm:w-56">
              {book.cover ? (
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  className="aspect-[2/3] w-48 cursor-pointer overflow-hidden border border-transparent transition-colors duration-300 hover:border-gold-soft sm:w-56"
                >
                  <img src={t(book.cover)} alt={t(book.title)} className="h-full w-full object-contain" />
                </button>
              ) : (
                <div className="aspect-[2/3] w-48 sm:w-56" />
              )}

              {book.cover && (
                <span className="flex items-center gap-1.5 font-body text-xs uppercase tracking-[0.15em] text-red-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <SearchIcon />
                  {t(ui.viewImage)}
                </span>
              )}
            </div>

            <div className="w-full text-center sm:text-left">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="text-gold-soft">
                  <BookmarkIcon />
                </span>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">{t(book.series)}</p>
              </div>

              <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">{t(book.title)}</h2>

              {book.fullSynopsisHeading && book.fullSynopsis ? (
                <div className="mt-16 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-gold-soft">
                      <QuoteIcon />
                    </span>
                    <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">{t(ui.synopsisLabel)}</p>
                  </div>
                  <div className="mt-3 max-h-72 overflow-y-auto pr-2">
                    <p className="font-display text-lg text-red-soft">{t(book.fullSynopsisHeading)}</p>
                    <div className="mt-4 flex flex-col gap-4">
                      {book.fullSynopsis.map((p, i) => (
                        <p key={i} className="font-body text-sm leading-relaxed text-muted sm:text-base">
                          {t(p)}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-5 font-body text-sm leading-relaxed text-muted">{t(book.synopsis)}</p>
              )}

              <BookDetails book={book} hideMore />

              {book.stores && book.stores.length > 0 && (
                <div className="mt-6 flex justify-center sm:justify-end">
                  <div className="relative inline-block" onMouseLeave={() => setStoresOpen(false)}>
                    <button
                      type="button"
                      onClick={() => setStoresOpen(!storesOpen)}
                      className="flex items-center gap-2 border border-line px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-gold-soft transition-colors hover:border-gold-soft"
                    >
                      {t(ui.buyOnAmazon)}
                      <span className={`transition-transform duration-200 ${storesOpen ? "rotate-180" : ""}`}>▾</span>
                    </button>

                    {storesOpen && (
                      <div className="absolute right-0 top-full z-10 max-h-64 w-56 overflow-y-auto border border-line bg-bg shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]">
                        {book.stores.map((store) => (
                          <Link
                            key={store.href}
                            href={store.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block border-b border-line px-4 py-2.5 text-left font-body text-sm text-muted transition-colors last:border-none hover:bg-surface hover:text-gold-soft"
                          >
                            {t(store.label)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {book.openingChapter && book.openingChapter.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display uppercase text-lg text-ink">{t(ui.openingChapterLabel)}</h2>

            <div
              className="mt-4 rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-12"
              style={{ backgroundColor: "#111" }}
            >
              {book.openingChapterTitle && (
                <h3 className="mb-6 text-center font-display text-2xl text-gold-soft">
                  {t(book.openingChapterTitle)}
                </h3>
              )}
              <div className="mx-auto flex max-w-2xl flex-col gap-5">
                {book.openingChapter.map((p, i) => (
                  <p key={i} className="font-body text-sm leading-relaxed text-muted sm:text-base">
                    {t(p)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {zoomOpen && book.cover && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            className="absolute right-6 top-6 font-body text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold-soft"
          >
            {t(ui.close)}
          </button>
          <img
            src={t(book.cover)}
            alt={t(book.title)}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}