import type { Chapter } from "./types";

export const chapters: Chapter[] = [
  { number: 1, sanskritName: "Arjuna Viṣāda Yoga", englishName: "The Despair of Arjuna", theme: "The moment before the fight — when everything you love is on both sides.", ambient: "battlefield", verseCount: 47 },
  { number: 2, sanskritName: "Sāṅkhya Yoga", englishName: "The Yoga of Knowledge", theme: "Krishna's first answer: the self that cannot be killed, the work that cannot be owned.", ambient: "battlefield", verseCount: 72 },
  { number: 3, sanskritName: "Karma Yoga", englishName: "The Yoga of Action", theme: "Why doing nothing is not the way out. Act — but for the right reason.", ambient: "battlefield", verseCount: 43 },
  { number: 4, sanskritName: "Jñāna Karma Sannyāsa Yoga", englishName: "Knowledge, Action & Renunciation", theme: "Wisdom is a fire. It burns the anxiety out of action.", ambient: "cosmic", verseCount: 42 },
  { number: 5, sanskritName: "Karma Sannyāsa Yoga", englishName: "The Yoga of Renunciation", theme: "Renouncing results, not responsibility.", ambient: "forest", verseCount: 29 },
  { number: 6, sanskritName: "Dhyāna Yoga", englishName: "The Yoga of Meditation", theme: "The mind as your closest friend — or your worst enemy. You decide.", ambient: "forest", verseCount: 47 },
  { number: 7, sanskritName: "Jñāna Vijñāna Yoga", englishName: "Knowledge of the Absolute", theme: "Krishna begins to reveal what he really is.", ambient: "cosmic", verseCount: 30 },
  { number: 8, sanskritName: "Akṣara Brahma Yoga", englishName: "The Imperishable Brahman", theme: "What lasts, when nothing lasts.", ambient: "cosmic", verseCount: 28 },
  { number: 9, sanskritName: "Rāja Vidyā Rāja Guhya Yoga", englishName: "The Royal Knowledge", theme: "The most guarded secret, said plainly.", ambient: "cosmic", verseCount: 34 },
  { number: 10, sanskritName: "Vibhūti Yoga", englishName: "The Divine Manifestations", theme: "Krishna in everything — a mountain, a river, a syllable, a silence.", ambient: "cosmic", verseCount: 42 },
  { number: 11, sanskritName: "Viśvarūpa Darśana Yoga", englishName: "The Universal Form", theme: "The vision Arjuna asked for, and immediately couldn't bear.", ambient: "cosmic", verseCount: 55 },
  { number: 12, sanskritName: "Bhakti Yoga", englishName: "The Yoga of Devotion", theme: "Love as the shortest road.", ambient: "forest", verseCount: 20 },
  { number: 13, sanskritName: "Kṣetra Kṣetrajña Vibhāga Yoga", englishName: "The Field & the Knower", theme: "You are not the body. You are the one watching it.", ambient: "cosmic", verseCount: 35 },
  { number: 14, sanskritName: "Guṇatraya Vibhāga Yoga", englishName: "The Three Modes of Nature", theme: "Why you feel the way you feel, and how to move.", ambient: "forest", verseCount: 27 },
  { number: 15, sanskritName: "Puruṣottama Yoga", englishName: "The Supreme Person", theme: "The upside-down tree — and the axe that cuts it.", ambient: "cosmic", verseCount: 20 },
  { number: 16, sanskritName: "Daivāsura Sampad Vibhāga Yoga", englishName: "Divine & Demonic Natures", theme: "Two very different ways to be human.", ambient: "battlefield", verseCount: 24 },
  { number: 17, sanskritName: "Śraddhātraya Vibhāga Yoga", englishName: "The Threefold Faith", theme: "What you eat, give, and worship shapes who you become.", ambient: "forest", verseCount: 28 },
  { number: 18, sanskritName: "Mokṣa Sannyāsa Yoga", englishName: "The Yoga of Liberation", theme: "The final word. Do your work. Take refuge. Be free.", ambient: "cosmic", verseCount: 78 },
];

export const getChapter = (n: number) => chapters.find((c) => c.number === n);
