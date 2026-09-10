import { contacts } from "@/lib/data";
import { InstagramIcon, XIcon, FacebookIcon, WattpadIcon, WhatsAppIcon, AuthorQuillIcon, type IconProps } from "@/lib/icons";
import { useLanguage } from "@/lib/i18n";
import type { LocalizedString } from "@/lib/i18n";

const ICONS: Record<string, (props: IconProps) => React.JSX.Element> = {
    Instagram: InstagramIcon,
    X: XIcon,
    Facebook: FacebookIcon,
    WhatsApp: WhatsAppIcon,
    Wattpad: WattpadIcon,
    Author: AuthorQuillIcon,
};

type Props = { size?: number; className?: string };

function isLocalized(href: string | LocalizedString): href is LocalizedString {
    return typeof href === "object";
}

export default function ContactIcons({ size = 20, className = "" }: Props) {
    const { locale } = useLanguage();

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {contacts.map((c) => {
                const Icon = ICONS[c.label];
                if (!Icon) return null;
                const isAuthor = c.label === "Author";
                const href = isLocalized(c.href) ? c.href[locale] : c.href;
                return (
                    <a
                        key={c.label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={c.label}
                        className={`transition-colors ${isAuthor
                            ? "text-red-soft hover:text-gold-soft"
                            : "text-current hover:text-gold-soft"
                            }`}
                    >
                        <Icon size={size} />
                    </a>
                );
            })}
        </div>
    );
}