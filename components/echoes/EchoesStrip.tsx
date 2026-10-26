"use client";

import type { EchoEntry } from "@/lib/echoes";
import { ECHOES, echoes } from "@/lib/echoes";
import { useLanguage } from "@/lib/i18n";
import { ArchiveIcon } from "@/lib/icons";
import HorizontalScroller from "@/components/page/HorizontalScroller";
import EchoCollectionItem from "@/components/collection/EchoCollectionItem";

type EchoesStripProps = {
  collapsed?: boolean;
  currentId?: string;
  onSelect?: (entry: EchoEntry) => void;
};

export default function EchoesStrip({ collapsed = false, currentId, onSelect }: EchoesStripProps) {
  const { t } = useLanguage();
  const itemClass = collapsed ? "w-36 shrink-0 sm:w-40" : undefined;

  const items = echoes.map((entry) => (
    <EchoCollectionItem
      key={entry.id}
      entry={entry}
      isCurrent={entry.id === currentId}
      onActivate={onSelect}
      className={itemClass}
    />
  ));

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-gold-soft">
          <ArchiveIcon />
        </span>
        <h1 className="font-display uppercase text-lg text-ink">{t(ECHOES.heading)}</h1>
      </div>

      <div className="mt-6 rounded-3xl bg-card p-6 shadow-card sm:p-10">
        {collapsed ? (
          <HorizontalScroller>{items}</HorizontalScroller>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6">{items}</div>
        )}
      </div>
    </div>
  );
}