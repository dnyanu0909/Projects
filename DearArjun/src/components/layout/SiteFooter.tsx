import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-border/40 bg-background/40 px-6 py-10 backdrop-blur-sm md:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <p className="font-display text-lg text-primary">Dear Arjuna</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Every modern line on this site is an <em>interpretation</em> — never a
            substitute — for an authentic verse of the Bhagavad Gita. The
            Sanskrit and accurate translation always sit above it.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link to="/chapters" className="hover:text-primary">All 18 chapters</Link>
          <Link to="/daily" className="hover:text-primary">Today's verse</Link>
          <Link to="/about" className="hover:text-primary">About the project</Link>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-5xl text-xs uppercase tracking-[0.28em] text-muted-foreground/70">
        Timeless wisdom for your daily Kurukshetra.
      </p>
    </footer>
  );
}
