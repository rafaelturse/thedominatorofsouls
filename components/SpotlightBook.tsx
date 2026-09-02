"use client";

import Link from "next/link";
import { useState } from "react";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import BookDetails from "./BookDetails";

export default function SpotlightBook({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);
  const { t, ui } = useLanguage();

  return (
    <div className="mt-16">
      <h1 className="font-display uppercase text-lg text-ink">{t(ui.featuredTitle)}</h1>

      <div
        className="mt-4 rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-10"
        style={{ backgroundColor: "#111" }}
      >
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start">
          <div className="aspect-[2/3] w-48 shrink-0 overflow-hidden border border-transparent transition-colors duration-300 hover:border-gold-soft sm:w-56">
            {book.cover && (
              <img src={t(book.cover)} alt={t(book.title)} className="h-full w-full object-contain" />
            )}
          </div>

          <div className="w-full text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">
                {t(book.series)}
              </p>
              {book.status === "published" && (
                <span className="inline-block cursor-default border border-red-soft px-2 py-0.5 font-body text-[10px] uppercase tracking-[0.2em] text-red-soft transition-shadow duration-300 hover:shadow-[0_0_12px_rgba(177,69,60,0.7)]">
                  {t(ui.newBadge)}
                </span>
              )}
            </div>

            <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              {t(book.title)}
            </h1>
            <p className="mt-5 font-body text-sm leading-relaxed text-muted">
              {t(book.synopsis)}
            </p>

            <BookDetails book={book} />

            {book.stores && book.stores.length > 0 && (
              <div className="mt-6 flex justify-center sm:justify-end">
                <div className="relative inline-block" onMouseLeave={() => setOpen(false)}>
                  <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="flex items-center gap-2 border border-line px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-gold-soft transition-colors hover:border-gold-soft"
                  >
                    {t(ui.buyOnAmazon)}
                    <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
                  </button>

                  {open && (
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
    </div>
  );
}