"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { QuoteIcon } from "@/lib/icons";
import TagPanelFooter from "./TagPanelFooter";

export type TagPanelItem = {
    id: string;
    href: string;
    title: string;
    excerpt?: string;
    date?: string;
    cover?: string;
    category?: string;
};

type TagPanelProps = {
    open: boolean;
    tag: string | null;
    items: TagPanelItem[];
    onClose: () => void;
    heading: string;
    emptyMessage: string;
    closeLabel: string;
};

const TRANSITION_MS = 300;

export default function TagPanel({
    open,
    tag,
    items,
    onClose,
    heading,
    emptyMessage,
    closeLabel,
}: TagPanelProps) {
    const [mounted, setMounted] = useState(false);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        if (open) {
            setMounted(true);
            const frame = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
            return () => cancelAnimationFrame(frame);
        }
        setShown(false);
        const timer = window.setTimeout(() => setMounted(false), TRANSITION_MS);
        return () => window.clearTimeout(timer);
    }, [open]);

    useEffect(() => {
        if (!mounted) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [mounted]);

    useEffect(() => {
        if (!open) return;
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") onClose();
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true" aria-label={heading}>
            <div
                className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${shown ? "opacity-100" : "opacity-0"
                    }`}
                onClick={onClose}
            />

            <aside
                className={`relative h-full w-full border-l border-line bg-black/75 shadow-modal backdrop-blur-xl transition-transform duration-300 ease-out lg:max-w-lg ${shown ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label={closeLabel}
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-red-soft bg-black/60 text-red-soft transition-colors hover:border-gold-soft hover:text-gold-soft"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>

                <div className="h-full overflow-y-auto px-6 pb-10 pt-6 sm:px-8">
                    <div className="pr-14">
                        <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">{heading}</p>
                        <h2 className="mt-2 font-display text-3xl text-ink">
                            <span className="text-red-soft">#</span>
                            {tag}
                        </h2>
                    </div>

                    <div className="mt-8 flex flex-col gap-8">
                        {items.length === 0 ? (
                            <p className="py-10 text-center font-body text-sm uppercase tracking-[0.15em] text-muted">
                                {emptyMessage}
                            </p>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex flex-col gap-2">
                                    <span className="text-gold-soft">
                                        <QuoteIcon size={14} />
                                    </span>
                                    <Link
                                        href={item.href}
                                        onClick={onClose}
                                        className="group flex flex-col overflow-hidden rounded-2xl border border-transparent bg-card/70 transition-colors duration-300 hover:border-red-soft"
                                    >
                                        {item.cover && (
                                            <img
                                                src={item.cover}
                                                alt={item.title}
                                                className="aspect-[16/9] w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                                            />
                                        )}
                                        <div className="p-5">
                                            {(item.date || item.category) && (
                                                <p className="font-body text-[10px] uppercase tracking-[0.25em]">
                                                    {item.date && <span className="text-gold-soft">{item.date}</span>}
                                                    {item.date && item.category && <span className="text-muted"> · </span>}
                                                    {item.category && <span className="text-red-soft">{item.category}</span>}
                                                </p>
                                            )}
                                            <h3 className="mt-2 font-display text-xl text-ink transition-colors duration-300 group-hover:text-gold-soft">
                                                {item.title}
                                            </h3>
                                            {item.excerpt && (
                                                <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-muted">
                                                    {item.excerpt}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>

                    <TagPanelFooter />
                </div>
            </aside>
        </div>
    );
}