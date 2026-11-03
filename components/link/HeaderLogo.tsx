"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { LogoMarkIcon } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";

export default function HeaderLogo() {
  const { t, ui } = useLanguage();

  return (
    <Link
      href={ROUTES.home}
      aria-label={t(ui.menu)}
      className="shrink-0 text-gold-soft transition-colors hover:text-red-soft"
    >
      <LogoMarkIcon />
    </Link>
  );
}