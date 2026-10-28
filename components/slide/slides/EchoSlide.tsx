"use client";

import { useLanguage, type LocalizedString } from "@/lib/i18n";
import { SLIDE_IMAGE_HEIGHT } from "./slideLayout";
import SlideTags from "./SlideTags";

type EchoSlideProps = {
    cover: string;
    title: LocalizedString;
    date: LocalizedString;
    category: LocalizedString;
    excerpt: LocalizedString;
    tags: LocalizedString[];
};

export default function EchoSlide({ cover, title, date, category, excerpt, tags }: EchoSlideProps) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className={`${SLIDE_IMAGE_HEIGHT} w-full shrink-0 overflow-hidden rounded-2xl sm:w-56`}>
                <img
                    src={cover}
                    alt={t(title)}
                    className="h-full w-full object-cover"
                    draggable={false}
                />
            </div>

            <div className="flex flex-1 flex-col">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">
                        {t(date)}
                    </span>
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-red-soft">
                        {t(category)}
                    </span>
                </div>

                <h3 className="mt-3 font-display text-xl text-ink sm:text-2xl">{t(title)}</h3>

                <p className="mt-2 font-body text-sm leading-relaxed text-muted sm:text-base">
                    {t(excerpt)}
                </p>

                <SlideTags tags={tags.map((tag) => t(tag))} />
            </div>
        </div>
    );
}