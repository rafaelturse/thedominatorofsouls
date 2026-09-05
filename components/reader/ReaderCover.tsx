import { useLanguage } from "@/lib/i18n";
import type { Book } from "@/lib/data";

type ReaderCoverProps = {
  book: Book;
};

export default function ReaderCover({ book }: ReaderCoverProps) {
  const { t } = useLanguage();

  return (
    <div className="flex h-full w-full items-center justify-center px-12 py-14 sm:px-16 sm:py-20">
      {book.cover && (
        <img
          src={t(book.cover)}
          alt={t(book.title)}
          className="max-h-full w-auto object-contain shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
        />
      )}
    </div>
  );
}