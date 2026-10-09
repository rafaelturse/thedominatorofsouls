"use client";

import { useEffect } from "react";

type ReaderKeyboardParams = {
  goPrev: () => void;
  goNext: () => void;
  onClose: () => void;
};

export function useReaderKeyboard({ goPrev, goNext, onClose }: ReaderKeyboardParams) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isArrow = e.key === "ArrowLeft" || e.key === "ArrowRight";
      if (isArrow && target?.closest('[role="slider"]')) return;

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
  }, [goPrev, goNext, onClose]);
}