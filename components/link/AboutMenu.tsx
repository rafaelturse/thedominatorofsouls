"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import NavMenu from "./NavMenu";
import { getAboutMenu, isMenuActive } from "./navSections";

export default function AboutMenu() {
  const pathname = usePathname();
  const { ui } = useLanguage();
  const menu = getAboutMenu(ui);

  return (
    <NavMenu label={menu.label} sections={menu.sections} isActive={isMenuActive(pathname, menu)} />
  );
}