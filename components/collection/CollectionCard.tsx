"use client";

import { useLanguage } from "@/lib/i18n";

type CollectionCardProps = {
  src?: string;
  alt: string;
  label: string;
  isComingSoon: boolean;
  isCurrent: boolean;
  showSoonOverlay: boolean;
  imageClassName?: string;
};

export default function CollectionCard({
  src,
  alt,
  label,
  isComingSoon,
  isCurrent,
  showSoonOverlay,
  imageClassName = "w-full",
}: CollectionCardProps) {
  const { t, ui } = useLanguage();

  return (
    <div
      className={`group flex flex-col items-center gap-3 p-2 transition-all duration-300 ${isCurrent ? "-translate-y-2" : ""
        } ${!isComingSoon && src ? "hover:-translate-y-1.5 hover:shadow-lift" : "opacity-60"
        }`}
    >
      <div className="relative w-full">
        {src ? (
          <>
            <img
              src={src}
              alt={alt}
              className={`${imageClassName} border transition-colors duration-300 ${isCurrent
                  ? "border-gold-soft"
                  : !isComingSoon
                    ? "border-transparent group-hover:border-gold-soft"
                    : "border-transparent"
                }`}
            />
            {isComingSoon && showSoonOverlay && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-red-soft/70 transition-all duration-500 ease-out group-hover:h-full" />
                <span className="relative z-10 px-2 text-center font-body text-[10px] uppercase tracking-[0.15em] text-muted opacity-0 transition-all duration-300 group-hover:font-bold group-hover:text-gold-soft group-hover:opacity-100">
                  {t(ui.comingSoon)}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="relative flex aspect-[5/8] h-full w-full items-center justify-center overflow-hidden border border-line bg-book-soon px-2 text-center">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-red-soft transition-all duration-500 ease-out group-hover:h-full" />
            <span className="relative z-10 font-body text-[10px] uppercase tracking-[0.15em] text-muted transition-colors duration-300 group-hover:font-bold group-hover:text-gold-soft">
              {t(ui.comingSoon)}
            </span>
          </div>
        )}
      </div>
      <span
        className={`min-h-[2.5em] w-full text-center font-body text-xs uppercase leading-tight tracking-[0.15em] transition-colors duration-300 group-hover:text-gold-soft ${isCurrent ? "text-gold-soft" : "text-muted"
          }`}
      >
        {label}
      </span>
    </div>
  );
}