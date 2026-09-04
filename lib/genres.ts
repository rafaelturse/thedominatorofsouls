import type { LocalizedString } from "./i18n";

export type Genre = { label: LocalizedString; description: LocalizedString };

export const genres: Genre[] = [
  {
    label: { "pt-br": "Aventura", en: "Adventure" },
    description: {
      "pt-br": "Jornadas que te farão conhecer novos lugares, até mesmo dentro de você",
      en: "Journeys that will lead you to discover new places, even within yourself",
    },
  },
  {
    label: { "pt-br": "RPG", en: "RPG" },
    description: {
      "pt-br": "Classes, progressões, decisões e sistemas complexos aplicados sobre densos enredos",
      en: "Classes, progressions, decisions, and complex systems applied to dense storylines",
    },
  },
  {
    label: { "pt-br": "Romance", en: "Romance" },
    description: {
      "pt-br": "Vínculos eternos que criam laços capazes de atravessar qualquer limite imposto",
      en: "Eternal bonds that create ties capable of crossing any imposed limit",
    },
  },
  {
    label: { "pt-br": "Guerra", en: "War" },
    description: {
      "pt-br": "Conflitos pessoais, políticos e religiosos que impulsionam a roda da história",
      en: "Personal, political, and religious conflicts that drive the wheel of history",
    },
  },
];