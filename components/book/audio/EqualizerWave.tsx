"use client";

import SpectrumWave from "./SpectrumWave";
import type { WaveEffectProps } from "./shared";

export default function EqualizerWave(props: WaveEffectProps) {
  return <SpectrumWave {...props} grow={false} eq eqGain={1} eqCurve={1} />;
}