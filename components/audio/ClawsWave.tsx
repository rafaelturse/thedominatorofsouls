"use client";

import { useRef } from "react";
import { BARS, BAR_COUNT, getLevel, useAudioFrame, type WaveEffectProps } from "./shared";

export default function ClawsWave({ ratio, playing, audioRef, analyserRef }: WaveEffectProps) {
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useAudioFrame(
    { playing, audioRef, analyserRef },
    ({ time, playedRatio, data }) => {
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barRefs.current[i];
        if (!bar) continue;

        if (i / BAR_COUNT >= playedRatio) {
          bar.style.height = `${BARS[i]}%`;
          continue;
        }

        const level = getLevel(i, time, data);
        bar.style.height = `${Math.min(100, BARS[i] * (0.5 + level * 0.8))}%`;
      }
    },
    () => {
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barRefs.current[i];
        if (bar) bar.style.height = `${BARS[i]}%`;
      }
    },
  );

  return (
    <>
      {BARS.map((h, i) => {
        const played = i / BAR_COUNT < ratio;

        return (
          <span key={i} className="group flex h-full flex-1 items-center justify-center">
            <span
              ref={(el) => {
                barRefs.current[i] = el;
              }}
              className={`w-full transition-colors duration-200 group-hover:bg-red-soft ${played ? "bg-gold-soft" : "bg-muted/40"
                }`}
              style={{
                height: `${h}%`,
                transform: "skewX(-20deg)",
                clipPath: "polygon(50% 0, 100% 20%, 100% 100%, 0 100%, 0 20%)",
              }}
            />
          </span>
        );
      })}
    </>
  );
}