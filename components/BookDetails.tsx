import Link from "next/link";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

type IconProps = { size?: number };

const PagesIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const CalendarIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const AuthorIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </svg>
);

const MoreIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export default function BookDetails({ book }: { book: Book }) {
  const { t, ui } = useLanguage();

  const items = [
    book.pageCount
      ? {
          icon: PagesIcon,
          label: `${book.pageCount} ${t(ui.pagesSuffix)}`,
          href: undefined,
          external: false,
          linksAway: false,
        }
      : null,
    {
      icon: CalendarIcon,
      label: `${t(ui.publishedOn)} ${t(book.release)}`,
      href: undefined,
      external: false,
      linksAway: false,
    },
    {
      icon: AuthorIcon,
      label: t(ui.aboutAuthor),
      href: "https://rafaelturse.com",
      external: true,
      linksAway: true,
    },
    {
      icon: MoreIcon,
      label: t(ui.more),
      href: `/livros/${book.slug}`,
      external: false,
      linksAway: true,
    },
  ].filter(Boolean) as {
    icon: typeof PagesIcon;
    label: string;
    href?: string;
    external: boolean;
    linksAway: boolean;
  }[];

  return (
    <div className="mt-6 flex flex-wrap items-start justify-center gap-x-10 gap-y-4 border-t border-line py-5 sm:justify-start">
      {items.map((item) => {
        const Icon = item.icon;
        const content = (
          <div
            className={`flex flex-col items-center gap-2 text-muted transition-all duration-300 ${
              item.linksAway ? "hover:scale-105 hover:text-red-soft" : "hover:text-gold-soft"
            }`}
          >
            <Icon />
            <span className="font-body text-xs uppercase tracking-[0.1em]">{item.label}</span>
          </div>
        );

        if (!item.href) {
          return <div key={item.label}>{content}</div>;
        }

        return item.external ? (
          <Link key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
            {content}
          </Link>
        ) : (
          <Link key={item.label} href={item.href}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}