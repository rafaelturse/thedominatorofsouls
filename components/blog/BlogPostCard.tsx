import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";
import { MoreIcon } from "@/lib/icons";
import type { BlogPost } from "@/lib/blog";

export default function BlogPostCard({ post }: { post: BlogPost }) {
  const { t, ui } = useLanguage();

  return (
    <div
      className="flex flex-col overflow-hidden rounded-3xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:flex-row"
      style={{ backgroundColor: "#111" }}
    >
      <div className="aspect-[16/9] w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-48">
        <img
          src={post.cover}
          alt={t(post.title)}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">
            {t(post.date)}
          </span>
          <span className="font-body text-xs uppercase tracking-[0.2em] text-red-soft">
            {t(post.category)}
          </span>
        </div>

        <h3 className="mt-5 font-display text-xl text-ink sm:text-2xl">{t(post.title)}</h3>

        <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-muted sm:text-base">
          {t(post.excerpt)}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-red-soft px-2.5 py-0.5 font-body text-[10px] uppercase tracking-[0.1em] text-ink"
            >
              {t(tag)}
            </span>
          ))}
        </div>

        <div className="mt-6 flex justify-end border-t border-line pt-5">
          <Link
            href={ROUTES.blogPost(post.slug)}
            className="flex items-center gap-2 border border-red-soft bg-red-soft px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
          >
            <MoreIcon size={14} />
            {t(ui.blogReadMore)}
          </Link>
        </div>
      </div>
    </div>
  );
}