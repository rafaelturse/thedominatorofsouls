"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { PlayIcon, PauseIcon } from "@/lib/icons";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function SynopsisAudioPlayer({ src }: { src: string }) {
  const { t, ui } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
    } else {
      el.pause();
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const el = audioRef.current;
    if (!el || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    el.currentTime = ratio * duration;
  }

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div className="mt-8 flex items-center gap-4">
      <button
        type="button"
        onClick={toggle}
        aria-label={t(ui.listenSynopsis)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-soft bg-red-soft text-ink transition-colors hover:bg-transparent hover:text-red-soft"
      >
        {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
      </button>

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div onClick={seek} className="h-1 flex-1 cursor-pointer rounded-full bg-line">
          <div className="h-full rounded-full bg-gold-soft" style={{ width: `${pct}%` }} />
        </div>
        <span className="shrink-0 font-body text-[10px] tabular-nums text-muted">
          {formatTime(current)} / {formatTime(duration)}
        </span>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
    </div>
  );
}