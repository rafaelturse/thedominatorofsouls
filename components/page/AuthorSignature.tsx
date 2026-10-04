"use client";

import { useLanguage } from "@/lib/i18n";
import { ABOUT } from "@/lib/data";

type AuthorSignatureProps = {
  align?: "start" | "center" | "end";
};

export default function AuthorSignature({ align = "end" }: AuthorSignatureProps) {
  const { t } = useLanguage();

  const alignClass =
    align === "end" ? "self-end" : align === "center" ? "self-center" : "self-start";

  return (
    <p
      className={`mt-2 cursor-default font-accent text-2xl text-gold-soft transition-colors duration-300 hover:text-red-soft ${alignClass}`}
    >
      {t(ABOUT.signature)}
    </p>
  );
}