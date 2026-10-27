import type { LocalizedString } from "./i18n";
import type { ReactNode } from "react";

type TimelinePageContent = {
  title: LocalizedString;
  heading: LocalizedString;
  subtitle: LocalizedString;
  intro: { "pt-br": ReactNode; en: ReactNode };
  shortcutLabel: LocalizedString;
};

export const TIMELINE_PAGE: TimelinePageContent = {
  title: { "pt-br": "Timeline", en: "Timeline" },
  heading: { "pt-br": "Linha do Tempo", en: "Timeline" },
  subtitle: {
    "pt-br": "Os marcos da jornada, do livro ao site",
    en: "The milestones of the journey, from the book to the site",
  },
  intro: {
    "pt-br": (
      <>
        <span className="text-gold-soft">Seja bem-vindo à página de timeline!</span>
        <br />
        Aqui você encontrará todos os marcos da jornada de desenvolvimento do universo de{" "}
        <strong>O Dominador de Almas</strong>.
        <br />
        <br />
        <span className="text-gold-soft">Os assuntos mais recentes estão no topo</span>
        <br />
        então, se deseja acompanhar a história toda desde o início, você pode usar este atalho!
      </>
    ),
    en: (
      <>
        <span className="text-gold-soft">Welcome to the timeline page!</span>
        <br />
        Here you&apos;ll find every milestone in the development journey of{" "}
        <strong>The Dominator of Souls</strong> universe.
        <br />
        <br />
        <span className="text-gold-soft">The most recent entries are at the top</span>
        <br />
        so if you&apos;d like to follow the whole story from the very beginning, you can use this
        shortcut!
      </>
    ),
  },
  shortcutLabel: { "pt-br": "Ir ao primeiro evento", en: "Go to the first event" },
};