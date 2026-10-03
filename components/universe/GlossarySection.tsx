"use client";

import { useState } from "react";
import { books } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { GLOSSARY_BY_BOOK } from "@/lib/universe";
import { QuoteIcon } from "@/lib/icons";
import GlossaryWarning from "@/components/universe/GlossaryWarning";
import CollectionStrip from "@/components/CollectionStrip";

export default function GlossarySection() {
    const { t } = useLanguage();
    const booksWithGlossary = books.filter((b) => GLOSSARY_BY_BOOK[b.slug]);
    const [selectedSlug, setSelectedSlug] = useState(booksWithGlossary[0]?.slug ?? "");

    const selectedBook = booksWithGlossary.find((b) => b.slug === selectedSlug);
    const terms = GLOSSARY_BY_BOOK[selectedSlug] ?? [];

    if (booksWithGlossary.length === 0) return null;

    function handleSelectBook(slug: string) {
        setSelectedSlug(slug);
        document.getElementById("glossary-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return (
        <div>
            <GlossaryWarning />

            <CollectionStrip
                books={books}
                currentSlug={selectedSlug}
                onSelectBook={(book) => handleSelectBook(book.slug)}
            />

            {selectedBook && (
                <div
                    id="glossary-content"
                    className="mt-8 scroll-mt-24 rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-10"
                    style={{ backgroundColor: "#111" }}
                >
                    <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                        {terms.map((entry, i) => (
                            <div key={i} className="flex gap-3">
                                <span className="mt-1 text-gold-soft">
                                    <QuoteIcon size={14} />
                                </span>
                                <div>
                                    <p className="font-display text-lg text-red-soft">{t(entry.term)}</p>
                                    <p className="mt-1 font-body text-sm leading-relaxed text-muted">
                                        {t(entry.definition)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}