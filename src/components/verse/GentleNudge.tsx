import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function GentleNudge({ message }: { message: string }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("dear-arjuna:nudged") === "1") {
      setDismissed(true);
      return;
    }
    const timer = window.setTimeout(() => setShow(true), 5 * 60 * 1000);
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (pct > 0.55) setShow(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (dismissed || !show) return null;

  return (
    <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-4 animate-fade-in">
      <div className="flex max-w-lg items-start gap-3 rounded-2xl border border-primary/40 bg-background/90 p-4 backdrop-blur-xl shadow-[var(--shadow-glow)]">
        <div className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary shadow-[0_0_12px_var(--gold-glow)]" />
        <p className="flex-1 text-sm leading-relaxed text-foreground">{message}</p>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            setDismissed(true);
            window.sessionStorage.setItem("dear-arjuna:nudged", "1");
          }}
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
