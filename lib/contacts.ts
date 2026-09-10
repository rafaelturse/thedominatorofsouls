import type { LocalizedString } from "./i18n";
import { EXTERNAL_LINKS } from "./routes";

export type Contact = { label: string; href: string | LocalizedString };

export const contacts: Contact[] = [
  { label: "WhatsApp", href: EXTERNAL_LINKS.whatsapp },
  { label: "Facebook", href: EXTERNAL_LINKS.facebook },
  { label: "Instagram", href: EXTERNAL_LINKS.instagram },
  { label: "X", href: EXTERNAL_LINKS.x },
  { label: "Wattpad", href: EXTERNAL_LINKS.wattpad },
  { label: "Author", href: EXTERNAL_LINKS.authorSite },
];