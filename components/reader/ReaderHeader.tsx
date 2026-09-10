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
    <div className="relative flex flex-col items-center gap-3 border-b border-line px-6 py-4 sm:flex-row sm:justify-between sm:px-10">
      <span className="cursor-default border border-gold-soft px-2 py-0.5 font-body text-[10px] uppercase tracking-[0.2em] text-gold-soft sm:order-1">
        {t(ui.sampleBadge)}
      </span>

      <p className="text-center font-display text-sm uppercase tracking-[0.2em] text-ink sm:absolute sm:left-1/2 sm:top-1/2 sm:order-2 sm:-translate-x-1/2 sm:-translate-y-1/2">
        {t(title)}
      </p>

      <button
        type="button"
        onClick={onClose}
        className="border border-red-soft bg-red-soft px-3 py-1.5 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft sm:order-3"
      >
        {t(ui.close)}
      </button>
    </div>
  );
}