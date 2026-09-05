"use client";

import { useState } from "react";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { SearchIcon } from "@/lib/icons";

type BookCoverProps = {
  book: Book;
  showSampleButton?: boolean;
  onReadSample?: () => void;
};

export default function BookCover({ book, showSampleButton = false, onReadSample }: BookCoverProps) {
  const { t, ui } = useLanguage();
  const [zoomOpen, setZoomOpen] = useState(false);

  return (
    <div className="flex shrink-0 flex-col items-center gap-3 sm:w-56">
      <div className="group flex flex-col items-center gap-3">
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

      {showSampleButton && book.cover && (
        <button
          type="button"
          onClick={onReadSample}
          className="mt-2 w-full border border-red-soft bg-red-soft px-4 py-2 text-center font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
        >
          {t(ui.readSample)}
        </button>
      )}

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