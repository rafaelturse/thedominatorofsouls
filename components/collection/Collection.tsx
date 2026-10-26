"use client";

import { useEffect, useMemo, useState } from "react";
import type { Book } from "@/lib/books";
import { bookWorks } from "@/lib/books";
import { ECHOES, echoes } from "@/lib/echoes";
import type { EchoEntry } from "@/lib/echoes";
import { useLanguage } from "@/lib/i18n";
import { ArchiveIcon } from "@/lib/icons";
import HorizontalScroller from "@/components/page/HorizontalScroller";
import ScrollableTabs from "@/components/page/ScrollableTabs";
import BookCollectionItem from "./BookCollectionItem";
import type { BookItemMode } from "./BookCollectionItem";
import EchoCollectionItem from "./EchoCollectionItem";

const ECHOES_TAB = "echoes";

type CollectionProps = {
  collapsed?: boolean;
  featuredSlug?: string;
  currentSlug?: string;
  currentEchoId?: string;
  onSelectSecondary?: (book: Book) => void;
  onSelectBook?: (book: Book) => void;
  onSelectEcho?: (entry: EchoEntry) => void;
};

function findWorkId(slug?: string) {
  if (!slug) return undefined;
  return bookWorks.find((w) => w.books.some((b) => b.slug === slug))?.id;
}

export default function Collection({
  collapsed = false,
  featuredSlug,
  currentSlug,
  currentEchoId,
  onSelectSecondary,
  onSelectBook,
  onSelectEcho,
}: CollectionProps) {
  const { t, ui } = useLanguage();

  const tabs = useMemo(
    () => [
      ...bookWorks.map((work) => ({ id: work.id, label: t(work.name) })),
      { id: ECHOES_TAB, label: t(ECHOES.heading) },
    ],
    [t],
  );

  const [activeId, setActiveId] = useState<string>(() => {
    if (currentEchoId) return ECHOES_TAB;
    return findWorkId(currentSlug) ?? bookWorks[0].id;
  });

  useEffect(() => {
    if (currentEchoId) {
      setActiveId(ECHOES_TAB);
      return;
    }
    const workId = findWorkId(currentSlug);
    if (workId) setActiveId(workId);
  }, [currentSlug, currentEchoId]);

  const isEchoesTab = activeId === ECHOES_TAB;
  const activeWork = bookWorks.find((w) => w.id === activeId) ?? bookWorks[0];

  const mode: BookItemMode = onSelectSecondary ? "home" : onSelectBook ? "universe" : "store";
  const onActivateBook = onSelectSecondary ?? onSelectBook;
  const itemClass = collapsed ? "w-36 shrink-0 sm:w-40" : undefined;

  const items = isEchoesTab
    ? echoes.map((entry) => (
      <EchoCollectionItem
        key={entry.id}
        entry={entry}
        isCurrent={entry.id === currentEchoId}
        onActivate={onSelectEcho}
        className={itemClass}
      />
    ))
    : activeWork.books.map((book) => (
      <BookCollectionItem
        key={book.slug}
        book={book}
        mode={mode}
        isCurrent={mode !== "store" ? book.slug === currentSlug : false}
        featuredSlug={featuredSlug}
        onActivate={onActivateBook}
        className={itemClass}
      />
    ));

  const list = collapsed ? (
    <HorizontalScroller>{items}</HorizontalScroller>
  ) : (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6">{items}</div>
  );

  const title = isEchoesTab ? t(ECHOES.heading) : t(activeWork.name);
  const description = isEchoesTab ? undefined : t(activeWork.description);

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-gold-soft">
          <ArchiveIcon />
        </span>
        <h1 className="font-display uppercase text-lg text-ink">{t(ui.collectionTitle)}</h1>
      </div>

      <div className="mt-6">
        {tabs.length > 1 && (
          <ScrollableTabs items={tabs} active={activeId} onSelect={setActiveId} />
        )}

        <div className={`${tabs.length > 1 ? "mt-6" : ""} rounded-3xl bg-card p-6 shadow-card sm:p-10`}>
          <div className="mb-8 border-b border-line pb-5">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">{title}</h2>
            {description && (
              <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-muted">
                {description}
              </p>
            )}
          </div>

          {items.length === 0 ? (
            <p className="py-10 text-center font-body text-sm uppercase tracking-[0.15em] text-muted">
              {t(ui.comingSoon)}
            </p>
          ) : (
            list
          )}
        </div>
      </div>
    </div>
  );
}