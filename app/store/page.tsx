"use client";

import Hero from "@/components/page/Hero";
import Collection from "@/components/collection/Collection";
import ExploreLinks from "@/components/link/ExploreLinks";
import AuthorSection from "@/components/sessions/AuthorSection";
import PageHeader from "@/components/page/PageHeader";
import { STORE_PAGE } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import StoreLinks from "@/components/link/StoreLinks";

export default function StorePage() {
  const { t, locale } = useLanguage();

  return (
    <div>
      <Hero />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pb-28 sm:pt-8">
        <PageHeader title={STORE_PAGE.title} heading={STORE_PAGE.heading} subtitle={STORE_PAGE.subtitle} />

        <AuthorSection />

        <StoreLinks />

        <div className="mt-20">
          <Collection />
        </div>

        <ExploreLinks count={4} />
      </div>
    </div>
  );
}