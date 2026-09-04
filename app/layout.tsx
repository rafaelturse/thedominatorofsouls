import { EB_Garamond, Inter, Indie_Flower } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

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
  title: "The Dominator of Souls",
  description: "An epic fantasy universe by Rafael Turse.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${inter.variable} ${indieFlower.variable}`}
    >
      <body className="bg-bg bg-grain flex min-h-screen flex-col font-body font-normal text-ink antialiased">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}