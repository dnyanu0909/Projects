import { createFileRoute, Link } from "@tanstack/react-router";
import { chapters } from "@/content/chapters";
import { AmbientBackground } from "@/components/layout/AmbientBackground";

export const Route = createFileRoute("/chapters")({
  head: () => ({
    meta: [
      { title: "All 18 Chapters — Dear Arjuna" },
      { name: "description", content: "Read the Bhagavad Gita in the traditional order — all eighteen chapters, from Arjuna's despair to Krishna's final instruction." },
      { property: "og:title", content: "All 18 Chapters — Dear Arjuna" },
      { property: "og:description", content: "The complete Bhagavad Gita, chapter by chapter." },
    ],
  }),
  component: ChaptersPage,
});

function ChaptersPage() {
  return (
    <>
      <AmbientBackground theme="cosmic" intensity={0.22} />
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-8 text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-primary/80">Traditional view</p>
        <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">The Eighteen Chapters</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          From Arjuna's collapse in Chapter 1 to Krishna's final, quiet instruction in Chapter 18.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((c) => (
          <Link
            key={c.number}
            to="/chapters/$chapter"
            params={{ chapter: String(c.number) }}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-4xl text-primary/90">{String(c.number).padStart(2, "0")}</span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {c.verseCount} verses
              </span>
            </div>
            <h2 className="mt-4 font-display text-xl leading-snug text-foreground">{c.englishName}</h2>
            <p className="mt-1 text-xs italic text-primary/70" lang="sa">{c.sanskritName}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.theme}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
