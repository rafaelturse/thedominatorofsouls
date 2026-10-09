"use client";

import { useEffect, useRef, useState } from "react";
import { BAR_COUNT, BAR_MAX } from "./shared";

const TARGET_PITCH = 12;

export function useBarCount() {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(BAR_COUNT);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const next = Math.floor(el.clientWidth / TARGET_PITCH);
      setCount(Math.min(BAR_MAX, Math.max(BAR_COUNT, next)));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, count };
}