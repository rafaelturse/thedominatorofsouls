"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { PagesIcon, CalendarIcon, AuthorIcon, MoreIcon } from "@/lib/icons";
import { EXTERNAL_LINKS, ROUTES } from "@/lib/routes";

type BookDetailsProps = {
  book: Book;
  hideMore?: boolean;
};

export default function BookDetails({ book, hideMore = false }: BookDetailsProps) {
  const { t, ui } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const items = [
    book.pageCount
      ? {
        icon: PagesIcon,
        label: `${book.pageCount} ${t(ui.pagesSuffix)}`,
        href: undefined,
        external: false,
        linksAway: false,
      }
      : null,
    {
      icon: CalendarIcon,
      label: `${t(ui.publishedOn)} ${t(book.release)}`,
      href: undefined,
      external: false,
      linksAway: false,
    },
    {
      icon: AuthorIcon,
      label: t(ui.aboutAuthor),
      href: EXTERNAL_LINKS.authorSite,
      external: true,
      linksAway: true,
    },
    hideMore
      ? null
      : {
        icon: MoreIcon,
        label: t(ui.more),
        href: ROUTES.bookDetail(book.slug),
        external: false,
        linksAway: true,
      },
  ].filter(Boolean) as {
    icon: typeof PagesIcon;
    label: string;
    href?: string;
    external: boolean;
    linksAway: boolean;
  }[];

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [items.length]);

  function scrollByAmount(amount: number) {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div className="mt-6 flex items-center gap-2 border-t border-line py-5">
      <div className="flex w-6 shrink-0 justify-center">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollByAmount(-160)}
            className="flex h-6 w-6 items-center justify-center text-gold-soft transition-colors hover:text-red-soft"
            aria-label="Scroll left"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
        )}
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex flex-1 items-start gap-10 overflow-x-auto scroll-smooth px-1"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const content = (
            <div
              className={`flex shrink-0 flex-col items-center gap-2 transition-all duration-300 ${item.href === ROUTES.bookDetail(book.slug)
                  ? "text-red-soft hover:scale-105 hover:text-gold-soft"
                  : item.linksAway
                    ? "text-muted hover:scale-105 hover:text-gold-soft"
                    : "text-muted hover:text-gold-soft"
                }`}
            >
              <Icon />
              <span className="whitespace-nowrap font-body text-xs uppercase tracking-[0.1em]">
                {item.label}
              </span>
            </div>
          );

          if (!item.href) {
            return <div key={item.label}>{content}</div>;
          }

          return item.external ? (
            <Link key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
              {content}
            </Link>
          ) : (
            <Link key={item.label} href={item.href}>
              {content}
            </Link>
          );
        })}
      </div>

      <div className="flex w-6 shrink-0 justify-center">
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollByAmount(160)}
            className="flex h-6 w-6 items-center justify-center text-gold-soft transition-colors hover:text-red-soft"
            aria-label="Scroll right"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}