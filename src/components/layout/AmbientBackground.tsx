import type { AmbientTheme } from "@/content/types";
import { cn } from "@/lib/utils";
import battlefield from "@/assets/battlefield-sunset.jpg";
import cosmic from "@/assets/cosmic-expanse.jpg";
import forest from "@/assets/vrindavan-forest.jpg";

const themeImage: Record<AmbientTheme, string> = {
  battlefield,
  cosmic,
  forest,
};

const themeGradient: Record<AmbientTheme, string> = {
  battlefield: "var(--gradient-battlefield)",
  cosmic: "var(--gradient-cosmic)",
  forest: "var(--gradient-forest)",
};

export function AmbientBackground({
  theme = "battlefield",
  intensity = 0.35,
  className,
  showImage = true,
}: {
  theme?: AmbientTheme;
  intensity?: number;
  className?: string;
  showImage?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {showImage && (
        <div
          className="absolute inset-0 divine-pulse"
          style={{
            backgroundImage: `url(${themeImage[theme]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: intensity,
            filter: "blur(2px)",
          }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{ background: themeGradient[theme] }}
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="dust-layer" />
    </div>
  );
}
