import { useEffect, useState } from "react";
import { Link, useRoute } from "@/router";
import { useStore } from "@/store";
import { BagIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from "./Icons";
import { Monogram, Wordmark, Watermark } from "./Logo";

const nav = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Bracelets", to: "/category/bracelets" },
  { label: "Journals", to: "/category/journals" },
  { label: "Wallets", to: "/category/wallets" },
  { label: "Caps", to: "/category/caps" },
  { label: "About", to: "/about" },
];

export function Header() {
  const { path } = useRoute();
  const { cartCount, openPanel, panel, closePanel } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const menuOpen = panel === "menu";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isHome = path === "/";
  const solid = scrolled || !isHome || menuOpen;

  const isActive = (to: string) => (to === "/" ? path === "/" : path === to || path.startsWith(to + "/"));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? "bg-ink/90 backdrop-blur-md border-b border-ivory/10" : "bg-gradient-to-b from-ink/60 to-transparent border-b border-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1560px] items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-12 ${
            solid ? "h-16 lg:h-[72px]" : "h-20 lg:h-24"
          }`}
        >
          {/* mobile: menu button */}
          <button
            className="-ml-2 p-2 text-ivory lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => (menuOpen ? closePanel() : openPanel("menu"))}
          >
            {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>

          {/* logo */}
          <Link
            to="/"
            aria-label="TODD — home"
            className="flex items-center gap-3 text-ivory max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
            onClick={() => closePanel()}
          >
            <Monogram className="hidden h-8 w-8 sm:block lg:h-9 lg:w-9" />
            <Wordmark className="h-[15px] w-auto lg:h-[17px]" />
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-7 xl:gap-9 lg:flex" aria-label="Primary">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`link-underline text-[11px] font-medium uppercase tracking-[0.24em] text-ivory/80 transition-colors hover:text-ivory ${
                  isActive(n.to) ? "is-active !text-ivory" : ""
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* utilities */}
          <div className="flex items-center gap-1 text-ivory sm:gap-2">
            <button aria-label="Search" onClick={() => openPanel("search")} className="p-2 transition-colors hover:text-bronze">
              <SearchIcon className="h-[22px] w-[22px]" />
            </button>
            <button aria-label="Account" onClick={() => openPanel("account")} className="p-2 transition-colors hover:text-bronze max-sm:hidden">
              <UserIcon className="h-[22px] w-[22px]" />
            </button>
            <button aria-label={`Shopping bag, ${cartCount} items`} onClick={() => openPanel("cart")} className="relative -mr-2 p-2 transition-colors hover:text-bronze">
              <BagIcon className="h-[22px] w-[22px]" />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0.5 flex h-4 min-w-4 items-center justify-center bg-bronze px-1 text-[9px] font-semibold text-ink">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-ink transition-all duration-500 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <Watermark variant="monogram" tone="light" className="-bottom-16 -right-16 h-[26rem] w-[26rem]" />
        <nav className="relative flex h-full flex-col justify-center px-8 pb-12 pt-24" aria-label="Mobile">
          <ul className="space-y-1">
            {nav.map((n, i) => (
              <li
                key={n.to}
                className={`transition-all duration-700 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: menuOpen ? `${120 + i * 50}ms` : "0ms" }}
              >
                <Link
                  to={n.to}
                  onClick={() => closePanel()}
                  className={`block py-2 font-serif text-[2.6rem] leading-none ${isActive(n.to) ? "text-bronze" : "text-ivory"}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-center gap-6 border-t border-ivory/15 pt-6 text-[11px] uppercase tracking-[0.24em] text-ivory/60">
            <button onClick={() => openPanel("account")}>Account</button>
            <Link to="/contact" onClick={() => closePanel()}>
              Contact
            </Link>
            <span className="ml-auto text-ivory/35">Demo Concept</span>
          </div>
        </nav>
      </div>
    </>
  );
}
