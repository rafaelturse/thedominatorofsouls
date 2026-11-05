"use client";

import { usePathname } from "next/navigation";
import NavMenu from "./NavMenu";
import { SOCIAL_MENU, isMenuActive } from "./navSections";

export default function SocialMenu() {
  const pathname = usePathname();

  return (
    <NavMenu
      label={SOCIAL_MENU.label}
      sections={SOCIAL_MENU.sections}
      isActive={isMenuActive(pathname, SOCIAL_MENU)}
    />
  );
}