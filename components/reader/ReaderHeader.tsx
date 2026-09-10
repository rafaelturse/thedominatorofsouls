"use client";

import { useLanguage } from "@/lib/i18n";
import type { LocalizedString } from "@/lib/i18n";

type ReaderHeaderProps = {
  title: LocalizedString;
  onClose: () => void;
};

export default function ReaderHeader({ title, onClose }: ReaderHeaderProps) {
  const { t, ui } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-3 border-b border-line px-6 py-4 sm:flex-row sm:justify-between sm:px-10">
      <div className="flex flex-col items-center gap-2 px-4 text-center sm:flex-row sm:gap-3 sm:px-0 sm:text-left">
        <span className="cursor-default border border-gold-soft px-2 py-0.5 font-body text-[10px] uppercase tracking-[0.2em] text-gold-soft">
          {t(ui.sampleBadge)}
        </span>
        <p className="font-display text-sm uppercase tracking-[0.2em] text-ink">
          {t(title)}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="border border-red-soft bg-red-soft px-3 py-1.5 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
      >
        {t(ui.close)}
      </button>
    </div>
  );
}