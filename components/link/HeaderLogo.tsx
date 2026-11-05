"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { LogoMarkIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";

type HeaderLogoProps = {
  size?: number;
  onClick?: () => void;
};

export default function HeaderLogo({ size = 44, onClick }: HeaderLogoProps) {
  const { t, ui } = useLanguage();

  return (
    <Link
      href={ROUTES.home}
      onClick={onClick}
      aria-label={t(ui.menu)}
      className="shrink-0 text-gold-soft transition-colors hover:text-red-soft"
    >
      <LogoMarkIcon size={size} />
    </Link>
  );
}