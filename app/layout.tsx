import { EB_Garamond, Inter, Indie_Flower } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-garamond",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
});

const indieFlower = Indie_Flower({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-indie-flower",
});

export const metadata: Metadata = {
  title: "O Dominador de Almas",
  description: "The Dominator of Souls — a série de fantasia de Rafael Turse.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${garamond.variable} ${inter.variable} ${indieFlower.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-bg font-body font-normal text-ink antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}