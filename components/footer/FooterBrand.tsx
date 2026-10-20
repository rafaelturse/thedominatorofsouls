"use client";

import { SITE } from "@/lib/data";

export default function FooterBrand() {
    return (
        <div className="flex w-48 shrink-0 items-center justify-center">
            <img src={SITE.symbol} alt={SITE.name} className="w-44" draggable={false} />
        </div>
    );
}