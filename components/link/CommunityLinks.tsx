"use client";

import { useLanguage } from "@/lib/i18n";
import { COMMUNITY_PLATFORMS } from "@/lib/community";
import { CommunityIcon } from "@/lib/icons";
import PlatformShowcase from "./PlatformShowcase";

export default function CommunityLinks() {
  const { t, ui } = useLanguage();

  return (
    <PlatformShowcase
      title={t(ui.communityTitle)}
      titleIcon={<CommunityIcon />}
      platforms={COMMUNITY_PLATFORMS}
      initialId="amazon"
      gridClass="grid-cols-4"
    />
  );
}