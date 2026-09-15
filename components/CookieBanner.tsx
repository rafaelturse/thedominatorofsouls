"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { COOKIE_BANNER } from "@/lib/cookies";

export default function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("cookie-consent");
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    window.localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function handleDecline() {
    window.localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-5 py-5 sm:flex-row sm:justify-between">
        <p className="text-center font-body text-xs leading-relaxed text-muted sm:text-left">
          {t(COOKIE_BANNER.message)}
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={handleDecline}
            className="border border-line px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:border-red-soft hover:text-red-soft"
          >
            {t(COOKIE_BANNER.decline)}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="border border-red-soft bg-red-soft px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
          >
            {t(COOKIE_BANNER.accept)}
          </button>
        </div>
      </div>
    </div>
  );
}