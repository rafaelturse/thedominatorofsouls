"use client";

import type { ReactNode } from "react";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { SearchIcon } from "@/lib/icons";
import { SLIDE_IMAGE_HEIGHT } from "./slideLayout";

type BookSlideProps = {
    book: Book;
    date: string;
    title: string;
    description: ReactNode;
    onZoom: () => void;
};

export default function BookSlide({ book, date, title, description, onZoom }: BookSlideProps) {
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
                <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">{date}</p>
                <h3 className="mt-2 font-display text-xl text-ink">{title}</h3>
                <div className="mt-2 font-body text-sm leading-relaxed text-muted">{description}</div>
            </div>
        </div>
    );
}