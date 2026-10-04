"use client";

import Hero from "@/components/Hero";
import PageHeader from "@/components/PageHeader";
import ExploreLinks from "@/components/ExploreLinks";
import ShareIcons from "@/components/blog/ShareIcons";
import { useLanguage } from "@/lib/i18n";
import type { BlogPost } from "@/lib/blog";
import RelatedPosts from "@/components/blog/RelatedPosts";

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const { t, ui } = useLanguage();
  const url = typeof window !== "undefined" ? window.location.href : "";

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

        <div
          className="mt-6 overflow-hidden rounded-3xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
          style={{ backgroundColor: "#111" }}
        >
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
                <span
                  key={i}
                  className="rounded-full bg-red-soft px-2.5 py-0.5 font-body text-[10px] uppercase tracking-[0.1em] text-ink"
                >
                  {t(tag)}
                </span>
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

        <ExploreLinks count={4} />
      </div>
    </div>
  );
}