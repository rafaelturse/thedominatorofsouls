import type { LocalizedString } from "../i18n";

export type EchoCard = {
  id: string;
  category: LocalizedString;
  title: LocalizedString;
  excerpt: LocalizedString;
  tags: LocalizedString[];
  cover: string;
};

export type EchoPart = {
  id: string;
  title: LocalizedString;
  paragraphs: LocalizedString[];
};

export type EchoEntry = {
  id: string;
  title: LocalizedString;
  parts: EchoPart[];
  cover?: LocalizedString;
  comingSoon?: boolean;
};

export type EchoWork = {
  entry: EchoEntry;
  card?: EchoCard;
};