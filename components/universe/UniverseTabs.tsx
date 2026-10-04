"use client";

import { useLanguage } from "@/lib/i18n";
import { UNIVERSE_OPTIONS, type UniverseOptionId } from "@/lib/universe";
import ScrollableTabs from "@/components/page/ScrollableTabs";

type UniverseTabsProps = {
    active: UniverseOptionId;
    onSelect: (id: UniverseOptionId) => void;
};

export default function UniverseTabs({ active, onSelect }: UniverseTabsProps) {
    const { t, ui } = useLanguage();

    const items = UNIVERSE_OPTIONS.map((option) => ({
        id: option.id,
        label: t(option.label),
        disabled: !option.enabled,
        badge: !option.enabled ? t(ui.universeComingSoonOption) : undefined,
    }));

    return (
        <ScrollableTabs
            items={items}
            active={active}
            onSelect={(id) => onSelect(id as UniverseOptionId)}
        />
    );
}