"use client";

import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import PlatformLinks from "./PlatformLinks";

type PlatformCalloutProps = {
    book: Book;
    className?: string;
    openUp?: boolean;
};

export default function PlatformCallout({ book, className = "mt-6", openUp = false }: PlatformCalloutProps) {
    const { t, ui } = useLanguage();

    return (
        <div className={`${className} flex w-full flex-col items-center gap-2`}>
            <p className="cursor-default font-accent text-2xl text-gold-soft transition-colors duration-300 hover:text-red-soft">
                {t(ui.checkItAt)}
            </p>
            <PlatformLinks
                stores={book.stores ?? []}
                align="center"
                size="lg"
                linkTo="book"
                showCaptions
                openUp={openUp}
            />
        </div>
    );
}