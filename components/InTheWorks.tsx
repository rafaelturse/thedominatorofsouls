"use client";

import Link from "next/link";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { SettingsIcon, MoreIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";
import BookCover from "@/components/book/BookCover";

export default function InTheWorks({ book }: { book: Book }) {
    const { t, ui } = useLanguage();

    return (
        <div className="mt-16">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="text-gold-soft">
                    <SettingsIcon />
                </span>
                <h1 className="font-display uppercase text-lg text-ink">{t(ui.inTheWorksTitle)}</h1>
            </div>

            <div
                className="mt-6 rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-10"
                style={{ backgroundColor: "#111" }}
            >
                <div className="flex flex-col items-center gap-10 sm:flex-row-reverse sm:items-start">
                    <BookCover book={book} />

                    <div className="w-full text-center sm:text-left">
                        <p className="font-body text-sm leading-relaxed text-muted sm:text-base">
                            {t(ui.inTheWorksText)}
                        </p>

                        <div className="mt-6 flex justify-center border-t border-line pt-5 sm:justify-start">
                            <Link
                                href={`${ROUTES.timeline}#timeline-top`}
                                className="flex items-center gap-2 border border-red-soft bg-red-soft px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
                            >
                                <MoreIcon size={14} />
                                {t(ui.more)}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}