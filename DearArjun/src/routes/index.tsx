import { createFileRoute } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { HeroKurukshetra } from "@/components/home/HeroKurukshetra";
import { EmpathyGrid } from "@/components/home/EmpathyGrid";
import { DailyKurukshetra } from "@/components/home/DailyKurukshetra";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dear Arjuna — What is your Kurukshetra today?" },
      { name: "description", content: "Enter the Bhagavad Gita through your struggle. Anxiety, heartbreak, discipline, purpose — Krishna is speaking to whatever you're facing right now." },
      { property: "og:title", content: "Dear Arjuna — What is your Kurukshetra today?" },
      { property: "og:description", content: "Problem-first Bhagavad Gita for the fight you're actually in." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <AmbientBackground theme="battlefield" intensity={0.28} />
      <HeroKurukshetra />
      <EmpathyGrid />
      <DailyKurukshetra />
    </>
  );
}
