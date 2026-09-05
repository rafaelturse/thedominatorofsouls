"use client";

import { useState } from "react";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { BookmarkIcon, BookIcon } from "@/lib/icons";
import Hero from "@/components/Hero";
import GenreStrip from "@/components/GenreStrip";
import BookDetails from "@/components/BookDetails";
import Synopsis from "@/components/Synopsis";
import BookCover from "@/components/BookCover";
import StoreDropdown from "@/components/StoreDropdown";
import Reader from "@/components/reader/Reader";
import ExploreLinks from "./ExploreLinks";

export default function BookDetailContent({ book }: { book: Book }) {
  const { t, ui } = useLanguage();
  const [sampleOpen, setSampleOpen] = useState(false);

  return (
    <div>
      <Hero />
      <GenreStrip />

      <div className="relative z-10 mx-auto max-w-5xl mt-30 px-5 pb-20 pt-6 sm:pb-28 sm:pt-8">
        <div id="book-details" className="flex items-center gap-2 scroll-mt-24">
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
            <BookCover book={book} showSampleButton onReadSample={() => setSampleOpen(true)} />

            <div className="w-full text-center sm:text-left">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="text-gold-soft">
                  <BookmarkIcon />
                </span>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">{t(book.series)}</p>
              </div>

              <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">{t(book.title)}</h2>

              <Synopsis book={book} />

              <BookDetails book={book} hideMore />

              {book.stores && book.stores.length > 0 && (
                <StoreDropdown stores={book.stores} align="end" />
              )}
            </div>
          </div>
        </div>

        <ExploreLinks ids={["store", "universe", "author", "about"]} />
      </div>

      {sampleOpen && (
        <Reader book={book} onClose={() => setSampleOpen(false)} />
      )}
    </div>
  );
}