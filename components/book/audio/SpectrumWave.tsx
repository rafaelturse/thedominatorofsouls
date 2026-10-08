"use client";

import { useRef } from "react";
import { BARS, BAR_COUNT, getLevel, useAudioFrame, type WaveEffectProps } from "./shared";

const EQ_MAX = 50;

type SpectrumWaveProps = WaveEffectProps & {
  grow: boolean;
  eq: boolean;
  eqGain?: number;
  eqCurve?: number;
};

export default function SpectrumWave({
  ratio,
  playing,
  audioRef,
  analyserRef,
  grow,
  eq,
  eqGain = 1,
  eqCurve = 1,
}: SpectrumWaveProps) {
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const eqRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useAudioFrame(
    { playing, audioRef, analyserRef },
    ({ time, playedRatio, data }) => {
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barRefs.current[i];
        const eqBar = eqRefs.current[i];

        if (i / BAR_COUNT >= playedRatio) {
          if (bar) bar.style.height = `${BARS[i]}%`;
          if (eqBar) eqBar.style.height = "0%";
          continue;
        }

        const level = getLevel(i, time, data);

        if (bar && grow) {
          bar.style.height = `${Math.min(100, BARS[i] * (0.45 + level * 0.9))}%`;
        }
        if (eqBar && eq) {
          const eqLevel = Math.min(1, Math.pow(level, eqCurve) * eqGain);
          eqBar.style.height = `${eqLevel * EQ_MAX}%`;
        }
      }
    },
    () => {
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barRefs.current[i];
        const eqBar = eqRefs.current[i];
        if (bar) bar.style.height = `${BARS[i]}%`;
        if (eqBar) eqBar.style.height = "0%";
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
              className={`relative w-full overflow-hidden rounded-full transition-colors duration-200 group-hover:bg-red-soft ${played ? "bg-gold-soft" : "bg-muted/40"
                }`}
              style={{ height: `${h}%` }}
            >
              {eq && (
                <span
                  ref={(el) => {
                    eqRefs.current[i] = el;
                  }}
                  className="absolute inset-x-0 bottom-0 h-0 bg-red-soft"
                />
              )}
            </span>
          </span>
        );
      })}
    </>
  );
}