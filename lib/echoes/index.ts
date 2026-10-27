import type { LocalizedString } from "../i18n";
import { forestfarDeer } from "./the-forestfar-deer/forestfar-deer";
import { stanBrings } from "./stan-brings";
import type { EchoCard, EchoEntry, EchoWork } from "./types";

export * from "./types";

export const echoWorks: EchoWork[] = [stanBrings, forestfarDeer];

export const echoes: EchoEntry[] = echoWorks.map((work) => work.entry);

export const ECHOES: {
  title: LocalizedString;
  heading: LocalizedString;
  subtitle: LocalizedString;
  cards: EchoCard[];
  entries: EchoEntry[];
} = {
  title: { "pt-br": "Apócrifos", en: "Apocryphal" },
  heading: { "pt-br": "Ecos", en: "Echoes" },
  subtitle: {
    "pt-br": "Fragmentos de histórias perdidas",
    en: "Fragments of lost stories",
  },
  cards: echoWorks.flatMap((work) => (work.card ? [work.card] : [])),
  entries: echoes,
};