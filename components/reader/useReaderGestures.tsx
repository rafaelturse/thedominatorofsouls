"use client";

import { useRef, useState, type TouchEvent, type WheelEvent } from "react";

const GESTURE_COOLDOWN_MS = 10;
const WHEEL_ACCUM_THRESHOLD = 20;
const TOUCH_THRESHOLD = 40;
const SLIDE_DURATION_MS = 200;

type ReaderGesturesParams = {
  spread: number;
  totalSpreads: number;
  goPrev: () => void;
  goNext: () => void;
};

export function useReaderGestures({ spread, totalSpreads, goPrev, goNext }: ReaderGesturesParams) {
  const [dragX, setDragX] = useState(0);
  const [dragAnimated, setDragAnimated] = useState(false);
  const isDragging = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const lastGestureAt = useRef(0);
  const wheelAccum = useRef(0);
  const wheelResetTimer = useRef<number | null>(null);

  function canGesture() {
    const now = Date.now();
    if (now - lastGestureAt.current < GESTURE_COOLDOWN_MS) return false;
    lastGestureAt.current = now;
    return true;
  }

  function onWheel(e: WheelEvent) {
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

  function onTouchStart(e: TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
    setDragAnimated(false);
  }

  function onTouchMove(e: TouchEvent) {
    if (!isDragging.current || touchStartX.current === null) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    setDragX(delta);
  }

  function slideTo(direction: "next" | "prev", width: number) {
    const exitX = direction === "next" ? -width : width;
    const enterX = -exitX;

    setDragAnimated(true);
    setDragX(exitX);
    window.setTimeout(() => {
      if (direction === "next") goNext();
      else goPrev();
      setDragAnimated(false);
      setDragX(enterX);
      requestAnimationFrame(() => {
        setDragAnimated(true);
        setDragX(0);
      });
    }, SLIDE_DURATION_MS);
  }

  function onTouchEnd() {
    if (touchStartX.current === null) return;
    isDragging.current = false;

    const width = containerRef.current?.offsetWidth ?? 320;
    const canGoNext = dragX < -TOUCH_THRESHOLD && spread < totalSpreads - 1;
    const canGoPrev = dragX > TOUCH_THRESHOLD && spread > 0;

    if (canGoNext) {
      slideTo("next", width);
    } else if (canGoPrev) {
      slideTo("prev", width);
    } else {
      setDragAnimated(true);
      setDragX(0);
    }

    touchStartX.current = null;
  }

  return {
    containerRef,
    dragX,
    dragAnimated,
    handlers: { onWheel, onTouchStart, onTouchMove, onTouchEnd },
  };
}