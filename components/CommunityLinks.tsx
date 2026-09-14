"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { COMMUNITY_PLATFORMS, type CommunityPlatformId } from "@/lib/community";
import { CommunityIcon } from "@/lib/icons";
import type { LocalizedString } from "@/lib/i18n";

function resolveHref(href: string | LocalizedString, locale: "pt-br" | "en") {
  return typeof href === "string" ? href : href[locale];
}

export default function CommunityLinks() {
  const { t, ui, locale } = useLanguage();
  const [selected, setSelected] = useState<CommunityPlatformId | null>("amazon");

  const selectedPlatform = COMMUNITY_PLATFORMS.find((p) => p.id === selected);

  return (
    <div className="mt-20">
      <div className="flex items-center gap-2">
        <span className="text-gold-soft">
          <CommunityIcon />
        </span>
        <h1 className="font-display uppercase text-lg text-ink">{t(ui.communityTitle)}</h1>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {COMMUNITY_PLATFORMS.map((platform) => {
          const isActive = selected === platform.id;
          const Icon = platform.icon;
          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => setSelected(isActive ? null : platform.id)}
              className={`flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-3xl bg-card p-4 text-center shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] transition-all duration-300 ease-out hover:-translate-y-1 ${
                isActive ? "ring-2 ring-gold-soft" : ""
              }`}
            >
              {Icon ? (
                <span style={{ color: platform.iconColor }}>
                  <Icon size={28} />
                </span>
              ) : (
                <img src={platform.image} alt={platform.name} className="h-8 w-auto object-contain" />
              )}
            </button>
          );
        })}
      </div>

      {selectedPlatform && (
        <div
          className="mt-6 rounded-3xl p-8 text-center shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-10"
          style={{ backgroundColor: "#111" }}
        >
          {selectedPlatform.icon ? (
            <span className="inline-block" style={{ color: selectedPlatform.iconColor }}>
              <selectedPlatform.icon size={48} />
            </span>
          ) : (
            <img
              src={selectedPlatform.image}
              alt={selectedPlatform.name}
              className="mx-auto h-20 w-auto object-contain"
            />
          )}
          <p className="mx-auto mt-8 max-w-xl font-body text-sm leading-relaxed text-muted sm:text-base">
            {t(selectedPlatform.description)}
          </p>
          <div className="mt-6 flex justify-end">
            <Link
              href={resolveHref(selectedPlatform.href, locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-gold-soft px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-gold-soft transition-colors hover:bg-gold-soft hover:text-bg"
            >
              {t(ui.visitSite)}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}