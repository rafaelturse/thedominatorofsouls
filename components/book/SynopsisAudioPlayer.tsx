"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { PlayIcon, PauseIcon } from "@/lib/icons";

const BAR_COUNT = 48;

const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const v = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
  return Math.round(25 + v * 75);
});

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

  function sync() {
    const el = audioRef.current;
    if (!el) return;
    setCurrent(el.currentTime);
    if (Number.isFinite(el.duration)) setDuration(el.duration);
  }

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    function tick() {
      sync();
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => setPlaying(false));
    } else {
      el.pause();
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const el = audioRef.current;
    if (!el || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const time = ratio * duration;
    el.currentTime = time;
    setCurrent(time);
  }

  function handleKey(e: React.KeyboardEvent<HTMLDivElement>) {
    const el = audioRef.current;
    if (!el || !duration) return;
    if (e.key === "ArrowRight") {
      el.currentTime = Math.min(el.currentTime + 5, duration);
      setCurrent(el.currentTime);
    } else if (e.key === "ArrowLeft") {
      el.currentTime = Math.max(el.currentTime - 5, 0);
      setCurrent(el.currentTime);
    }
  }

  const ratio = duration ? current / duration : 0;
  const activeIndex = Math.min(Math.floor(ratio * BAR_COUNT), BAR_COUNT - 1);

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
        <div
          role="slider"
          tabIndex={0}
          aria-label={t(ui.listenSynopsis)}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(current)}
          onClick={seek}
          onKeyDown={handleKey}
          className="flex h-8 min-w-0 flex-1 cursor-pointer items-center gap-[2px] sm:h-10"
        >
          {BARS.map((h, i) => {
            const played = i / BAR_COUNT < ratio;
            const distance = Math.abs(i - activeIndex);
            const scale = playing ? (distance === 0 ? 1.35 : distance === 1 ? 1.15 : 1) : 1;

            return (
              <span key={i} className="group flex h-full flex-1 items-center">
                <span
                  className={`w-full rounded-full transition-all duration-200 group-hover:bg-red-soft ${
                    played ? "bg-gold-soft" : "bg-muted/40"
                  }`}
                  style={{ height: `${h}%`, transform: `scaleY(${scale})` }}
                />
              </span>
            );
          })}
        </div>

        <span className="shrink-0 font-body text-[10px] tabular-nums text-muted">
          {formatTime(current)} / {formatTime(duration)}
        </span>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPlaying={() => {
          setPlaying(true);
          sync();
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          sync();
        }}
        onSeeked={sync}
        onTimeUpdate={sync}
        onLoadedMetadata={sync}
        onDurationChange={sync}
      />
    </div>
  );
}