"use client";

import { useEffect, useState, type ComponentType } from "react";
import { PlayIcon, PauseIcon } from "@/lib/icons";
import { useAudioPlayer } from "./useAudioPlayer";
import { useBarCount } from "./useBarCount";
import type { WaveEffectProps } from "./shared";
import ComboWave from "./ComboWave";

const EFFECTS: ComponentType<WaveEffectProps>[] = [
  ComboWave
];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type AudioPlayerProps = {
  src: string;
  label: string;
  className?: string;
};

export default function AudioPlayer({ src, label, className = "mt-8" }: AudioPlayerProps) {
  const player = useAudioPlayer();
  const { ref: sliderRef, count: barCount } = useBarCount();
  const [effectIndex, setEffectIndex] = useState(0);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("wave");
    const forced = param === null ? NaN : Number(param);
    const valid = Number.isInteger(forced) && forced >= 0 && forced < EFFECTS.length;
    setEffectIndex(valid ? forced : Math.floor(Math.random() * EFFECTS.length));
  }, []);

  const Effect = EFFECTS[effectIndex];

  return (
    <div className={`${className} flex items-center gap-4`}>
      <button
        type="button"
        onClick={player.toggle}
        aria-label={label}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-soft bg-red-soft text-ink transition-colors hover:bg-transparent hover:text-red-soft"
      >
        {player.playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
      </button>

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          ref={sliderRef}
          role="slider"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={Math.round(player.duration)}
          aria-valuenow={Math.round(player.current)}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            player.seekToRatio((e.clientX - rect.left) / rect.width);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.stopPropagation();
              player.skip(5);
            } else if (e.key === "ArrowLeft") {
              e.stopPropagation();
              player.skip(-5);
            }
          }}
          className="flex h-8 min-w-0 flex-1 cursor-pointer items-center gap-[2px] sm:h-10"
        >
          <Effect
            ratio={player.ratio}
            playing={player.playing}
            audioRef={player.audioRef}
            analyserRef={player.analyserRef}
            barCount={barCount}
          />
        </div>

        <span className="shrink-0 font-body text-[10px] tabular-nums text-muted">
          {formatTime(player.current)} / {formatTime(player.duration)}
        </span>
      </div>

      <audio ref={player.audioRef} src={src} {...player.audioProps} />
    </div>
  );
}