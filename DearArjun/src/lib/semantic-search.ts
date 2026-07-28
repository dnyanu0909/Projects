import Fuse from "fuse.js";
import type { IFuseOptions } from "fuse.js";
import { verses } from "@/content/verses";
import { struggles } from "@/content/struggles";
import type { Struggle, Verse } from "@/content/types";

/**
 * Lightweight semantic-ish search.
 *
 * Three signals are blended so a sentence like
 * "I feel like everyone is achieving more than me"
 * lands on 3.35 / 2.47 rather than returning nothing:
 *
 * 1. Intent lexicon  — natural-language phrases mapped to struggles + verses
 * 2. Fuzzy text      — Fuse.js over the full verse text (typo tolerant)
 * 3. Concept overlap — token overlap on a curated concept vocabulary
 */

export type VerseResult = {
  verse: Verse;
  score: number; // 0..1, higher = better
  reason: string;
};

export type StruggleResult = {
  struggle: Struggle;
  score: number;
};

export type SearchResult = {
  verses: VerseResult[];
  struggles: StruggleResult[];
};

// ─── Intent lexicon ──────────────────────────────────────────────────────────

type Intent = {
  /** Phrases / words a person actually types. */
  cues: string[];
  /** Verses this feeling most directly answers. */
  verseIds: string[];
  struggles: string[];
  /** Shown under the result so the match feels conversational. */
  reason: string;
};

const INTENTS: Intent[] = [
  {
    cues: [
      "everyone is achieving more",
      "everyone else",
      "achieving more than me",
      "comparison",
      "comparing",
      "compare myself",
      "behind in life",
      "left behind",
      "falling behind",
      "jealous",
      "jealousy",
      "envy",
      "their timeline",
      "linkedin",
      "peers",
      "friends are ahead",
      "ahead of me",
      "not enough",
      "late bloomer",
    ],
    verseIds: ["3.35", "18.47", "2.47", "18.45"],
    struggles: ["purpose", "career"],
    reason: "Comparison — Krishna answers this with your own dharma, not theirs.",
  },
  {
    cues: [
      "anxious",
      "anxiety",
      "panic",
      "overthinking",
      "overthink",
      "cant sleep",
      "can't sleep",
      "racing thoughts",
      "spiraling",
      "worried",
      "worry",
      "restless",
      "stressed",
      "stress",
      "nervous",
      "fear",
      "afraid",
      "scared",
    ],
    verseIds: ["6.35", "2.14", "2.47", "2.56", "18.66"],
    struggles: ["anxiety"],
    reason: "A mind that won't sit still — Krishna's first subject.",
  },
  {
    cues: [
      "heartbreak",
      "heartbroken",
      "breakup",
      "broke up",
      "they left",
      "ex",
      "miss them",
      "obsessed with someone",
      "attached",
      "attachment",
      "cant let go",
      "can't let go",
      "moving on",
      "lonely",
      "rejected",
      "unrequited",
    ],
    verseIds: ["2.62", "2.63", "12.13", "2.71"],
    struggles: ["heartbreak"],
    reason: "Attachment turning into pain — the 2.62–63 chain.",
  },
  {
    cues: [
      "exam",
      "exams",
      "test",
      "result",
      "results",
      "marks",
      "grades",
      "interview",
      "placement",
      "deadline",
      "pressure",
      "failing",
      "failure",
      "score",
      "rank",
    ],
    verseIds: ["2.47", "2.48", "6.5", "2.3"],
    struggles: ["exams"],
    reason: "Outcome pressure — effort is yours, the fruit is not.",
  },
  {
    cues: [
      "lazy",
      "procrastinating",
      "procrastination",
      "no motivation",
      "unmotivated",
      "cant focus",
      "can't focus",
      "distracted",
      "discipline",
      "consistency",
      "wasting time",
      "scrolling",
      "phone addiction",
      "habit",
    ],
    verseIds: ["6.5", "6.6", "6.35", "3.8"],
    struggles: ["discipline"],
    reason: "Your own mind as friend or enemy — Chapter 6.",
  },
  {
    cues: [
      "money",
      "broke",
      "salary",
      "rich",
      "poor",
      "savings",
      "debt",
      "security",
      "greed",
      "never enough",
      "financial",
      "afford",
    ],
    verseIds: ["2.70", "2.47", "12.13", "2.71"],
    struggles: ["money"],
    reason: "Wanting more — the ocean that stays full regardless.",
  },
  {
    cues: [
      "purpose",
      "meaning",
      "pointless",
      "why am i here",
      "what am i doing",
      "lost",
      "direction",
      "empty",
      "burnt out",
      "burnout",
      "quit",
      "wrong path",
      "career change",
      "should i switch",
      "confused about life",
    ],
    verseIds: ["3.35", "18.45", "18.47", "5.23", "4.18"],
    struggles: ["purpose", "career"],
    reason: "The why beneath the work — your dharma over a borrowed one.",
  },
  {
    cues: [
      "anger",
      "angry",
      "rage",
      "irritated",
      "resentment",
      "hate",
      "bitter",
      "revenge",
    ],
    verseIds: ["2.62", "2.63", "16.21", "5.23"],
    struggles: ["anxiety", "heartbreak"],
    reason: "Anger's chain: desire → anger → confusion.",
  },
  {
    cues: [
      "grief",
      "death",
      "died",
      "loss",
      "lost someone",
      "mourning",
      "funeral",
    ],
    verseIds: ["2.13", "2.20", "2.22", "2.27", "2.14"],
    struggles: ["anxiety", "purpose"],
    reason: "What is born must die — Chapter 2's hardest comfort.",
  },
  {
    cues: [
      "guilt",
      "shame",
      "mistake",
      "regret",
      "messed up",
      "unforgivable",
      "bad person",
      "start over",
    ],
    verseIds: ["18.66", "9.30", "4.36", "2.40"],
    struggles: ["anxiety", "purpose"],
    reason: "Surrender and a clean slate — 18.66.",
  },
];

// ─── Text prep ───────────────────────────────────────────────────────────────

const STOPWORDS = new Set(
  "i im i'm me my myself we our you your he she it they them the a an and or but if of to in on at for with about like as is am are was were be been being do does did doing so very really just feel feels feeling that this these those what why how when who not no cant can't dont don't wont won't always never more than".split(
    " ",
  ),
);

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (s: string) =>
  normalize(s)
    .split(" ")
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));

// ─── Fuse index ──────────────────────────────────────────────────────────────

type Doc = {
  verse: Verse;
  krishnaModern: string;
  translation: string;
  body: string;
  sceneContext: string;
  ref: string;
};

const docs: Doc[] = verses.map((v) => ({
  verse: v,
  krishnaModern: v.krishnaModern,
  translation: v.translation,
  sceneContext: v.sceneContext,
  body: [
    v.whatIsHappening,
    v.corePhilosophy,
    v.realLifeExample,
    v.todaysMission,
    v.reflectionQuestion,
    (v.struggles ?? []).join(" "),
  ].join(" "),
  ref: `${v.chapterNumber}.${v.verseNumber} chapter ${v.chapterNumber} verse ${v.verseNumber}`,
}));

const fuseOptions: IFuseOptions<Doc> = {
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.42,
  minMatchCharLength: 3,
  keys: [
    { name: "krishnaModern", weight: 0.32 },
    { name: "translation", weight: 0.2 },
    { name: "sceneContext", weight: 0.12 },
    { name: "body", weight: 0.26 },
    { name: "ref", weight: 0.1 },
  ],
};

const fuse = new Fuse(docs, fuseOptions);

// ─── Search ──────────────────────────────────────────────────────────────────

export function searchVerses(rawQuery: string, limit = 5): SearchResult {
  const query = normalize(rawQuery);
  if (query.length < 2) return { verses: [], struggles: [] };

  const tokens = tokenize(rawQuery);
  const scores = new Map<string, { score: number; reason: string }>();

  const bump = (id: string, amount: number, reason: string) => {
    const prev = scores.get(id);
    if (!prev) scores.set(id, { score: amount, reason });
    else
      scores.set(id, {
        score: prev.score + amount,
        reason: amount > prev.score ? reason : prev.reason,
      });
  };

  // 1. Intent lexicon
  const struggleScores = new Map<string, number>();
  for (const intent of INTENTS) {
    let hits = 0;
    for (const cue of intent.cues) {
      if (cue.includes(" ")) {
        if (query.includes(cue)) hits += 2;
      } else if (tokens.some((t) => t === cue || t.startsWith(cue.slice(0, 5)))) {
        hits += 1;
      }
    }
    if (!hits) continue;
    const strength = Math.min(1, hits / 2);
    intent.verseIds.forEach((id, i) => {
      bump(id, strength * (1 - i * 0.12), intent.reason);
    });
    intent.struggles.forEach((s) =>
      struggleScores.set(s, (struggleScores.get(s) ?? 0) + strength),
    );
  }

  // 2. Fuzzy full-text
  for (const hit of fuse.search(query, { limit: 12 })) {
    const sim = 1 - (hit.score ?? 1);
    bump(hit.item.verse.id, sim * 0.7, "Matches the language of this verse.");
  }

  // 3. Concept token overlap
  if (tokens.length) {
    for (const doc of docs) {
      const haystack = normalize(
        `${doc.krishnaModern} ${doc.translation} ${doc.body}`,
      );
      let overlap = 0;
      for (const t of tokens) if (haystack.includes(t)) overlap += 1;
      if (overlap) bump(doc.verse.id, (overlap / tokens.length) * 0.45, "Shares the words you used.");
    }
  }

  // Direct "2.47" / "chapter 2 verse 47" lookups
  const refMatch = query.match(/(\d{1,2})\s*[.: ]\s*(\d{1,3})/);
  if (refMatch) bump(`${refMatch[1]}.${refMatch[2]}`, 2, "Exact verse reference.");

  const verseResults: VerseResult[] = [...scores.entries()]
    .map(([id, s]) => ({
      verse: verses.find((v) => v.id === id),
      score: s.score,
      reason: s.reason,
    }))
    .filter((r): r is VerseResult => Boolean(r.verse))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => ({ ...r, score: Math.min(1, r.score) }));

  // Struggles: lexicon score + direct label match
  for (const s of struggles) {
    if (query.includes(s.id) || normalize(s.label).includes(query)) {
      struggleScores.set(s.id, (struggleScores.get(s.id) ?? 0) + 1.2);
    }
  }
  const struggleResults: StruggleResult[] = [...struggleScores.entries()]
    .map(([id, score]) => ({ struggle: struggles.find((s) => s.id === id), score }))
    .filter((r): r is StruggleResult => Boolean(r.struggle))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  return { verses: verseResults, struggles: struggleResults };
}
