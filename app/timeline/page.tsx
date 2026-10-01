"use client";

import Hero from "@/components/Hero";
import PageHeader from "@/components/PageHeader";
import Timeline from "@/components/Timeline";
import { TIMELINE_EVENTS } from "@/lib/timeline";
import { useLanguage } from "@/lib/i18n";
import { BalloonIcon, MoreIcon } from "@/lib/icons";
import type { LocalizedString } from "@/lib/i18n";
import { SITE } from "@/lib/data";

const TIMELINE_PAGE = {
  title: { "pt-br": "Timeline", en: "Timeline" } as LocalizedString,
  heading: { "pt-br": "Linha do Tempo", en: "Timeline" } as LocalizedString,
  subtitle: {
    "pt-br": "Os marcos da jornada, do livro ao site",
    en: "The milestones of the journey, from the book to the site",
  } as LocalizedString,
};

const INTRO = {
  "pt-br": (
    <>
      Seja bem-vindo à página de timeline! Aqui você encontrará todos os marcos da jornada de
      desenvolvimento do universo de <strong>O Dominador de Almas</strong>.
      <br />
      <br />
      Os assuntos mais recentes estão no topo - então, se deseja acompanhar a história toda desde
      o início, você pode usar este atalho!
    </>
  ),
  en: (
    <>
      Welcome to the timeline page! Here you&apos;ll find every milestone in the development
      journey of the <strong>The Dominator of Souls</strong> universe.
      <br />
      <br />
      The most recent entries are at the top — so if you&apos;d like to follow the whole story from
      the very beginning, you can use this shortcut!
    </>
  ),
};

const SHORTCUT_LABEL = { "pt-br": "Ir ao primeiro evento", en: "Go to the first event" };

export default function TimelinePage() {
  const { locale, t, ui } = useLanguage();

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
      <div className="relative z-10 mx-auto max-w-5xl px-5 pb-16 pt-6 sm:pb-20 sm:pt-8">
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

          <div
            className="mt-6 rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-10"
            style={{ backgroundColor: "#111" }}
          >
            <div className="text-center font-body text-sm leading-relaxed text-muted sm:text-left sm:text-base">
              {INTRO[locale]}
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
                {t(SHORTCUT_LABEL)}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-48">
            <img src={SITE.symbol} alt={SITE.name} />
          </div>
        </div>

        <Timeline events={TIMELINE_EVENTS} />
      </div>
    </div>
  );
}