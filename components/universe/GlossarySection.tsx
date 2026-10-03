"use client";

import { useState, useEffect } from "react";
import { books } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { GLOSSARY_BY_BOOK, GLOSSARY_WARNING_TITLE } from "@/lib/universe";
import { QuoteIcon } from "@/lib/icons";
import GlossaryWarning from "@/components/universe/GlossaryWarning";
import CollectionStrip from "@/components/CollectionStrip";
import CategoryTabs from "@/components/universe/CategoryTabs";

export default function GlossarySection() {
    const { t, ui } = useLanguage();
    const booksWithGlossary = books.filter((b) => GLOSSARY_BY_BOOK[b.slug]);
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("");

    const categories = selectedSlug ? GLOSSARY_BY_BOOK[selectedSlug] ?? [] : [];
    const selectedCategory = categories.find((c) => c.id === activeCategory);
    const selectedBook = booksWithGlossary.find((b) => b.slug === selectedSlug);
    const selectedBookCover = selectedBook?.cover ? t(selectedBook.cover) : null;

    useEffect(() => {
        if (categories.length > 0) {
            setActiveCategory(categories[0].id);
        }
    }, [selectedSlug]);

    if (booksWithGlossary.length === 0) return null;

    function handleSelectBook(slug: string) {
        setSelectedSlug(slug);
        document.getElementById("glossary-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return (
        <div>
            <GlossaryWarning />

            <div id="glossary-collection" className="mt-16 scroll-mt-24">
                <CollectionStrip
                    books={books}
                    currentSlug={selectedSlug ?? undefined}
                    onSelectBook={(book) => handleSelectBook(book.slug)}
                />
            </div>

            <div className="mt-16">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <span className="text-gold-soft">
                        <QuoteIcon />
                    </span>
                    <h1 className="font-display uppercase text-lg text-ink">{t(GLOSSARY_WARNING_TITLE)}</h1>
                </div>

                <div
                    id="glossary-content"
                    className="mt-6 scroll-mt-24 rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-10"
                    style={{ backgroundColor: "#111" }}
                >
                    {selectedSlug && categories.length > 0 ? (
                        <div>
                            {selectedBookCover && (
                                <div className="mb-14 flex justify-center">
                                    <img
                                        src={selectedBookCover}
                                        alt=""
                                        className="aspect-[2/3] w-32 object-contain"
                                    />
                                </div>
                            )}

                            <CategoryTabs
                                categories={categories}
                                active={activeCategory}
                                onSelect={setActiveCategory}
                            />

                            {selectedCategory && (
                                <div className="mt-8 flex flex-col gap-8">
                                    {selectedCategory.terms.map((entry, i) => (
                                        <div key={i} className="flex gap-3">
                                            <span className="mt-1 text-gold-soft">
                                                <QuoteIcon size={14} />
                                            </span>
                                            <div>
                                                <p className="font-display text-lg italic text-red-soft">{t(entry.term)}</p>
                                                <p className="mt-1 font-body text-sm leading-relaxed text-muted">
                                                    {t(entry.definition)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={() => document.getElementById("glossary-collection")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                                className="cursor-pointer rounded-full border border-red-soft bg-red-soft px-4 py-1.5 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
                            >
                                {t(ui.universeNoBookSelected)}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}