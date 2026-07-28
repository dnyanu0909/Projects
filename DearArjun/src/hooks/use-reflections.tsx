import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "dear_arjuna_reflections";
const EVENT = "dear-arjuna:reflections-changed";

export interface Reflection {
  verseId: string;
  text: string;
  createdAt: string;
}

function readAll(): Reflection[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter(
          (r) =>
            r && typeof r.verseId === "string" && typeof r.text === "string",
        )
      : [];
  } catch {
    return [];
  }
}

function writeAll(list: Reflection[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useReflection(verseId: string) {
  const [reflection, setReflection] = useState<Reflection | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const sync = () =>
      setReflection(readAll().find((r) => r.verseId === verseId) ?? null);
    sync();
    setHydrated(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [verseId]);

  const save = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const entry: Reflection = {
        verseId,
        text: trimmed,
        createdAt: new Date().toISOString(),
      };
      writeAll([entry, ...readAll().filter((r) => r.verseId !== verseId)]);
    },
    [verseId],
  );

  const remove = useCallback(() => {
    writeAll(readAll().filter((r) => r.verseId !== verseId));
  }, [verseId]);

  return { reflection, hydrated, save, remove };
}
