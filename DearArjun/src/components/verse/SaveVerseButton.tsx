import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import type { Verse } from "@/content/types";
import { useSavedVerses } from "@/hooks/use-saved-verses";

export function SaveVerseButton({ verse }: { verse: Verse }) {
  const { isSaved, toggle, hydrated } = useSavedVerses();
  const saved = hydrated && isSaved(verse.id);

  return (
    <button
      type="button"
      onClick={() => {
        const nowSaved = toggle(verse.id);
        toast(
          nowSaved
            ? `Saved ${verse.chapterNumber}.${verse.verseNumber} for when you need it`
            : `Removed ${verse.chapterNumber}.${verse.verseNumber} from saved`,
        );
      }}
      aria-pressed={saved}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
        saved
          ? "border-primary bg-primary/20 text-primary"
          : "border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary"
      }`}
    >
      {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      {saved ? "Saved" : "Save verse"}
    </button>
  );
}
