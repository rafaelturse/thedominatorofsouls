type ReaderProgressProps = {
  spread: number;
  totalSpreads: number;
  totalPages: number;
  hasRightPage: boolean;
  onChange: (value: number) => void;
};

export default function ReaderProgress({
  spread,
  totalSpreads,
  totalPages,
  hasRightPage,
  onChange,
}: ReaderProgressProps) {
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
        {spread * 2 + 1}
        {hasRightPage ? `–${spread * 2 + 2}` : ""} / {totalPages}
      </span>
    </div>
  );
}