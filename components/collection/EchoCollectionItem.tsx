"use client";

import Link from "next/link";
import type { EchoEntry } from "@/lib/echoes";
import { useLanguage } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";
import CollectionCard from "./CollectionCard";

type EchoCollectionItemProps = {
  entry: EchoEntry;
  isCurrent: boolean;
  onActivate?: (entry: EchoEntry) => void;
  className?: string;
};

export default function EchoCollectionItem({
  entry,
  isCurrent,
  onActivate,
  className,
}: EchoCollectionItemProps) {
  const { t } = useLanguage();
  const isComingSoon = entry.comingSoon ?? !entry.cover;

  const card = (
    <CollectionCard
      src={entry.cover}
      alt={t(entry.title)}
      label={t(entry.title)}
      isComingSoon={isComingSoon}
      isCurrent={isCurrent}
      showSoonOverlay
      imageClassName="aspect-[5/8] w-full object-cover"
    />
  );

  if (!entry.cover) return <div className={className}>{card}</div>;

  if (onActivate) {
    return (
      <button type="button" className={className} onClick={() => onActivate(entry)}>
        {card}
      </button>
    );
  }

  return (
    <Link
      href={`${ROUTES.echoes}?echo=${encodeURIComponent(entry.id)}#echoes-content`}
      className={className}
    >
      {card}
    </Link>
  );
}