"use client";

import { useLanguage } from "@/lib/i18n";
import type { GlossaryCategory } from "@/lib/universe";
import ScrollableTabs from "@/components/ScrollableTabs";

type CategoryTabsProps = {
    categories: GlossaryCategory[];
    active: string;
    onSelect: (id: string) => void;
};

export default function CategoryTabs({ categories, active, onSelect }: CategoryTabsProps) {
    const { t } = useLanguage();

    const items = categories.map((cat) => ({
        id: cat.id,
        label: t(cat.label),
    }));

    return <ScrollableTabs items={items} active={active} onSelect={onSelect} />;
}