import type { Book } from "@/lib/data";

export default function CollectionStrip({ books }: { books: Book[] }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1 className="font-display uppercase text-lg text-ink">Coleção</h1>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6">
        {books.map((book) => (
          <div
            key={book.title}
            className={`group flex flex-col items-center gap-3 p-2 transition-all duration-300 ${
              book.status === "published"
                ? "hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.7)]"
                : "opacity-60"
            }`}
          >
            <div className="aspect-[2/3] w-full overflow-hidden bg-transparent">
              {book.cover ? (
                <img src={book.cover} alt={book.title} className="h-full w-full object-contain" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface px-2 text-center font-body text-[10px] uppercase tracking-[0.15em] text-muted transition-all duration-300 group-hover:bg-red-soft group-hover:font-bold group-hover:text-gold-soft">
                  Em breve
                </div>
              )}
            </div>
            <span className="font-body text-xs uppercase tracking-[0.15em] text-muted transition-colors duration-300 group-hover:text-gold-soft">
              {book.title.split("—")[1]?.trim() ?? book.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}