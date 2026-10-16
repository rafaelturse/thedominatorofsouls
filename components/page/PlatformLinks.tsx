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
};

const AMAZON_LOGO = COMMUNITY_PLATFORMS.find((p) => p.id === "amazon")?.image;

const AUTHOR_SLUG = "Rafael-Turse";
const AUTHOR_ID = "B0HHFVRC7S";

function authorPageUrl(store: Store, locale: Locale) {
    const bookUrl = store.href[locale];
    try {
        const host = new URL(bookUrl).hostname;
        return `https://${host}/stores/${AUTHOR_SLUG}/author/${AUTHOR_ID}`;
    } catch {
        return bookUrl;
    }
}

const buttonClass =
    "flex h-11 cursor-pointer items-center gap-2 px-4 transition-transform duration-300 ease-out hover:-translate-y-1";

export default function PlatformLinks({
    stores,
    spotifyHref = EXTERNAL_LINKS.spotify,
}: PlatformLinksProps) {
    const { t, ui, locale } = useLanguage();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

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

    return (
        <div className="flex items-center gap-0">
            <div ref={ref} className="relative">
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    aria-label="Amazon"
                    className={`${buttonClass} ${open ? "-translate-y-1" : ""}`}
                >
                    {AMAZON_LOGO ? (
                        <img src={AMAZON_LOGO} alt="" className="h-5 w-auto object-contain" />
                    ) : (
                        <span className="font-body text-xs uppercase tracking-[0.15em] text-ink">Amazon</span>
                    )}
                </button>

                {open && (
                    <div
                        role="menu"
                        className="gold-scrollbar absolute left-1/2 top-full z-20 mt-2 max-h-72 w-64 -translate-x-1/2 overflow-y-auto border border-line bg-bg shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] sm:left-auto sm:right-0 sm:translate-x-0"
                    >
                        {stores.map((store, i) => (
                            <Link
                                key={i}
                                href={authorPageUrl(store, locale)}
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
                <SpotifyIcon size={22} />
            </Link>
        </div>
    );
}