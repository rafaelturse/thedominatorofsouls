import type { LocalizedString } from "./i18n";
import { EXTERNAL_LINKS } from "./routes";
import { InstagramIcon, FacebookIcon, XIcon, WhatsAppIcon, type IconProps } from "./icons";

export type CommunityPlatformId =
  | "amazon"
  | "wattpad"
  | "instagram"
  | "facebook"
  | "x"
  | "whatsapp";

export type CommunityPlatform = {
  id: CommunityPlatformId;
  name: string;
  href: string | LocalizedString;
  description: LocalizedString;
  image?: string;
  icon?: (props: IconProps) => React.JSX.Element;
  iconColor?: string;
};

export const COMMUNITY_PLATFORMS: CommunityPlatform[] = [
  {
    id: "amazon",
    name: "Amazon",
    image: "/img/logos/amazon.png",
    href: "https://www.amazon.com.br/stores/Rafael-Turse/author/B0HHFVRC7S",
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
  {
    id: "instagram",
    name: "Instagram",
    icon: InstagramIcon,
    iconColor: "#E4405F",
    href: EXTERNAL_LINKS.instagram,
    description: {
      "pt-br": "Fotos, bastidores e novidades do universo de O Dominador de Almas, publicados diretamente no Instagram oficial.",
      en: "Photos, behind-the-scenes content, and updates from the Dominator of Souls universe, posted directly on the official Instagram.",
    },
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: FacebookIcon,
    iconColor: "#1877F2",
    href: EXTERNAL_LINKS.facebook,
    description: {
      "pt-br": "Acompanhe anúncios, eventos e novidades da série na página oficial do Facebook.",
      en: "Follow announcements, events, and series updates on the official Facebook page.",
    },
  },
  {
    id: "x",
    name: "X",
    icon: XIcon,
    iconColor: "#ffffff",
    href: EXTERNAL_LINKS.x,
    description: {
      "pt-br": "Atualizações rápidas, curiosidades e bastidores da série no perfil oficial do X (antigo Twitter).",
      en: "Quick updates, trivia, and behind-the-scenes content from the series on the official X (formerly Twitter) profile.",
    },
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: WhatsAppIcon,
    iconColor: "#25D366",
    href: EXTERNAL_LINKS.whatsapp,
    description: {
      "pt-br": "Entre no canal oficial do WhatsApp para receber novidades e avisos de lançamento em primeira mão.",
      en: "Join the official WhatsApp channel to get news and launch announcements first.",
    },
  },
];

export const COMMUNITY_PAGE = {
  title: { "pt-br": "Comunidade", en: "Community" } as LocalizedString,
  heading: { "pt-br": "Onde Nos Encontrar", en: "Where to Find Us" } as LocalizedString,
  subtitle: {
    "pt-br": "Acompanhe, leia e faça parte do universo de O Dominador de Almas nas plataformas abaixo",
    en: "Follow, read, and be part of the Dominator of Souls universe on the platforms below",
  } as LocalizedString,
};