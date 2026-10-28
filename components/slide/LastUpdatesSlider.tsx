"use client";

import Link from "next/link";
import { useState } from "react";
import type { Book } from "@/lib/data";
import { ECHOES } from "@/lib/echoes";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import { SettingsIcon, MoreIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";
import { TIMELINE_EVENTS } from "@/lib/timeline";
import { BLOG_POSTS } from "@/lib/blog";
import { useAutoSlide } from "./useAutoSlide";
import SlideProgressDot from "./SlideProgressDot";
import BookSlide from "./slides/BookSlide";
import PostSlide from "./slides/PostSlide";
import EchoSlide from "./slides/EchoSlide";
import CoverZoomModal from "./slides/CoverZoomModal";
import { SLIDE_MIN_HEIGHT } from "./slides/slideLayout";
import type { SlideItem } from "./slides/types";

const SLIDE_INTERVAL_MS = 10000;
const POST_SLUGS = ["o-prologo-chega-ao-publico", "novo-modelo-de-capas"];
const BOOK_EVENT_TITLE_EN = "Volume 2: The Hunt";

const STAN_ENTRY_ID = "stan-brings";
const STAN_DATE: LocalizedString = { "pt-br": "OUT-26-2026", en: "OCT-26-2026" };

const FORESTFAR_ENTRY_ID = "forestfar-deer";
const FORESTFAR_DATE: LocalizedString = { "pt-br": "OUT-27-2026", en: "OCT-27-2026" };
const FORESTFAR_CATEGORY: LocalizedString = {
  "pt-br": "Uma caçada, dois irmãos",
  en: "A hunt, two brothers",
};
const FORESTFAR_EXCERPT: LocalizedString = {
  "pt-br":
    "Em uma região remota e quase inexplorada, os irmãos Harlob e Jarlt seguem o rastro de um jovem cervo. Famintos, e com o caçula ainda a provar seu valor, eles se aproximam até que a flecha seja disparada e não haja mais volta.",
  en: "In a remote, almost unexplored region, the brothers Harlob and Jarlt follow the trail of a young deer. Starving, and with the youngest still having to prove his worth, they draw closer until the arrow flies and there is no turning back.",
};

export default function LastUpdatesSlider({ book }: { book: Book }) {
  const { t, ui, locale } = useLanguage();
  const [zoomOpen, setZoomOpen] = useState(false);

  const bookEvent =
    TIMELINE_EVENTS.find((e) => e.title.en === BOOK_EVENT_TITLE_EN) ?? TIMELINE_EVENTS[0];

  const stanCard = ECHOES.cards.find((c) => c.entryId === STAN_ENTRY_ID) ?? ECHOES.cards[0];
  const forestfarEntry = ECHOES.entries.find((e) => e.id === FORESTFAR_ENTRY_ID);

  const echoHref = (id: string) => `${ROUTES.echoes}?echo=${encodeURIComponent(id)}#echoes-content`;

  const stanItems: SlideItem[] = stanCard
    ? [
      {
        key: `echo-${stanCard.id}`,
        href: echoHref(stanCard.entryId),
        cta: t(ui.blogReadMore),
        content: (
          <EchoSlide
            cover={stanCard.cover}
            title={stanCard.title}
            date={STAN_DATE}
            category={stanCard.category}
            excerpt={stanCard.excerpt}
            tags={stanCard.tags}
          />
        ),
      },
    ]
    : [];

  const forestfarItems: SlideItem[] =
    forestfarEntry && forestfarEntry.cover
      ? [
        {
          key: `echo-${forestfarEntry.id}`,
          href: echoHref(forestfarEntry.id),
          cta: t(ui.blogReadMore),
          content: (
            <EchoSlide
              cover={t(forestfarEntry.cover)}
              title={forestfarEntry.title}
              date={FORESTFAR_DATE}
              category={FORESTFAR_CATEGORY}
              excerpt={FORESTFAR_EXCERPT}
              tags={forestfarEntry.tags}
            />
          ),
        },
      ]
      : [];

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
    ...stanItems,
    ...forestfarItems,
    {
      key: "book",
      cta: t(ui.blogReadMore),
      disabled: true,
      content: (
        <BookSlide
          book={book}
          date={t(bookEvent.date)}
          title={t(bookEvent.title)}
          description={bookEvent.description[locale]}
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

      <div className="mt-6 rounded-3xl bg-card p-6 shadow-card sm:p-10">
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

          {current.disabled || !current.href ? (
            <span
              aria-disabled="true"
              className="flex cursor-not-allowed items-center gap-2 border border-line px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-muted opacity-50"
            >
              <MoreIcon size={14} />
              {current.cta}
            </span>
          ) : (
            <Link
              href={current.href}
              className="flex items-center gap-2 border border-red-soft bg-red-soft px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
            >
              <MoreIcon size={14} />
              {current.cta}
            </Link>
          )}
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