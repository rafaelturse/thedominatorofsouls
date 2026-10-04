"use client";

import { XIcon, WhatsAppIcon, FacebookIcon } from "@/lib/icons";

type ShareIconsProps = {
  url: string;
  title: string;
};

export default function ShareIcons({ url, title }: ShareIconsProps) {
  const encodedUrl = encodeURIComponent(url);
  const message = `Confira este post: ${title}`;
  const encodedMessage = encodeURIComponent(message);

  const links = [
    {
      id: "x",
      Icon: XIcon,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedMessage}`,
      color: "#ffffff",
    },
    {
      id: "facebook",
      Icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "#1877F2",
    },
    {
      id: "whatsapp",
      Icon: WhatsAppIcon,
      href: `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`,
      color: "#25D366",
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {links.map(({ id, Icon, href, color }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-70"
          style={{ color }}
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
  );
}