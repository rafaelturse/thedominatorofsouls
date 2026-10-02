"use client";

import { useLanguage } from "@/lib/i18n";
import { CircleArrowUpIcon } from "@/lib/icons";
import type { TimelineEvent } from "@/lib/timeline";

export default function Timeline({ events }: { events: TimelineEvent[] }) {
    const { t, locale } = useLanguage();

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
                                className={`relative flex items-start sm:items-center ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                                    }`}
                            >
                                <div
                                    className={`flex-1 sm:w-[calc(50%-3rem)] ${isLeft ? "sm:text-right" : "sm:text-left"
                                        }`}
                                >
                                    <div
                                        className="group relative z-10 rounded-3xl border border-transparent p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] transition-colors duration-300 hover:border-red-soft"
                                        style={{
                                            backgroundColor: "#111",
                                            borderLeftColor: !isLeft ? "var(--color-red-soft)" : undefined,
                                            borderLeftWidth: !isLeft ? "3px" : undefined,
                                            borderRightColor: isLeft ? "var(--color-red-soft)" : undefined,
                                            borderRightWidth: isLeft ? "3px" : undefined,
                                        }}
                                    >
                                        <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">
                                            {t(event.date)}
                                        </p>
                                        <h3 className="mt-2 font-display text-xl text-ink">{t(event.title)}</h3>
                                        <div className="mt-2 font-body text-sm leading-relaxed text-muted">
                                            {event.description[locale]}
                                        </div>
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