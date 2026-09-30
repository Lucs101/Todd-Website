import { useState } from "react";
import { Link } from "@/router";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./Icons";
import { Monogram, Wordmark, Watermark } from "./Logo";

const shop = [
  { label: "Shop", to: "/shop" },
  { label: "Bracelets", to: "/category/bracelets" },
  { label: "Journals", to: "/category/journals" },
  { label: "Wallets", to: "/category/wallets" },
  { label: "Caps", to: "/category/caps" },
];
const brand = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  const [done, setDone] = useState(false);
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <Watermark variant="wordmark" tone="light" className="-bottom-6 left-1/2 h-40 w-[90%] -translate-x-1/2 sm:h-64 lg:h-80" />
      <div className="relative mx-auto max-w-[1560px] px-6 pb-10 pt-20 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <Monogram className="h-11 w-11" />
              <Wordmark className="h-5 w-auto" />
            </div>
            <p className="mt-6 max-w-sm font-serif text-2xl italic leading-snug text-ivory/80">
              Sophisticated, curated, personal men's accessories — with some edge.
            </p>
            <div className="mt-8 flex gap-3">
              {[
                { l: "Instagram", I: InstagramIcon },
                { l: "Facebook", I: FacebookIcon },
                { l: "TikTok", I: TikTokIcon },
              ].map(({ l, I }) => (
                <button key={l} aria-label={`${l} (demo placeholder)`} title={`${l} — placeholder`} className="flex h-11 w-11 items-center justify-center border border-ivory/20 text-ivory/75 transition-colors hover:border-bronze hover:text-bronze">
                  <I className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 lg:col-span-3 lg:col-start-7">
            <nav aria-label="Shop">
              <p className="eyebrow text-bronze">Shop</p>
              <ul className="mt-5 space-y-3">
                {shop.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-ivory/65 transition-colors hover:text-ivory">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Brand">
              <p className="eyebrow text-bronze">Brand</p>
              <ul className="mt-5 space-y-3">
                {brand.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-ivory/65 transition-colors hover:text-ivory">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-bronze">The List</p>
            <p className="mt-5 text-sm leading-relaxed text-ivory/60">New arrivals and considered edits, without the noise.</p>
            {done ? (
              <p className="anim-pop mt-5 text-sm text-ivory/85">You're on the list. (Demo — nothing saved.)</p>
            ) : (
              <form
                className="mt-5 flex border-b border-ivory/30 focus-within:border-bronze"
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
              >
                <label htmlFor="ft-email" className="sr-only">
                  Your email address
                </label>
                <input id="ft-email" type="email" required placeholder="Your email address" className="min-w-0 flex-1 bg-transparent py-3 text-sm placeholder:text-ivory/35 focus:outline-none" />
                <button type="submit" className="px-1 text-[10px] font-medium uppercase tracking-[0.24em] text-ivory/80 hover:text-bronze">
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Todd. Demo Concept.</p>
          <p>Imagery, pricing and copy are placeholders for presentation purposes. No purchases can be made.</p>
        </div>
      </div>
    </footer>
  );
}
