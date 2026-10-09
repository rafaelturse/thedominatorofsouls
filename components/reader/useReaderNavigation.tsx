"use client";

import { useCallback, useEffect, useState } from "react";

export const FRONT_MATTER_COUNT = 2;
export const END_MATTER_COUNT = 1;

export function useReaderNavigation() {
  const [flowPageCount, setFlowPageCount] = useState(1);
  const totalSpreads = FRONT_MATTER_COUNT + flowPageCount + END_MATTER_COUNT;

  const [spread, setSpread] = useState(0);
  const [isTurning, setIsTurning] = useState(false);

  const clampSpread = useCallback(
    (s: number) => Math.max(0, Math.min(totalSpreads - 1, s)),
    [totalSpreads],
  );

  useEffect(() => {
    setIsTurning(true);
    const id = window.setTimeout(() => setIsTurning(false), 10);
    return () => clearTimeout(id);
  }, [spread]);

  const goPrev = useCallback(() => setSpread((s) => clampSpread(s - 1)), [clampSpread]);
  const goNext = useCallback(() => setSpread((s) => clampSpread(s + 1)), [clampSpread]);

  function handleFlowPageCountChange(count: number) {
    setFlowPageCount(count);
    setSpread((s) => clampSpread(s));
  }

  const isCover = spread === 0;
  const isTitlePage = spread === 1;
  const isEndPage = spread === totalSpreads - 1;
  const isTextPage = spread >= FRONT_MATTER_COUNT && !isEndPage;
  const flowPageIndex = Math.min(spread - FRONT_MATTER_COUNT, flowPageCount - 1);

  return {
    spread,
    setSpread,
    totalSpreads,
    isTurning,
    isCover,
    isTitlePage,
    isTextPage,
    isEndPage,
    flowPageIndex,
    goPrev,
    goNext,
    handleFlowPageCountChange,
  };
}