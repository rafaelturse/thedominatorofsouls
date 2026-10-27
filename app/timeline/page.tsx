"use client";

import { useCallback, useState } from "react";
import Hero from "@/components/page/Hero";
import PageHeader from "@/components/page/PageHeader";
import Timeline from "@/components/sessions/Timeline";
import TagPanel from "@/components/tags/TagPanel";
import ExploreLinks from "@/components/link/ExploreLinks";
import { TIMELINE_EVENTS } from "@/lib/timeline";
import { TIMELINE_PAGE } from "@/lib/timeline-page";
import { useLanguage } from "@/lib/i18n";
import type { LocalizedString } from "@/lib/i18n";
import { BalloonIcon, MoreIcon } from "@/lib/icons";
import { SITE } from "@/lib/data";
import { TAG_PANEL_LABELS, getTaggedItems } from "@/lib/tagged";

export default function TimelinePage() {
  const { locale, t, ui } = useLanguage();
  const [activeTag, setActiveTag] = useState<LocalizedString | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const closePanel = useCallback(() => setPanelOpen(false), []);

  function handleTagClick(tag: LocalizedString) {
    setActiveTag(tag);
    setPanelOpen(true);
  }

  function scrollToFirstEvent() {
    const el = document.getElementById(`timeline-event-${TIMELINE_EVENTS.length - 1}`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const targetY = window.scrollY + rect.top + rect.height / 20 - window.innerHeight / 20;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }

  return (
    <div>
      <Hero />
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-6 sm:pb-20 sm:pt-8">
        <PageHeader
          title={TIMELINE_PAGE.title}
          heading={TIMELINE_PAGE.heading}
          subtitle={TIMELINE_PAGE.subtitle}
        />

        <div id="timeline-top" className="relative mt-16">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="text-gold-soft">
              <BalloonIcon />
            </span>
            <h1 className="font-display uppercase text-lg text-ink">{t(ui.welcomeTitle)}</h1>
          </div>

          <div className="mt-6 rounded-3xl bg-card p-6 shadow-card sm:p-10">
            <div className="text-center font-body text-sm leading-relaxed text-muted sm:text-left sm:text-base">
              {TIMELINE_PAGE.intro[locale]}
            </div>

            <div className="my-10 flex justify-center">
              <p className="cursor-default font-accent text-4xl text-gold-soft transition-colors duration-300 hover:text-red-soft sm:text-4xl">
                {t(ui.thankYouExclaim)}
              </p>
            </div>

            <div className="mt-6 flex justify-center border-t border-line pt-5 sm:justify-end">
              <button
                type="button"
                onClick={scrollToFirstEvent}
                className="flex items-center gap-2 border border-red-soft bg-red-soft px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
              >
                <MoreIcon size={14} />
                {t(TIMELINE_PAGE.shortcutLabel)}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-48">
            <img src={SITE.symbol} alt={SITE.name} />
          </div>
        </div>

        <Timeline events={TIMELINE_EVENTS} onTagClick={handleTagClick} />

        <ExploreLinks count={4} />
      </div>

      <TagPanel
        open={panelOpen}
        tag={activeTag ? t(activeTag) : null}
        items={activeTag ? getTaggedItems(activeTag, t) : []}
        onClose={closePanel}
        heading={t(TAG_PANEL_LABELS.heading)}
        emptyMessage={t(TAG_PANEL_LABELS.empty)}
        closeLabel={t(TAG_PANEL_LABELS.close)}
      />
    </div>
  );
}