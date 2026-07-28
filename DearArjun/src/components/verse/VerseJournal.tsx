import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MessageCircleQuestion, Pencil, Trash2 } from "lucide-react";
import type { Verse } from "@/content/types";
import { useReflection } from "@/hooks/use-reflections";

const MAX = 500;

export function VerseJournal({ verse }: { verse: Verse }) {
  const { reflection, hydrated, save, remove } = useReflection(verse.id);
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (reflection && !editing) setDraft(reflection.text);
  }, [reflection, editing]);

  const showEditor = !reflection || editing;
  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;

  return (
    <section className="mt-12 rounded-2xl border border-secondary/40 bg-secondary/10 p-8">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-accent">
        <MessageCircleQuestion className="h-3.5 w-3.5" /> One question before you leave
      </div>
      <h3 className="mt-4 font-display text-xl italic leading-relaxed text-foreground">
        {verse.reflectionQuestion}
      </h3>

      {!hydrated ? (
        <div className="mt-6 h-32 animate-pulse rounded-xl bg-muted/30" />
      ) : showEditor ? (
        <>
          <textarea
            value={draft}
            maxLength={MAX}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
            placeholder="Write 1–2 sentences on how you will apply this verse today... (Saved locally and private to you)"
            className="mt-6 w-full resize-y rounded-xl border border-border/60 bg-background/60 p-4 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">
              {words} {words === 1 ? "word" : "words"} · {draft.length}/{MAX} characters
            </span>
            <div className="flex items-center gap-2">
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setDraft(reflection?.text ?? "");
                  }}
                  className="rounded-full border border-border/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                disabled={!draft.trim()}
                onClick={() => {
                  save(draft);
                  setEditing(false);
                  toast.success("Reflection saved on this device");
                }}
                className="rounded-full bg-amber-500 px-5 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save reflection
              </button>
            </div>
          </div>
        </>
      ) : (
        <figure className="mt-6 rounded-xl border-l-2 border-amber-500/70 bg-background/50 p-6">
          <blockquote className="font-display text-lg italic leading-relaxed text-foreground/90 break-words overflow-hidden">
            "{reflection.text}"
          </blockquote>
          <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Saved on{" "}
              {new Date(reflection.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setDraft(reflection.text);
                  setEditing(true);
                }}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <Pencil className="h-3 w-3" /> Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  remove();
                  setDraft("");
                  setEditing(false);
                  toast("Reflection deleted");
                }}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-destructive/60 hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" /> Delete
              </button>
            </span>
          </figcaption>
        </figure>
      )}
    </section>
  );
}
