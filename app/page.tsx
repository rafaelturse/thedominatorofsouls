"use client";

import { useState } from "react";
import { books } from "@/lib/data";
import type { Book } from "@/lib/data";
import Hero from "@/components/page/Hero";
import GenreStrip from "@/components/sessions/GenreStrip";
import SpotlightCarousel from "@/components/sessions/SpotlightCarousel";
import CollectionStrip from "@/components/sessions/CollectionStrip";
import ExploreLinks from "@/components/link/ExploreLinks";
import LastUpdatesSlider from "@/components/slide/LastUpdatesSlider";

export default function HomePage() {
  const featured = books.find((b) => b.status === "published") ?? books[0];
  const inTheWorks = books.find((b) => b.slug === "volume-2");
  const [secondary, setSecondary] = useState<Book | null>(null);

  return (
    <div>
      <Hero />
      <GenreStrip />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pb-28 sm:pt-20">
        {inTheWorks && <LastUpdatesSlider book={inTheWorks} />}

        <div id="spotlight-top" className="scroll-mt-24">
          <SpotlightCarousel featured={featured} secondary={secondary} />
        </div>

        <div className="mt-20">
          <CollectionStrip
            books={books}
            featuredSlug={featured.slug}
            currentSlug={secondary ? secondary.slug : featured.slug}
            onSelectSecondary={(book) => setSecondary(book)}
          />
        </div>

        <ExploreLinks count={4} />
      </div>
    </div>
  );
}