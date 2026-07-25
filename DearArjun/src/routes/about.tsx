import { createFileRoute } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/layout/AmbientBackground";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dear Arjuna — Fidelity over virality" },
      { name: "description", content: "How Dear Arjuna reads the Bhagavad Gita: modern language for the fight you're actually in, never at the cost of the original text." },
      { property: "og:title", content: "About Dear Arjuna" },
      { property: "og:description", content: "Fidelity over virality. No fake quotes. Every modern line ties to an authentic verse." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <AmbientBackground theme="forest" intensity={0.22} />
      <article className="mx-auto max-w-2xl px-6 pt-20 pb-24">
        <p className="text-xs uppercase tracking-[0.32em] text-primary/80">About</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
          Fidelity over virality.
        </h1>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/90">
          <p>
            The Bhagavad Gita is seven hundred verses of one conversation. A warrior
            named Arjuna, frozen on a battlefield, is talked back to life by
            Krishna. Almost everything you'll ever face is somewhere in that talk.
          </p>
          <p>
            <strong className="text-primary">Dear Arjuna</strong> is a modern reading of that
            conversation. Not a translation. Not a rewrite. A bridge — from a
            2000-year-old Sanskrit text to whatever you're avoiding right now.
          </p>

          <h2 className="mt-12 font-display text-2xl text-foreground">The three rules</h2>
          <ol className="list-decimal space-y-3 pl-5 marker:text-primary">
            <li>
              <strong className="text-foreground">No fake quotes.</strong> Every modern line is
              framed as an interpretation. The Sanskrit and accurate English translation
              always sit above it, and they always come first.
            </li>
            <li>
              <strong className="text-foreground">Problem-first, not chapter-first.</strong> You
              don't wake up thinking in chapters. You wake up thinking in feelings. The
              door is a feeling; the room behind it is the verse.
            </li>
            <li>
              <strong className="text-foreground">No brainrot.</strong> The tone is grounded,
              direct, empathetic. Krishna wasn't a meme. He was a friend telling the
              truth. That's the register.
            </li>
          </ol>

          <h2 className="mt-12 font-display text-2xl text-foreground">Who this is for</h2>
          <p>
            Anyone who has ever wanted to read the Gita but bounced off the format. And
            anyone who reads it every day and wants a version they can hand to a friend
            without a footnote.
          </p>

          <p className="mt-12 text-sm italic text-muted-foreground">
            You are Arjuna. Krishna is talking to you. The battlefield is just where
            you happen to be standing today.
          </p>
        </div>
      </article>
    </>
  );
}
