"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { SpotifyIcon } from "@/lib/icons";
import { COMMUNITY_PLATFORMS } from "@/lib/community";
import { EXTERNAL_LINKS } from "@/lib/routes";
import type { Store } from "@/lib/books";
import type { Locale } from "@/lib/i18n";

type PlatformLinksProps = {
    stores: Store[];
    spotifyHref?: string;
    align?: "end" | "center";
    size?: "md" | "lg";
    linkTo?: "author" | "book";
    showCaptions?: boolean;
    openUp?: boolean;
};

const AMAZON_LOGO = COMMUNITY_PLATFORMS.find((p) => p.id === "amazon")?.image;

const AUTHOR_SLUG = "Rafael-Turse";
const AUTHOR_ID = "B0HHFVRC7S";

const SIZES = {
    md: { button: "h-11 px-4", logo: "h-5", spotify: 22 },
    lg: { button: "h-14 px-5", logo: "h-8", spotify: 34 },
};

function authorPageUrl(store: Store, locale: Locale) {
    const bookUrl = store.href[locale];
    try {
        const host = new URL(bookUrl).hostname;
        return `https://${host}/stores/${AUTHOR_SLUG}/author/${AUTHOR_ID}`;
    } catch {
        return bookUrl;
    }
}

export default function PlatformLinks({
    stores,
    spotifyHref = EXTERNAL_LINKS.spotify,
    align = "end",
    size = "md",
    linkTo = "author",
    showCaptions = false,
    openUp = false,
}: PlatformLinksProps) {
    const { t, ui, locale } = useLanguage();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const s = SIZES[size];

    const layout = showCaptions ? "flex-col gap-1.5 px-4 py-2" : `${s.button} gap-2`;
    const buttonClass = `group flex ${layout} cursor-pointer items-center transition-transform duration-300 ease-out hover:-translate-y-1`;
    const iconBox = showCaptions ? "flex h-9 items-center justify-center" : "flex items-center";
    const captionClass =
        "font-body text-[10px] text-muted transition-colors duration-300 group-hover:text-gold-soft";

    function storeUrl(store: Store) {
        return linkTo === "book" ? store.href[locale] : authorPageUrl(store, locale);
    }

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKey);
        };
    }, []);

    const itemClass =
        "block cursor-pointer border-b border-line px-4 py-2.5 text-left font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors last:border-none hover:bg-surface hover:text-gold-soft";

    const menuHorizontal =
        align === "center"
            ? "left-1/2 w-56 -translate-x-1/2"
            : "left-1/2 w-64 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0";

    const menuVertical = openUp ? "bottom-full mb-2" : "top-full mt-2";

    return (
        <div className="flex items-start gap-0">
            <div ref={ref} className="relative">
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    aria-label="Amazon"
                    className={`${buttonClass} ${open ? "-translate-y-1" : ""}`}
                >
                    <span className={iconBox}>
                        {AMAZON_LOGO ? (
                            <img src={AMAZON_LOGO} alt="" className={`${s.logo} w-auto object-contain`} />
                        ) : (
                            <span className="font-body text-xs uppercase tracking-[0.15em] text-ink">Amazon</span>
                        )}
                    </span>
                    {showCaptions && <span className={captionClass}>Amazon</span>}
                </button>

                {open && (
                    <div
                        role="menu"
                        onWheel={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                        className={`gold-scrollbar absolute z-20 max-h-72 overflow-y-auto border border-line bg-bg shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] ${menuVertical} ${menuHorizontal}`}
                    >
                        {stores.map((store, i) => (
                            <Link
                                key={i}
                                href={storeUrl(store)}
                                target="_blank"
                                rel="noopener noreferrer"
                                role="menuitem"
                                onClick={() => setOpen(false)}
                                className={itemClass}
                            >
                                {t(store.label)}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <Link
                href={spotifyHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(ui.listenOnSpotify)}
                title={t(ui.listenOnSpotify)}
                className={`${buttonClass} text-spotify`}
            >
                <span className={iconBox}>
                    <SpotifyIcon size={s.spotify} />
                </span>
                {showCaptions && <span className={captionClass}>{t(ui.listenOnSpotify)}</span>}
            </Link>
        </div>
    );
}