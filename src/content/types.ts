export type AmbientTheme = "battlefield" | "cosmic" | "forest";

export type StruggleSlug =
  | "anxiety"
  | "heartbreak"
  | "exams"
  | "career"
  | "discipline"
  | "money";

export type Struggle = {
  slug: StruggleSlug;
  emoji: string;
  label: string;
  tagline: string;
  intro: string;
  verses: Array<{ chapter: number; verse: number }>;
};

export type Chapter = {
  number: number;
  sanskritName: string;
  englishName: string;
  theme: string;
  ambient: AmbientTheme;
  verseCount: number;
};

export type RelatedVerse = {
  chapter: number;
  verse: number;
  note: string;
};

export type Verse = {
  chapter: number;
  verse: number;
  scene: string;
  sanskrit: string;
  translation: string;
  krishnaModern: string;
  whatsHappening: string;
  corePhilosophy: string;
  realLifeScenario: string;
  todaysMission: string;
  reflectionQuestion: string;
  gentleNudge: string;
  related: RelatedVerse[];
  struggles: StruggleSlug[];
  ambient: AmbientTheme;
};

export const verseKey = (c: number, v: number) => `${c}.${v}`;
