"use client";

import Link from "next/link";
import Hero from "@/components/page/Hero";
import CollectionStrip from "@/components/sessions/CollectionStrip";
import ExploreLinks from "@/components/link/ExploreLinks";
import AuthorSection from "@/components/sessions/AuthorSection";
import PageHeader from "@/components/page/PageHeader";
import { STORE_PAGE } from "@/lib/store";
import { books } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { EXTERNAL_LINKS } from "@/lib/routes";

export default function StorePage() {
  const { t, locale } = useLanguage();

  return (
    <div>
      <Hero />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pb-28 sm:pt-8">
        <PageHeader title={STORE_PAGE.title} heading={STORE_PAGE.heading} subtitle={STORE_PAGE.subtitle} />

        <AuthorSection />

        <div className="mt-20">
          <CollectionStrip books={books} />
        </div>

        <ExploreLinks count={4} />
      </div>
    </div>
  );
}