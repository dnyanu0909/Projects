import { createFileRoute, notFound } from "@tanstack/react-router";
import { getVerse } from "@/content/verses";
import { getChapter } from "@/content/chapters";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { VerseViewer } from "@/components/verse/VerseViewer";

export const Route = createFileRoute("/verse/$chapter/$verse")({
  loader: ({ params }) => {
    const c = Number(params.chapter);
    const v = Number(params.verse);
    const verse = getVerse(c, v);
    if (!verse) {
      const chapter = getChapter(c);
      return { verse: null, chapter: chapter ?? null, requested: { c, v } };
    }
    return { verse, chapter: getChapter(c) ?? null, requested: { c, v } };
  },
  head: ({ loaderData }) => {
    const v = loaderData?.verse;
    if (!v) {
      return {
        meta: [
          { title: "Verse coming soon — Dear Arjuna" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `Ch ${v.chapterNumber}, Verse ${v.verseNumber} — Dear Arjuna`;
    const desc = `“${v.krishnaModern}” — modern reading of Bhagavad Gita ${v.chapterNumber}.${v.verseNumber}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: VersePage,
});

function VersePage() {
  const { verse, chapter, requested } = Route.useLoaderData();

  if (!verse) {
    return (
      <>
        <AmbientBackground theme="forest" intensity={0.2} />
        <section className="mx-auto max-w-2xl px-6 py-32 text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-primary/80">Not yet mapped</p>
          <h1 className="mt-4 font-display text-3xl text-foreground">
            Chapter {requested.c}, Verse {requested.v}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {chapter
              ? `This verse from ${chapter.englishName} is part of the traditional Gita, but hasn't been given the full modern reading yet.`
              : "This verse hasn't been mapped yet."}
          </p>
          <p className="mt-2 text-sm text-muted-foreground/80">
            The seeded verses cover the core lessons across all 18 chapters. More coming.
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <AmbientBackground theme={verse.ambient} intensity={0.3} />
      <VerseViewer verse={verse} />
    </>
  );
}
