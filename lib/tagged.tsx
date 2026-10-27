import { BLOG_POSTS } from "./blog";
import { ECHOES } from "./echoes";
import type { LocalizedString } from "./i18n";
import { ROUTES } from "./routes";
import { TIMELINE_EVENTS } from "./timeline";

export type TaggedItem = {
  id: string;
  href: string;
  title: string;
  excerpt?: string;
  date?: string;
  cover?: string;
  category?: string;
};

type Translate = (value: LocalizedString) => string;

const TIMELINE_LABEL: LocalizedString = { "pt-br": "Linha do Tempo", en: "Timeline" };
const ECHOES_LABEL: LocalizedString = { "pt-br": "Ecos", en: "Echoes" };

export const TAG_PANEL_LABELS = {
  heading: { "pt-br": "Conteúdo com a tag", en: "Content tagged" } as LocalizedString,
  empty: { "pt-br": "Nenhum conteúdo com esta tag.", en: "No content with this tag." } as LocalizedString,
  close: { "pt-br": "Fechar", en: "Close" } as LocalizedString,
};

function sameTag(a: LocalizedString, b: LocalizedString) {
  return a.en.trim().toLowerCase() === b.en.trim().toLowerCase();
}

export function getTaggedItems(tag: LocalizedString, t: Translate): TaggedItem[] {
  const posts: TaggedItem[] = BLOG_POSTS.filter((post) => post.tags.some((x) => sameTag(x, tag))).map(
    (post) => ({
      id: `post-${post.slug}`,
      href: ROUTES.blogPost(post.slug),
      title: t(post.title),
      excerpt: t(post.excerpt),
      date: t(post.date),
      cover: post.cover,
      category: t(post.category),
    }),
  );

  const events: TaggedItem[] = TIMELINE_EVENTS.flatMap((event, index) =>
    event.tags.some((x) => sameTag(x, tag))
      ? [
        {
          id: `timeline-${index}`,
          href: `${ROUTES.timeline}#timeline-event-${index}`,
          title: t(event.title),
          date: t(event.date),
          category: t(TIMELINE_LABEL),
        },
      ]
      : [],
  );

  const echoEntries: TaggedItem[] = ECHOES.entries
    .filter((entry) => entry.tags.some((x) => sameTag(x, tag)))
    .map((entry) => {
      const firstParagraph = entry.parts[0]?.paragraphs[0];
      return {
        id: `echo-${entry.id}`,
        href: `${ROUTES.echoes}?echo=${encodeURIComponent(entry.id)}#echoes-content`,
        title: t(entry.title),
        excerpt: firstParagraph ? t(firstParagraph) : undefined,
        cover: entry.cover ? t(entry.cover) : undefined,
        category: t(ECHOES_LABEL),
      };
    });

  return [...posts, ...events, ...echoEntries];
}