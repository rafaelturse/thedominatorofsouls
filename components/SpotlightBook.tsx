"use client";

import Link from "next/link";
import { useState } from "react";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { MedalIcon, BookmarkIcon } from "@/lib/icons";
import BookDetails from "./BookDetails";
import Synopsis from "./Synopsis";
import BookCover from "./BookCover";
import StoreDropdown from "./StoreDropdown";

export default function SpotlightBook({ book }: { book: Book }) {
  const { t, ui } = useLanguage();

  return (
    <div className="mt-16">
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <span className="text-gold-soft">
          <MedalIcon />
        </span>
        <h1 className="font-display uppercase text-lg text-ink">{t(ui.featuredTitle)}</h1>
      </div>

      <div
        className="mt-6 rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-10"
        style={{ backgroundColor: "#111" }}
      >
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
              {book.status === "published" && (
                <span className="inline-block cursor-default border border-red-soft px-2 py-0.5 font-body text-[10px] uppercase tracking-[0.2em] text-red-soft transition-shadow duration-300 hover:shadow-[0_0_12px_rgba(177,69,60,0.7)]">
                  {t(ui.newBadge)}
                </span>
              )}
            </div>

            <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              {t(book.title)}
            </h1>

            <Synopsis book={book} maxHeightClass="max-h-36" />

            <BookDetails book={book} />

            {book.stores && book.stores.length > 0 && (
              <StoreDropdown stores={book.stores} align="end" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}