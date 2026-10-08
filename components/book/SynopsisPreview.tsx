"use client";

import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { QuoteIcon } from "@/lib/icons";
import SynopsisAudioPlayer from "@/components/book/SynopsisAudioPlayer";

type SynopsisPreviewProps = {
  book: Book;
  maxChars?: number;
};

export default function SynopsisPreview({ book, maxChars = 500 }: SynopsisPreviewProps) {
  const { t, ui, locale } = useLanguage();
  const audioSrc = book.audio?.[locale];

  const fullText = book.fullSynopsisHeading && book.fullSynopsis
    ? book.fullSynopsis.map((p) => t(p)).join(" ")
    : t(book.synopsis);

  const preview = fullText.length > maxChars
    ? fullText.slice(0, maxChars).trimEnd() + "..."
    : fullText;

  return (
    <div className="mt-10 flex min-h-[220px] flex-col text-left">
      <div className="flex items-center gap-2">
        <span className="text-gold-soft">
          <QuoteIcon />
        </span>
        <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">
          {t(ui.synopsisLabel)}
        </p>
      </div>

      {audioSrc && <SynopsisAudioPlayer src={audioSrc} />}

      {book.fullSynopsisHeading && (
        <p className="mt-5 font-display text-lg text-red-soft">{t(book.fullSynopsisHeading)}</p>
      )}
      <p className="mt-2 font-body text-sm leading-relaxed text-muted sm:text-base">
        {preview}
      </p>
    </div>
  );
}