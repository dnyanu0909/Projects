import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../style_deararjun.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AmbientBackground } from "@/components/layout/AmbientBackground";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <AmbientBackground theme="battlefield" />
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-primary/80">You've wandered off the field</p>
        <h1 className="mt-4 font-display text-6xl text-foreground">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This page isn't part of the Gita — yet. Head back and pick a struggle.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <AmbientBackground theme="cosmic" />
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-foreground">Something interrupted this page</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Even Arjuna paused. Try again, or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border/60 px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card/60"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dear Arjuna — Timeless wisdom for your daily Kurukshetra" },
      { name: "description", content: "The Bhagavad Gita in plain, modern language. Enter through your struggle, not through a chapter — Krishna is speaking directly to you." },
      { name: "author", content: "Dear Arjuna" },
      { name: "theme-color", content: "#0A0C10" },
      { property: "og:title", content: "Dear Arjuna — Timeless wisdom for your daily Kurukshetra" },
      { property: "og:description", content: "700 verses of the Bhagavad Gita, rewritten for the fight you're actually in right now." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
