// types.ts

export type AmbientTheme = "battlefield" | "cosmic" | "forest";

// ─── Struggle ────────────────────────────────────────────────────────────────

export const STRUGGLE_CATEGORIES = [
  "anxiety",
  "heartbreak",
  "exams",
  "career",
  "discipline",
  "money",
  "purpose",
] as const;

export type StruggleCategory = (typeof STRUGGLE_CATEGORIES)[number];

/** @deprecated Use StruggleCategory */
export type StruggleSlug = StruggleCategory;

export interface Struggle {
  id: StruggleCategory;
  label: string;
  emoji: string;
  /** One-line hook shown on the empathy grid. */
  tagline: string;
  /** Longer intro shown at the top of the struggle page. */
  description: string;
  recommendedVerseIds: string[]; // e.g., ["2.47", "6.5"]
}

// ─── Chapter ─────────────────────────────────────────────────────────────────

export interface Chapter {
  number: number;
  sanskritName: string;
  englishName: string;
  theme: string;
  ambient: AmbientTheme;
  verseCount: number;
}

// ─── Verse ───────────────────────────────────────────────────────────────────

export interface Verse {
  id: string; // e.g., "2.47"
  chapterNumber: number;
  verseNumber: number;
  ambient: AmbientTheme;
  struggles: StruggleCategory[];

  // 11-Part Template Fields
  sceneContext: string;
  sanskrit: string;
  translation: string;
  krishnaModern: string;
  whatIsHappening: string;
  corePhilosophy: string;
  realLifeExample: string;
  todaysMission: string;
  reflectionQuestion: string;
  gentleNudge: string;
  relatedVerseIds: string[]; // Array of verse IDs e.g. ["2.14", "2.48"]
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Build a verse ID string from chapter + verse numbers */
export const verseKey = (chapter: number, verse: number): string =>
  `${chapter}.${verse}`;
