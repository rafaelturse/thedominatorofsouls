type ReaderProgressProps = {
  spread: number;
  totalSpreads: number;
  onChange: (value: number) => void;
};

export default function ReaderProgress({ spread, totalSpreads, onChange }: ReaderProgressProps) {
  return (
    <div className="flex flex-col items-center gap-2 border-t border-line px-6 py-4 sm:px-10">
      <input
        type="range"
        min={0}
        max={totalSpreads - 1}
        value={spread}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-gold-soft"
      />
      <span className="font-body text-xs uppercase tracking-[0.15em] text-muted">
        {spread + 1} / {totalSpreads}
      </span>
    </div>
  );
}