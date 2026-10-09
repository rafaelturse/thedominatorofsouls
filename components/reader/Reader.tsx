"use client";

import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import ReaderHeader from "./ReaderHeader";
import ReaderAudioBar from "./ReaderAudioBar";
import ReaderNavButton from "./ReaderNavButton";
import ReaderPages from "./ReaderPages";
import ReaderProgress from "./ReaderProgress";
import { useReaderNavigation } from "./useReaderNavigation";
import { useReaderKeyboard } from "./useReaderKeyboard";
import { useReaderGestures } from "./useReaderGestures";
import { useBodyScrollLock } from "./useBodyScrollLock";

type ReaderProps = {
  book: Book;
  onClose: () => void;
};

export default function Reader({ book, onClose }: ReaderProps) {
  const { locale } = useLanguage();
  const audioSrc = book.openingChapterAudio?.[locale];

  const nav = useReaderNavigation();
  const gestures = useReaderGestures({
    spread: nav.spread,
    totalSpreads: nav.totalSpreads,
    goPrev: nav.goPrev,
    goNext: nav.goNext,
  });

  useReaderKeyboard({ goPrev: nav.goPrev, goNext: nav.goNext, onClose });
  useBodyScrollLock();

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
        <ReaderHeader title={book.title} onClose={onClose} />

        {audioSrc && <ReaderAudioBar src={audioSrc} />}

        <div
          ref={gestures.containerRef}
          className="relative flex flex-1 overflow-hidden overscroll-none touch-none"
          {...gestures.handlers}
        >
          <ReaderNavButton direction="prev" onClick={nav.goPrev} disabled={nav.spread === 0} />

          <ReaderPages
            book={book}
            isCover={nav.isCover}
            isTitlePage={nav.isTitlePage}
            isTextPage={nav.isTextPage}
            isEndPage={nav.isEndPage}
            flowPageIndex={nav.flowPageIndex}
            onPageCountChange={nav.handleFlowPageCountChange}
            isTurning={nav.isTurning}
            dragX={gestures.dragX}
            dragAnimated={gestures.dragAnimated}
          />

          <ReaderNavButton
            direction="next"
            onClick={nav.goNext}
            disabled={nav.spread === nav.totalSpreads - 1}
          />
        </div>

        <ReaderProgress
          spread={nav.spread}
          totalSpreads={nav.totalSpreads}
          onChange={nav.setSpread}
        />
      </div>
    </div>
  );
}