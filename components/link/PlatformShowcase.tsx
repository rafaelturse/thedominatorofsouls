"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";
import type { LocalizedString } from "@/lib/i18n";
import { MoreIcon } from "@/lib/icons";
import type { PlatformCard } from "@/lib/platforms";

function resolveHref(href: string | LocalizedString, locale: "pt-br" | "en") {
    return typeof href === "string" ? href : href[locale];
}

type MarkProps = {
    platform: PlatformCard;
    iconSize: number;
    imageClass: string;
};

function PlatformMark({ platform, iconSize, imageClass }: MarkProps) {
    const Icon = platform.icon;

    if (Icon) {
        return (
            <span className="inline-block" style={{ color: platform.iconColor }}>
                <Icon size={iconSize} />
            </span>
        );
    }

    if (platform.image) {
        return <img src={platform.image} alt={platform.name} className={imageClass} />;
    }

    return (
        <span className="font-body text-xs uppercase tracking-[0.15em] text-ink">{platform.name}</span>
    );
}

type PlatformShowcaseProps = {
    title: string;
    titleIcon: ReactNode;
    platforms: PlatformCard[];
    initialId?: string;
    gridClass?: string;
};

export default function PlatformShowcase({
    title,
    titleIcon,
    platforms,
    initialId,
    gridClass = "grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
}: PlatformShowcaseProps) {
    const { t, ui, locale } = useLanguage();
    const [selected, setSelected] = useState(initialId ?? platforms[0]?.id);

    const current = platforms.find((p) => p.id === selected) ?? platforms[0];
    if (!current) return null;

    return (
        <div className="mt-20">
            <div className="flex items-center gap-2">
                <span className="text-gold-soft">{titleIcon}</span>
                <h1 className="font-display uppercase text-lg text-ink">{title}</h1>
            </div>

            <div className={`mt-6 grid gap-4 ${gridClass}`}>
                {platforms.map((platform) => {
                    const isActive = current.id === platform.id;

                    return (
                        <button
                            key={platform.id}
                            type="button"
                            onClick={() => setSelected(platform.id)}
                            aria-pressed={isActive}
                            className={`flex min-h-[80px] cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl bg-card p-4 text-center shadow-card transition-all duration-300 ease-out hover:-translate-y-1 ${isActive ? "ring-2 ring-gold-soft" : ""
                                }`}
                        >
                            <PlatformMark platform={platform} iconSize={28} imageClass="h-8 w-auto object-contain" />
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 rounded-3xl bg-card p-8 text-center shadow-card sm:p-10">
                <PlatformMark platform={current} iconSize={48} imageClass="mx-auto h-20 w-auto object-contain" />

                <p className="mx-auto mt-8 max-w-xl font-body text-sm leading-relaxed text-muted sm:text-base">
                    {t(current.description)}
                </p>

                <div className="mt-6 flex justify-end">
                    <Link
                        href={resolveHref(current.href, locale)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-red-soft bg-red-soft px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
                    >
                        <MoreIcon size={14} />
                        {t(ui.visitSite)}
                    </Link>
                </div>
            </div>
        </div>
    );
}