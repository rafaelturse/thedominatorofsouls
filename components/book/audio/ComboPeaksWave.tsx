"use client";

import { useRef } from "react";
import { BARS, BAR_COUNT, getLevel, useAudioFrame, type WaveEffectProps } from "./shared";

const EQ_MAX = 50;
const EQ_GAIN = 1.8;
const EQ_CURVE = 0.7;
const RED_FALL_PER_MS = 0.035;
const GOLD_FALL_PER_MS = 0.02;
const CAP_LIMIT = 96;

export default function ComboPeaksWave({ ratio, playing, audioRef, analyserRef }: WaveEffectProps) {
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const eqRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const redCapRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const goldCapRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const redPeaksRef = useRef<number[]>(BARS.map((h) => h));
  const goldPeaksRef = useRef<number[]>(BARS.map((h) => h));
  const lastTimeRef = useRef(0);

  useAudioFrame(
    { playing, audioRef, analyserRef },
    ({ time, playedRatio, data }) => {
      const dt = lastTimeRef.current ? Math.min(time - lastTimeRef.current, 64) : 16;
      lastTimeRef.current = time;
      const redPeaks = redPeaksRef.current;
      const goldPeaks = goldPeaksRef.current;

      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barRefs.current[i];
        const eq = eqRefs.current[i];
        const redCap = redCapRefs.current[i];
        const goldCap = goldCapRefs.current[i];
        if (!bar || !eq || !redCap || !goldCap) continue;

        if (i / BAR_COUNT >= playedRatio) {
          bar.style.height = `${BARS[i]}%`;
          eq.style.height = "0%";
          redCap.style.opacity = "0";
          goldCap.style.opacity = "0";
          redPeaks[i] = BARS[i];
          goldPeaks[i] = BARS[i];
          continue;
        }

        const level = getLevel(i, time, data);
        const h = Math.min(100, BARS[i] * (0.45 + level * 0.9));
        const eqLevel = Math.min(1, Math.pow(level, EQ_CURVE) * EQ_GAIN);

        bar.style.height = `${h}%`;
        eq.style.height = `${eqLevel * EQ_MAX}%`;

        redPeaks[i] = Math.max(h, redPeaks[i] - dt * RED_FALL_PER_MS);
        goldPeaks[i] = Math.max(h, goldPeaks[i] - dt * GOLD_FALL_PER_MS);

        redCap.style.opacity = "1";
        goldCap.style.opacity = "1";
        redCap.style.bottom = `calc(${50 + Math.min(redPeaks[i], CAP_LIMIT) / 2}% + 2px)`;
        goldCap.style.top = `calc(${50 + Math.min(goldPeaks[i], CAP_LIMIT) / 2}% + 2px)`;
      }
    },
    () => {
      lastTimeRef.current = 0;
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barRefs.current[i];
        const eq = eqRefs.current[i];
        const redCap = redCapRefs.current[i];
        const goldCap = goldCapRefs.current[i];
        redPeaksRef.current[i] = BARS[i];
        goldPeaksRef.current[i] = BARS[i];
        if (bar) bar.style.height = `${BARS[i]}%`;
        if (eq) eq.style.height = "0%";
        if (redCap) redCap.style.opacity = "0";
        if (goldCap) goldCap.style.opacity = "0";
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
              className={`relative w-full overflow-hidden rounded-full transition-colors duration-200 group-hover:bg-red-soft ${
                played ? "bg-gold-soft" : "bg-muted/40"
              }`}
              style={{ height: `${h}%` }}
            >
              <span
                ref={(el) => {
                  eqRefs.current[i] = el;
                }}
                className="absolute inset-x-0 bottom-0 h-0 bg-red-soft"
              />
            </span>

            <span
              ref={(el) => {
                redCapRefs.current[i] = el;
              }}
              className="pointer-events-none absolute inset-x-0 h-[3px] rounded-full bg-red-soft opacity-0"
              style={{ bottom: `calc(${50 + h / 2}% + 2px)` }}
            />
            <span
              ref={(el) => {
                goldCapRefs.current[i] = el;
              }}
              className="pointer-events-none absolute inset-x-0 h-[3px] rounded-full bg-gold-soft opacity-0"
              style={{ top: `calc(${50 + h / 2}% + 2px)` }}
            />
          </span>
        );
      })}
    </>
  );
}