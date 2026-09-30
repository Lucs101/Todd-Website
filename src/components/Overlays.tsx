import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { formatPrice, products } from "@/data/products";
import { categories } from "@/data/categories";
import { Link, navigate } from "@/router";
import { useStore } from "@/store";
import { ArrowRight, BagIcon, CheckIcon, CloseIcon, MinusIcon, PlusIcon, SearchIcon } from "./Icons";
import { ProductImage } from "./ProductImage";
import { Monogram } from "./Logo";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const on = (e: KeyboardEvent) => e.key === "Escape" && onEscape();
    window.addEventListener("keydown", on);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", on);
      document.body.style.overflow = prev;
    };
  }, [active, onEscape]);
}

function Backdrop({ onClick }: { onClick: () => void }) {
  return <div onClick={onClick} className="anim-in fixed inset-0 z-[60] bg-ink/70 backdrop-blur-[2px]" style={{ animationDuration: "0.4s" }} />;
}

/* ------------------------------------------------------------------ */
/* Cart drawer — visual demo only                                       */
/* ------------------------------------------------------------------ */

export function CartDrawer() {
  const { panel, closePanel, cart, cartTotal, cartCount, setQty, removeFromCart } = useStore();
  const open = panel === "cart";
  const [demoMsg, setDemoMsg] = useState(false);
  useEscape(open, closePanel);
  useEffect(() => {
    if (!open) setDemoMsg(false);
  }, [open]);
  if (!open) return null;

  return (
    <>
      <Backdrop onClick={closePanel} />
      <aside
        className="anim-drawer fixed right-0 top-0 z-[61] flex h-full w-full max-w-[440px] flex-col bg-char text-ivory shadow-2xl"
        role="dialog"
        aria-label="Shopping bag"
      >
        <div className="flex items-center justify-between border-b border-ivory/10 px-6 py-5">
          <h2 className="font-serif text-2xl">Your Bag <span className="text-ivory/40">({cartCount})</span></h2>
          <button onClick={closePanel} aria-label="Close bag" className="p-1 text-ivory/70 hover:text-ivory">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <BagIcon className="h-9 w-9 text-ivory/30" />
            <p className="mt-5 font-serif text-3xl">Nothing here yet.</p>
            <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-ivory/50">Carry something with character — start with the edit.</p>
            <Link to="/shop" onClick={closePanel} className="btn btn-solid mt-8">
              Explore the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
              {cart.map((line) => {
                const p = products.find((x) => x.id === line.productId)!;
                return (
                  <li key={p.id} className="flex gap-4">
                    <Link to={`/product/${p.slug}`} onClick={closePanel} className="block h-28 w-24 shrink-0 bg-coal">
                      <ProductImage image={p.images[0]} className="h-full w-full" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex justify-between gap-3">
                        <h3 className="font-serif text-lg leading-tight">{p.name}</h3>
                        <span className="text-sm">{formatPrice(p.price * line.qty)}</span>
                      </div>
                      <p className="mt-1 text-xs capitalize text-ivory/45">{p.category}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-ivory/20">
                          <button aria-label="Decrease" onClick={() => setQty(p.id, line.qty - 1)} className="p-2 hover:bg-ivory/10">
                            <MinusIcon className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm">{line.qty}</span>
                          <button aria-label="Increase" onClick={() => setQty(p.id, line.qty + 1)} className="p-2 hover:bg-ivory/10">
                            <PlusIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(p.id)} className="text-[10px] uppercase tracking-[0.22em] text-ivory/45 transition-colors hover:text-ivory">
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-ivory/10 px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-[0.24em] text-ivory/60">Subtotal</span>
                <span className="font-serif text-3xl">{formatPrice(cartTotal)}</span>
              </div>
              <p className="mt-1 text-xs text-ivory/40">Shipping and taxes would be calculated at checkout.</p>
              <button onClick={() => setDemoMsg(true)} className="btn btn-solid mt-5 w-full">
                Checkout
              </button>
              {demoMsg && (
                <p className="anim-pop mt-4 border border-bronze/40 bg-bronze/10 p-3 text-center text-xs leading-relaxed text-ivory/80">
                  Demo concept — checkout and payments are intentionally not connected.
                </p>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Search overlay                                                      */
/* ------------------------------------------------------------------ */

export function SearchOverlay() {
  const { panel, closePanel } = useStore();
  const open = panel === "search";
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEscape(open, closePanel);

  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return products.filter((p) => [p.name, p.category, p.tagline, p.description].join(" ").toLowerCase().includes(s));
  }, [q]);

  if (!open) return null;

  return (
    <div className="anim-in fixed inset-0 z-[70] overflow-y-auto bg-ink/97 backdrop-blur-md" style={{ animationDuration: "0.35s" }} role="dialog" aria-label="Search">
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-6 sm:px-8">
        <div className="flex justify-end">
          <button onClick={closePanel} aria-label="Close search" className="p-2 text-ivory/70 hover:text-ivory">
            <CloseIcon className="h-7 w-7" />
          </button>
        </div>
        <form
          className="mt-6 flex items-center gap-4 border-b border-ivory/30 pb-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (results[0]) {
              navigate(`/product/${results[0].slug}`);
              closePanel();
            }
          }}
        >
          <SearchIcon className="h-7 w-7 shrink-0 text-ivory/60" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the collection"
            className="w-full bg-transparent font-serif text-3xl text-ivory placeholder:text-ivory/30 focus:outline-none sm:text-5xl"
          />
        </form>

        {q.trim() === "" ? (
          <div className="mt-10">
            <p className="eyebrow text-ivory/45">Browse</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {categories.map((c) => (
                <Link key={c.slug} to={`/category/${c.slug}`} onClick={closePanel} className="border border-ivory/25 px-5 py-3 text-[11px] uppercase tracking-[0.24em] text-ivory/80 transition-colors hover:border-ivory hover:bg-ivory hover:text-ink">
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <p className="mt-12 font-serif text-2xl text-ivory/55">Nothing matches “{q}”. Try “bracelet”, “cap” or “black”.</p>
        ) : (
          <ul className="mt-8 divide-y divide-ivory/10">
            {results.map((p) => (
              <li key={p.id}>
                <Link to={`/product/${p.slug}`} onClick={closePanel} className="group flex items-center gap-5 py-4">
                  <ProductImage image={p.images[0]} className="h-20 w-16 shrink-0 bg-coal" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.26em] text-taupe">{p.category}</p>
                    <p className="mt-1 font-serif text-2xl transition-transform group-hover:translate-x-1">{p.name}</p>
                  </div>
                  <span className="text-sm text-ivory/80">{formatPrice(p.price)}</span>
                  <ArrowRight className="hidden h-5 w-5 text-ivory/40 transition-all group-hover:translate-x-1 group-hover:text-ivory sm:block" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Account modal — visual only                                          */
/* ------------------------------------------------------------------ */

export function AccountModal() {
  const { panel, closePanel } = useStore();
  const open = panel === "account";
  const [sent, setSent] = useState(false);
  useEscape(open, closePanel);
  useEffect(() => {
    if (!open) setSent(false);
  }, [open]);
  if (!open) return null;

  return (
    <>
      <Backdrop onClick={closePanel} />
      <div className="fixed inset-0 z-[61] flex items-center justify-center p-4" onClick={closePanel}>
        <div className="anim-pop relative w-full max-w-md bg-ivory p-8 text-ink sm:p-10" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Account">
          <button onClick={closePanel} aria-label="Close" className="absolute right-4 top-4 p-2 text-ink/60 hover:text-ink">
            <CloseIcon className="h-6 w-6" />
          </button>
          <Monogram className="h-10 w-10" />
          <h2 className="mt-6 font-serif text-4xl">Sign in</h2>
          <p className="mt-2 text-sm text-ink/60">Visual demo only — no accounts are created and nothing you type is stored.</p>
          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input type="email" placeholder="Email address" className="w-full border border-ink/25 bg-transparent px-4 py-3.5 text-sm placeholder:text-ink/40 focus:border-ink focus:outline-none" />
            <input type="password" placeholder="Password" className="w-full border border-ink/25 bg-transparent px-4 py-3.5 text-sm placeholder:text-ink/40 focus:border-ink focus:outline-none" />
            <button className="btn btn-dark w-full" type="submit">
              Sign in
            </button>
          </form>
          {sent && (
            <p className="anim-pop mt-4 flex items-start gap-2 text-xs text-ink/70">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" /> Demo concept — sign-in is not connected.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Quick view                                                          */
/* ------------------------------------------------------------------ */

export function QuickView() {
  const { quickView: p, closeQuickView, addToCart } = useStore();
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  useEscape(!!p, closeQuickView);
  useEffect(() => {
    setQty(1);
    setImg(0);
  }, [p?.id]);
  if (!p) return null;

  return (
    <>
      <Backdrop onClick={closeQuickView} />
      <div className="fixed inset-0 z-[61] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6" onClick={closeQuickView}>
        <div className="anim-pop relative grid w-full max-w-5xl bg-ivory text-ink md:grid-cols-2" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={p.name}>
          <button onClick={closeQuickView} aria-label="Close quick view" className="absolute right-3 top-3 z-10 bg-ivory/80 p-2 text-ink/70 backdrop-blur hover:text-ink">
            <CloseIcon className="h-6 w-6" />
          </button>
          <div className="bg-bone">
            <ProductImage image={p.images[img]} className="aspect-[4/5] w-full max-md:aspect-[5/4]" eager />
          </div>
          <div className="flex flex-col p-7 sm:p-10">
            <p className="eyebrow text-taupe">{p.category}</p>
            <h2 className="mt-3 font-serif text-4xl leading-none sm:text-5xl">{p.name}</h2>
            <p className="mt-4 text-lg">{formatPrice(p.price)}</p>
            <p className="mt-5 text-[15px] leading-relaxed text-ink/70">{p.description}</p>

            {p.images.length > 1 && (
              <div className="mt-6 flex gap-2">
                {p.images.map((im, i) => (
                  <button key={i} onClick={() => setImg(i)} aria-label={`Image ${i + 1}`} className={`h-14 w-12 overflow-hidden border ${i === img ? "border-ink" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <ProductImage image={im} className="h-full w-full" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
              <div className="flex items-center border border-ink/25">
                <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3.5 hover:bg-ink/5">
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm">{qty}</span>
                <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="p-3.5 hover:bg-ink/5">
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <button
                className="btn btn-dark flex-1"
                onClick={() => {
                  addToCart(p, qty);
                  closeQuickView();
                }}
              >
                Add to Bag
              </button>
            </div>
            <Link to={`/product/${p.slug}`} onClick={closeQuickView} className="link-underline mt-6 self-start text-[11px] uppercase tracking-[0.24em]">
              View full details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Toast                                                               */
/* ------------------------------------------------------------------ */

export function Toast(): ReactNode {
  const { toast, openPanel } = useStore();
  if (!toast) return null;
  return (
    <div className="anim-pop fixed bottom-6 left-1/2 z-[80] flex max-w-[92vw] -translate-x-1/2 items-center gap-4 bg-ivory px-5 py-3.5 text-ink shadow-2xl" role="status">
      <CheckIcon className="h-4 w-4 shrink-0 text-bronze-dark" />
      <span className="text-[13px]">{toast}</span>
      <button onClick={() => openPanel("cart")} className="ml-2 border-l border-ink/20 pl-4 text-[10px] font-medium uppercase tracking-[0.22em] hover:text-bronze-dark">
        View bag
      </button>
    </div>
  );
}
