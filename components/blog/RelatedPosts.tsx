"use client";

import { useState, useEffect } from "react";
import { BLOG_POSTS } from "@/lib/blog";
import { useLanguage } from "@/lib/i18n";
import { NewsIcon } from "@/lib/icons";
import BlogPostCard from "@/components/blog/BlogPostCard";

type RelatedPostsProps = {
  currentSlug: string;
  count?: number;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function RelatedPosts({ currentSlug, count = 2 }: RelatedPostsProps) {
  const { t, ui } = useLanguage();
  const [posts, setPosts] = useState<typeof BLOG_POSTS>([]);

  useEffect(() => {
    const candidates = BLOG_POSTS.filter((p) => p.slug !== currentSlug);
    setPosts(shuffle(candidates).slice(0, count));
  }, [currentSlug, count]);

  if (posts.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <span className="text-gold-soft">
          <NewsIcon />
        </span>
        <h1 className="font-display uppercase text-lg text-ink">{t(ui.blogRelatedTitle)}</h1>
      </div>

      <div className="mt-6 flex flex-col gap-8">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}