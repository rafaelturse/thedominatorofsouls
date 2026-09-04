"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { SAMPLE_LOREM_PAGES } from "@/lib/sample-content";
import type { Book } from "@/lib/data";

type SampleReaderProps = {
  book: Book;
  onClose: () => void;
};

export default function SampleReader({ book, onClose }: SampleReaderProps) {
  const { t, ui } = useLanguage();
  const pages = SAMPLE_LOREM_PAGES;
  const totalSpreads = Math.ceil(pages.length / 2);
  const [spread, setSpread] = useState(0);

  const leftPage = pages[spread * 2];
  const rightPage = pages[spread * 2 + 1];

  function goPrev() {
    setSpread((s) => Math.max(0, s - 1));
  }
  function goNext() {
    setSpread((s) => Math.min(totalSpreads - 1, s + 1));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative flex h-[95vh] w-[95vw] max-w-7xl flex-col overflow-hidden rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]"
        style={{ backgroundColor: "#111" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-10">
          <div className="flex items-center gap-3">
            <span className="border border-gold-soft px-2 py-0.5 font-body text-[10px] uppercase tracking-[0.2em] text-gold-soft">
              {t(ui.sampleBadge)}
            </span>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-ink">
              {t(book.title)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="border border-red-soft bg-red-soft px-3 py-1.5 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
          >
            {t(ui.close)}
          </button>
        </div>

        <div className="relative flex flex-1 items-center overflow-hidden">
          <button
            type="button"
            onClick={goPrev}
            disabled={spread === 0}
            className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-gold-soft disabled:opacity-20 disabled:hover:text-muted sm:left-4"
            aria-label="Previous page"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 overflow-y-auto px-12 py-10 sm:px-16 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              {leftPage.map((para, i) => (
                <p key={i} className="font-body text-sm leading-relaxed text-muted sm:text-base">
                  {para}
                </p>
              ))}
            </div>
            {rightPage && (
              <div className="hidden flex-col gap-4 lg:flex">
                {rightPage.map((para, i) => (
                  <p key={i} className="font-body text-sm leading-relaxed text-muted sm:text-base">
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={spread === totalSpreads - 1}
            className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-gold-soft disabled:opacity-20 disabled:hover:text-muted sm:right-4"
            aria-label="Next page"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-line px-6 py-4 sm:px-10">
          <input
            type="range"
            min={0}
            max={totalSpreads - 1}
            value={spread}
            onChange={(e) => setSpread(Number(e.target.value))}
            className="w-full accent-gold-soft"
          />
          <span className="font-body text-xs uppercase tracking-[0.15em] text-muted">
            {spread * 2 + 1}
            {rightPage ? `–${spread * 2 + 2}` : ""} / {pages.length}
          </span>
        </div>
      </div>
    </div>
  );
}