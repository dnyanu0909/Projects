import type { Struggle } from "./types";

export const struggles: Struggle[] = [
  {
    slug: "anxiety",
    emoji: "😔",
    label: "Anxiety & Overthinking",
    tagline: "The mind that won't stop running.",
    intro:
      "You're carrying tomorrow's weight today. Krishna spoke to a warrior frozen by the same storm.",
    verses: [
      { chapter: 2, verse: 47 },
      { chapter: 6, verse: 35 },
      { chapter: 2, verse: 14 },
      { chapter: 18, verse: 66 },
    ],
  },
  {
    slug: "heartbreak",
    emoji: "💔",
    label: "Heartbreak & Relationships",
    tagline: "When someone becomes your whole sky.",
    intro:
      "Attachment feels like love until it starts to break you. There's a way through that isn't numbness.",
    verses: [
      { chapter: 2, verse: 62 },
      { chapter: 2, verse: 63 },
      { chapter: 12, verse: 13 },
      { chapter: 2, verse: 14 },
    ],
  },
  {
    slug: "exams",
    emoji: "📚",
    label: "Exams & Pressure",
    tagline: "The result is louder than the work.",
    intro:
      "Arjuna asked the same thing before the biggest test of his life. Krishna didn't tell him to relax — he told him where to put his attention.",
    verses: [
      { chapter: 2, verse: 47 },
      { chapter: 2, verse: 48 },
      { chapter: 6, verse: 5 },
      { chapter: 3, verse: 35 },
    ],
  },
  {
    slug: "career",
    emoji: "💼",
    label: "Career & Purpose",
    tagline: "What am I actually supposed to do?",
    intro:
      "Doing someone else's dharma well is still worse than doing your own imperfectly. Start where you actually stand.",
    verses: [
      { chapter: 3, verse: 35 },
      { chapter: 18, verse: 47 },
      { chapter: 2, verse: 47 },
      { chapter: 6, verse: 5 },
    ],
  },
  {
    slug: "discipline",
    emoji: "🔥",
    label: "Discipline & Sloth",
    tagline: "You know what to do. You're just not doing it.",
    intro:
      "The mind is the friend of the disciplined and the enemy of the undisciplined. Krishna was very direct about this.",
    verses: [
      { chapter: 6, verse: 5 },
      { chapter: 6, verse: 6 },
      { chapter: 6, verse: 35 },
      { chapter: 3, verse: 35 },
    ],
  },
  {
    slug: "money",
    emoji: "💸",
    label: "Money & Security",
    tagline: "Enough never quite feels like enough.",
    intro:
      "Chasing the fruit while ignoring the tree. Krishna's answer isn't renunciation of work — it's renunciation of the frenzy around it.",
    verses: [
      { chapter: 2, verse: 47 },
      { chapter: 2, verse: 70 },
      { chapter: 12, verse: 13 },
      { chapter: 18, verse: 66 },
    ],
  },
];

export const getStruggle = (slug: string) =>
  struggles.find((s) => s.slug === slug);
