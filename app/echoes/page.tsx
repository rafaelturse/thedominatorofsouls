"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Hero from "@/components/page/Hero";
import PageHeader from "@/components/page/PageHeader";
import ScrollableTabs from "@/components/page/ScrollableTabs";
import ExploreLinks from "@/components/link/ExploreLinks";
import EchoCardItem from "@/components/echoes/EchoCardItem";
import EchoesStrip from "@/components/echoes/EchoesStrip";
import { ECHOES, type EchoEntry } from "@/lib/echoes";
import { useLanguage, type LocalizedString } from "@/lib/i18n";
import { QuoteIcon } from "@/lib/icons";

const CONTENT_TITLE: LocalizedString = { "pt-br": "Conteúdo", en: "Content" };
const NO_ECHO_SELECTED: LocalizedString = { "pt-br": "Selecionar um eco", en: "Select an echo" };

function partLabel(index: number): LocalizedString {
  return { "pt-br": `Parte ${index + 1}`, en: `Part ${index + 1}` };
}

function scrollToContent() {
  document.getElementById("echoes-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function EchoesContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const echoParam = searchParams.get("echo");
  const [selected, setSelected] = useState<EchoEntry | null>(null);
  const [activePartId, setActivePartId] = useState<string>("");

  const activePart = selected?.parts.find((p) => p.id === activePartId) ?? selected?.parts[0];

  function selectEntry(entry: EchoEntry) {
    setSelected(entry);
    setActivePartId(entry.parts[0]?.id ?? "");
  }

  function handleSelect(entry: EchoEntry) {
    selectEntry(entry);
    scrollToContent();
  }

  useEffect(() => {
    if (!echoParam) return;
    const entry = ECHOES.entries.find((e) => e.id === echoParam);
    if (!entry) return;
    selectEntry(entry);
    const timer = window.setTimeout(scrollToContent, 150);
    return () => window.clearTimeout(timer);
  }, [echoParam]);

  return (
    <div>
      <Hero />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-6 sm:pb-20 sm:pt-8">
        <PageHeader
          title={ECHOES.title}
          heading={ECHOES.heading}
          subtitle={ECHOES.subtitle}
        />

        <div className="mt-16 flex flex-col gap-6">
          {ECHOES.cards.map((card) => (
            <EchoCardItem key={card.id} card={card} />
          ))}
        </div>

        <div id="echoes-strip" className="mt-20 scroll-mt-24">
          <EchoesStrip currentId={selected?.id} onSelect={handleSelect} />
        </div>

        <div className="mt-16">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="text-gold-soft">
              <QuoteIcon />
            </span>
            <h1 className="font-display uppercase text-lg text-ink">{t(CONTENT_TITLE)}</h1>
          </div>

          <div
            id="echoes-content"
            className="mt-6 scroll-mt-24 rounded-3xl bg-card p-6 shadow-card sm:p-10"
          >
            {selected && activePart ? (
              <div>
                {selected.cover && (
                  <div className="mb-14 flex justify-center">
                    <img
                      src={selected.cover}
                      alt={t(selected.title)}
                      className="h-auto w-full max-w-md"
                    />
                  </div>
                )}

                <ScrollableTabs
                  items={selected.parts.map((p, i) => ({ id: p.id, label: t(partLabel(i)) }))}
                  active={activePart.id}
                  onSelect={setActivePartId}
                />

                <p className="mt-8 font-body text-xs uppercase tracking-[0.2em] text-red-soft">
                  {t(activePart.title)}
                </p>

                <div className="mt-6 flex flex-col gap-8">
                  {activePart.paragraphs.map((paragraph, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="mt-1 text-gold-soft">
                        <QuoteIcon size={14} />
                      </span>
                      <p className="font-body text-sm leading-relaxed text-muted">{t(paragraph)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => document.getElementById("echoes-strip")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="cursor-pointer rounded-full border border-red-soft bg-red-soft px-4 py-1.5 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-red-soft"
                >
                  {t(NO_ECHO_SELECTED)}
                </button>
              </div>
            )}
          </div>
        </div>

        <ExploreLinks count={4} />
      </div>
    </div>
  );
}

export default function EchoesPage() {
  return (
    <Suspense fallback={null}>
      <EchoesContent />
    </Suspense>
  );
}