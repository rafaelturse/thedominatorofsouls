import { contacts } from "@/lib/data";
import { COMMUNITY_PLATFORMS } from "@/lib/community";
import { InstagramIcon, XIcon, FacebookIcon, WattpadIcon, WhatsAppIcon, SpotifyIcon, AuthorQuillIcon, type IconProps } from "@/lib/icons";
import { useLanguage } from "@/lib/i18n";
import type { LocalizedString } from "@/lib/i18n";

const ICONS: Record<string, (props: IconProps) => React.JSX.Element> = {
    Instagram: InstagramIcon,
    X: XIcon,
    Facebook: FacebookIcon,
    WhatsApp: WhatsAppIcon,
    Wattpad: WattpadIcon,
    Spotify: SpotifyIcon,
    Author: AuthorQuillIcon,
};

const AMAZON_LOGO = COMMUNITY_PLATFORMS.find((p) => p.id === "amazon")?.image;

type Props = { size?: number; className?: string; exclude?: string[] };

function isLocalized(href: string | LocalizedString): href is LocalizedString {
    return typeof href === "object";
}

export default function ContactIcons({ size = 20, className = "", exclude = [] }: Props) {
    const { locale } = useLanguage();

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {contacts
                .filter((c) => !exclude.includes(c.label))
                .map((c) => {
                    const Icon = ICONS[c.label];
                    const image = c.label === "Amazon" ? AMAZON_LOGO : undefined;
                    if (!Icon && !image) return null;
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
                            {Icon ? (
                                <Icon size={size} />
                            ) : (
                                <span className="relative block">
                                    <img
                                        src={image}
                                        alt=""
                                        style={{ height: size }}
                                        className="invisible w-auto"
                                    />
                                    <span
                                        aria-hidden
                                        className="absolute inset-0 bg-current"
                                        style={{
                                            WebkitMaskImage: `url(${image})`,
                                            maskImage: `url(${image})`,
                                            WebkitMaskRepeat: "no-repeat",
                                            maskRepeat: "no-repeat",
                                            WebkitMaskSize: "contain",
                                            maskSize: "contain",
                                            WebkitMaskPosition: "center",
                                            maskPosition: "center",
                                        }}
                                    />
                                </span>
                            )}
                        </a>
                    );
                })}
        </div>
    );
}