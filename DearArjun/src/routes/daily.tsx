import { createFileRoute, redirect } from "@tanstack/react-router";
import { getDailyVerse } from "@/content/verses";

export const Route = createFileRoute("/daily")({
  beforeLoad: () => {
    const v = getDailyVerse();
    throw redirect({
      to: "/verse/$chapter/$verse",
      params: { chapter: String(v.chapterNumber), verse: String(v.verseNumber) },
    });
  },
  component: () => null,
});
