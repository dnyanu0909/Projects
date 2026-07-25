import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "dear-arjuna:ambient-audio";
// Royalty-free tanpura drone (short loop hosted on Pixabay CDN).
const AUDIO_SRC = "https://cdn.pixabay.com/download/audio/2022/03/24/audio_d1718ab41b.mp3?filename=indian-tanpura-14035.mp3";

export function AmbientAudioToggle() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored === "on") setEnabled(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (enabled) {
      if (!audioRef.current) {
        const el = new Audio(AUDIO_SRC);
        el.loop = true;
        el.volume = 0.25;
        audioRef.current = el;
      }
      audioRef.current.play().catch(() => setEnabled(false));
      window.localStorage.setItem(STORAGE_KEY, "on");
    } else {
      audioRef.current?.pause();
      window.localStorage.setItem(STORAGE_KEY, "off");
    }
  }, [enabled, mounted]);

  if (!mounted) return null;

  return (
    <button
      type="button"
      aria-label={enabled ? "Mute ambient sound" : "Play ambient sound"}
      aria-pressed={enabled}
      onClick={() => setEnabled((v) => !v)}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/40 backdrop-blur-md transition-colors hover:bg-background/70",
        enabled && "border-primary/50 text-primary shadow-[var(--shadow-glow)]",
      )}
      title={enabled ? "Ambient tanpura: on" : "Ambient tanpura: off"}
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
