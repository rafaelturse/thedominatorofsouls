"use client";

import { useLanguage } from "@/lib/i18n";
import type { EchoCard } from "@/lib/echoes";
import { SLIDE_IMAGE_HEIGHT } from "./slideLayout";
import SlideTags from "./SlideTags";

export default function EchoSlide({ card }: { card: EchoCard }) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className={`${SLIDE_IMAGE_HEIGHT} w-full shrink-0 overflow-hidden rounded-2xl sm:w-56`}>
                <img
                    src={card.cover}
                    alt={t(card.title)}
                    className="h-full w-full object-cover"
                    draggable={false}
                />
            </div>

            <div className="flex flex-1 flex-col">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-red-soft">
                        {t(card.category)}
                    </span>
                </div>

                <h3 className="mt-3 font-display text-xl text-ink sm:text-2xl">{t(card.title)}</h3>

                <p className="mt-2 font-body text-sm leading-relaxed text-muted sm:text-base">
                    {t(card.excerpt)}
                </p>

                <SlideTags tags={card.tags.map((tag) => t(tag))} />
            </div>
        </div>
    );
}