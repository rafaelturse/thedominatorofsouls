"use client";

import Hero from "@/components/Hero";
import PageHeader from "@/components/PageHeader";
import BlogPostCard from "@/components/blog/BlogPostCard";
import ExploreLinks from "@/components/ExploreLinks";
import { BLOG_POSTS } from "@/lib/blog";
import { useLanguage } from "@/lib/i18n";

export default function BlogPage() {
  const { ui } = useLanguage();

  return (
    <div>
      <Hero />
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-6 sm:pb-20 sm:pt-8">
        <PageHeader
          title={ui.blogPageTitle}
          heading={ui.blogHeading}
          subtitle={ui.blogSubtitle}
        />

        <div className="mt-16 flex flex-col gap-8">
          {BLOG_POSTS.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        <ExploreLinks count={4} />
      </div>
    </div>
  );
}