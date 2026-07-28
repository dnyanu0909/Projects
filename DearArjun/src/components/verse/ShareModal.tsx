import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { toast } from "sonner";
import { Copy, Download, Loader2, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Verse } from "@/content/types";

type Format = "story" | "square";

export function ShareModal({ verse }: { verse: Verse }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [format, setFormat] = useState<Format>("story");
  const [busy, setBusy] = useState<null | "download" | "copy">(null);

  const render = async () => {
    if (!cardRef.current) return null;
    // Ensure webfonts (Devanagari + serif) are rasterized, not fallback glyphs.
    if (typeof document !== "undefined" && document.fonts) {
      await document.fonts.ready;
    }
    return htmlToImage.toBlob(cardRef.current, {
      quality: 0.95,
      pixelRatio: 3,
      cacheBust: true,
      backgroundColor: "#0A0C10",
    });
  };

  const handleDownload = async () => {
    setBusy("download");
    try {
      const blob = await render();
      if (!blob) throw new Error("render failed");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `DearArjuna-Verse-${verse.chapterNumber}-${verse.verseNumber}.png`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Card saved to your device");
    } catch {
      toast.error("Couldn't generate the image. Try again.");
    } finally {
      setBusy(null);
    }
  };

  const handleCopyImage = async () => {
    setBusy("copy");
    try {
      const blob = await render();
      if (!blob) throw new Error("render failed");
      if (typeof ClipboardItem === "undefined" || !navigator.clipboard?.write) {
        throw new Error("unsupported");
      }
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      toast.success("Image copied — paste it anywhere");
    } catch {
      toast("Copying isn't supported here", {
        description: "Use “Download” and share the saved image instead.",
      });
    } finally {
      setBusy(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          <Share2 className="h-4 w-4" /> Share verse
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[92svh] max-w-[420px] overflow-y-auto border-border/60 bg-background/95 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Share this verse</DialogTitle>
        </DialogHeader>

        {/* Format switcher */}
        <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/50 p-1 text-xs">
          {(
            [
              ["story", "9:16 Story"],
              ["square", "1:1 Square"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFormat(value)}
              className={`flex-1 rounded-full px-3 py-1.5 font-medium transition-colors ${
                format === value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Preview — scaled down for the modal, exported at full size */}
        <div
          className="mx-auto w-[281px] overflow-hidden"
          style={{ height: (format === "story" ? 640 : 360) * 0.78 }}
        >
          <div className="origin-top-left scale-[0.78]">
            <ShareCard ref={cardRef} verse={verse} format={format} />
          </div>
        </div>


        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleDownload}
            disabled={busy !== null}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-50"
          >
            {busy === "download" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Download
          </button>
          <button
            type="button"
            onClick={handleCopyImage}
            disabled={busy !== null}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card disabled:opacity-50"
          >
            {busy === "copy" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            Copy image
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ShareCard({
  ref,
  verse,
  format,
}: {
  ref: React.Ref<HTMLDivElement>;
  verse: Verse;
  format: Format;
}) {
  const story = format === "story";
  const sanskritLine = verse.sanskrit.split("\n")[0];

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center overflow-hidden rounded-2xl bg-[#0A0C10] ${
        story ? "h-[640px] w-[360px] px-8 py-10" : "h-[360px] w-[360px] px-8 py-8"
      }`}
      style={{
        backgroundImage:
          "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(229,169,60,0.22), rgba(10,12,16,0) 70%)",
      }}
    >
      {/* Header badge */}
      <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E5A93C]/85">
        Chapter {verse.chapterNumber} • Verse {verse.verseNumber}
      </div>

      {/* Hero quote */}
      <p
        className={`my-auto px-1 text-center leading-relaxed text-zinc-100 ${
          story ? "text-[22px]" : "text-[18px]"
        }`}
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        “{verse.krishnaModern}”
      </p>

      {/* Sanskrit anchor */}
      <div className="w-full max-w-[290px] text-center">
        <p
          className="text-[13px] leading-relaxed text-[#E5A93C]/80"
          style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
          lang="sa"
        >
          {sanskritLine}
        </p>
        <p className="mt-2 text-[11px] italic leading-snug text-zinc-400">
          {truncate(verse.translation, story ? 150 : 110)}
        </p>
      </div>

      {/* Watermark */}
      <div className="mt-6 w-full border-t border-zinc-800/60 pt-4 text-center">
        <div className="whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-zinc-400">
          🕉️ Dear Arjuna • Bhagavad Gita Decoded

        </div>
        <div className="mt-1 text-[9px] uppercase tracking-[0.22em] text-zinc-600">
          Timeless wisdom for your daily Kurukshetra
        </div>
      </div>
    </div>
  );
}

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}
