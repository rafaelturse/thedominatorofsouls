"use client";

import { useLanguage } from "@/lib/i18n";
import AudioPlayer from "@/components/book/audio/AudioPlayer";

export default function ReaderAudioBar({ src }: { src: string }) {
  const { t, ui } = useLanguage();

  return (
    <div className="shrink-0 px-6 py-3 sm:px-10">
      <AudioPlayer src={src} className="mt-2" label={t(ui.listenPrologue)} />
    </div>
  );
}