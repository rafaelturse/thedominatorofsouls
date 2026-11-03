import { books } from "@/lib/books";
import { BLOG_POSTS } from "@/lib/blog";
import { ECHOES } from "@/lib/echoes";
import type { LocalizedString } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";
import { TIMELINE_EVENTS } from "@/lib/timeline";

export type SearchResult = {
  id: string;
  href: string;
  title: string;
  excerpt?: string;
  date?: string;
  cover?: string;
  category?: string;
};

type Translate = (value: LocalizedString) => string;

type Field = { text: string; weight: number };

type Candidate = { score: number; result: SearchResult };

export const SEARCH_PANEL_LABELS = {
  heading: { "pt-br": "Resultados da busca", en: "Search results" } as LocalizedString,
  empty: { "pt-br": "Nenhum resultado encontrado", en: "No results found" } as LocalizedString,
  close: { "pt-br": "Fechar", en: "Close" } as LocalizedString,
};

const SOURCE_LABELS = {
  book: { "pt-br": "Livro", en: "Book" } as LocalizedString,
  timeline: { "pt-br": "Linha do Tempo", en: "Timeline" } as LocalizedString,
};

const MIN_QUERY_LENGTH = 2;

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function both(value: LocalizedString): string {
  return `${value["pt-br"]} ${value.en}`;
}

function bothList(values: LocalizedString[]): string {
  return values.map(both).join(" ");
}

function score(terms: string[], fields: Field[]): number {
  const normalized = fields.map((field) => ({ text: normalize(field.text), weight: field.weight }));
  let total = 0;

  for (const term of terms) {
    let best = 0;
    for (const field of normalized) {
      if (field.text.includes(term)) best = Math.max(best, field.weight);
    }
    if (best === 0) return 0;
    total += best;
  }

  return total;
}

export function searchContent(query: string, t: Translate): SearchResult[] {
  const normalizedQuery = normalize(query).trim();
  if (normalizedQuery.length < MIN_QUERY_LENGTH) return [];

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  const candidates: Candidate[] = [];

  books
    .filter((book) => book.status === "published")
    .forEach((book) => {
      const value = score(terms, [
        { text: both(book.title), weight: 3 },
        { text: both(book.volumeLabel), weight: 2 },
      ]);
      if (value === 0) return;

      candidates.push({
        score: value,
        result: {
          id: `book-${book.slug}`,
          href: ROUTES.bookDetail(book.slug),
          title: t(book.title),
          cover: book.cover ? t(book.cover) : undefined,
          category: t(SOURCE_LABELS.book),
        },
      });
    });

  BLOG_POSTS.forEach((post) => {
    const value = score(terms, [
      { text: both(post.title), weight: 3 },
      { text: bothList(post.tags), weight: 2 },
      { text: both(post.category), weight: 2 },
      { text: both(post.excerpt), weight: 1 },
      { text: bothList(post.content), weight: 1 },
    ]);
    if (value === 0) return;

    candidates.push({
      score: value,
      result: {
        id: `post-${post.slug}`,
        href: ROUTES.blogPost(post.slug),
        title: t(post.title),
        excerpt: t(post.excerpt),
        date: t(post.date),
        cover: post.cover,
        category: t(post.category),
      },
    });
  });

  TIMELINE_EVENTS.forEach((event, index) => {
    const value = score(terms, [
      { text: both(event.title), weight: 3 },
      { text: bothList(event.tags), weight: 2 },
    ]);
    if (value === 0) return;

    candidates.push({
      score: value,
      result: {
        id: `event-${index}`,
        href: `${ROUTES.timeline}#timeline-event-${index}`,
        title: t(event.title),
        date: t(event.date),
        category: t(SOURCE_LABELS.timeline),
      },
    });
  });

  ECHOES.entries
    .filter((entry) => !entry.comingSoon)
    .forEach((entry) => {
      const paragraphs = entry.parts.flatMap((part) => part.paragraphs);
      const value = score(terms, [
        { text: both(entry.title), weight: 3 },
        { text: bothList(entry.tags), weight: 2 },
        { text: bothList(paragraphs), weight: 1 },
      ]);
      if (value === 0) return;

      const snippet =
        paragraphs.find((paragraph) => normalize(both(paragraph)).includes(terms[0])) ??
        paragraphs[0];

      candidates.push({
        score: value,
        result: {
          id: `echo-${entry.id}`,
          href: `${ROUTES.echoes}?echo=${encodeURIComponent(entry.id)}#echoes-content`,
          title: t(entry.title),
          excerpt: snippet ? t(snippet) : undefined,
          cover: entry.cover ? t(entry.cover) : undefined,
          category: t(ECHOES.heading),
        },
      });
    });

  return candidates.sort((a, b) => b.score - a.score).map((candidate) => candidate.result);
}