"use client";

import { useLanguage } from "@/lib/i18n";
import { EXTERNAL_LINKS } from "@/lib/routes";
import { useAudioPlayer } from "./useAudioPlayer";
import PlayButton from "./PlayButton";
import AudioWave from "./AudioWave";
import SpotifyButton from "./SpotifyButton";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type AudioPlayerProps = {
  src: string;
  label: string;
  className?: string;
  spotifyHref?: string;
};

export default function AudioPlayer({
  src,
  label,
  className = "mt-8",
  spotifyHref = EXTERNAL_LINKS.spotify,
}: AudioPlayerProps) {
  const { t, ui } = useLanguage();
  const player = useAudioPlayer();
  const remaining = Math.max(player.duration - player.current, 0);

  return (
    <div className={`${className} flex items-center gap-4 pb-4`}>
      <PlayButton
        playing={player.playing}
        onToggle={player.toggle}
        label={label}
        caption={`${formatTime(player.current)} / -${formatTime(remaining)}`}
      />

      <AudioWave
        label={label}
        ratio={player.ratio}
        playing={player.playing}
        current={player.current}
        duration={player.duration}
        audioRef={player.audioRef}
        analyserRef={player.analyserRef}
        onSeek={player.seekToRatio}
        onSkip={player.skip}
      />

      <SpotifyButton caption={t(ui.listenOnSpotify)} href={spotifyHref} />

      <audio ref={player.audioRef} src={src} {...player.audioProps} />
    </div>
  );
}