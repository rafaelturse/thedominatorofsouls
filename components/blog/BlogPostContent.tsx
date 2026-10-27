"use client";

import { useCallback, useState } from "react";
import Hero from "@/components/page/Hero";
import PageHeader from "@/components/page/PageHeader";
import ExploreLinks from "@/components/link/ExploreLinks";
import ShareIcons from "@/components/blog/ShareIcons";
import RelatedPosts from "@/components/blog/RelatedPosts";
import TagPanel from "@/components/tags/TagPanel";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import type { BlogPost } from "@/lib/blog";
import { TAG_PANEL_LABELS, getTaggedItems } from "@/lib/tagged";

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const { t, ui } = useLanguage();
  const url = typeof window !== "undefined" ? window.location.href : "";
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

      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-16 pt-6 sm:pb-20 sm:pt-8">
        <PageHeader
          title={ui.blogPageTitle}
          heading={post.title}
        />

        <div className="mt-22 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">
            {t(post.date)}
          </span>
          <span className="rounded-full bg-red-soft px-2.5 py-0.5 font-body text-[10px] uppercase tracking-[0.1em] text-ink">
            {t(post.category)}
          </span>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl bg-card shadow-card">
          <img src={post.cover} alt={t(post.title)} className="aspect-[16/9] w-full object-cover" />

          <div className="p-6 sm:p-10">
            <div className="flex flex-col gap-6">
              {post.content.map((paragraph, i) => (
                <p key={i} className="font-body text-sm leading-relaxed text-muted sm:text-base">
                  {t(paragraph)}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-2 pt-6">
              {post.tags.map((tag, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="cursor-pointer rounded-full bg-red-soft px-2.5 py-0.5 font-body text-[10px] uppercase tracking-[0.1em] text-ink transition-opacity hover:opacity-80"
                >
                  {t(tag)}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-muted">
                {t(ui.blogShareLabel)}
              </span>
              <ShareIcons url={url} title={t(post.title)} />
            </div>
          </div>
        </div>

        <RelatedPosts currentSlug={post.slug} />

        <ExploreLinks count={3} />
      </div>

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