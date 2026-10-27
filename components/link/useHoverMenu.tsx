"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

const CLOSE_DELAY_MS = 150;

export function useHoverMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const mouseInside = useRef(false);

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const close = useCallback(() => {
    cancelClose();
    setOpen(false);
  }, [cancelClose]);

  const onPointerEnter = useCallback(
    (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      mouseInside.current = true;
      cancelClose();
      setOpen(true);
    },
    [cancelClose],
  );

  const onPointerLeave = useCallback(
    (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      mouseInside.current = false;
      cancelClose();
      closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
    },
    [cancelClose],
  );

  const onTriggerClick = useCallback(() => {
    cancelClose();
    setOpen((current) => (mouseInside.current ? true : !current));
  }, [cancelClose]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: globalThis.PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) close();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  useEffect(() => cancelClose, [cancelClose]);

  return {
    open,
    close,
    containerRef,
    containerProps: { ref: containerRef, onPointerEnter, onPointerLeave },
    onTriggerClick,
  };
}