import Link from "next/link";
import { notFound } from "next/navigation";
import { books, type Book } from "@/lib/data";
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

  return <BookDetailContent book={book} />;
}