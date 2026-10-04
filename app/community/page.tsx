"use client";

import Hero from "@/components/page/Hero";
import CommunityLinks from "@/components/link/CommunityLinks";
import PageHeader from "@/components/page/PageHeader";
import { COMMUNITY_PAGE } from "@/lib/community";
import ExploreLinks from "@/components/link/ExploreLinks";

export default function CommunityPage() {
  return (
    <div>
      <Hero />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-6 sm:pb-20 sm:pt-8">
        <PageHeader
          title={COMMUNITY_PAGE.title}
          heading={COMMUNITY_PAGE.heading}
          subtitle={COMMUNITY_PAGE.subtitle}
        />

        <CommunityLinks />

        <ExploreLinks count={4} />
      </div>
    </div>
  );
}