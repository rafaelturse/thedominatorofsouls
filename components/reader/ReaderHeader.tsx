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
    <div className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-10">
      <div className="flex items-center gap-3">
        <span className="cursor-default border border-gold-soft px-2 py-0.5 font-body text-[10px] uppercase tracking-[0.2em] text-gold-soft transition-shadow duration-300 hover:shadow-[0_0_12px_rgba(217,192,127,0.5)]">
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