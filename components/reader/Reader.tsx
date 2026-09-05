"use client";

import { useState, useEffect, useRef } from "react";
import { SAMPLE_PARAGRAPHS, SAMPLE_CHAPTER_TITLE } from "@/lib/sample-content";
import type { Book } from "@/lib/data";
import ReaderHeader from "./ReaderHeader";
import ReaderNavButton from "./ReaderNavButton";
import ReaderFlow from "./ReaderFlow";
import ReaderCover from "./ReaderCover";
import ReaderTitlePage from "./ReaderTitlePage";
import ReaderEndPage from "./ReaderEndPage";
import ReaderProgress from "./ReaderProgress";

type ReaderProps = {
  book: Book;
  onClose: () => void;
};

const GESTURE_COOLDOWN_MS = 10;
const WHEEL_ACCUM_THRESHOLD = 20;
const TOUCH_THRESHOLD = 40;
const SLIDE_DURATION_MS = 200;
const FRONT_MATTER_COUNT = 2; // 0 = capa, 1 = página de título
const END_MATTER_COUNT = 1; // última = página de encerramento

export default function Reader({ book, onClose }: ReaderProps) {
  const [flowPageCount, setFlowPageCount] = useState(1);
  const totalSpreads = FRONT_MATTER_COUNT + flowPageCount + END_MATTER_COUNT;

  const [spread, setSpread] = useState(0);
  const [isTurning, setIsTurning] = useState(false);

  const [dragX, setDragX] = useState(0);
  const [dragAnimated, setDragAnimated] = useState(false);
  const isDragging = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const lastGestureAt = useRef(0);
  const wheelAccum = useRef(0);
  const wheelResetTimer = useRef<number | null>(null);

  const isCover = spread === 0;
  const isTitlePage = spread === 1;
  const isEndPage = spread === totalSpreads - 1;
  const isTextPage = spread >= FRONT_MATTER_COUNT && !isEndPage;
  const flowPageIndex = Math.min(spread - FRONT_MATTER_COUNT, flowPageCount - 1);

  function clampSpread(s: number) {
    return Math.max(0, Math.min(totalSpreads - 1, s));
  }

  useEffect(() => {
    setIsTurning(true);
    const id = window.setTimeout(() => setIsTurning(false), 10);
    return () => clearTimeout(id);
  }, [spread]);

  function goPrev() {
    setSpread((s) => clampSpread(s - 1));
  }
  function goNext() {
    setSpread((s) => clampSpread(s + 1));
  }

  function handleFlowPageCountChange(count: number) {
    setFlowPageCount(count);
    setSpread((s) => clampSpread(s));
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
    isDragging.current = true;
    setDragAnimated(false);
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isDragging.current || touchStartX.current === null) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    setDragX(delta);
  }

  function handleTouchEnd() {
    if (touchStartX.current === null) return;
    isDragging.current = false;

    const width = containerRef.current?.offsetWidth ?? 320;
    const canGoNext = dragX < -TOUCH_THRESHOLD && spread < totalSpreads - 1;
    const canGoPrev = dragX > TOUCH_THRESHOLD && spread > 0;

    if (canGoNext) {
      setDragAnimated(true);
      setDragX(-width);
      window.setTimeout(() => {
        setSpread((s) => clampSpread(s + 1));
        setDragAnimated(false);
        setDragX(width);
        requestAnimationFrame(() => {
          setDragAnimated(true);
          setDragX(0);
        });
      }, SLIDE_DURATION_MS);
    } else if (canGoPrev) {
      setDragAnimated(true);
      setDragX(width);
      window.setTimeout(() => {
        setSpread((s) => clampSpread(s - 1));
        setDragAnimated(false);
        setDragX(-width);
        requestAnimationFrame(() => {
          setDragAnimated(true);
          setDragX(0);
        });
      }, SLIDE_DURATION_MS);
    } else {
      setDragAnimated(true);
      setDragX(0);
    }

    touchStartX.current = null;
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
          ref={containerRef}
          className="relative flex flex-1 overflow-hidden overscroll-none touch-none"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ReaderNavButton direction="prev" onClick={goPrev} disabled={spread === 0} />

          <div
            className={`h-full w-full min-h-0 ${isTurning ? "opacity-0" : "opacity-100"} ${dragAnimated ? "transition-transform duration-200 ease-out" : ""
              }`}
            style={{ transform: `translateX(${dragX}px)` }}
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0" style={{ visibility: isCover ? "visible" : "hidden" }}>
                <ReaderCover book={book} />
              </div>
              <div className="absolute inset-0" style={{ visibility: isTitlePage ? "visible" : "hidden" }}>
                <ReaderTitlePage book={book} chapterTitle={SAMPLE_CHAPTER_TITLE} />
              </div>
              <div
                className="absolute inset-0 px-12 pb-10 pt-14 sm:px-16 sm:pt-20"
                style={{ visibility: isTextPage ? "visible" : "hidden" }}
              >
                <ReaderFlow
                  paragraphs={SAMPLE_PARAGRAPHS}
                  pageIndex={flowPageIndex}
                  onPageCountChange={handleFlowPageCountChange}
                />
              </div>
              <div className="absolute inset-0" style={{ visibility: isEndPage ? "visible" : "hidden" }}>
                <ReaderEndPage book={book} />
              </div>
            </div>
          </div>

          <ReaderNavButton direction="next" onClick={goNext} disabled={spread === totalSpreads - 1} />
        </div>

        <ReaderProgress spread={spread} totalSpreads={totalSpreads} onChange={setSpread} />
      </div>
    </div>
  );
}