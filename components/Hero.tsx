import { SITE } from "@/lib/data";

export default function Hero() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#111" }}
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-full h-70"
        style={{
          background:
            "linear-gradient(to bottom, #111 0%, #111 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 py-10 text-center">
        <h1 className="mt-22 font-display text-6xl tracking-[0.03em] text-ink sm:text-7xl">{SITE.name}</h1>
        <p className="mt-4 font-body text-xs uppercase tracking-[0.4em] text-gold-soft">{SITE.nameEn}</p>
        <div className="w-52"><img src={SITE.symbol} alt={SITE.name} /></div>
      </div>
    </div>
  );
}