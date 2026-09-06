"use client";

import Hero from "@/components/Hero";
import ExploreLinks from "@/components/ExploreLinks";
import { useLanguage } from "@/lib/i18n";

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div>
            <Hero />
            <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pb-28 sm:pt-20">

                <ExploreLinks ids={["store", "universe", "author"]} />
            </div>
        </div>
    );
}