import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog";
import BlogPostContent from "@/components/blog/BlogPostContent";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}