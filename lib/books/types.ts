import type { LocalizedString, Locale } from "../i18n";

export type BookFormat = "hardcover" | "paperback" | "ebook" | "audiobook";
export type BookStatus = "published" | "upcoming";
export type Store = { label: LocalizedString; href: LocalizedString };

export type FormatDetailsData = {
  rows: { label: string; value: string; href?: string }[];
};

export type FormatDetails = Record<Locale, FormatDetailsData>;

export type Book = {
  slug: string;
  title: LocalizedString;
  volumeLabel: LocalizedString;
  series: LocalizedString;
  status: BookStatus;
  release: LocalizedString;
  pageCount?: Record<Locale, number>;
  formats?: BookFormat[];
  formatDetails?: Partial<Record<BookFormat, FormatDetails>>;
  genres?: LocalizedString[];
  synopsis: LocalizedString;
  fullSynopsisHeading?: LocalizedString;
  fullSynopsis?: LocalizedString[];
  cover?: LocalizedString;
  comingSoon?: boolean;
  stores?: Store[];
  openingChapterTitle?: LocalizedString;
  openingChapter?: LocalizedString[];
  audioSinopse?: Partial<Record<Locale, string>>;
  openingChapterAudio?: Partial<Record<Locale, string>>;
};

export type BookWork = {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  books: Book[];
};