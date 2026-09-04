import { contacts } from "@/lib/data";
import { InstagramIcon, XIcon, FacebookIcon, AuthorQuillIcon, type IconProps } from "@/lib/icons";

const ICONS: Record<string, (props: IconProps) => React.JSX.Element> = {
    Instagram: InstagramIcon,
    X: XIcon,
    Facebook: FacebookIcon,
    Author: AuthorQuillIcon,
};

type Props = { size?: number; className?: string };

export default function ContactIcons({ size = 20, className = "" }: Props) {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {contacts.map((c) => {
                const Icon = ICONS[c.label];
                if (!Icon) return null;
                const isAuthor = c.label === "Author";
                return (
                    <a
                        key={c.label}
                        href={c.href}
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