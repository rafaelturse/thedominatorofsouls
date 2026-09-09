"use client";

import type { Book, BookFormat } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const FORMAT_LABEL_KEYS: Record<BookFormat, "formatHardcover" | "formatPaperback" | "formatEbook" | "formatAudiobook"> = {
  hardcover: "formatHardcover",
  paperback: "formatPaperback",
  ebook: "formatEbook",
  audiobook: "formatAudiobook",
};

export default function BookFormatBadges({ book }: { book: Book }) {
  const { t, ui } = useLanguage();

  if (!book.formats || book.formats.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-end">
      {book.formats.map((format) => (
        <span
          key={format}
          className="inline-block cursor-default rounded-full border border-red-soft bg-red-soft px-3 py-1 font-body text-[9px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
        >
          {t(ui[FORMAT_LABEL_KEYS[format]])}
        </span>
      ))}
    </div>
  );
}