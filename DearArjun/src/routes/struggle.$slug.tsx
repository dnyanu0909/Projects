import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getStruggle } from "@/content/struggles";
import { getVerse } from "@/content/verses";
import { AmbientBackground } from "@/components/layout/AmbientBackground";

export const Route = createFileRoute("/struggle/$slug")({
  loader: ({ params }) => {
    const struggle = getStruggle(params.slug);
    if (!struggle) throw notFound();
    return { struggle };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.struggle;
    const title = s ? `${s.label} — Dear Arjuna` : "Struggle — Dear Arjuna";
    const desc = s?.intro ?? "A struggle from the Bhagavad Gita.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: StrugglePage,
});

function StrugglePage() {
  const { struggle } = Route.useLoaderData();
  return (
    <>
      <AmbientBackground theme="battlefield" intensity={0.22} />
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-6">
        <p className="text-xs uppercase tracking-[0.32em] text-primary/80">Your Kurukshetra</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">
          {struggle.emoji} {struggle.label}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{struggle.intro}</p>
      </section>

      <section className="mx-auto grid max-w-3xl gap-4 px-6 pb-24">
        {struggle.verses.map((ref: { chapter: number; verse: number }) => {
          const v = getVerse(ref.chapter, ref.verse);
          if (!v) return null;
          return (
            <Link
              key={`${ref.chapter}.${ref.verse}`}
              to="/verse/$chapter/$verse"
              params={{ chapter: String(ref.chapter), verse: String(ref.verse) }}
              className="group rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="text-xs uppercase tracking-[0.28em] text-primary/80">
                Chapter {v.chapter} · Verse {v.verse}
              </div>
              <p className="mt-3 font-display text-xl leading-snug text-foreground md:text-2xl">
                “{v.krishnaModern}”
              </p>
              <p className="mt-3 text-sm italic text-muted-foreground">— {v.translation}</p>
            </Link>
          );
        })}
      </section>
    </>
  );
}
