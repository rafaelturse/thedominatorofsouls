"use client";

import { useLanguage } from "@/lib/i18n";
import { useRef, useState, useEffect } from "react";
import type { GlossaryCategory } from "@/lib/universe";

type CategoryTabsProps = {
    categories: GlossaryCategory[];
    active: string;
    onSelect: (id: string) => void;
};

export default function CategoryTabs({ categories, active, onSelect }: CategoryTabsProps) {
    const { t } = useLanguage();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    function updateScrollState() {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }

    useEffect(() => {
        updateScrollState();
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener("scroll", updateScrollState);
        window.addEventListener("resize", updateScrollState);
        return () => {
            el.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, [categories.length]);

    function scrollByAmount(amount: number) {
        scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
    }

    return (
        <div className="relative mx-auto flex max-w-fit items-center gap-2">
            <div className="flex w-6 shrink-0 justify-center">
                {canScrollLeft && (
                    <button
                        type="button"
                        onClick={() => scrollByAmount(-140)}
                        className="flex h-6 w-6 items-center justify-center text-gold-soft transition-colors hover:text-red-soft"
                        aria-label="Scroll left"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 6l-6 6 6 6" />
                        </svg>
                    </button>
                )}
            </div>

            <div
                ref={scrollRef}
                className="no-scrollbar flex min-w-0 flex-1 gap-6 overflow-x-auto"
            >
                {categories.map((cat) => {
                    const isActive = cat.id === active;
                    return (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => onSelect(cat.id)}
                            className={`flex shrink-0 flex-col items-center gap-2 whitespace-nowrap pb-2 font-body text-xs uppercase tracking-[0.2em] transition-colors ${isActive ? "text-gold-soft" : "text-muted hover:text-gold-soft"
                                }`}
                        >
                            <span>{t(cat.label)}</span>
                            <span className={`h-px w-full transition-colors ${isActive ? "bg-gold-soft" : "bg-transparent"}`} />
                        </button>
                    );
                })}
            </div>

            <div className="flex w-6 shrink-0 justify-center">
                {canScrollRight && (
                    <button
                        type="button"
                        onClick={() => scrollByAmount(140)}
                        className="flex h-6 w-6 items-center justify-center text-gold-soft transition-colors hover:text-red-soft"
                        aria-label="Scroll right"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 6l6 6-6 6" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}