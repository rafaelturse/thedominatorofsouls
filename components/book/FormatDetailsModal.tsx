"use client";

import Link from "next/link";
import type { FormatDetails } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { ExternalLinkIcon } from "@/lib/icons";

type FormatDetailsModalProps = {
  title: string;
  icon: (props: { size?: number }) => React.JSX.Element;
  details: FormatDetails;
  onClose: () => void;
};

export default function FormatDetailsModal({ title, icon: Icon, details, onClose }: FormatDetailsModalProps) {
  const { t, ui } = useLanguage();

  const rows: { label: string; value: string }[] = [
    { label: t(ui.formatDetailsAsin), value: details.asin },
    { label: t(ui.formatDetailsPublisher), value: details.publisher },
    { label: t(ui.formatDetailsPublicationDate), value: details.publicationDate },
    { label: t(ui.formatDetailsLanguage), value: details.language },
    { label: t(ui.formatDetailsPageCount), value: details.pageCount },
    { label: t(ui.formatDetailsIsbn), value: details.isbn13 },
    { label: t(ui.formatDetailsWeight), value: details.weight },
    { label: t(ui.formatDetailsDimensions), value: details.dimensions },
  ];

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

        <div className="mt-6 flex flex-col gap-3">
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
              <span className="font-body text-xs uppercase tracking-[0.1em] text-muted">{row.label}</span>
              <span className="text-right font-body text-sm text-ink">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <span className="font-body text-xs uppercase tracking-[0.1em] text-muted">
            {t(ui.formatDetailsSeriesLink)}
          </span>
          <Link
            href={details.seriesLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center gap-1.5 font-body text-sm text-gold-soft transition-colors hover:text-red-soft"
          >
            {details.seriesLink.label}
            <ExternalLinkIcon size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}