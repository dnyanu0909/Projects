import { Link } from "@tanstack/react-router";
import { AmbientAudioToggle } from "./AmbientAudioToggle";

export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between border-b border-border/40 bg-background/40 px-6 py-4 backdrop-blur-md md:px-10">
      <Link
        to="/"
        className="group flex items-baseline gap-2 font-display text-xl tracking-tight"
      >
        <span className="text-primary">Dear</span>
        <span className="text-foreground">Arjuna</span>
        <span className="ml-2 hidden text-xs font-body font-normal uppercase tracking-[0.28em] text-muted-foreground sm:inline">
          Bhagavad Gita
        </span>
      </Link>

      <nav className="flex items-center gap-6 text-sm">
        <Link
          to="/chapters"
          className="text-muted-foreground transition-colors hover:text-primary"
          activeProps={{ className: "text-primary" }}
        >
          Chapters
        </Link>
        <Link
          to="/daily"
          className="text-muted-foreground transition-colors hover:text-primary"
          activeProps={{ className: "text-primary" }}
        >
          Daily
        </Link>
        <Link
          to="/saved"
          className="text-muted-foreground transition-colors hover:text-primary"
          activeProps={{ className: "text-primary" }}
        >
          Saved
        </Link>
        <Link
          to="/about"
          className="text-muted-foreground transition-colors hover:text-primary"
          activeProps={{ className: "text-primary" }}
        >
          About
        </Link>

        <AmbientAudioToggle />
      </nav>
    </header>
  );
}
