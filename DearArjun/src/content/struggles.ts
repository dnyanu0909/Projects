import type { Struggle } from "./types";

export const struggles: Struggle[] = [
  {
    id: "anxiety",
    emoji: "😔",
    label: "Anxiety & Overthinking",
    tagline: "The mind that won't stop running.",
    description:
      "You're carrying tomorrow's weight today. Krishna spoke to a warrior frozen by the same storm.",
    recommendedVerseIds: ["2.47", "6.35", "2.14", "2.56", "18.66", "2.58"],
  },
  {
    id: "heartbreak",
    emoji: "💔",
    label: "Heartbreak & Relationships",
    tagline: "When someone becomes your whole sky.",
    description:
      "Attachment feels like love until it starts to break you. There's a way through that isn't numbness.",
    recommendedVerseIds: ["2.62", "2.63", "12.13", "2.14", "2.71", "12.14"],
  },
  {
    id: "exams",
    emoji: "📚",
    label: "Exams & Pressure",
    tagline: "The result is louder than the work.",
    description:
      "Arjuna asked the same thing before the biggest test of his life. Krishna didn't tell him to relax — he told him where to put his attention.",
    recommendedVerseIds: ["2.47", "2.48", "6.5", "3.35", "2.3"],
  },
  {
    id: "career",
    emoji: "💼",
    label: "Career & Work",
    tagline: "What am I actually supposed to do?",
    description:
      "Doing someone else's dharma well is still worse than doing your own imperfectly. Start where you actually stand.",
    recommendedVerseIds: ["3.35", "18.47", "2.47", "18.45", "4.18", "3.8"],
  },
  {
    id: "discipline",
    emoji: "🔥",
    label: "Discipline & Sloth",
    tagline: "You know what to do. You're just not doing it.",
    description:
      "The mind is the friend of the disciplined and the enemy of the undisciplined. Krishna was very direct about this.",
    recommendedVerseIds: ["6.5", "6.6", "6.35", "6.34", "3.8", "6.26"],
  },
  {
    id: "money",
    emoji: "💸",
    label: "Money & Security",
    tagline: "Enough never quite feels like enough.",
    description:
      "Chasing the fruit while ignoring the tree. Krishna's answer isn't renunciation of work — it's renunciation of the frenzy around it.",
    recommendedVerseIds: ["2.47", "2.70", "12.13", "18.66", "2.71"],
  },
  {
    id: "purpose",
    emoji: "🧭",
    label: "Purpose & Meaning",
    tagline: "Why any of this, at all.",
    description:
      "When the question isn't how to do the work but why. Krishna answers Arjuna's version of it on a battlefield, with everything at stake.",
    recommendedVerseIds: ["3.35", "18.45", "18.47", "11.12", "5.23", "4.18"],
  },
];

export const getStruggle = (id: string) => struggles.find((s) => s.id === id);
