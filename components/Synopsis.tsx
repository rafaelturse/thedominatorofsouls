"use client";

import { useRef, useState, useEffect } from "react";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { QuoteIcon } from "@/lib/icons";

type SynopsisProps = {
  book: Book;
  maxHeightClass?: string;
};

export default function Synopsis({ book, maxHeightClass = "max-h-36" }: SynopsisProps) {
  const { t, ui } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollUp(el.scrollTop > 4);
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
  }

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [book]);

  function scrollUp() {
    scrollRef.current?.scrollBy({ top: -120, behavior: "smooth" });
  }
  function scrollDown() {
    scrollRef.current?.scrollBy({ top: 120, behavior: "smooth" });
  }

  if (!book.fullSynopsisHeading || !book.fullSynopsis) {
    return (
      <p className="mt-5 font-body text-sm leading-relaxed text-muted">{t(book.synopsis)}</p>
    );
  }

  return (
    <div className="mt-10 text-left">
      <div className="flex items-center gap-2">
        <span className="text-gold-soft">
          <QuoteIcon />
        </span>
        <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">{t(ui.synopsisLabel)}</p>
      </div>

      <button
        type="button"
        onClick={scrollUp}
        disabled={!canScrollUp}
        className={`mt-1 flex w-full justify-center text-gold-soft transition-colors hover:text-red-soft ${
          canScrollUp ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Scroll up"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

      <div ref={scrollRef} className={`gold-scrollbar mt-3 ${maxHeightClass} overflow-y-auto pr-2`}>
        <p className="font-display text-lg text-red-soft">{t(book.fullSynopsisHeading)}</p>
        <div className="mt-4 flex flex-col gap-4">
          {book.fullSynopsis.map((p, i) => (
            <p key={i} className="font-body text-sm leading-relaxed text-muted sm:text-base">
              {t(p)}
            </p>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollDown}
        disabled={!canScrollDown}
        className={`mt-2 flex w-full justify-center text-gold-soft transition-colors hover:text-red-soft ${
          canScrollDown ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Scroll down"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}