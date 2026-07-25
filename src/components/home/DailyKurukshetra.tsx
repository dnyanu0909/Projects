import { Link } from "@tanstack/react-router";
import { getDailyVerse } from "@/content/verses";
import { Sunrise } from "lucide-react";

export function DailyKurukshetra() {
  const v = getDailyVerse();
  return (
    <section className="mx-auto mt-16 w-full max-w-3xl px-6">
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-card/80 via-card/60 to-secondary/20 p-8 backdrop-blur-md shadow-[var(--shadow-elegant)]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-primary/90">
          <Sunrise className="h-4 w-4" /> Today's Kurukshetra
        </div>
        <h2 className="mt-4 font-display text-2xl leading-snug text-foreground md:text-3xl">
          “{v.krishnaModern}”
        </h2>
        <p className="mt-4 text-sm text-muted-foreground">
          {v.scene}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            to="/verse/$chapter/$verse"
            params={{ chapter: String(v.chapter), verse: String(v.verse) }}
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
          >
            Sit with this verse
          </Link>
          <span className="text-xs text-muted-foreground">
            Chapter {v.chapter} · Verse {v.verse}
          </span>
        </div>
      </div>
    </section>
  );
}
