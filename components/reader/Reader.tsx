"use client";

import { useState, useEffect, useRef } from "react";
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

const GESTURE_COOLDOWN_MS = 10;
const WHEEL_ACCUM_THRESHOLD = 20;
const TOUCH_THRESHOLD = 10;

export default function Reader({ book, onClose }: ReaderProps) {
  const pages = SAMPLE_LOREM_PAGES;
  const totalSpreads = Math.ceil(pages.length / 2);
  const [spread, setSpread] = useState(0);
  const [isTurning, setIsTurning] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const lastGestureAt = useRef(0);
  const wheelAccum = useRef(0);
  const wheelResetTimer = useRef<number | null>(null);

  const leftPage = pages[spread * 2];
  const rightPage = pages[spread * 2 + 1];

  function turnTo(next: number) {
    setIsTurning(true);
    setSpread(next);
    window.setTimeout(() => setIsTurning(false), 10);
  }

  function goPrev() {
    setSpread((s) => {
      const next = Math.max(0, s - 1);
      if (next !== s) turnTo(next);
      return s;
    });
  }
  function goNext() {
    setSpread((s) => {
      const next = Math.min(totalSpreads - 1, s + 1);
      if (next !== s) turnTo(next);
      return s;
    });
  }

  function canGesture() {
    const now = Date.now();
    if (now - lastGestureAt.current < GESTURE_COOLDOWN_MS) return false;
    lastGestureAt.current = now;
    return true;
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

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();

    wheelAccum.current += e.deltaY;

    if (wheelResetTimer.current) clearTimeout(wheelResetTimer.current);
    wheelResetTimer.current = window.setTimeout(() => {
      wheelAccum.current = 0;
    }, 150);

    if (!canGesture()) return;

    if (wheelAccum.current > WHEEL_ACCUM_THRESHOLD) {
      goNext();
      wheelAccum.current = 0;
    } else if (wheelAccum.current < -WHEEL_ACCUM_THRESHOLD) {
      goPrev();
      wheelAccum.current = 0;
    }
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    const horizontal = Math.abs(deltaX) > Math.abs(deltaY);
    const delta = horizontal ? deltaX : deltaY;

    if (Math.abs(delta) > TOUCH_THRESHOLD) {
      if (delta > 0) {
        goPrev();
      } else {
        goNext();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
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
        <ReaderHeader title={book.title} onClose={onClose} />

        <div
          className="relative flex flex-1 items-center overflow-hidden overscroll-none touch-none"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ReaderNavButton direction="prev" onClick={goPrev} disabled={spread === 0} />

          <div
            className={`mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 px-12 py-10 transition-opacity duration-200 ease-out sm:px-16 lg:grid-cols-2 ${
              isTurning ? "opacity-0" : "opacity-100"
            }`}
          >
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