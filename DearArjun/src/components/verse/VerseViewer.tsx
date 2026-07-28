import { Link } from "@tanstack/react-router";
import type { Verse } from "@/content/types";
import { getVersesByIds } from "@/content/verses";
import { ShareCardButton } from "./ShareCardButton";
import { ShareModal } from "./ShareModal";
import { SaveVerseButton } from "./SaveVerseButton";
import { VerseJournal } from "./VerseJournal";

import { GentleNudge } from "./GentleNudge";
import { ArrowUpRight, Sparkles, Target, MapPin, Quote, BookOpen, Layers, Wind } from "lucide-react";

export function VerseViewer({ verse }: { verse: Verse }) {
  const related = getVersesByIds(verse.relatedVerseIds);

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-10">
      {/* 1. Scene */}
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-primary/90">
        <MapPin className="h-3.5 w-3.5" /> Scene
      </div>
      <p className="mt-3 font-display text-lg italic leading-relaxed text-muted-foreground md:text-xl">
        {verse.sceneContext}
      </p>

      {/* 2. Sanskrit */}
      <section className="mt-12 rounded-2xl border border-border/50 bg-card/40 p-8 backdrop-blur-sm">
        <div className="text-xs uppercase tracking-[0.32em] text-primary/80">Sanskrit</div>
        <p
          className="mt-4 whitespace-pre-line text-2xl leading-loose text-foreground md:text-3xl"
          style={{ fontFamily: "var(--font-sanskrit)" }}
          lang="sa"
        >
          {verse.sanskrit}
        </p>

        {/* 3. Translation */}
        <div className="mt-8 border-t border-border/50 pt-6">
          <div className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Accurate translation</div>
          <p className="mt-3 font-display text-xl italic leading-relaxed text-foreground/90">
            “{verse.translation}”
          </p>
        </div>
      </section>

      {/* 4. Krishna in modern language */}
      <section className="mt-12 rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 via-transparent to-secondary/15 p-8 shadow-[var(--shadow-glow)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-primary">
            <Quote className="h-3.5 w-3.5" /> Krishna, in plain language
          </div>
          <span className="rounded-full border border-primary/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.24em] text-primary/80">
            interpretation, not translation
          </span>
        </div>
        <p className="mt-5 font-display text-2xl leading-snug text-foreground md:text-[28px]">
          “{verse.krishnaModern}”
        </p>
      </section>

      {/* 5. What's happening */}
      <SectionBlock icon={<BookOpen className="h-4 w-4" />} label="What's actually happening">
        {verse.whatIsHappening}
      </SectionBlock>

      {/* 6. Core philosophy */}
      <SectionBlock icon={<Sparkles className="h-4 w-4" />} label="The core philosophy">
        {verse.corePhilosophy}
      </SectionBlock>

      {/* 7. Real-life scenario */}
      <SectionBlock icon={<Layers className="h-4 w-4" />} label="Real-life scenario">
        {verse.realLifeExample}
      </SectionBlock>

      {/* 8. Today's mission */}
      <section className="mt-12 rounded-2xl border border-primary/30 bg-card/60 p-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-primary">
          <Target className="h-3.5 w-3.5" /> Today's mission
        </div>
        <p className="mt-4 text-lg leading-relaxed text-foreground">{verse.todaysMission}</p>
      </section>

      {/* 9. Reflection question + journal */}
      <VerseJournal verse={verse} />

      {/* Share */}
      <div className="mt-12 flex flex-wrap items-center gap-3">
        <ShareModal verse={verse} />
        <SaveVerseButton verse={verse} />
        <ShareCardButton verse={verse} />

        <span className="text-xs text-muted-foreground">

          <Wind className="mr-1 inline h-3 w-3" /> Chapter {verse.chapterNumber} · Verse {verse.verseNumber}
        </span>
      </div>

      {/* 11. Related */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-border/40 pt-10">
          <h3 className="font-display text-2xl text-foreground">Related verses</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.id}
                to="/verse/$chapter/$verse"
                params={{ chapter: String(r.chapterNumber), verse: String(r.verseNumber) }}
                className="group rounded-xl border border-border/50 bg-card/40 p-5 transition-all hover:border-primary/50 hover:bg-card/70"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-primary/80">
                  <span>Ch {r.chapterNumber} · V {r.verseNumber}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  “{r.krishnaModern}”
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 10. Gentle nudge */}
      <GentleNudge message={verse.gentleNudge} />
    </article>
  );
}

function SectionBlock({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-primary/80">
        {icon} {label}
      </div>
      <p className="mt-4 text-lg leading-relaxed text-foreground/90">{children}</p>
    </section>
  );
}
