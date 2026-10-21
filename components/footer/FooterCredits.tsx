const highlightClass = "text-muted-light transition-colors hover:text-gold-soft";

export default function FooterCredits() {
    return (
        <div className="hidden shrink-0 self-center whitespace-nowrap font-accent text-sm leading-relaxed tracking-wide text-muted lg:block">
            <p>developed by</p>
            <p>
                <span className={highlightClass}>Rafael Turse</span>
            </p>
            <p>
                with <span className={highlightClass}>Next.js</span>
            </p>
            <p>
                and{" "}
                <span className={highlightClass}>Tailwind</span>.
            </p>
        </div>
    );
}