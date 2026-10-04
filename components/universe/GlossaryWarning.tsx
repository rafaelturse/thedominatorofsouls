"use client";

import { useLanguage } from "@/lib/i18n";
import { GLOSSARY_WARNING, GLOSSARY_ATTENTION, GLOSSARY_PROCEED, GLOSSARY_GOOD_LUCK } from "@/lib/universe";
import AuthorSignature from "@/components/page/AuthorSignature";

export default function GlossaryWarning() {
    const { t, locale } = useLanguage();

    return (
        <div>
            <div
                className="rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-10"
                style={{ backgroundColor: "#111" }}
            >
                <p className="text-center font-display text-5xl text-red-soft sm:text-6xl">{t(GLOSSARY_ATTENTION)}</p>

                <p className="mt-12 font-body text-sm leading-relaxed text-muted sm:text-base">
                    {GLOSSARY_WARNING[locale]}
                </p>

                <div className="mt-6 flex flex-col items-end text-right">
                    <p className="font-body text-sm leading-relaxed text-muted sm:text-base">
                        {t(GLOSSARY_PROCEED)}
                    </p>
                    <p className="mt-1 font-body text-sm leading-relaxed text-muted sm:text-base">
                        {t(GLOSSARY_GOOD_LUCK)}
                    </p>
                    <AuthorSignature align="end" />
                </div>
            </div>
        </div>
    );
}