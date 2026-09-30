/**
 * TODD — temporary demo identity.
 *
 * Wordmark: four geometric, widely-spaced letters drawn as true paths (no font dependency).
 * The "edge": the crossbar of the T is cut on a sharp diagonal and the O is a
 * tall, tight oval — a quiet nod to blade-like precision.
 *
 * Monogram: a squared frame with a cut-corner T.
 */

type LogoProps = {
  className?: string;
  title?: string;
};

export function Wordmark({ className = "h-5 w-auto", title = "TODD" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 212 56"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinejoin="miter"
    >
      {/* T — diagonal-cut crossbar */}
      <polygon points="0,0 46,0 38,8 0,8" fill="currentColor" stroke="none" />
      <rect x="18" y="0" width="8" height="56" fill="currentColor" stroke="none" />
      {/* O */}
      <ellipse cx="80" cy="28" rx="18" ry="24" />
      {/* D */}
      <path d="M122 4 H134 A20 24 0 0 1 134 52 H122 Z" />
      {/* D */}
      <path d="M176 4 H188 A20 24 0 0 1 188 52 H176 Z" />
    </svg>
  );
}

export function Monogram({ className = "h-10 w-10", title = "TODD monogram" }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title} fill="none">
      <path d="M1.5 1.5 H62.5 V50 L50 62.5 H1.5 Z" stroke="currentColor" strokeWidth="2" />
      <polygon points="16,17 48,17 43,23 16,23" fill="currentColor" />
      <rect x="29" y="17" width="6" height="30" fill="currentColor" />
    </svg>
  );
}

/** Lock-up used in hero / editorial headers: monogram over wordmark. */
export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Monogram className="h-12 w-12 sm:h-14 sm:w-14" />
      <Wordmark className="mt-5 h-5 w-auto sm:h-6" />
    </div>
  );
}

/**
 * Oversized, barely-there brand watermark.
 * Always pointer-events:none and aria-hidden — never interferes with content.
 */
export function Watermark({
  variant = "monogram",
  tone = "dark",
  className = "",
}: {
  variant?: "monogram" | "wordmark";
  tone?: "dark" | "light";
  className?: string;
}) {
  const color = tone === "dark" ? "text-ink" : "text-ivory";
  const opacity = tone === "dark" ? "opacity-[0.05]" : "opacity-[0.05]";
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute select-none ${color} ${opacity} ${className}`}>
      {variant === "monogram" ? (
        <Monogram className="h-full w-full" />
      ) : (
        <Wordmark className="h-full w-full" />
      )}
    </div>
  );
}
