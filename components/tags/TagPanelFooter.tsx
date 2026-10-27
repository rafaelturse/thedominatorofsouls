"use client";

import { SITE } from "@/lib/data";
import { useLanguage, type LocalizedString } from "@/lib/i18n";

const FOOTER_TITLE: LocalizedString = {
    "pt-br": "O Dominador de Almas",
    en: "The Dominator of Souls",
};

const FOOTER_TAGLINE: LocalizedString = {
    "pt-br": "Um universo de aventuras épicas",
    en: "A universe of epic adventures",
};

export default function TagPanelFooter() {
    const { t } = useLanguage();

    return (
        <div className="mt-12 flex flex-col items-center border-t border-line pt-10 text-center">
            <p className="font-display text-3xl leading-tight text-ink">{t(FOOTER_TITLE)}</p>
            <p className="mt-3 font-body text-[10px] uppercase tracking-[0.3em] text-gold-soft">
                {t(FOOTER_TAGLINE)}
            </p>
            <img src={SITE.symbol} alt={SITE.name} className="mt-8 w-28" />
        </div>
    );
}