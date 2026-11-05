import type { ReactElement } from "react";
import type { LocalizedString } from "./i18n";
import {
  ArchiveIcon,
  BookIcon,
  CommunityIcon,
  NewsIcon,
  QuoteIcon,
  StoreIcon,
  type IconProps,
} from "./icons";
import { ROUTES } from "./routes";

export type SiteGuideItem = {
  href: string;
  icon: (props: IconProps) => ReactElement;
  title: LocalizedString;
  description: LocalizedString;
};

export const SITE_GUIDE_TEXT = {
  eyebrow: { "pt-br": "Sobre a obra", en: "About the work" } as LocalizedString,
  title: { "pt-br": "O Dominador de Almas", en: "The Dominator of Souls" } as LocalizedString,
  body: {
    "pt-br":
      "O Dominador de Almas não é apenas um livro, mas um universo imenso construído sobre pilares de inovação — pilares que não poderiam ter outro alicerce senão a própria solidez da tradição. Os muitos livros que comporão esta obra expandirão seus horizontes com o compromisso de criar histórias de enredos robustos e personagens icônicos — personagens que, por meio de aventuras épicas, certamente deixarão sua marca por onde passarem, inclusive nos próprios leitores.",
    en: "The Dominator of Souls is not just a book, but an immense universe built on pillars of innovation — pillars that could have no other foundation than the very solidity of tradition. The many books that will make up this work will expand its horizons through a commitment to crafting stories with robust plots and iconic characters — characters who, through epic adventures, will surely leave their mark wherever they go, including on the readers themselves.",
  } as LocalizedString,
  button: { "pt-br": "Saiba mais", en: "Learn more" } as LocalizedString,
};

export const SITE_GUIDE_ITEMS: SiteGuideItem[] = [
  {
    href: ROUTES.universe,
    icon: BookIcon,
    title: { "pt-br": "Universo", en: "Universe" },
    description: {
      "pt-br":
        "O guia para entender o mundo da obra. Conteúdo extra e explicativo sobre a mitologia, o glossário, as classes, as raças e tudo o que dá forma ao universo de O Dominador de Almas.",
      en: "The guide to understanding the world of the work. Extra explanatory content on the mythology, the glossary, the classes, the races and everything that shapes the universe of The Dominator of Souls.",
    },
  },
  {
    href: ROUTES.echoes,
    icon: QuoteIcon,
    title: { "pt-br": "Ecos", en: "Echoes" },
    description: {
      "pt-br":
        "Fragmentos de histórias perdidas, os apócrifos do universo. Leia contos paralelos registrados pelo detetive Stan Brings, cujos achados são publicados em partes.",
      en: "Fragments of lost stories, the apocrypha of the universe. Read side tales recorded by the detective Stan Brings, whose findings are published in parts.",
    },
  },
  {
    href: ROUTES.store,
    icon: StoreIcon,
    title: { "pt-br": "Loja", en: "Store" },
    description: {
      "pt-br":
        "Leve a história com você. Encontre as edições disponíveis, nos formatos físico e digital, e os links das lojas onde cada livro pode ser adquirido.",
      en: "Take the story with you. Find the available editions, in print and digital formats, and the links to the stores where each book can be purchased.",
    },
  },
  {
    href: ROUTES.blog,
    icon: NewsIcon,
    title: { "pt-br": "Blog", en: "Blog" },
    description: {
      "pt-br":
        "Novidades, bastidores e processo criativo. Acompanhe os anúncios de lançamentos, a evolução das capas e tudo o que acontece por trás da escrita.",
      en: "News, behind-the-scenes and creative process. Follow release announcements, the evolution of the covers and everything that happens behind the writing.",
    },
  },
  {
    href: ROUTES.community,
    icon: CommunityIcon,
    title: { "pt-br": "Comunidade", en: "Community" },
    description: {
      "pt-br":
        "O lugar de quem vive o universo junto. Reúna-se com outros leitores, compartilhe teorias e acompanhe o autor nas redes e plataformas oficiais.",
      en: "The place for those who live the universe together. Meet other readers, share theories and follow the author on the official networks and platforms.",
    },
  },
  {
    href: ROUTES.timeline,
    icon: ArchiveIcon,
    title: { "pt-br": "Linha do Tempo", en: "Timeline" },
    description: {
      "pt-br":
        "Toda a jornada em ordem cronológica. Revisite lançamentos, marcos e atualizações da obra, do primeiro rascunho às novidades mais recentes.",
      en: "The whole journey in chronological order. Revisit releases, milestones and updates of the work, from the first draft to the latest news.",
    },
  },
];