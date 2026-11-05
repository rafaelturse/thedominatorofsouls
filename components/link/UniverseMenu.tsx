"use client";

import { usePathname } from "next/navigation";
import NavMenu from "./NavMenu";
import { UNIVERSE_MENU, isMenuActive } from "./navSections";

export default function UniverseMenu() {
  const pathname = usePathname();

  return (
    <NavMenu
      label={UNIVERSE_MENU.label}
      sections={UNIVERSE_MENU.sections}
      isActive={isMenuActive(pathname, UNIVERSE_MENU)}
    />
  );
}