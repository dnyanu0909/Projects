import { useDeferredValue, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, Sparkles } from "lucide-react";
import { searchVerses } from "@/lib/semantic-search";

const EXAMPLES = [
  "I feel like everyone is achieving more than me",
  "I can't stop overthinking at night",
  "They left and I can't let go",
  "I know what to do, I'm just not doing it",
];

export function HeroKurukshetra() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const deferred = useDeferredValue(query);

  const results = useMemo(() => searchVerses(deferred, 5), [deferred]);
  const open = focused && deferred.trim().length > 1;

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-20 pb-16 text-center md:pt-28">
      <p className="text-xs uppercase tracking-[0.36em] text-primary/80">
        Bhagavad Gita · 700 verses · one voice
      </p>
      <h1 className="mt-6 font-display text-4xl leading-[1.05] text-foreground md:text-6xl">
        What is your <span className="text-primary">Kurukshetra</span> today?
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
        You are Arjuna. Krishna is not a distant character — he is speaking
        directly to whatever you are avoiding, or afraid of, right now.
      </p>

      <div className="relative mt-10 w-full max-w-xl">
        <div className="flex items-center gap-3 rounded-full border border-border/60 bg-background/60 px-5 py-3 backdrop-blur-md focus-within:border-primary/60">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => window.setTimeout(() => setFocused(false), 150)}
            placeholder="Say it how you'd say it to a friend…"
            aria-label="Describe what you're going through"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          />
        </div>

        {open && (
          <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-border/60 bg-popover/95 text-left shadow-[var(--shadow-elegant)] backdrop-blur-xl">
            {results.struggles.length > 0 && (
              <div className="flex flex-wrap gap-2 border-b border-border/50 px-4 py-3">
                {results.struggles.map(({ struggle }) => (
                  <button
                    key={struggle.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      navigate({ to: "/struggle/$slug", params: { slug: struggle.id } })
                    }
                    className="rounded-full border border-primary/40 px-3 py-1 text-xs text-primary/90 transition-colors hover:bg-primary/10"
                  >
                    {struggle.emoji} {struggle.label}
                  </button>
                ))}
              </div>
            )}

            {results.verses.length === 0 ? (
              <p className="px-4 py-5 text-sm text-muted-foreground">
                No verse matched those words yet. Try naming the feeling —
                “stuck”, “compared”, “afraid of failing”.
              </p>
            ) : (
              results.verses.map(({ verse, reason, score }) => (
                <button
                  key={verse.id}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    navigate({
                      to: "/verse/$chapter/$verse",
                      params: {
                        chapter: String(verse.chapterNumber),
                        verse: String(verse.verseNumber),
                      },
                    })
                  }
                  className="block w-full border-b border-border/30 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-primary/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-primary/80">
                      Ch {verse.chapterNumber} · V {verse.verseNumber}
                    </span>
                    <span className="text-[10px] tracking-widest text-muted-foreground">
                      {Math.round(score * 100)}% match
                    </span>
                  </div>
                  <p className="mt-1 font-display text-base leading-snug text-popover-foreground">
                    “{verse.krishnaModern.slice(0, 110)}
                    {verse.krishnaModern.length > 110 ? "…" : ""}”
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Sparkles className="h-3 w-3 text-primary/70" />
                    {reason}
                  </p>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => {
              setQuery(ex);
              setFocused(true);
            }}
            className="rounded-full border border-border/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            “{ex}”
          </button>
        ))}
      </div>
    </section>
  );
}
