export default function SlideTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="rounded-full bg-red-soft px-2.5 py-0.5 font-body text-[10px] uppercase tracking-[0.1em] text-ink"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}