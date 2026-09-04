type ReaderPageProps = {
  paragraphs: string[];
  hiddenOnMobile?: boolean;
};

export default function ReaderPage({ paragraphs, hiddenOnMobile = false }: ReaderPageProps) {
  return (
    <div className={`flex-col gap-4 ${hiddenOnMobile ? "hidden lg:flex" : "flex"}`}>
      {paragraphs.map((para, i) => (
        <p key={i} className="font-body text-sm leading-relaxed text-muted sm:text-base">
          {para}
        </p>
      ))}
    </div>
  );
}