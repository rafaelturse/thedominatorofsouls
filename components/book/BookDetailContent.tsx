"use client";

import { useCallback, useState } from "react";
import type { Book } from "@/lib/data";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import { BookIcon } from "@/lib/icons";
import { TAG_PANEL_LABELS, getTaggedItems } from "@/lib/tagged";
import Hero from "@/components/page/Hero";
import GenreStrip from "@/components/sessions/GenreStrip";
import BookInfo from "@/components/book/BookInfo";
import Collection from "@/components/collection/Collection";
import ExploreLinks from "@/components/link/ExploreLinks";
import Reader from "@/components/reader/Reader";
import TagPanel from "@/components/tags/TagPanel";

export default function BookDetailContent({ book }: { book: Book }) {
  const { t, ui } = useLanguage();
  const [sampleOpen, setSampleOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<LocalizedString | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const closePanel = useCallback(() => setPanelOpen(false), []);

  function handleTagClick(tag: LocalizedString) {
    setActiveTag(tag);
    setPanelOpen(true);
  }

  return (
    <div>
      <Hero />
      <GenreStrip />

      <div className="relative z-10 mx-auto max-w-6xl mt-30 px-5 pb-20 pt-6 sm:pb-28 sm:pt-8">
        <div id="book-details" className="flex items-center gap-2 scroll-mt-24">
          <span className="text-gold-soft">
            <BookIcon />
          </span>
          <h1 className="font-display uppercase text-lg text-ink">{t(ui.bookDetailsTitle)}</h1>
        </div>

        <div className="mt-4 rounded-3xl bg-card p-6 shadow-card sm:p-10">
          <BookInfo
            book={book}
            showSampleButton
            onReadSample={() => setSampleOpen(true)}
            onTagClick={handleTagClick}
          />
        </div>

        <div className="mt-22">
          <Collection currentSlug={book.slug} />
        </div>

        <ExploreLinks count={4} />
      </div>

      {sampleOpen && (
        <Reader book={book} onClose={() => setSampleOpen(false)} />
      )}

      <TagPanel
        open={panelOpen}
        tag={activeTag ? t(activeTag) : null}
        items={activeTag ? getTaggedItems(activeTag, t) : []}
        onClose={closePanel}
        heading={t(TAG_PANEL_LABELS.heading)}
        emptyMessage={t(TAG_PANEL_LABELS.empty)}
        closeLabel={t(TAG_PANEL_LABELS.close)}
      />
    </div>
  );
}