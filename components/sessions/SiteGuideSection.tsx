"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";
import { SITE_GUIDE_ITEMS, SITE_GUIDE_TEXT } from "@/lib/siteGuide";

export default function SiteGuideSection() {
  const { t } = useLanguage();

  return (
    <section className="mb-24 mt-28 grid gap-16 sm:mb-32 sm:mt-36 lg:grid-cols-[2fr_3fr] lg:gap-20">
      <div className="flex flex-col items-start">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">
          {t(SITE_GUIDE_TEXT.eyebrow)}
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
          {t(SITE_GUIDE_TEXT.title)}
        </h2>
        <p className="mt-6 font-body text-sm leading-relaxed text-muted">{t(SITE_GUIDE_TEXT.body)}</p>
        <Link
          href={ROUTES.about}
          className="mt-8 inline-flex items-center border border-red-soft bg-red-soft px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
        >
          {t(SITE_GUIDE_TEXT.button)}
        </Link>
      </div>

      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
        {SITE_GUIDE_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="group flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-gold-soft">
                  <Icon size={26} />
                </span>
                <h3 className="font-display text-lg text-ink transition-colors duration-300 group-hover:text-gold-soft">
                  {t(item.title)}
                </h3>
              </div>
              <p className="font-body text-sm leading-relaxed text-muted">{t(item.description)}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}