"use client";

import { BARS, BAR_COUNT, type WaveEffectProps } from "./shared";

export default function PulseWave({ ratio, playing }: WaveEffectProps) {
  const activeIndex = Math.min(Math.floor(ratio * BAR_COUNT), BAR_COUNT - 1);

  return (
    <>
      {BARS.map((h, i) => {
        const played = i / BAR_COUNT < ratio;
        const distance = Math.abs(i - activeIndex);
        const scale = playing ? (distance === 0 ? 1.35 : distance === 1 ? 1.15 : 1) : 1;

        return (
          <span key={i} className="group flex h-full flex-1 items-center">
            <span
              className={`w-full rounded-full transition-all duration-200 group-hover:bg-red-soft ${played ? "bg-gold-soft" : "bg-muted/40"
                }`}
              style={{ height: `${h}%`, transform: `scaleY(${scale})` }}
            />
          </span>
        );
      })}
    </>
  );
}