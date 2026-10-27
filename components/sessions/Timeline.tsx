"use client";

import Link from "next/link";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import { CircleArrowUpIcon, MoreIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";
import type { TimelineEvent } from "@/lib/timeline";

type TimelineProps = {
    events: TimelineEvent[];
    onTagClick?: (tag: LocalizedString) => void;
};

const TAG_CLASS =
    "rounded-full border border-red-soft bg-red-soft px-2.5 py-0.5 font-body text-[10px] uppercase tracking-[0.1em] text-ink";

export default function Timeline({ events, onTagClick }: TimelineProps) {
    const { t, locale, ui } = useLanguage();

    function scrollToId(id: string) {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const targetY = window.scrollY + rect.top + rect.height / 20 - window.innerHeight / 20;
        window.scrollTo({ top: targetY, behavior: "smooth" });
    }

    return (
        <div className="relative">
            <div className="absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-red-soft/40" />

            <div className="flex flex-col">
                {events.map((event, i) => {
                    const isLeft = i % 2 === 0;
                    const isLast = i === events.length - 1;
                    const cardId = `timeline-event-${i}`;

                    return (
                        <div key={i}>
                            <div
                                id={cardId}
                                className={`relative scroll-mt-32 flex items-start sm:items-center ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                                    }`}
                            >
                                <div
                                    className={`flex-1 sm:w-[calc(50%-3rem)] ${isLeft ? "sm:text-right" : "sm:text-left"
                                        }`}
                                >
                                    <div
                                        className={`group relative z-10 rounded-3xl border border-transparent bg-card p-6 shadow-card transition-colors duration-300 hover:border-red-soft ${isLeft
                                            ? "border-r-3 border-r-red-soft"
                                            : "border-l-3 border-l-red-soft"
                                            }`}
                                    >
                                        <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">
                                            {t(event.date)}
                                        </p>
                                        <h3 className="mt-2 font-display text-xl text-ink">{t(event.title)}</h3>
                                        <div className="mt-2 font-body text-sm leading-relaxed text-muted">
                                            {event.description[locale]}
                                        </div>

                                        {(event.tags.length > 0 || event.blogSlug) && (
                                            <div className="mt-4 border-t border-line pt-4">
                                                {event.tags.length > 0 && (
                                                    <div
                                                        className={`flex flex-wrap justify-center gap-2 ${isLeft ? "sm:justify-end" : "sm:justify-start"
                                                            }`}
                                                    >
                                                        {event.tags.map((tag, j) =>
                                                            onTagClick ? (
                                                                <button
                                                                    key={j}
                                                                    type="button"
                                                                    onClick={() => onTagClick(tag)}
                                                                    className={`${TAG_CLASS} cursor-pointer transition-colors hover:bg-transparent hover:text-red-soft`}
                                                                >
                                                                    {t(tag)}
                                                                </button>
                                                            ) : (
                                                                <span key={j} className={TAG_CLASS}>
                                                                    {t(tag)}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                )}

                                                {event.blogSlug && (
                                                    <div
                                                        className={`flex justify-center ${isLeft ? "sm:justify-start" : "sm:justify-end"} ${event.tags.length > 0 ? "mt-4" : ""
                                                            }`}
                                                    >
                                                        <Link
                                                            href={ROUTES.blogPost(event.blogSlug)}
                                                            className="flex items-center gap-2 border border-red-soft bg-red-soft px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
                                                        >
                                                            <MoreIcon size={14} />
                                                            {t(ui.more)}
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {!isLast && (
                                <button
                                    type="button"
                                    onClick={() => scrollToId(`timeline-event-${i - 1 >= 0 ? i - 1 : 0}`)}
                                    className="group relative flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 bg-transparent"
                                >
                                    <span className="z-10 text-red-soft transition-colors duration-300 group-hover:text-gold-soft">
                                        <CircleArrowUpIcon size={24} />
                                    </span>
                                    <span className="z-10 rounded-full bg-gold-soft px-3 py-1 font-body text-[10px] uppercase tracking-[0.15em] text-bg transition-colors duration-300 group-hover:bg-red-soft">
                                        {t(events[i + 1].date)}
                                    </span>
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}