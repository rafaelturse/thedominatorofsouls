"use client";

import { PlayIcon, PauseIcon } from "@/lib/icons";

type PlayButtonProps = {
  playing: boolean;
  onToggle: () => void;
  label: string;
  caption: string;
};

export default function PlayButton({ playing, onToggle, label, caption }: PlayButtonProps) {
  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={onToggle}
        aria-label={label}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-red-soft bg-red-soft text-ink transition-colors hover:bg-transparent hover:text-red-soft"
      >
        {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
      </button>

      <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap font-body text-[10px] tabular-nums text-muted">
        {caption}
      </span>
    </div>
  );
}