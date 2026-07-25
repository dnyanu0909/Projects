# Dear Arjuna — MVP Build Plan

A cinematic, dark-mode web app that maps modern struggles to Bhagavad Gita verses using an 11-part schema. Fully static/client-side for MVP (no backend needed).

## Scope (V1)
- Problem-first landing ("What is your Kurukshetra today?")
- Dynamic verse viewer implementing the full 11-part template
- Traditional Chapter 1–18 navigator
- Daily Kurukshetra (deterministic verse-of-day)
- Save/Share as downloadable social card (canvas-rendered)
- Dark atmospheric theme + optional ambient audio toggle

Excluded (V2): KrishnaGPT, narration, user accounts, journaling.

## Routes (TanStack Start, file-based)
```text
src/routes/
  __root.tsx              → global shell: dark theme, ambient audio toggle, HeadContent
  index.tsx               → Hero + Empathy Grid + search + Daily Kurukshetra card
  struggle.$slug.tsx      → curated verse list for a struggle (anxiety, heartbreak, etc.)
  verse.$chapter.$verse.tsx → 11-part verse viewer (e.g. /verse/2/47)
  chapters.tsx            → grid of 18 chapters with themes
  chapters.$chapter.tsx   → verse list within a chapter
  daily.tsx               → today's verse (redirects to /verse/x/y)
  about.tsx               → philosophy + fidelity statement
```
Each route defines its own `head()` with unique title/description/og.

## Content Data Layer
Static TypeScript modules — no DB needed for MVP.

```text
src/content/
  struggles.ts    → 6 struggle categories + emoji + tagline + verse refs
  chapters.ts     → 18 chapters: title, sanskrit name, theme, ambient palette
  verses.ts       → seeded verse records keyed "C.V" (e.g. "2.47")
  types.ts        → Verse, Struggle, Chapter types
```

`Verse` shape mirrors the 11-part schema exactly:
```ts
type Verse = {
  chapter: number; verse: number;
  scene: string;                 // 1. Context
  sanskrit: string;              // 2. Devanagari
  translation: string;           // 3. Accurate English
  krishnaModern: string;         // 4. Modern voice
  whatsHappening: string;        // 5. Story context
  corePhilosophy: string;        // 6. Timeless lesson
  realLifeScenario: string;      // 7. Modern application
  todaysMission: string;         // 8. Action item
  reflectionQuestion: string;    // 9. Prompt
  gentleNudge: string;           // 10. Time-triggered
  related: Array<{ chapter: number; verse: number; note: string }>; // 11
  struggles: string[];           // reverse index → struggle slugs
  ambientTheme?: "battlefield" | "cosmic" | "forest";
};
```
Seed ~15–20 fully-authored verses (2.47, 2.14, 2.62–63, 3.35, 6.5, 6.35, 12.13–14, 18.66, etc.) covering all 6 struggles. Chapter navigator lists all 18 chapters; unseeded verses show a "Coming soon — read traditional translation" state so nothing feels broken.

## Component Architecture
```text
src/components/
  layout/
    AmbientBackground.tsx   → parallax dust particles / gradient per theme
    AmbientAudioToggle.tsx  → flute/tanpura loop, localStorage pref (read in useEffect)
    SiteHeader.tsx / SiteFooter.tsx
  home/
    HeroKurukshetra.tsx     → question + search
    EmpathyGrid.tsx         → 6 struggle tiles + "Read Full Gita"
    DailyKurukshetra.tsx    → today's featured verse card
  verse/
    VerseViewer.tsx         → orchestrates 11 sections
    SanskritBlock.tsx       → Devanagari typography
    KrishnaModernBlock.tsx  → highlighted modern voice
    MissionCard.tsx / ReflectionCard.tsx
    GentleNudge.tsx         → appears after 5min or ~60% scroll
    RelatedVerses.tsx
    ShareCardButton.tsx     → renders canvas → PNG download
  chapters/
    ChapterGrid.tsx / ChapterVerseList.tsx
  struggle/
    StruggleVerseList.tsx
```

## Design System (src/styles.css)
Override tokens to spec:
- `--background: oklch()` of `#0A0C10` (deep void)
- `--foreground: oklch()` of `#F3F4F6`
- `--primary: oklch()` of `#E5A93C` (divine gold)
- `--accent: oklch()` of `#FFC857` (glow)
- `--secondary: oklch()` of `#1E3A8A` (cosmic teal)
- Custom tokens: `--gradient-divine`, `--gradient-battlefield`, `--gradient-cosmic`, `--gradient-forest`, `--shadow-glow`
- Fonts loaded via `<link>` in `__root.tsx` head:
  - Headings: **Cormorant Garamond** (serene, classical)
  - Body: **Inter**
  - Sanskrit: **Noto Serif Devanagari**
- Register in `@theme` as `--font-display`, `--font-body`, `--font-sanskrit`.

Ambient background: CSS radial gradients + a subtle animated noise/dust layer (`@utility dust-layer` with a keyframe drift). No heavy JS libs.

## Key Interactions
- **Gentle Nudge**: `useEffect` timer (5min) + scroll listener → fades in a bottom pill; dismissible; per-session sessionStorage flag.
- **Daily Kurukshetra**: `verses[dayOfYear % seededVerses.length]` — deterministic, no server call.
- **Search**: client-side fuzzy match over verse text/struggles (no external lib; small array).
- **Share card**: HTML5 canvas draws verse + gold border + modern quote → `toBlob` → download `.png`. Also copies quote+link to clipboard.
- **Ambient audio**: single royalty-free tanpura loop in `public/`; muted by default; toggle in header persists to localStorage (read inside `useEffect` to avoid SSR hydration mismatch).

## Imagery
Generate 3 cinematic backgrounds (fast tier) under `src/assets/`:
- `battlefield-sunset.jpg` — Kurukshetra golden dusk
- `cosmic-expanse.jpg` — Chapter 11 vishvarupa vibe
- `vrindavan-forest.jpg` — peaceful green depth
Selected per verse's `ambientTheme` and used as blurred hero backdrops with dark overlay.

## Fidelity Guardrails (baked into UI copy)
- Every verse page has a small "Interpretation, not translation" tag on the Modern Krishna block, with the accurate translation always visible directly above.
- Footer + About page reinforce: no fake quotes, every modern line ties to a cited verse.

## SEO / Head
- `__root` sets sitewide OG defaults (no og:image at root).
- Each leaf route sets unique `title`, `description`, `og:title`, `og:description`.
- Verse pages set `og:image` = hero background URL.

## Build Order
1. Theme tokens + fonts + ambient background primitives
2. Content types + seed 15–20 verses + 18 chapters + 6 struggles
3. `__root` chrome (header, footer, audio toggle)
4. Home (hero + empathy grid + daily card + search)
5. Verse viewer (11 sections) + gentle nudge + share card
6. Chapters navigator + struggle list pages
7. About page + polish pass + generated background art

## Out of Scope for This Build
- Lovable Cloud / auth / DB (all content is static TS)
- Full 700-verse coverage (seeded subset only; graceful fallback for the rest)
- AI chat, audio narration, journaling
