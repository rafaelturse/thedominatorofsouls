"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import type { IconProps } from "@/lib/icons";
import { useHoverMenu } from "./useHoverMenu";

export type NavMenuItem = {
  href: string;
  label: LocalizedString;
  icon: (props: IconProps) => ReactElement;
};

export type NavMenuSection = {
  heading: LocalizedString;
  items: NavMenuItem[];
};

type NavMenuProps = {
  label: LocalizedString;
  sections: NavMenuSection[];
  isActive: boolean;
};

export default function NavMenu({ label, sections, isActive }: NavMenuProps) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { open, close, containerProps, onTriggerClick } = useHoverMenu();

  return (
    <div {...containerProps} className="relative">
      <button
        type="button"
        onClick={onTriggerClick}
        aria-expanded={open}
        className={`flex items-center gap-1 rounded-lg px-3 py-2 font-body text-xs uppercase tracking-[0.15em] transition-colors hover:bg-surface hover:text-gold-soft ${open ? "bg-surface text-gold-soft" : isActive ? "text-gold-soft" : "text-muted"
          }`}
      >
        {t(label)}
        <span className={`opacity-50 transition-transform duration-200 ${open ? "rotate-90" : ""}`}>›</span>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-10 w-72 -translate-x-1/2 pt-6">
          <div className="relative rounded-2xl border border-line bg-header/70 p-2 shadow-dropdown backdrop-blur-md">
            <span
              aria-hidden="true"
              className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-line bg-header/70 [clip-path:polygon(0_0,100%_0,0_100%)]"
            />

            {sections.map((section, sectionIndex) => (
              <div key={section.heading.en} className={sectionIndex > 0 ? "mt-2" : ""}>
                <p className="px-3 pb-1 pt-3 font-body text-[10px] uppercase tracking-[0.25em] text-muted">
                  {t(section.heading)}
                </p>

                {section.items.map((item) => {
                  const Icon = item.icon;
                  const itemActive =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-gold-soft transition-colors group-hover:border-red-soft group-hover:text-red-soft">
                        <Icon size={18} />
                      </span>
                      <span
                        className={`font-body text-sm transition-colors group-hover:text-gold-soft ${itemActive ? "text-gold-soft" : "text-ink"
                          }`}
                      >
                        {t(item.label)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}