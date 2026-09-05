"use client";

import { useLanguage } from "@/lib/i18n";
import type { LocalizedString } from "@/lib/i18n";

type ReaderPageProps = {
  paragraphs: LocalizedString[];
  hiddenOnMobile?: boolean;
};

export default function ReaderPage({ paragraphs, hiddenOnMobile = false }: ReaderPageProps) {
  const { t } = useLanguage();

  return (
    <div className={`flex-col gap-4 ${hiddenOnMobile ? "hidden lg:flex" : "flex"}`}>
      {paragraphs.map((para, i) => (
        <p key={i} className="font-body text-sm leading-relaxed text-muted sm:text-base">
          {t(para)}
        </p>
      ))}
    </div>
  );
}