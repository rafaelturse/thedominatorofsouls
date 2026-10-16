"use client";

import Link from "next/link";
import { useState } from "react";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { SettingsIcon, MoreIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";
import { TIMELINE_EVENTS } from "@/lib/timeline";
import { BLOG_POSTS } from "@/lib/blog";
import { useAutoSlide } from "./useAutoSlide";
import SlideProgressDot from "./SlideProgressDot";
import BookSlide from "./slides/BookSlide";
import PostSlide from "./slides/PostSlide";
import CoverZoomModal from "./slides/CoverZoomModal";
import { SLIDE_MIN_HEIGHT } from "./slides/slideLayout";
import type { SlideItem } from "./slides/types";

const SLIDE_INTERVAL_MS = 10000;
const POST_SLUGS = ["o-prologo-chega-ao-publico", "novo-modelo-de-capas"];

export default function LastUpdatesSlider({ book }: { book: Book }) {
  const { t, ui } = useLanguage();
  const [zoomOpen, setZoomOpen] = useState(false);

  const bookEvent = TIMELINE_EVENTS[0];

  const postItems: SlideItem[] = POST_SLUGS.flatMap((slug) => {
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) return [];
    return [
      {
        key: `post-${slug}`,
        href: ROUTES.blogPost(slug),
        cta: t(ui.blogReadMore),
        content: <PostSlide post={post} />,
      },
    ];
  });

  const items: SlideItem[] = [
    {
      key: "book",
      href: `${ROUTES.timeline}#timeline-top`,
      cta: t(ui.more),
      content: (
        <BookSlide
          book={book}
          date={t(bookEvent.date)}
          title={t(bookEvent.title)}
          onZoom={() => setZoomOpen(true)}
        />
      ),
    },
    ...postItems,
  ];

  const { active, progress, select, dragHandlers } = useAutoSlide(items.length, SLIDE_INTERVAL_MS);
  const current = items[active] ?? items[0];

  return (
    <div className="mt-16">
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <span className="text-gold-soft">
          <SettingsIcon />
        </span>
        <h1 className="font-display uppercase text-lg text-ink">{t(ui.inTheWorksTitle)}</h1>
      </div>

      <div
        className="mt-6 rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-10"
        style={{ backgroundColor: "#111" }}
      >
        <div
          className="cursor-grab select-none active:cursor-grabbing"
          {...dragHandlers}
        >
          <div className={`flex ${SLIDE_MIN_HEIGHT} flex-col justify-center`}>
            {current.content}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
          <div className="flex items-center gap-3">
            {items.map((item, i) => (
              <SlideProgressDot
                key={item.key}
                isActive={i === active}
                progress={i === active ? progress : 0}
                onClick={() => select(i)}
              />
            ))}
          </div>

          <Link
            href={current.href}
            className="flex items-center gap-2 border border-red-soft bg-red-soft px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
          >
            <MoreIcon size={14} />
            {current.cta}
          </Link>
        </div>
      </div>

      {zoomOpen && book.cover && (
        <CoverZoomModal
          src={t(book.cover)}
          alt={t(book.title)}
          onClose={() => setZoomOpen(false)}
        />
      )}
    </div>
  );
}