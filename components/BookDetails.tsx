import Link from "next/link";
import type { Book } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { PagesIcon, CalendarIcon, AuthorIcon, MoreIcon } from "@/lib/icons";
import { EXTERNAL_LINKS, ROUTES } from "@/lib/routes";

type BookDetailsProps = {
  book: Book;
  hideMore?: boolean;
};

export default function BookDetails({ book, hideMore = false }: BookDetailsProps) {
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
      href: EXTERNAL_LINKS.authorSite,
      external: true,
      linksAway: true,
    },
    hideMore
      ? null
      : {
          icon: MoreIcon,
          label: t(ui.more),
          href: ROUTES.bookDetail(book.slug),
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
              item.linksAway ? "hover:scale-105 hover:text-gold-soft" : "hover:text-gold-soft"
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