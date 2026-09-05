"use client";

import Link from "next/link";
import { useState } from "react";
import type { Store } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

type StoreDropdownProps = {
    stores: Store[];
    align?: "start" | "center" | "end";
};

export default function StoreDropdown({ stores, align = "end" }: StoreDropdownProps) {
    const { t, ui } = useLanguage();
    const [open, setOpen] = useState(false);

    const justifyClass =
        align === "end" ? "justify-end" : align === "center" ? "justify-center" : "justify-start";
    const dropdownAlignClass = align === "start" ? "left-0" : "right-0";

    return (
        <div className={`mt-6 flex ${justifyClass}`}>
            <div className="relative inline-block" onMouseLeave={() => setOpen(false)}>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="flex items-center gap-2 border border-line px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-gold-soft transition-colors hover:border-gold-soft"
                >
                    {t(ui.buyOnAmazon)}
                    <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
                </button>

                {open && (
                    <div
                        className={`absolute top-full z-10 max-h-64 w-56 overflow-y-auto border border-line bg-bg shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] ${dropdownAlignClass}`}
                    >
                        {stores.map((store) => (
                            <Link
                                key={store.href}
                                href={store.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block border-b border-line px-4 py-2.5 text-left font-body text-sm text-muted transition-colors last:border-none hover:bg-surface hover:text-gold-soft"
                            >
                                {t(store.label)}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}