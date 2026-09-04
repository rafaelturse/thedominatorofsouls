import { EXTERNAL_LINKS } from "./routes";

export type Contact = { label: string; href: string };

export const contacts: Contact[] = [
  { label: "Facebook", href: EXTERNAL_LINKS.facebook },
  { label: "Instagram", href: EXTERNAL_LINKS.instagram },
  { label: "X", href: EXTERNAL_LINKS.x },
  { label: "Author", href: EXTERNAL_LINKS.authorSite },
];