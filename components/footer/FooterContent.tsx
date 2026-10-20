"use client";

import Link from "next/link";
import { books, contacts } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import type { LocalizedString } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";
import { BLOG_POSTS } from "@/lib/blog";
import { TIMELINE_EVENTS } from "@/lib/timeline";
import { STORE_PLATFORMS } from "@/lib/platforms";
import HorizontalScroller from "@/components/page/HorizontalScroller";
import ContactIcons from "@/components/sessions/ContactIcons";
import FooterColumn, { type FooterLink } from "./FooterColumn";

const RECENT_COUNT = 5;

const TITLES = {
    histories: { "pt-br": "Histórias", en: "Stories" } as LocalizedString,
    social: { "pt-br": "Redes", en: "Social" } as LocalizedString,
    store: { "pt-br": "Loja", en: "Store" } as LocalizedString,
    blog: { "pt-br": "Blog", en: "Blog" } as LocalizedString,
    timeline: { "pt-br": "Linha do Tempo", en: "Timeline" } as LocalizedString,
};

const COPYRIGHT = {
    name: { "pt-br": "O Dominador de Almas", en: "The Dominator of Souls" } as LocalizedString,
    rights: { "pt-br": "Todos os direitos reservados.", en: "All rights reserved." } as LocalizedString,
};

const SOCIAL_LABELS: Record<string, LocalizedString> = {
    Author: { "pt-br": "Autor", en: "Author" },
};

const STORE_CONTACTS = ["Amazon", "Spotify"];

const legalLinkClass = "transition-colors hover:text-gold-soft";
const highlightClass = "text-muted-light transition-colors hover:text-gold-soft";

function resolveHref(href: string | LocalizedString, locale: "pt-br" | "en") {
    return typeof href === "string" ? href : href[locale];
}

export default function FooterContent() {
    const { t, ui, locale } = useLanguage();
    const year = new Date().getFullYear();

    const historyLinks: FooterLink[] = books
        .filter((book) => book.status === "published")
        .map((book) => ({
            key: book.slug,
            label: t(book.title),
            href: ROUTES.bookDetail(book.slug),
        }));

    const socialLinks: FooterLink[] = contacts
        .filter((c) => !STORE_CONTACTS.includes(c.label))
        .map((c) => ({
            key: c.label,
            label: SOCIAL_LABELS[c.label] ? t(SOCIAL_LABELS[c.label]) : c.label,
            href: resolveHref(c.href, locale),
            external: true,
        }));

    const storeLinks: FooterLink[] = STORE_PLATFORMS.map((p) => ({
        key: p.id,
        label: p.name,
        href: resolveHref(p.href, locale),
        external: true,
    }));

    const blogLinks: FooterLink[] = BLOG_POSTS.slice(0, RECENT_COUNT).map((post) => ({
        key: post.slug,
        label: t(post.title),
        href: ROUTES.blogPost(post.slug),
    }));

    const timelineLinks: FooterLink[] = TIMELINE_EVENTS.slice(0, RECENT_COUNT).map((event, i) => ({
        key: `event-${i}`,
        label: t(event.title),
        href: `${ROUTES.timeline}#timeline-event-${i}`,
    }));

    return (
        <>
            <div className="mx-auto max-w-6xl px-5 pb-10 pt-10">
                <HorizontalScroller>
                    <FooterColumn title={t(TITLES.histories)} href={ROUTES.store} links={historyLinks} />
                    <FooterColumn title={t(TITLES.blog)} href={ROUTES.blog} links={blogLinks} />
                    <FooterColumn title={t(TITLES.timeline)} href={ROUTES.timeline} links={timelineLinks} />
                    <FooterColumn title={t(TITLES.store)} href={ROUTES.store} links={storeLinks} />
                    <FooterColumn title={t(TITLES.social)} href={ROUTES.community} links={socialLinks} />
                </HorizontalScroller>
            </div>

            <div className="border-t border-line">
                <div className="mx-auto max-w-7xl px-5 pb-10 pt-8">
                    <div className="flex justify-center">
                        <ContactIcons size={24} className="gap-5 text-muted" exclude={STORE_CONTACTS} />
                    </div>

                    <div className="mt-6 flex justify-center text-center">
                        <span className="font-accent text-sm tracking-wide text-muted">
                            developed by <span className={highlightClass}>Rafael Turse</span> with{" "}
                            <span className={highlightClass}>Next.js</span> and{" "}
                            <span className={highlightClass}>Tailwind</span>.
                        </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center font-accent text-sm tracking-wide text-muted">
                        <span>
                            © {year} <span className={highlightClass}>{t(COPYRIGHT.name)}</span>.{" "}
                            {t(COPYRIGHT.rights)}
                        </span>
                        <span aria-hidden className="text-gold-soft">|</span>
                        <Link href={ROUTES.about} className={`${legalLinkClass} lowercase`}>
                            {t(ui.aboutLabel)}
                        </Link>
                        <span aria-hidden className="text-gold-soft">|</span>
                        <Link href={ROUTES.privacy} className={`${legalLinkClass} lowercase`}>
                            {t(ui.privacyLabel)}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}