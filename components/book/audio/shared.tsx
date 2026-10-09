import { useEffect, useRef, type RefObject } from "react";

export const BAR_COUNT = 48;
export const BAR_MAX = 120;

export const BAR_HEIGHTS = Array.from({ length: BAR_MAX }, (_, i) => {
  const v = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
  return Math.round(25 + v * 75);
});

export const BARS = BAR_HEIGHTS.slice(0, BAR_COUNT);

export type WaveEffectProps = {
  ratio: number;
  playing: boolean;
  audioRef: RefObject<HTMLAudioElement | null>;
  analyserRef: RefObject<AnalyserNode | null>;
  barCount: number;
};

export type FrameInfo = {
  time: number;
  playedRatio: number;
  data: Uint8Array | null;
};

export function getLevel(i: number, time: number, data: Uint8Array | null, count = BAR_COUNT) {
  const pos = (i / count) * BAR_COUNT;

  if (data) {
    const bin = pos + 1;
    const lo = Math.floor(bin);
    const frac = bin - lo;
    const value = data[lo] * (1 - frac) + data[lo + 1] * frac;
    const tilt = 1 + (pos / BAR_COUNT) * 0.9;
    return Math.min((value / 255) * tilt, 1);
  }

  return 0.35 + 0.65 * Math.abs(Math.sin(time / 260 + pos * 0.7) * Math.sin(time / 530 + pos * 1.3));
}

export function useAudioFrame(
  { playing, audioRef, analyserRef }: Pick<WaveEffectProps, "playing" | "audioRef" | "analyserRef">,
  onFrame: (info: FrameInfo) => void,
  onStop: () => void,
) {
  const frameRef = useRef(onFrame);
  const stopRef = useRef(onStop);

  useEffect(() => {
    frameRef.current = onFrame;
    stopRef.current = onStop;
  });

  useEffect(() => {
    if (!playing) {
      stopRef.current();
      return;
    }

    const analyser = analyserRef.current;
    const data = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
    let frame = 0;

    function tick(time: number) {
      const el = audioRef.current;
      const total = el && Number.isFinite(el.duration) ? el.duration : 0;
      const playedRatio = el && total ? el.currentTime / total : 0;

      if (analyser && data) analyser.getByteFrequencyData(data);
      frameRef.current({ time, playedRatio, data });

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, audioRef, analyserRef]);
}