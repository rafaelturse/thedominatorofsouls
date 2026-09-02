"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import FooterHome from "@/components/FooterHome";

export default function SiteFooter() {
  const pathname = usePathname();

  return pathname === "/" ? <FooterHome /> : <Footer />;
}