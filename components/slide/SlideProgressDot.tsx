type SlideProgressDotProps = {
  isActive: boolean;
  progress: number;
  onClick: () => void;
};

export default function SlideProgressDot({ isActive, progress, onClick }: SlideProgressDotProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Select slide"
      className="h-3 w-3 rounded-full transition-transform hover:scale-125"
      style={{
        background: isActive
          ? `conic-gradient(var(--color-red-soft) ${progress * 360}deg, var(--color-gold-soft) ${progress * 360}deg)`
          : "var(--color-line)",
      }}
    />
  );
}