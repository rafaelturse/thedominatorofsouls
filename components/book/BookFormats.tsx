"use client";

import type { BookFormat } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { BookIcon, PagesIcon, DeviceTabletIcon, HeadphonesIcon } from "@/lib/icons";

const FORMAT_ICONS: Record<BookFormat, (props: { size?: number }) => React.JSX.Element> = {
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

type BookFormatsProps = {
  formats: BookFormat[];
};

export default function BookFormats({ formats }: BookFormatsProps) {
  const { t, ui } = useLanguage();

  if (!formats || formats.length === 0) return null;

  return (
    <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-4 sm:justify-start">
      {formats.map((format) => {
        const Icon = FORMAT_ICONS[format];
        return (
          <div key={format} className="flex flex-col items-center gap-2 text-muted transition-colors hover:text-gold-soft">
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