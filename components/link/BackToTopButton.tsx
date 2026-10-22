"use client";

import { ArrowUpIcon } from "@/lib/icons";

export default function BackToTopButton() {
    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="box-border flex size-9.5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gold-soft p-0 leading-none text-gold-soft transition-colors hover:border-red-soft hover:text-red-soft"
        >
            <ArrowUpIcon size={20} />
        </button>
    );
}