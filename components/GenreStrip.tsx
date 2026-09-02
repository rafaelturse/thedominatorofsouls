import { genres } from "@/lib/data";

type IconProps = { size: number };

const AdventureIcon = ({ size }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <g transform="translate(12 12) scale(1.35) translate(-12 -12)">
      <path d="M8.959 1.99l-.147 .028l-.115 .029a1 1 0 0 0 -.646 1.27l.749 2.245l-2.815 1.735a2 2 0 0 0 -.655 2.751l.089 .133a2 2 0 0 0 1.614 .819l1.563 -.001l-1.614 4.674a1 1 0 0 0 .945 1.327h7.961a1 1 0 0 0 1 -.978l.112 -5c0 -3.827 -1.555 -6.878 -4.67 -7.966l-2.399 -.83l-.375 -.121l-.258 -.074l-.135 -.031l-.101 -.013l-.055 -.001l-.048 .003z" />
      <path d="M18 18h-12a1 1 0 0 0 -1 1a2 2 0 0 0 2 2h10a2 2 0 0 0 1.987 -1.768l.011 -.174a1 1 0 0 0 -.998 -1.058z" />
    </g>
  </svg>
);

const RpgIcon = ({ size }: IconProps) => (
  <svg width={size * 1.3} height={size * 1.3 * (512 / 640)} viewBox="0 0 640 512" fill="currentColor">
    <path d="M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z" />
  </svg>
);

const RomanceIcon = ({ size }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <g transform="translate(12 12) scale(1.15) translate(-12 -12)">
      <path d="M10 2c0 -.88 1.056 -1.331 1.692 -.722c1.958 1.876 3.096 5.995 1.75 9.12l-.08 .174l.012 .003c.625 .133 1.203 -.43 2.303 -2.173l.14 -.224a1 1 0 0 1 1.582 -.153c1.334 1.435 2.601 4.377 2.601 6.27c0 4.265 -3.591 7.705 -8 7.705s-8 -3.44 -8 -7.706c0 -2.252 1.022 -4.716 2.632 -6.301l.605 -.589c.241 -.236 .434 -.43 .618 -.624c1.43 -1.512 2.145 -2.924 2.145 -4.78" />
    </g>
  </svg>
);

const WarIcon = ({ size }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <g transform="translate(12 12) scale(1.15) translate(-12 -12)">
      <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" />
    </g>
  </svg>
);

const ICONS: Record<string, (props: IconProps) => React.JSX.Element> = {
  Aventura: AdventureIcon,
  RPG: RpgIcon,
  Romance: RomanceIcon,
  Guerra: WarIcon,
};

export default function GenreStrip() {
  return (
    <div className="relative z-10 mx-auto mt-20 max-w-6xl px-5">
      <div className="grid grid-cols-1 rounded-3xl bg-black shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:grid-cols-4">
        {genres.map((genre, i) => {
          const Icon = ICONS[genre.label];
          return (
            <div
              key={genre.label}
              className="group relative flex flex-col items-center gap-4 px-8 py-10 text-center transition-transform duration-300 ease-out hover:z-10 hover:scale-105"
            >
              {i > 0 && (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 hidden h-[60%] w-px -translate-y-1/2 bg-gold-soft sm:block"
                />
              )}
              {Icon && (
                <span className="text-gold-soft transition-colors duration-300 ease-out group-hover:text-red-soft">
                  <Icon size={36} />
                </span>
              )}
              <p className="font-display text-base uppercase tracking-[0.2em] text-ink transition-colors duration-300 ease-out group-hover:text-gold-soft">
                {genre.label}
              </p>
              <p className="font-body text-sm leading-relaxed text-muted">
                {genre.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}