import Link from "next/link";

export type FooterLink = {
    key: string;
    label: string;
    href: string;
    external?: boolean;
};

type FooterColumnProps = {
    title: string;
    href?: string;
    links: FooterLink[];
};

export default function FooterColumn({ title, href, links }: FooterColumnProps) {
    return (
        <div className="w-44 shrink-0 text-left">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-gold-soft">
                {href ? (
                    <Link href={href} className="transition-colors hover:text-red-soft">
                        {title}
                    </Link>
                ) : (
                    title
                )}
            </p>

            <ul className="mt-4 flex flex-col gap-2.5">
                {links.map((link) => (
                    <li key={link.key}>
                        <Link
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                            className="group flex items-start gap-2 font-body text-xs leading-snug text-muted transition-colors hover:text-gold-soft"
                        >
                            <span
                                aria-hidden
                                className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-gold-soft transition-colors group-hover:bg-red-soft"
                            />
                            <span>{link.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}