"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import FooterHome from "./FooterHome";

export default function SiteFooter() {
  const pathname = usePathname();

  return pathname === "/" ? <FooterHome /> : <Footer />;
}