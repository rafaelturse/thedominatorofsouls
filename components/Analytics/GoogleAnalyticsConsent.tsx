"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const GA_ID = "G-QQ5MPFLHBX";

export default function GoogleAnalyticsConsent() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    function checkConsent() {
      const stored = window.localStorage.getItem("cookie-consent");
      setConsented(stored === "accepted");
    }

    checkConsent();

    window.addEventListener("cookie-consent-changed", checkConsent);
    return () => window.removeEventListener("cookie-consent-changed", checkConsent);
  }, []);

  if (!consented) return null;

  return <GoogleAnalytics gaId={GA_ID} />;
}