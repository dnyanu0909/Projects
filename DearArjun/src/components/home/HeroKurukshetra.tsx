import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { verses } from "@/content/verses";
import { struggles } from "@/content/struggles";

export function HeroKurukshetra() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const struggleHits = struggles
      .filter((s) => s.label.toLowerCase().includes(q) || s.slug.includes(q))
      .slice(0, 3)
      .map((s) => ({
        kind: "struggle" as const,
        label: `${s.emoji}  ${s.label}`,
        onSelect: () => navigate({ to: "/struggle/$slug", params: { slug: s.slug } }),
      }));
    const verseHits = verses
      .filter((v) =>
        (v.krishnaModern + " " + v.translation + " " + v.scene)
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 4)
      .map((v) => ({
        kind: "verse" as const,
        label: `Chapter ${v.chapter}, Verse ${v.verse} — “${v.krishnaModern.slice(0, 60)}…”`,
        onSelect: () =>
          navigate({
            to: "/verse/$chapter/$verse",
            params: { chapter: String(v.chapter), verse: String(v.verse) },
          }),
      }));
    return [...struggleHits, ...verseHits];
  }, [query, navigate]);

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
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: heartbreak, discipline, or ‘result’…"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          />
        </div>
        {suggestions.length > 0 && (
          <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-border/60 bg-popover/95 text-left shadow-[var(--shadow-elegant)] backdrop-blur-xl">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={s.onSelect}
                className="block w-full px-4 py-3 text-sm text-popover-foreground transition-colors hover:bg-primary/10"
              >
                <span className="mr-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {s.kind}
                </span>
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
