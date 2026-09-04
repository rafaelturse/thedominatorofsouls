import { notFound } from "next/navigation";
import { books } from "@/lib/data";
import BookDetailContent from "@/components/BookDetailContent";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);

  if (!book) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title.en,
    description: (book.fullSynopsis?.[0]?.en ?? book.synopsis.en),
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: "Rafael Turse",
      url: "https://rafaelturse.com",
    },
    isPartOf: {
      "@type": "BookSeries",
      name: book.series.en,
    },
    ...(book.pageCount ? { numberOfPages: book.pageCount } : {}),
    ...(book.status === "published"
      ? {
        datePublished: book.release.en,
        image: `https://thedominatorofsouls.com${book.cover?.en ?? ""}`,
        offers: (book.stores ?? []).map((store) => ({
          "@type": "Offer",
          seller: { "@type": "Organization", name: "Amazon" },
          url: store.href,
        })),
      }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BookDetailContent book={book} />
    </>
  );
}