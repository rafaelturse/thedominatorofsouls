type ReaderNavButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
};

export default function ReaderNavButton({ direction, onClick, disabled }: ReaderNavButtonProps) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center transition-colors text-gold-soft hover:text-red-soft disabled:opacity-20 disabled:hover:text-muted ${isPrev ? "left-2 sm:left-4" : "right-2 sm:right-4"
        }`}
      aria-label={isPrev ? "Previous page" : "Next page"}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {isPrev ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}