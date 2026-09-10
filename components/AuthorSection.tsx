"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { AUTHOR_SECTION } from "@/lib/author";
import { EXTERNAL_LINKS } from "@/lib/routes";
import { MapPinIcon, FeatherIcon } from "@/lib/icons";

export default function AuthorSection() {
  const { t, locale } = useLanguage();

  return (
    <div className="mt-20">
      <div className="flex items-center gap-2">
        <span className="text-gold-soft">
          <FeatherIcon />
        </span>
        <h1 className="font-display uppercase text-lg text-ink">{t(AUTHOR_SECTION.title)}</h1>
      </div>

      <div
        className="mt-6 rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-10"
        style={{ backgroundColor: "#111" }}
      >
        <div className="flex flex-col gap-10 sm:flex-row">
          <img
            src={AUTHOR_SECTION.photo}
            alt="Rafael Turse"
            className="mx-auto aspect-[2/3] w-48 shrink-0 rounded-2xl border-2 border-gold-soft object-cover sm:mx-0 sm:w-56"
          />

          <div className="flex w-full flex-1 flex-col justify-between text-center sm:text-left">
            <div>
              {AUTHOR_SECTION.bio.map((p, i) => (
                <p key={i} className="font-body text-sm leading-relaxed text-muted sm:text-base">
                  {t(p)}
                </p>
              ))}
            </div>

            <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="group flex items-center gap-1.5 text-gold-soft transition-colors hover:text-red-soft">
                <MapPinIcon />
                <span className="font-body text-xs uppercase tracking-[0.15em]">
                  {t(AUTHOR_SECTION.location)}
                </span>
              </div>

              <Link
                href={EXTERNAL_LINKS.amazonAuthorPage[locale]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-red-soft bg-red-soft px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
              >
                {t(AUTHOR_SECTION.visitAmazon)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}