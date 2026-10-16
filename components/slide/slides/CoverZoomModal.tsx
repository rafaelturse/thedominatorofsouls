"use client";

import { useLanguage } from "@/lib/i18n";

type CoverZoomModalProps = {
    src: string;
    alt: string;
    onClose: () => void;
};

export default function CoverZoomModal({ src, alt, onClose }: CoverZoomModalProps) {
    const { t, ui } = useLanguage();

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
            onClick={onClose}
        >
            <button
                type="button"
                onClick={onClose}
                className="absolute right-6 top-6 font-body text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold-soft"
            >
                {t(ui.close)}
            </button>
            <img
                src={src}
                alt={alt}
                className="max-h-[85vh] max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
}