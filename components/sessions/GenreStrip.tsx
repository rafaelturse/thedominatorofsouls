"use client";

import type { ReactElement } from "react";
import { genres } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import {
  GenreAdventureIcon,
  GenreRpgIcon,
  GenreRomanceIcon,
  GenreWarIcon,
  type IconProps,
} from "@/lib/icons";

const ICONS: Record<string, (props: IconProps) => ReactElement> = {
  Aventura: GenreAdventureIcon,
  RPG: GenreRpgIcon,
  Romance: GenreRomanceIcon,
  Guerra: GenreWarIcon,
};

export default function GenreStrip() {
  const { t } = useLanguage();

  return (
    <div className="relative z-10 mx-auto -mt-32 max-w-6xl px-5">
      <div className="grid grid-cols-1 rounded-3xl bg-card shadow-card sm:grid-cols-4">
        {genres.map((genre, i) => {
          const key = genre.label["pt-br"];
          const Icon = ICONS[key];
          return (
            <div
              key={key}
              className="group relative flex flex-col items-center gap-4 px-8 py-10 text-center transition-transform duration-300 ease-out hover:z-10 hover:scale-105"
            >
              {i > 0 && (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 hidden h-[60%] w-px -translate-y-1/2 bg-gold-soft sm:block"
                />
              )}
              {Icon && (
                <span className="text-gold-soft transition-colors duration-300 ease-out group-hover:text-red-soft">
                  <Icon size={36} />
                </span>
              )}
              <p className="font-display text-base uppercase tracking-[0.2em] text-ink transition-colors duration-300 ease-out group-hover:text-gold-soft">
                {t(genre.label)}
              </p>
              <p className="font-body text-sm leading-relaxed text-muted">
                {t(genre.description)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}