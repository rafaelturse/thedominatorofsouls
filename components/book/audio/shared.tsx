import { useEffect, useRef, type RefObject } from "react";

export const BAR_COUNT = 48;

export const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const v = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
  return Math.round(25 + v * 75);
});

export type WaveEffectProps = {
  ratio: number;
  playing: boolean;
  audioRef: RefObject<HTMLAudioElement | null>;
  analyserRef: RefObject<AnalyserNode | null>;
};

export type FrameInfo = {
  time: number;
  playedRatio: number;
  data: Uint8Array | null;
};

export function getLevel(i: number, time: number, data: Uint8Array | null) {
  if (data) {
    const tilt = 1 + (i / BAR_COUNT) * 0.9;
    return Math.min((data[i + 1] / 255) * tilt, 1);
  }
  return 0.35 + 0.65 * Math.abs(Math.sin(time / 260 + i * 0.7) * Math.sin(time / 530 + i * 1.3));
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