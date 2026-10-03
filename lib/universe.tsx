import type { LocalizedString } from "./i18n";

export type GlossaryTerm = {
  term: LocalizedString;
  definition: LocalizedString;
};

export const GLOSSARY_BY_BOOK: Record<string, GlossaryTerm[]> = {
  fragmentados: [
    {
      term: { "pt-br": "Lorem Ipsum", en: "Lorem Ipsum" },
      definition: {
        "pt-br": "Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        en: "Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    },
    {
      term: { "pt-br": "Consectetur", en: "Consectetur" },
      definition: {
        "pt-br": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        en: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    },
    {
      term: { "pt-br": "Adipiscing Elit", en: "Adipiscing Elit" },
      definition: {
        "pt-br": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        en: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
    },
    {
      term: { "pt-br": "Tempor Incididunt", en: "Tempor Incididunt" },
      definition: {
        "pt-br": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        en: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    },
  ],
  "volume-2": [
    {
      term: { "pt-br": "Magna Aliqua", en: "Magna Aliqua" },
      definition: {
        "pt-br": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        en: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      },
    },
    {
      term: { "pt-br": "Totam Rem Aperiam", en: "Totam Rem Aperiam" },
      definition: {
        "pt-br": "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        en: "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
    },
  ],
};

export type UniverseOptionId = "glossary" | "races" | "classes" | "mythology" | "species";

export type UniverseOption = {
  id: UniverseOptionId;
  label: LocalizedString;
  enabled: boolean;
};

export const UNIVERSE_OPTIONS: UniverseOption[] = [
  { id: "mythology", label: { "pt-br": "Mitologia", en: "Mythology" }, enabled: false },
  { id: "glossary", label: { "pt-br": "Glossário", en: "Glossary" }, enabled: true },
  { id: "classes", label: { "pt-br": "Classes", en: "Classes" }, enabled: false },
  { id: "races", label: { "pt-br": "Raças", en: "Races" }, enabled: false },
  { id: "species", label: { "pt-br": "Espécies", en: "Species" }, enabled: false },
];

export const UNIVERSE_PAGE = {
  title: { "pt-br": "Universo", en: "Universe" } as LocalizedString,
  heading: { "pt-br": "O Universo", en: "The Universe" } as LocalizedString,
  subtitle: {
    "pt-br": "Explore os mundos, termos e segredos por trás de O Dominador de Almas",
    en: "Explore the worlds, terms, and secrets behind The Dominator of Souls",
  } as LocalizedString,
};

export const GLOSSARY_WARNING = {
  "pt-br": (
    <>
      Caso você <strong>ainda não tenha</strong> se aventurado por toda a história e por alguma{" "}
      <strong>razão misteriosa</strong> tenha vindo parar por aqui, saiba que esta sessão contêm
      descrições que, mesmo breves, para alguns podem ser consideradas{" "}
      <strong>muito reveladoras</strong>, sobre os personagens, locais e outros mistérios
      apresentados durante toda essa expedição.
    </>
  ),
  en: (
    <>
      Should you <strong>not yet have</strong> ventured through the entire story, and for some{" "}
      <strong>mysterious reason</strong> have found your way here instead, know that this session
      contains descriptions which, brief as they may be, could be considered quite{" "}
      <strong>revealing</strong> to some, concerning the characters, places, and other mysteries
      presented throughout this whole expedition.
    </>
  ),
} as const;

export const GLOSSARY_WARNING_TITLE = { "pt-br": "Glossário", en: "Glossary" };
export const GLOSSARY_PROCEED = { "pt-br": "Se realmente quer avançar,", en: "If you truly wish to proceed," };
export const GLOSSARY_GOOD_LUCK = { "pt-br": "Boa sorte!", en: "Good luck!" };
export const GLOSSARY_ATTENTION = { "pt-br": "Atenção!", en: "Attention!" };