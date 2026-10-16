"use client";

import { useRef } from "react";
import { BARS, BAR_COUNT, getLevel, useAudioFrame, type WaveEffectProps } from "./shared";

export default function GradientWave({ ratio, playing, audioRef, analyserRef }: WaveEffectProps) {
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useAudioFrame(
    { playing, audioRef, analyserRef },
    ({ time, playedRatio, data }) => {
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barRefs.current[i];
        if (!bar) continue;

        if (i / BAR_COUNT >= playedRatio) {
          bar.style.backgroundColor = "";
          continue;
        }

        const level = getLevel(i, time, data);
        const pct = Math.round(Math.pow(level, 0.8) * 100);
        bar.style.backgroundColor = `color-mix(in srgb, var(--color-red-soft) ${pct}%, var(--color-gold-soft))`;
      }
    },
    () => {
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barRefs.current[i];
        if (bar) bar.style.backgroundColor = "";
      }
    },
  );

  return (
    <>
      {BARS.map((h, i) => {
        const played = i / BAR_COUNT < ratio;

        return (
          <span key={i} className="group flex h-full flex-1 items-center">
            <span
              ref={(el) => {
                barRefs.current[i] = el;
              }}
              className={`relative w-full overflow-hidden rounded-full ${played ? "bg-gold-soft" : "bg-muted/40"
                }`}
              style={{ height: `${h}%` }}
            >
              <span className="absolute inset-0 bg-red-soft opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </span>
          </span>
        );
      })}
    </>
  );
}