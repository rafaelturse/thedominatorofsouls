import type { ReactNode } from "react";

type EventSlideProps = {
    date: string;
    title: string;
    body: ReactNode;
};

export default function EventSlide({ date, title, body }: EventSlideProps) {
    return (
        <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-soft">{date}</p>
            <h3 className="mt-2 font-display text-2xl text-ink">{title}</h3>
            <div className="mt-2 font-body text-sm leading-relaxed text-muted sm:text-base">{body}</div>
        </div>
    );
}