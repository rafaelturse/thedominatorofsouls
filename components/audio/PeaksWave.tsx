"use client";

import { useRef } from "react";
import { BARS, BAR_COUNT, getLevel, useAudioFrame, type WaveEffectProps } from "./shared";

const FALL_PER_MS = 0.035;

export default function PeaksWave({ ratio, playing, audioRef, analyserRef }: WaveEffectProps) {
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const capRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const peaksRef = useRef<number[]>(BARS.map((h) => h));
  const lastTimeRef = useRef(0);

  useAudioFrame(
    { playing, audioRef, analyserRef },
    ({ time, playedRatio, data }) => {
      const dt = lastTimeRef.current ? Math.min(time - lastTimeRef.current, 64) : 16;
      lastTimeRef.current = time;
      const peaks = peaksRef.current;

      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barRefs.current[i];
        const cap = capRefs.current[i];
        if (!bar || !cap) continue;

        if (i / BAR_COUNT >= playedRatio) {
          bar.style.height = `${BARS[i]}%`;
          cap.style.opacity = "0";
          peaks[i] = BARS[i];
          continue;
        }

        const level = getLevel(i, time, data);
        const h = Math.min(100, BARS[i] * (0.45 + level * 0.9));
        bar.style.height = `${h}%`;

        peaks[i] = Math.max(h, peaks[i] - dt * FALL_PER_MS);
        cap.style.opacity = "1";
        cap.style.bottom = `calc(${50 + peaks[i] / 2}% + 2px)`;
      }
    },
    () => {
      lastTimeRef.current = 0;
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barRefs.current[i];
        const cap = capRefs.current[i];
        peaksRef.current[i] = BARS[i];
        if (bar) bar.style.height = `${BARS[i]}%`;
        if (cap) cap.style.opacity = "0";
      }
    },
  );

  return (
    <>
      {BARS.map((h, i) => {
        const played = i / BAR_COUNT < ratio;

        return (
          <span key={i} className="group relative flex h-full flex-1 items-center">
            <span
              ref={(el) => {
                barRefs.current[i] = el;
              }}
              className={`w-full rounded-full transition-colors duration-200 group-hover:bg-red-soft ${played ? "bg-gold-soft" : "bg-muted/40"
                }`}
              style={{ height: `${h}%` }}
            />
            <span
              ref={(el) => {
                capRefs.current[i] = el;
              }}
              className="pointer-events-none absolute inset-x-0 h-[3px] rounded-full bg-red-soft opacity-0"
              style={{ bottom: `calc(${50 + h / 2}% + 2px)` }}
            />
          </span>
        );
      })}
    </>
  );
}