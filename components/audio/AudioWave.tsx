"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useBarCount } from "./useBarCount";
import type { WaveEffectProps } from "./shared";
import ComboWave from "./ComboWave";

const EFFECTS: ComponentType<WaveEffectProps>[] = [
  ComboWave,
];

type AudioWaveProps = {
  label: string;
  ratio: number;
  playing: boolean;
  current: number;
  duration: number;
  audioRef: WaveEffectProps["audioRef"];
  analyserRef: WaveEffectProps["analyserRef"];
  onSeek: (ratio: number) => void;
  onSkip: (seconds: number) => void;
};

export default function AudioWave({
  label,
  ratio,
  playing,
  current,
  duration,
  audioRef,
  analyserRef,
  onSeek,
  onSkip,
}: AudioWaveProps) {
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
    <div
      ref={sliderRef}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(current)}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onSeek((e.clientX - rect.left) / rect.width);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.stopPropagation();
          onSkip(5);
        } else if (e.key === "ArrowLeft") {
          e.stopPropagation();
          onSkip(-5);
        }
      }}
      className="flex h-8 min-w-0 flex-1 cursor-pointer items-center gap-[2px] sm:h-10"
    >
      <Effect
        ratio={ratio}
        playing={playing}
        audioRef={audioRef}
        analyserRef={analyserRef}
        barCount={barCount}
      />
    </div>
  );
}