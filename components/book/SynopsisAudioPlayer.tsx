"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { PlayIcon, PauseIcon } from "@/lib/icons";

const BAR_COUNT = 48;
const EQ_MAX = 50;

const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const v = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
  return Math.round(25 + v * 75);
});

type AudioCtor = typeof AudioContext;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function SynopsisAudioPlayer({ src }: { src: string }) {
  const { t, ui } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const triedRef = useRef(false);
  const eqRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  function sync() {
    const el = audioRef.current;
    if (!el) return;
    setCurrent(el.currentTime);
    if (Number.isFinite(el.duration)) setDuration(el.duration);
  }

  function ensureAnalyser() {
    const el = audioRef.current;
    if (!el || triedRef.current) return;
    triedRef.current = true;
    try {
      const w = window as unknown as { AudioContext?: AudioCtor; webkitAudioContext?: AudioCtor };
      const Ctor = w.AudioContext ?? w.webkitAudioContext;
      if (!Ctor) return;
      const ctx = new Ctor();
      const source = ctx.createMediaElementSource(el);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = analyser;
    } catch {
      analyserRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      ctxRef.current?.close();
      ctxRef.current = null;
      analyserRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    function tick() {
      sync();
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  useEffect(() => {
    const bars = eqRefs.current;

    if (!playing) {
      bars.forEach((bar) => {
        if (bar) bar.style.height = "0%";
      });
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

      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = bars[i];
        if (!bar) continue;

        if (i / BAR_COUNT >= playedRatio) {
          bar.style.height = "0%";
          continue;
        }

        let level: number;
        if (analyser && data) {
          const tilt = 1 + (i / BAR_COUNT) * 0.9;
          level = Math.min((data[i + 1] / 255) * tilt, 1);
        } else {
          level = 0.35 + 0.65 * Math.abs(Math.sin(time / 260 + i * 0.7) * Math.sin(time / 530 + i * 1.3));
        }
        bar.style.height = `${level * EQ_MAX}%`;
      }

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      ensureAnalyser();
      ctxRef.current?.resume();
      el.play().catch(() => setPlaying(false));
    } else {
      el.pause();
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const el = audioRef.current;
    if (!el || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const time = ratio * duration;
    el.currentTime = time;
    setCurrent(time);
  }

  function handleKey(e: React.KeyboardEvent<HTMLDivElement>) {
    const el = audioRef.current;
    if (!el || !duration) return;
    if (e.key === "ArrowRight") {
      el.currentTime = Math.min(el.currentTime + 5, duration);
      setCurrent(el.currentTime);
    } else if (e.key === "ArrowLeft") {
      el.currentTime = Math.max(el.currentTime - 5, 0);
      setCurrent(el.currentTime);
    }
  }

  const ratio = duration ? current / duration : 0;
  const activeIndex = Math.min(Math.floor(ratio * BAR_COUNT), BAR_COUNT - 1);

  return (
    <div className="mt-8 flex items-center gap-4">
      <button
        type="button"
        onClick={toggle}
        aria-label={t(ui.listenSynopsis)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-soft bg-red-soft text-ink transition-colors hover:bg-transparent hover:text-red-soft"
      >
        {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
      </button>

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          role="slider"
          tabIndex={0}
          aria-label={t(ui.listenSynopsis)}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(current)}
          onClick={seek}
          onKeyDown={handleKey}
          className="flex h-8 min-w-0 flex-1 cursor-pointer items-center gap-[2px] sm:h-10"
        >
          {BARS.map((h, i) => {
            const played = i / BAR_COUNT < ratio;
            const distance = Math.abs(i - activeIndex);
            const scale = playing ? (distance === 0 ? 1.35 : distance === 1 ? 1.15 : 1) : 1;

            return (
              <span key={i} className="group flex h-full flex-1 items-center">
                <span
                  className={`relative w-full overflow-hidden rounded-full transition-all duration-200 group-hover:bg-red-soft ${played ? "bg-gold-soft" : "bg-muted/40"
                    }`}
                  style={{ height: `${h}%`, transform: `scaleY(${scale})` }}
                >
                  <span
                    ref={(el) => {
                      eqRefs.current[i] = el;
                    }}
                    className="absolute inset-x-0 bottom-0 h-0 bg-red-soft transition-[height] duration-75 ease-out"
                  />
                </span>
              </span>
            );
          })}
        </div>

        <span className="shrink-0 font-body text-[10px] tabular-nums text-muted">
          {formatTime(current)} / {formatTime(duration)}
        </span>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPlaying={() => {
          setPlaying(true);
          sync();
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          sync();
        }}
        onSeeked={sync}
        onTimeUpdate={sync}
        onLoadedMetadata={sync}
        onDurationChange={sync}
      />
    </div>
  );
}