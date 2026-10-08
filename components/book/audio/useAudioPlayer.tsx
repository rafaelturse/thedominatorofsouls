"use client";

import { useEffect, useRef, useState } from "react";

type AudioCtor = typeof AudioContext;

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const triedRef = useRef(false);
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

  function seekToRatio(r: number) {
    const el = audioRef.current;
    if (!el || !duration) return;
    const time = Math.min(Math.max(r, 0), 1) * duration;
    el.currentTime = time;
    setCurrent(time);
  }

  function skip(seconds: number) {
    const el = audioRef.current;
    if (!el || !duration) return;
    el.currentTime = Math.min(Math.max(el.currentTime + seconds, 0), duration);
    setCurrent(el.currentTime);
  }

  const ratio = duration ? current / duration : 0;

  const audioProps = {
    preload: "auto" as const,
    onPlay: () => setPlaying(true),
    onPlaying: () => {
      setPlaying(true);
      sync();
    },
    onPause: () => setPlaying(false),
    onEnded: () => {
      setPlaying(false);
      sync();
    },
    onSeeked: sync,
    onTimeUpdate: sync,
    onLoadedMetadata: sync,
    onDurationChange: sync,
  };

  return {
    audioRef,
    analyserRef,
    playing,
    current,
    duration,
    ratio,
    toggle,
    seekToRatio,
    skip,
    audioProps,
  };
}