"use client";

import { SAMPLE_PARAGRAPHS, SAMPLE_CHAPTER_TITLE } from "@/lib/book-content/memories-berdox-vol1-sample-content";
import type { Book } from "@/lib/data";
import ReaderFlow from "./ReaderFlow";
import ReaderCover from "./ReaderCover";
import ReaderTitlePage from "./ReaderTitlePage";
import ReaderEndPage from "./ReaderEndPage";

type ReaderPagesProps = {
  book: Book;
  isCover: boolean;
  isTitlePage: boolean;
  isTextPage: boolean;
  isEndPage: boolean;
  flowPageIndex: number;
  onPageCountChange: (count: number) => void;
  isTurning: boolean;
  dragX: number;
  dragAnimated: boolean;
};

export default function ReaderPages({
  book,
  isCover,
  isTitlePage,
  isTextPage,
  isEndPage,
  flowPageIndex,
  onPageCountChange,
  isTurning,
  dragX,
  dragAnimated,
}: ReaderPagesProps) {
  return (
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
            onPageCountChange={onPageCountChange}
          />
        </div>
        <div className="absolute inset-0" style={{ visibility: isEndPage ? "visible" : "hidden" }}>
          <ReaderEndPage book={book} />
        </div>
      </div>
    </div>
  );
}