"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useLanguage } from "@/lib/i18n";
import { PlayIcon, PauseIcon } from "@/lib/icons";
import { useAudioPlayer } from "@/components/book/audio/useAudioPlayer";
import type { WaveEffectProps } from "@/components/book/audio/shared";
import PulseWave from "@/components/book/audio/PulseWave";
import EqualizerWave from "@/components/book/audio/EqualizerWave";
import DynamicWave from "@/components/book/audio/DynamicWave";
import ComboWave from "@/components/book/audio/ComboWave";
import ClawsWave from "@/components/book/audio/ClawsWave";
import GradientWave from "@/components/book/audio/GradientWave";
import PeaksWave from "@/components/book/audio/PeaksWave";
import ComboPeaksWave from "@/components/book/audio/ComboPeaksWave";

const EFFECTS: ComponentType<WaveEffectProps>[] = [
  // PulseWave, //  jump current yellow only
  // DynamicWave, // jump, yellow only
  // EqualizerWave, // jump, wave colors
  ComboWave, // jump, balanced colors
  // ClawsWave, // spikes
  // GradientWave, // fix with gradient colors
  // PeaksWave, // jump top red
  // ComboPeaksWave, // jump, balanced colors + red peaks above, yellow peaks below
];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function SynopsisAudioPlayer({ src }: { src: string }) {
  const { t, ui } = useLanguage();
  const player = useAudioPlayer();
  const [effectIndex, setEffectIndex] = useState(0);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("wave");
    const forced = param === null ? NaN : Number(param);
    const valid = Number.isInteger(forced) && forced >= 0 && forced < EFFECTS.length;
    setEffectIndex(valid ? forced : Math.floor(Math.random() * EFFECTS.length));
  }, []);

  const Effect = EFFECTS[effectIndex];

  return (
    <div className="mt-8 flex items-center gap-4">
      <button
        type="button"
        onClick={player.toggle}
        aria-label={t(ui.listenSynopsis)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-soft bg-red-soft text-ink transition-colors hover:bg-transparent hover:text-red-soft"
      >
        {player.playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
      </button>

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          role="slider"
          tabIndex={0}
          aria-label={t(ui.listenSynopsis)}
          aria-valuemin={0}
          aria-valuemax={Math.round(player.duration)}
          aria-valuenow={Math.round(player.current)}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            player.seekToRatio((e.clientX - rect.left) / rect.width);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") player.skip(5);
            else if (e.key === "ArrowLeft") player.skip(-5);
          }}
          className="flex h-8 min-w-0 flex-1 cursor-pointer items-center gap-[2px] sm:h-10"
        >
          <Effect
            ratio={player.ratio}
            playing={player.playing}
            audioRef={player.audioRef}
            analyserRef={player.analyserRef}
          />
        </div>

        <span className="shrink-0 font-body text-[10px] tabular-nums text-muted">
          {formatTime(player.current)} / {formatTime(player.duration)}
        </span>
      </div>

      <audio ref={player.audioRef} src={src} {...player.audioProps} />
    </div>
  );
}