"use client";

import { useLanguage } from "@/lib/i18n";
import type { LocalizedString } from "@/lib/i18n";

type PageHeaderProps = {
    title: LocalizedString;
    heading: LocalizedString;
    subtitle: LocalizedString;
};

export default function PageHeader({ title, heading, subtitle }: PageHeaderProps) {
    const { t } = useLanguage();

    return (
        <header className="text-center">
            <p className="font-body text-xs uppercase tracking-[0.4em] text-gold-soft">
                {t(title)}
            </p>
            <h1 className="mt-5 font-display text-5xl tracking-[0.05em] text-ink sm:text-6xl">
                {t(heading)}
            </h1>
            <p className="mx-auto mt-6 max-w-md font-body text-sm uppercase leading-relaxed text-red-soft">
                {t(subtitle)}
            </p>
        </header>
    );
}