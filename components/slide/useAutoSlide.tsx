"use client";

import { useState, useEffect, useRef } from "react";

export function useAutoSlide(totalSlides: number, intervalMs: number, initialActive = 0) {
  const [active, setActive] = useState(initialActive);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((a) => (a + 1) % totalSlides);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [totalSlides, intervalMs, active]);

  useEffect(() => {
    startTimeRef.current = Date.now();
    setProgress(0);

    function tick() {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / intervalMs, 1);
      setProgress(pct);
      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, intervalMs]);

  function select(i: number) {
    setActive(i);
  }

  function goNext() {
    setActive((a) => (a + 1) % totalSlides);
  }
  function goPrev() {
    setActive((a) => (a - 1 + totalSlides) % totalSlides);
  }

  const DRAG_THRESHOLD = 50;

  function handlePointerDown(clientX: number) {
    dragStartX.current = clientX;
    isDragging.current = true;
  }
  function handlePointerUp(clientX: number) {
    if (!isDragging.current || dragStartX.current === null) return;
    const delta = clientX - dragStartX.current;
    if (delta > DRAG_THRESHOLD) {
      goPrev();
    } else if (delta < -DRAG_THRESHOLD) {
      goNext();
    }
    isDragging.current = false;
    dragStartX.current = null;
  }
  function cancelDrag() {
    isDragging.current = false;
    dragStartX.current = null;
  }

  return {
    active,
    progress,
    select,
    goNext,
    goPrev,
    dragHandlers: {
      onMouseDown: (e: React.MouseEvent) => handlePointerDown(e.clientX),
      onMouseUp: (e: React.MouseEvent) => handlePointerUp(e.clientX),
      onMouseLeave: cancelDrag,
      onTouchStart: (e: React.TouchEvent) => handlePointerDown(e.touches[0].clientX),
      onTouchEnd: (e: React.TouchEvent) => handlePointerUp(e.changedTouches[0].clientX),
    },
  };
}