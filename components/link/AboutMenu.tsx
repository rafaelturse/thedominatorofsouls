"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";

export default function AboutMenu() {
  const pathname = usePathname();
  const { t, ui } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isActive = pathname === ROUTES.about || pathname === ROUTES.privacy;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 font-body text-xs uppercase tracking-[0.15em] transition-colors hover:text-gold-soft ${isActive ? "text-gold-soft" : "text-muted"
          }`}
      >
        {t(ui.aboutLabel)}
        <span className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}>›</span>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-10 mt-2 w-40 -translate-x-1/2 border border-line bg-bg shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]">
          <Link
            href={ROUTES.about}
            onClick={() => setOpen(false)}
            className="block border-b border-line px-4 py-2.5 text-left font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:bg-surface hover:text-gold-soft"
          >
            {t(ui.aboutLabel)}
          </Link>
          <Link
            href={ROUTES.privacy}
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-left font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:bg-surface hover:text-gold-soft"
          >
            {t(ui.privacyLabel)}
          </Link>
        </div>
      )}
    </div>
  );
}