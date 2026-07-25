import { Link } from "@tanstack/react-router";
import { struggles } from "@/content/struggles";
import { BookOpen } from "lucide-react";

export function EmpathyGrid() {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {struggles.map((s) => (
        <Link
          key={s.slug}
          to="/struggle/$slug"
          params={{ slug: s.slug }}
          className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
        >
          <div className="text-3xl">{s.emoji}</div>
          <h3 className="mt-4 font-display text-xl text-foreground">{s.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {s.tagline}
          </p>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      ))}
      <Link
        to="/chapters"
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 via-transparent to-secondary/20 p-6 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] sm:col-span-2 lg:col-span-3"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="text-xs uppercase tracking-[0.28em] text-primary/90">Traditional view</span>
        </div>
        <h3 className="mt-3 font-display text-2xl">Read the full Gita, chapter by chapter</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          All 18 chapters, in their original order — for when the mood is study, not search.
        </p>
      </Link>
    </div>
  );
}
