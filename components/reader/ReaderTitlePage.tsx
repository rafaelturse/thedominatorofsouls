import { useLanguage } from "@/lib/i18n";
import type { LocalizedString } from "@/lib/i18n";
import type { Book } from "@/lib/data";
import BookIdentity from "./BookIdentity";

type ReaderTitlePageProps = {
  book: Book;
  chapterTitle?: LocalizedString[];
};

export default function ReaderTitlePage({ book, chapterTitle }: ReaderTitlePageProps) {
  const { t } = useLanguage();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-12 py-14 text-center sm:px-16 sm:py-20">
      <BookIdentity book={book} />

      {chapterTitle && chapterTitle.length > 0 && (
        <p className="mt-8 font-display text-2xl uppercase tracking-[0.2em] text-red-soft sm:text-3xl">
          {t(chapterTitle[0])}
        </p>
      )}
    </div>
  );
}