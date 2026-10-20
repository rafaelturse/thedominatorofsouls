"use client";

import { useLanguage } from "@/lib/i18n";
import { ShoppingCartIcon } from "@/lib/icons";
import { STORE_PLATFORMS, STORE_PLATFORMS_TITLE } from "@/lib/platforms";
import PlatformShowcase from "./PlatformShowcase";

export default function StoreLinks() {
    const { t } = useLanguage();

    return (
        <PlatformShowcase
            title={t(STORE_PLATFORMS_TITLE)}
            titleIcon={<ShoppingCartIcon />}
            platforms={STORE_PLATFORMS}
            initialId="amazon"
            gridClass="grid-cols-3"
        />
    );
}