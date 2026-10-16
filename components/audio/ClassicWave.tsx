"use client";

import { BARS, BAR_COUNT, type WaveEffectProps } from "./shared";

export default function ClassicWave({ ratio }: WaveEffectProps) {
  return (
    <>
      {BARS.map((h, i) => {
        const played = i / BAR_COUNT < ratio;

        return (
          <span key={i} className="group flex h-full flex-1 items-center">
            <span
              className={`w-full rounded-full transition-colors duration-200 group-hover:bg-red-soft ${played ? "bg-gold-soft" : "bg-muted/40"
                }`}
              style={{ height: `${h}%` }}
            />
          </span>
        );
      })}
    </>
  );
}