"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import type { Book } from "@/lib/books";
import { useLanguage } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";
import CollectionCard from "./CollectionCard";

export type BookItemMode = "home" | "universe" | "store";

type BookCollectionItemProps = {
  book: Book;
  mode: BookItemMode;
  isCurrent: boolean;
  featuredSlug?: string;
  onActivate?: (book: Book) => void;
  className?: string;
};

export default function BookCollectionItem({
  book,
  mode,
  isCurrent,
  featuredSlug,
  onActivate,
  className,
}: BookCollectionItemProps) {
  const { t } = useLanguage();
  const isComingSoon = book.comingSoon ?? !book.cover;
  const hasCover = !!book.cover;

  const card = (
    <CollectionCard
      src={book.cover ? t(book.cover) : undefined}
      alt={t(book.title)}
      label={t(book.volumeLabel)}
      isComingSoon={isComingSoon}
      isCurrent={isCurrent}
      showSoonOverlay={mode !== "universe"}
    />
  );

  if (mode === "universe") {
    if (!hasCover) return <div className={className}>{card}</div>;
    return (
      <Link
        href="#"
        className={className}
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          onActivate?.(book);
        }}
      >
        {card}
      </Link>
    );
  }

  if (mode === "home") {
    const isActionable = book.slug === featuredSlug || hasCover;
    if (!isActionable) return <div className={className}>{card}</div>;
    return (
      <Link
        href={ROUTES.bookDetail(book.slug)}
        className={className}
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          onActivate?.(book);
          document.getElementById("spotlight-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        {card}
      </Link>
    );
  }

  const isClickable = !isComingSoon && hasCover;

  return isClickable ? (
    <Link href={ROUTES.bookDetail(book.slug)} className={className}>
      {card}
    </Link>
  ) : (
    <div className={className}>{card}</div>
  );
}