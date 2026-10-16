"use client";

import SpectrumWave from "./SpectrumWave";
import type { WaveEffectProps } from "./shared";

export default function ComboWave(props: WaveEffectProps) {
  return <SpectrumWave {...props} grow eq eqGain={1.8} eqCurve={0.7} />;
}