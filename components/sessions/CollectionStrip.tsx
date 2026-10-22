"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Book } from "@/lib/data";
import type { BookGroup } from "@/lib/collections";
import { useLanguage } from "@/lib/i18n";
import { ArchiveIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";
import HorizontalScroller from "@/components/page/HorizontalScroller";
import ScrollableTabs from "@/components/page/ScrollableTabs";

type CollectionStripProps = {
  books?: Book[];
  groups?: BookGroup[];
  collapsed?: boolean;
  featuredSlug?: string;
  currentSlug?: string;
  onSelectSecondary?: (book: Book) => void;
  onSelectBook?: (book: Book) => void;
};

export default function CollectionStrip({
  books = [],
  groups,
  collapsed = false,
  featuredSlug,
  currentSlug,
  onSelectSecondary,
  onSelectBook,
}: CollectionStripProps) {
  const { t, ui } = useLanguage();

  const isGrouped = !!groups && groups.length > 0;
  const hasTabs = isGrouped && groups.length > 1;

  const [activeId, setActiveId] = useState<string>(() => {
    if (!groups || groups.length === 0) return "";
    const withCurrent = groups.find((g) => g.books.some((b) => b.slug === currentSlug));
    return (withCurrent ?? groups[0]).id;
  });

  useEffect(() => {
    if (!groups || !currentSlug) return;
    const withCurrent = groups.find((g) => g.books.some((b) => b.slug === currentSlug));
    if (withCurrent) setActiveId(withCurrent.id);
  }, [currentSlug, groups]);

  const activeGroup = isGrouped ? (groups.find((g) => g.id === activeId) ?? groups[0]) : null;
  const visibleBooks = activeGroup ? activeGroup.books : books;

  function handleClick(e: React.MouseEvent, book: Book) {
    if (!onSelectSecondary) return;

    e.preventDefault();

    if (book.slug === featuredSlug) {
      onSelectSecondary(book);
      document.getElementById("spotlight-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (!book.cover) {
      return;
    }

    onSelectSecondary(book);
    document.getElementById("spotlight-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSelectBookClick(e: React.MouseEvent, book: Book) {
    if (!onSelectBook) return;
    e.preventDefault();
    if (!book.cover) return;
    onSelectBook(book);
  }

  const itemClass = collapsed ? "w-36 shrink-0 sm:w-40" : undefined;

  function renderBook(book: Book) {
    const isComingSoon = book.comingSoon ?? !book.cover;
    const isCurrent = (onSelectSecondary || onSelectBook) ? book.slug === currentSlug : false;

    const card = (
      <div
        className={`group flex flex-col items-center gap-3 p-2 transition-all duration-300 ${isCurrent ? "-translate-y-2" : ""
          } ${!isComingSoon && book.cover
            ? "hover:-translate-y-1.5 hover:shadow-lift"
            : "opacity-60"
          }`}
      >
        <div className="relative w-full">
          {book.cover ? (
            <>
              <img
                src={t(book.cover)}
                alt={t(book.title)}
                className={`w-full border transition-colors duration-300 ${isCurrent
                  ? "border-gold-soft"
                  : !isComingSoon
                    ? "border-transparent group-hover:border-gold-soft"
                    : "border-transparent"
                  }`}
              />
              {isComingSoon && !onSelectBook && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-red-soft/70 transition-all duration-500 ease-out group-hover:h-full" />
                  <span className="relative z-10 px-2 text-center font-body text-[10px] uppercase tracking-[0.15em] text-muted opacity-0 transition-all duration-300 group-hover:font-bold group-hover:text-gold-soft group-hover:opacity-100">
                    {t(ui.comingSoon)}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="relative flex aspect-[5/8] h-full w-full items-center justify-center overflow-hidden border border-line bg-book-soon px-2 text-center">
              <div className="absolute inset-x-0 bottom-0 h-1 bg-red-soft transition-all duration-500 ease-out group-hover:h-full" />
              <span className="relative z-10 font-body text-[10px] uppercase tracking-[0.15em] text-muted transition-colors duration-300 group-hover:font-bold group-hover:text-gold-soft">
                {t(ui.comingSoon)}
              </span>
            </div>
          )}
        </div>
        <span
          className={`w-full text-center font-body text-xs uppercase leading-tight tracking-[0.15em] transition-colors duration-300 group-hover:text-gold-soft ${isCurrent ? "text-gold-soft" : "text-muted"
            }`}
        >
          {t(book.volumeLabel)}
        </span>
      </div>
    );

    if (onSelectBook) {
      if (!book.cover) {
        return <div key={book.slug} className={itemClass}>{card}</div>;
      }
      return (
        <Link
          key={book.slug}
          href="#"
          className={itemClass}
          onClick={(e) => handleSelectBookClick(e, book)}
        >
          {card}
        </Link>
      );
    }

    if (onSelectSecondary) {
      const isActionable = book.slug === featuredSlug || !!book.cover;

      if (!isActionable) {
        return <div key={book.slug} className={itemClass}>{card}</div>;
      }

      return (
        <Link
          key={book.slug}
          href={ROUTES.bookDetail(book.slug)}
          className={itemClass}
          onClick={(e) => handleClick(e, book)}
        >
          {card}
        </Link>
      );
    }

    const isClickable = !isComingSoon && !!book.cover;

    return isClickable ? (
      <Link key={book.slug} href={ROUTES.bookDetail(book.slug)} className={itemClass}>
        {card}
      </Link>
    ) : (
      <div key={book.slug} className={itemClass}>{card}</div>
    );
  }

  const items = visibleBooks.map(renderBook);

  const list = collapsed ? (
    <HorizontalScroller>{items}</HorizontalScroller>
  ) : (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6">{items}</div>
  );

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-gold-soft">
          <ArchiveIcon />
        </span>
        <h1 className="font-display uppercase text-lg text-ink">{t(ui.collectionTitle)}</h1>
      </div>

      {isGrouped && activeGroup ? (
        <div className="mt-6">
          {hasTabs && (
            <ScrollableTabs
              items={groups.map((g) => ({ id: g.id, label: t(g.name) }))}
              active={activeGroup.id}
              onSelect={setActiveId}
            />
          )}

          <div className={`${hasTabs ? "mt-6" : ""} rounded-3xl bg-card p-6 shadow-card sm:p-10`}>
            <div className="mb-8 border-b border-line pb-5">
              <h2 className="font-display text-2xl text-ink sm:text-3xl">{t(activeGroup.name)}</h2>
              {activeGroup.description && (
                <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-muted">
                  {t(activeGroup.description)}
                </p>
              )}
            </div>

            {visibleBooks.length === 0 ? (
              <p className="py-10 text-center font-body text-sm uppercase tracking-[0.15em] text-muted">
                {activeGroup.emptyMessage ? t(activeGroup.emptyMessage) : t(ui.comingSoon)}
              </p>
            ) : (
              list
            )}
          </div>
        </div>
      ) : (
        <div className="mt-6">{list}</div>
      )}
    </div>
  );
}