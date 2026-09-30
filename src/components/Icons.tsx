import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

type P = SVGProps<SVGSVGElement>;

export const SearchIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
);
export const UserIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8.5" r="3.8" />
    <path d="M4.5 20c.8-4 3.7-6 7.5-6s6.7 2 7.5 6" />
  </svg>
);
export const BagIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 8h14l-1 12H6L5 8z" />
    <path d="M9 8V6.5a3 3 0 016 0V8" />
  </svg>
);
export const MenuIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);
export const ArrowRight = (p: P) => (
  <svg {...base} strokeWidth={1.5} {...p}>
    <path d="M3 12h17M14 6l6 6-6 6" />
  </svg>
);
export const ArrowLeft = (p: P) => (
  <svg {...base} strokeWidth={1.5} {...p}>
    <path d="M21 12H4M10 6l-6 6 6 6" />
  </svg>
);
export const PlusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const MinusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);
export const PauseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 5v14M15 5v14" />
  </svg>
);
export const PlayIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 5l11 7-11 7z" />
  </svg>
);

/* Social — simple line/solid glyphs, no real URLs attached */
export const InstagramIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </svg>
);
export const FacebookIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14 8.5h2.5V5H14a3.5 3.5 0 00-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V8.8c0-.2.1-.3.3-.3z" />
  </svg>
);
export const TikTokIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14 4v10.5a3.5 3.5 0 11-3.5-3.5" />
    <path d="M14 4c.3 2.3 1.8 3.8 4.5 4" />
  </svg>
);
