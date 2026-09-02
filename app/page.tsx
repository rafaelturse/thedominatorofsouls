import { books } from "@/lib/data";
import Hero from "@/components/Hero";
import GenreStrip from "@/components/GenreStrip";
import SpotlightBook from "@/components/SpotlightBook";
import CollectionStrip from "@/components/CollectionStrip";
import ExploreLinks from "@/components/ExploreLinks";

export default function HomePage() {
  const featured = books.find((b) => b.status === "published") ?? books[0];

  return (
    <div>
      <Hero />
      <GenreStrip />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pb-28 sm:pt-20">
        <SpotlightBook book={featured} />
        <div className="mt-20">
          <CollectionStrip books={books} />
        </div>
        <ExploreLinks ids={["store", "universe", "author", "about"]} />
      </div>
    </div>
  );
}