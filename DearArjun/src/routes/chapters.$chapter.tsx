import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getChapter } from "@/content/chapters";
import { getVersesForChapter } from "@/content/verses";
import { AmbientBackground } from "@/components/layout/AmbientBackground";

export const Route = createFileRoute("/chapters/$chapter")({
  loader: ({ params }) => {
    const c = Number(params.chapter);
    const chapter = getChapter(c);
    if (!chapter) throw notFound();
    return { chapter, verses: getVersesForChapter(c) };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.chapter;
    const title = c ? `Chapter ${c.number}: ${c.englishName} — Dear Arjuna` : "Chapter — Dear Arjuna";
    const desc = c?.theme ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ChapterPage,
});

function ChapterPage() {
  const { chapter, verses } = Route.useLoaderData();
  return (
    <>
      <AmbientBackground theme={chapter.ambient} intensity={0.25} />
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-8">
        <Link to="/chapters" className="text-xs uppercase tracking-[0.28em] text-primary/80 hover:text-primary">
          ← All chapters
        </Link>
        <p className="mt-6 font-display text-6xl text-primary/90">{String(chapter.number).padStart(2, "0")}</p>
        <h1 className="mt-2 font-display text-4xl text-foreground md:text-5xl">{chapter.englishName}</h1>
        <p className="mt-2 italic text-primary/80" lang="sa">{chapter.sanskritName}</p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{chapter.theme}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
          {chapter.verseCount} verses total
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        {verses.length > 0 ? (
          <>
            <h2 className="mt-6 font-display text-2xl text-foreground">Highlighted verses</h2>
            <div className="mt-6 grid gap-4">
              {verses.map((v: import("@/content/types").Verse) => (
                <Link
                  key={v.verse}
                  to="/verse/$chapter/$verse"
                  params={{ chapter: String(v.chapter), verse: String(v.verse) }}
                  className="group rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
                >
                  <div className="text-xs uppercase tracking-[0.28em] text-primary/80">Verse {v.verse}</div>
                  <p className="mt-2 font-display text-lg leading-snug text-foreground md:text-xl">
                    “{v.krishnaModern}”
                  </p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-8 rounded-2xl border border-border/40 bg-card/40 p-6 text-sm text-muted-foreground">
            Modern readings for this chapter are still being written. Check back
            soon — or explore another chapter meanwhile.
          </p>
        )}
      </section>
    </>
  );
}
