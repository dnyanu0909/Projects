import { useState } from "react";
import type { Verse } from "@/content/types";
import { Download, Loader2 } from "lucide-react";

export function ShareCardButton({ verse }: { verse: Verse }) {
  const [busy, setBusy] = useState(false);

  const generate = async () => {
    setBusy(true);
    try {
      const w = 1080;
      const h = 1350;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;

      // Background gradient
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#0A0C10");
      g.addColorStop(0.6, "#131624");
      g.addColorStop(1, "#0A0C10");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Divine glow
      const glow = ctx.createRadialGradient(w / 2, h * 0.35, 20, w / 2, h * 0.35, 700);
      glow.addColorStop(0, "rgba(255,200,87,0.35)");
      glow.addColorStop(1, "rgba(255,200,87,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Gold border
      ctx.strokeStyle = "#E5A93C";
      ctx.lineWidth = 3;
      ctx.strokeRect(48, 48, w - 96, h - 96);

      // Label
      ctx.fillStyle = "#E5A93C";
      ctx.font = "600 26px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`DEAR ARJUNA  ·  ${verse.chapter}.${verse.verse}`, w / 2, 140);

      // Modern quote (wrap)
      ctx.fillStyle = "#F3F4F6";
      ctx.font = "500 54px 'Cormorant Garamond', Georgia, serif";
      wrapText(ctx, `"${verse.krishnaModern}"`, w / 2, 300, w - 200, 68);

      // Divider
      ctx.strokeStyle = "rgba(229,169,60,0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w / 2 - 60, h - 300);
      ctx.lineTo(w / 2 + 60, h - 300);
      ctx.stroke();

      // Translation footer
      ctx.fillStyle = "rgba(243,244,246,0.75)";
      ctx.font = "italic 28px 'Cormorant Garamond', Georgia, serif";
      wrapText(ctx, `— ${verse.translation}`, w / 2, h - 240, w - 220, 36);

      ctx.fillStyle = "rgba(243,244,246,0.5)";
      ctx.font = "500 20px Inter, system-ui, sans-serif";
      ctx.fillText("Bhagavad Gita · deararjuna", w / 2, h - 90);

      const blob: Blob = await new Promise((res) =>
        canvas.toBlob((b) => res(b!), "image/png"),
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dear-arjuna-${verse.chapter}-${verse.verse}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={generate}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      Save as share card
    </button>
  );
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let cursorY = y;
  for (const word of words) {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = word;
      cursorY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cursorY);
}
