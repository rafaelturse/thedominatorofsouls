"use client";

import { ArrowUpIcon } from "@/lib/icons";

export default function BackToTopButton() {
    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            style={{ height: "38px", width: "38px" }}
            className="box-border flex shrink-0 items-center justify-center rounded-full border border-red-soft p-0 leading-none text-red-soft transition-colors hover:border-gold-soft hover:text-gold-soft"
        >
            <ArrowUpIcon size={20} />
        </button>
    );
}