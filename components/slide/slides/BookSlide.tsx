"use client";

import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { SearchIcon } from "@/lib/icons";
import { SLIDE_IMAGE_HEIGHT } from "./slideLayout";
import SlideTags from "./SlideTags";

type BookSlideProps = {
    book: Book;
    date: string;
    title: string;
    onZoom: () => void;
};

export default function BookSlide({ book, date, title, onZoom }: BookSlideProps) {
    const { t, ui } = useLanguage();

    return (
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {book.cover && (
                <div className="group flex shrink-0 flex-col items-center gap-2 self-center sm:self-start">
                    <button
                        type="button"
                        onClick={onZoom}
                        className={`block ${SLIDE_IMAGE_HEIGHT} cursor-pointer overflow-hidden rounded-2xl border border-transparent transition-colors duration-300 hover:border-gold-soft`}
                    >
                        <img
                            src={t(book.cover)}
                            alt={t(book.title)}
                            className="h-full w-auto"
                            draggable={false}
                        />
                    </button>
                    <span className="flex items-center gap-1.5 font-body text-[10px] uppercase tracking-[0.15em] text-red-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <SearchIcon size={12} />
                        {t(ui.viewImage)}
                    </span>
                </div>
            )}

            <div className="flex flex-1 flex-col">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">{date}</span>
                    {book.comingSoon && (
                        <span className="font-body text-xs uppercase tracking-[0.2em] text-red-soft">
                            {t(ui.soonBadge)}
                        </span>
                    )}
                </div>

                <h3 className="mt-3 font-display text-xl text-ink sm:text-2xl">{title}</h3>

                <p className="mt-2 font-body text-sm leading-relaxed text-muted sm:text-base">
                    {t(ui.inTheWorksText)}
                </p>

                <SlideTags tags={(book.genres ?? []).map((g) => t(g))} />
            </div>
        </div>
    );
}