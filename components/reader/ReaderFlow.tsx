"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import type { LocalizedString } from "@/lib/i18n";

type ReaderFlowProps = {
  paragraphs: LocalizedString[];
  pageIndex: number;
  onPageCountChange: (count: number) => void;
};

const GAP_PX = 56;
const DESKTOP_BREAKPOINT = 1024;

export default function ReaderFlow({ paragraphs, pageIndex, onPageCountChange }: ReaderFlowProps) {
  const { t, locale } = useLanguage();
  const viewportRef = useRef<HTMLDivElement>(null);
  const measurerRef = useRef<HTMLDivElement>(null);

  const [columnsPerScreen, setColumnsPerScreen] = useState(1);
  const [columnPages, setColumnPages] = useState<LocalizedString[][]>([]);

  const translated = paragraphs.map((p) => t(p));

  function measureAndPaginate() {
    const viewport = viewportRef.current;
    const measurer = measurerRef.current;
    if (!viewport || !measurer) return;

    const viewportWidth = viewport.clientWidth;
    const viewportHeight = viewport.clientHeight;
    const cols = viewportWidth >= DESKTOP_BREAKPOINT ? 2 : 1;
    const colWidth = (viewportWidth - GAP_PX * (cols - 1)) / cols;

    measurer.style.width = `${colWidth}px`;

    const pages: LocalizedString[][] = [];
    let currentIndices: number[] = [];

    function heightOf(indices: number[]) {
      if (!measurer) return 0;
      measurer.innerHTML = indices
        .map((i) => `<p class="mb-4">${translated[i].replace(/</g, "&lt;")}</p>`)
        .join("");
      return measurer.scrollHeight;
    }

    for (let i = 0; i < paragraphs.length; i++) {
      const attempt = [...currentIndices, i];
      if (heightOf(attempt) > viewportHeight && currentIndices.length > 0) {
        pages.push(currentIndices.map((idx) => paragraphs[idx]));
        currentIndices = [i];
      } else {
        currentIndices = attempt;
      }
    }
    if (currentIndices.length > 0) {
      pages.push(currentIndices.map((idx) => paragraphs[idx]));
    }

    setColumnsPerScreen(cols);
    setColumnPages(pages);
  }

  useEffect(() => {
    measureAndPaginate();

    const observer = new ResizeObserver(() => measureAndPaginate());
    if (viewportRef.current) observer.observe(viewportRef.current);

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => measureAndPaginate());
    }

    return () => observer.disconnect();
  }, [locale, paragraphs]);

  useEffect(() => {
    const totalScreens = Math.max(1, Math.ceil(columnPages.length / columnsPerScreen));
    onPageCountChange(totalScreens);
  }, [columnPages, columnsPerScreen]);

  const startIdx = pageIndex * columnsPerScreen;
  const leftColumn = columnPages[startIdx];
  const rightColumn = columnsPerScreen === 2 ? columnPages[startIdx + 1] : undefined;

  return (
    <div ref={viewportRef} className="relative h-full w-full overflow-hidden">
      <div
        ref={measurerRef}
        aria-hidden
        className="pointer-events-none absolute font-body text-sm leading-relaxed sm:text-base"
        style={{ visibility: "hidden", top: 0, left: -99999, height: "auto" }}
      />

      <div className="flex h-full w-full" style={{ gap: `${GAP_PX}px` }}>
        {leftColumn && (
          <div className="h-full flex-1 overflow-hidden text-left font-body text-sm leading-relaxed text-muted sm:text-base">
            {leftColumn.map((para, i) => (
              <p key={i} className="mb-4">
                {t(para)}
              </p>
            ))}
          </div>
        )}
        {rightColumn && (
          <div className="hidden h-full flex-1 overflow-hidden text-left font-body text-sm leading-relaxed text-muted sm:text-base lg:block">
            {rightColumn.map((para, i) => (
              <p key={i} className="mb-4">
                {t(para)}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}