import type { ReactElement } from "react";
import type { LocalizedString } from "./i18n";
import type { IconProps } from "./icons";
import { COMMUNITY_PLATFORMS } from "./community";
import { GooglePlayIcon, SpotifyIcon } from "./icons";
import { EXTERNAL_LINKS } from "./routes";

export type PlatformCard = {
  id: string;
  name: string;
  icon?: (props: IconProps) => ReactElement;
  iconColor?: string;
  image?: string;
  description: LocalizedString;
  href: string | LocalizedString;
};

export const STORE_PLATFORMS_TITLE: LocalizedString = { "pt-br": "Loja", en: "Store" };

const AMAZON_IMAGE = COMMUNITY_PLATFORMS.find((p) => p.id === "amazon")?.image;

export const STORE_PLATFORMS: PlatformCard[] = [
  {
    id: "amazon",
    name: "Amazon",
    image: AMAZON_IMAGE,
    description: {
      "pt-br": "Visite a página do autor na Amazon e encontre os livros de O Dominador de Almas.",
      en: "Visit the author page on Amazon and find the books of The Dominator of Souls.",
    },
    href: EXTERNAL_LINKS.amazonAuthorPage,
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: SpotifyIcon,
    iconColor: "#1DB954",
    description: {
      "pt-br": "Ouça os áudios de O Dominador de Almas no Spotify.",
      en: "Listen to The Dominator of Souls audio on Spotify.",
    },
    href: EXTERNAL_LINKS.spotify,
  },
  {
    id: "googleplay",
    name: "Google Play",
    icon: GooglePlayIcon,
    description: {
      "pt-br": "O audiobook em inglês de Fragmentados, com mais de 4 horas de narração, na Google Play.",
      en: "The English audiobook of Fragmented, with over 4 hours of narration, on Google Play.",
    },
    href: EXTERNAL_LINKS.googlePlay,
  },
];