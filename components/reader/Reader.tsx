"use client";

import { useState, useEffect } from "react";
import { SAMPLE_LOREM_PAGES } from "@/lib/sample-content";
import type { Book } from "@/lib/data";
import ReaderHeader from "./ReaderHeader";
import ReaderNavButton from "./ReaderNavButton";
import ReaderPage from "./ReaderPage";
import ReaderProgress from "./ReaderProgress";

type ReaderProps = {
  book: Book;
  onClose: () => void;
};

export default function Reader({ book, onClose }: ReaderProps) {
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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        goPrev();
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalSpreads, onClose]);

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

        <div className="relative flex flex-1 items-center overflow-hidden">
          <ReaderNavButton direction="prev" onClick={goPrev} disabled={spread === 0} />

          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 overflow-y-auto px-12 py-10 sm:px-16 lg:grid-cols-2">
            <ReaderPage paragraphs={leftPage} />
            {rightPage && <ReaderPage paragraphs={rightPage} hiddenOnMobile />}
          </div>

          <ReaderNavButton direction="next" onClick={goNext} disabled={spread === totalSpreads - 1} />
        </div>

        <ReaderProgress
          spread={spread}
          totalSpreads={totalSpreads}
          totalPages={pages.length}
          hasRightPage={!!rightPage}
          onChange={setSpread}
        />
      </div>
    </div>
  );
}