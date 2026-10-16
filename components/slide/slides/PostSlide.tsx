"use client";

import { useLanguage } from "@/lib/i18n";
import type { BlogPost } from "@/lib/blog";
import { SLIDE_IMAGE_HEIGHT } from "./slideLayout";
import SlideTags from "./SlideTags";

export default function PostSlide({ post }: { post: BlogPost }) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className={`${SLIDE_IMAGE_HEIGHT} w-full shrink-0 overflow-hidden rounded-2xl sm:w-56`}>
                <img
                    src={post.cover}
                    alt={t(post.title)}
                    className="h-full w-full object-cover"
                    draggable={false}
                />
            </div>

            <div className="flex flex-1 flex-col">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">
                        {t(post.date)}
                    </span>
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-red-soft">
                        {t(post.category)}
                    </span>
                </div>

                <h3 className="mt-3 font-display text-xl text-ink sm:text-2xl">{t(post.title)}</h3>

                <p className="mt-2 font-body text-sm leading-relaxed text-muted sm:text-base">
                    {t(post.excerpt)}
                </p>

                <SlideTags tags={post.tags.map((tag) => t(tag))} />
            </div>
        </div>
    );
}