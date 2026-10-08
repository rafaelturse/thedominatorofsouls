"use client";

import SpectrumWave from "./SpectrumWave";
import type { WaveEffectProps } from "./shared";

export default function DynamicWave(props: WaveEffectProps) {
  return <SpectrumWave {...props} grow eq={false} />;
}