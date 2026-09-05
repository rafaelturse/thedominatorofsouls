"use client";

import { useState } from "react";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { BookIcon } from "@/lib/icons";
import Hero from "@/components/Hero";
import GenreStrip from "@/components/GenreStrip";
import BookInfo from "@/components/BookInfo";
import ExploreLinks from "./ExploreLinks";
import Reader from "@/components/reader/Reader";

export default function BookDetailContent({ book }: { book: Book }) {
  const { t, ui } = useLanguage();
  const [sampleOpen, setSampleOpen] = useState(false);

  return (
    <div>
      <Hero />
      <GenreStrip />

      <div className="relative z-10 mx-auto max-w-6xl mt-30 px-5 pb-20 pt-6 sm:pb-28 sm:pt-8">
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
          <BookInfo book={book} showSampleButton onReadSample={() => setSampleOpen(true)} />
        </div>

        <ExploreLinks ids={["store", "universe", "author", "about"]} />
      </div>

      {sampleOpen && (
        <Reader book={book} onClose={() => setSampleOpen(false)} />
      )}
    </div>
  );
}