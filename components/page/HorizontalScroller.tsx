"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function HorizontalScroller({ children }: { children: ReactNode }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        function update() {
            if (!el) return;
            setCanScrollLeft(el.scrollLeft > 4);
            setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
        }

        update();
        el.addEventListener("scroll", update);
        const observer = new ResizeObserver(update);
        observer.observe(el);
        if (el.firstElementChild) observer.observe(el.firstElementChild);

        return () => {
            el.removeEventListener("scroll", update);
            observer.disconnect();
        };
    }, []);

    function scrollByAmount(amount: number) {
        scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
    }

    return (
        <div className="relative flex items-center gap-2">
            <div className="flex w-6 shrink-0 justify-center">
                {canScrollLeft && (
                    <button
                        type="button"
                        onClick={() => scrollByAmount(-200)}
                        className="flex h-6 w-6 cursor-pointer items-center justify-center text-gold-soft transition-colors hover:text-red-soft"
                        aria-label="Scroll left"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 6l-6 6 6 6" />
                        </svg>
                    </button>
                )}
            </div>

            <div ref={scrollRef} className="no-scrollbar min-w-0 flex-1 overflow-x-auto">
                <div className="mx-auto flex w-max gap-8">{children}</div>
            </div>

            <div className="flex w-6 shrink-0 justify-center">
                {canScrollRight && (
                    <button
                        type="button"
                        onClick={() => scrollByAmount(200)}
                        className="flex h-6 w-6 cursor-pointer items-center justify-center text-gold-soft transition-colors hover:text-red-soft"
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