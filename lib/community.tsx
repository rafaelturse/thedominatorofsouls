import type { LocalizedString } from "./i18n";

export type CommunityPlatformId = "amazon" | "wattpad" | "royalroad";

export type CommunityPlatform = {
  id: CommunityPlatformId;
  name: string;
  image: string;
  href: string;
  description: LocalizedString;
};

export const COMMUNITY_PLATFORMS: CommunityPlatform[] = [
  {
    id: "amazon",
    name: "Amazon",
    image: "/img/logos/amazon.svg",
    href: "https://www.amazon.com.br/dp/B0HHFJ496J",
    description: {
      "pt-br": "Compre a edição oficial de As Memórias de Berdox — Volume 1 — Fragmentados, disponível em formato digital e físico em várias lojas Amazon ao redor do mundo.",
      en: "Buy the official edition of The Memories of Berdox — Volume 1 — Fragmented, available in digital and physical formats across Amazon stores worldwide.",
    },
  },
  {
    id: "wattpad",
    name: "Wattpad",
    image: "/img/logos/wattpad.svg",
    href: "https://www.wattpad.com/user/RafaelTurse",
    description: {
      "pt-br": "Acompanhe capítulos, bastidores e novidades sobre o universo de Berdox diretamente no perfil oficial no Wattpad.",
      en: "Follow chapters, behind-the-scenes content, and updates about the Berdox universe directly on the official Wattpad profile.",
    },
  },
  /*{
    id: "royalroad",
    name: "Royal Road",
    image: "/img/logos/royalroad.svg",
    href: "https://www.royalroad.com/",
    description: {
      "pt-br": "Em breve: acompanhe O Dominador de Almas também na Royal Road, plataforma dedicada a ficção original de fantasia e RPG.",
      en: "Coming soon: follow The Dominator of Souls on Royal Road as well, a platform dedicated to original fantasy and RPG fiction.",
    },
  },*/
];

export const COMMUNITY_PAGE = {
  title: { "pt-br": "Comunidade", en: "Community" } as LocalizedString,
  heading: { "pt-br": "Onde Nos Encontrar", en: "Where to Find Us" } as LocalizedString,
  subtitle: {
    "pt-br": "Acompanhe, leia e faça parte do universo de O Dominador de Almas nas plataformas abaixo",
    en: "Follow, read, and be part of the Dominator of Souls universe on the platforms below",
  } as LocalizedString,
};