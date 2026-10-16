"use client";

import Link from "next/link";
import { SpotifyIcon } from "@/lib/icons";

type SpotifyButtonProps = {
  caption: string;
  href?: string;
};

export default function SpotifyButton({ caption, href }: SpotifyButtonProps) {
  const content = (
    <>
      <span className="block text-spotify transition-colors group-hover/spotify:text-spotify-dark">
        <SpotifyIcon size={36} />
      </span>
      <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap font-body text-[10px] text-muted transition-colors group-hover/spotify:text-spotify">
        {caption}
      </span>
    </>
  );

  if (!href) {
    return <div className="group/spotify relative shrink-0">{content}</div>;
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={caption}
      className="group/spotify relative shrink-0"
    >
      {content}
    </Link>
  );
}