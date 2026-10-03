"use client";

import { useLanguage } from "@/lib/i18n";
import { UNIVERSE_OPTIONS, type UniverseOptionId } from "@/lib/universe";

type UniverseTabsProps = {
    active: UniverseOptionId;
    onSelect: (id: UniverseOptionId) => void;
};

export default function UniverseTabs({ active, onSelect }: UniverseTabsProps) {
    const { t, ui } = useLanguage();

    return (
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {UNIVERSE_OPTIONS.map((option) => {
                const isActive = option.id === active;
                return (
                    <button
                        key={option.id}
                        type="button"
                        disabled={!option.enabled}
                        onClick={() => option.enabled && onSelect(option.id)}
                        className={`flex flex-col items-center gap-2 pb-2 text-center font-body text-xs uppercase tracking-[0.2em] transition-colors ${!option.enabled
                            ? "cursor-not-allowed text-red-soft"
                            : isActive
                                ? "text-gold-soft"
                                : "text-muted hover:text-gold-soft"
                            }`}
                    >
                        <span>{t(option.label)}</span>
                        {!option.enabled && (
                            <span className="rounded-full bg-red-soft px-2 py-0.5 font-body text-[9px] normal-case tracking-normal text-ink">
                                {t(ui.universeComingSoonOption)}
                            </span>
                        )}
                        <span className={`h-px w-full transition-colors ${isActive ? "bg-gold-soft" : "bg-transparent"}`} />
                    </button>
                );
            })}
        </div>
    );
}