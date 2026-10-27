"use client";

import { useCallback, useState } from "react";
import Hero from "@/components/page/Hero";
import PageHeader from "@/components/page/PageHeader";
import BlogPostCard from "@/components/blog/BlogPostCard";
import TagPanel from "@/components/tags/TagPanel";
import type { TagPanelItem } from "@/components/tags/TagPanel";
import ExploreLinks from "@/components/link/ExploreLinks";
import { BLOG_POSTS } from "@/lib/blog";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";

const TAG_PANEL_HEADING: LocalizedString = { "pt-br": "Conteúdo com a tag", en: "Content tagged" };
const TAG_PANEL_EMPTY: LocalizedString = {
  "pt-br": "Nenhum conteúdo com esta tag.",
  en: "No content with this tag.",
};
const TAG_PANEL_CLOSE: LocalizedString = { "pt-br": "Fechar", en: "Close" };

export default function BlogPage() {
  const { t, ui } = useLanguage();
  const [activeTag, setActiveTag] = useState<LocalizedString | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const closePanel = useCallback(() => setPanelOpen(false), []);

  function handleTagClick(tag: LocalizedString) {
    setActiveTag(tag);
    setPanelOpen(true);
  }

  const items: TagPanelItem[] = activeTag
    ? BLOG_POSTS.filter((post) => post.tags.some((tag) => tag.en === activeTag.en)).map((post) => ({
      id: post.slug,
      href: ROUTES.blogPost(post.slug),
      title: t(post.title),
      excerpt: t(post.excerpt),
      date: t(post.date),
      cover: post.cover,
      category: t(post.category),
    }))
    : [];

  return (
    <div>
      <Hero />
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-6 sm:pb-20 sm:pt-8">
        <PageHeader
          title={ui.blogPageTitle}
          heading={ui.blogHeading}
          subtitle={ui.blogSubtitle}
        />

        <div className="mt-16 flex flex-col gap-16">
          {BLOG_POSTS.map((post) => (
            <BlogPostCard key={post.slug} post={post} onTagClick={handleTagClick} />
          ))}
        </div>

        <ExploreLinks count={4} />
      </div>

      <TagPanel
        open={panelOpen}
        tag={activeTag ? t(activeTag) : null}
        items={items}
        onClose={closePanel}
        heading={t(TAG_PANEL_HEADING)}
        emptyMessage={t(TAG_PANEL_EMPTY)}
        closeLabel={t(TAG_PANEL_CLOSE)}
      />
    </div>
  );
}