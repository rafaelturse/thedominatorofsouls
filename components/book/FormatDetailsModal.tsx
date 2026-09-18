"use client";

import type { FormatDetailsData } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

type FormatDetailsModalProps = {
  title: string;
  icon: (props: { size?: number }) => React.JSX.Element;
  details: FormatDetailsData;
  onClose: () => void;
};

export default function FormatDetailsModal({ title, icon: Icon, details, onClose }: FormatDetailsModalProps) {
  const { t, ui } = useLanguage();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] sm:p-8"
        style={{ backgroundColor: "#111" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gold-soft">
            <Icon size={22} />
            <h2 className="font-display text-lg uppercase tracking-[0.15em] text-ink">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-body text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold-soft"
          >
            {t(ui.close)}
          </button>
        </div>

        <div className="gold-scrollbar mt-6 flex max-h-96 flex-col gap-3 overflow-y-auto pr-4">
          {details.rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-line pb-2 last:border-none last:pb-0">
              <span className="font-body text-xs uppercase tracking-[0.1em] text-muted">{row.label}</span>
              <span className="text-right font-body text-sm text-ink">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}