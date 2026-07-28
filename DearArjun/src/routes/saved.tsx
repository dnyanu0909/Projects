import { createFileRoute, Link } from "@tanstack/react-router";
import { BookmarkX, ArrowUpRight, Bookmark } from "lucide-react";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { getVersesByIds } from "@/content/verses";
import { useSavedVerses } from "@/hooks/use-saved-verses";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Verses — Dear Arjuna" },
      {
        name: "description",
        content:
          "Your personal collection of Bhagavad Gita verses, saved for the moments you need them most.",
      },
      { property: "og:title", content: "Saved Verses — Dear Arjuna" },
      {
        property: "og:description",
        content: "Return to the verses that steadied you, whenever the next battle starts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { ids, hydrated, remove, clear } = useSavedVerses();
  const saved = getVersesByIds(ids);

  return (
    <>
      <AmbientBackground theme="forest" intensity={0.22} />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-14">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-primary/90">
          <Bookmark className="h-3.5 w-3.5" /> Your collection
        </div>
        <h1 className="mt-4 font-display text-4xl text-foreground md:text-5xl">Saved verses</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Kept on this device, so you can return to them the next time the field gets loud.
        </p>

        {!hydrated ? null : saved.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-border/50 bg-card/40 p-10 text-center">
            <p className="font-display text-xl text-foreground">Nothing saved yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Tap “Save verse” on any verse and it will wait for you here.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
            >
              Find a verse
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-4">
              {saved.map((v) => (
                <div
                  key={v.id}
                  className="group rounded-xl border border-border/50 bg-card/40 p-5 transition-colors hover:border-primary/50"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-primary/80">
                    <span>
                      Ch {v.chapterNumber} · V {v.verseNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(v.id)}
                      aria-label={`Remove ${v.chapterNumber}.${v.verseNumber} from saved`}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <BookmarkX className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-3 font-display text-lg leading-relaxed text-foreground/90">
                    “{v.krishnaModern}”
                  </p>
                  <Link
                    to="/verse/$chapter/$verse"
                    params={{ chapter: String(v.chapterNumber), verse: String(v.verseNumber) }}
                    className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    Open verse <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={clear}
              className="mt-8 text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-destructive"
            >
              Clear all saved
            </button>
          </>
        )}
      </section>
    </>
  );
}
