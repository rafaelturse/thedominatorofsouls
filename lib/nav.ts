import type { LocalizedString } from "./i18n";
import { ROUTES } from "./routes";

export type NavItem = { label: LocalizedString; href: string; comingSoon?: boolean };

export const NAV_ITEMS: NavItem[] = [
  { label: { "pt-br": "Home", en: "Home" }, href: ROUTES.home },
  { label: { "pt-br": "Universo", en: "Universe" }, href: ROUTES.universe, comingSoon: true },
  { label: { "pt-br": "Jogo", en: "Game" }, href: ROUTES.game, comingSoon: true },
  { label: { "pt-br": "Store", en: "Store" }, href: ROUTES.store, comingSoon: true },
  { label: { "pt-br": "Galerias", en: "Gallery" }, href: ROUTES.gallery, comingSoon: true },
  { label: { "pt-br": "Sobre", en: "About" }, href: ROUTES.about, comingSoon: false },
];