"use client";

import type { Book, BookFormat } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { BookIcon, PagesIcon, DeviceTabletIcon, HeadphonesIcon } from "@/lib/icons";

const FORMAT_ICONS: Record<BookFormat, typeof PagesIcon> = {
  hardcover: BookIcon,
  paperback: PagesIcon,
  ebook: DeviceTabletIcon,
  audiobook: HeadphonesIcon,
};

const FORMAT_LABEL_KEYS: Record<BookFormat, "formatHardcover" | "formatPaperback" | "formatEbook" | "formatAudiobook"> = {
  hardcover: "formatHardcover",
  paperback: "formatPaperback",
  ebook: "formatEbook",
  audiobook: "formatAudiobook",
};

export default function BookFormatsRow({ book }: { book: Book }) {
  const { t, ui } = useLanguage();

  if (!book.formats || book.formats.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-line py-5 sm:justify-start">
      {book.formats.map((format) => {
        const Icon = FORMAT_ICONS[format];
        return (
          <div key={format} className="flex flex-col items-center gap-2 text-muted">
            <Icon />
            <span className="whitespace-nowrap font-body text-xs uppercase tracking-[0.1em]">
              {t(ui[FORMAT_LABEL_KEYS[format]])}
            </span>
          </div>
        );
      })}
    </div>
  );
}