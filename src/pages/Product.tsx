import { useEffect, useState } from "react";
import { getCategory } from "@/data/categories";
import { formatPrice, getProduct, products } from "@/data/products";
import { Link } from "@/router";
import { useStore } from "@/store";
import { ArrowLeft, CheckIcon, MinusIcon, PlusIcon } from "@/components/Icons";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";
import { Watermark } from "@/components/Logo";
import NotFound from "./NotFound";

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ink/15">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left text-[11px] font-medium uppercase tracking-[0.24em]" aria-expanded={open}>
        {title}
        {open ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
      </button>
      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden text-[14px] leading-[1.8] text-ink/65">{children}</div>
      </div>
    </div>
  );
}

export default function Product({ slug }: { slug: string }) {
  const p = getProduct(slug);
  const { addToCart, openPanel } = useStore();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setImg(0);
    setQty(1);
    setAdded(false);
  }, [slug]);

  if (!p) return <NotFound />;
  const cat = getCategory(p.category)!;

  const related = [
    ...products.filter((x) => x.category === p.category && x.id !== p.id),
    ...products.filter((x) => x.category !== p.category && x.featured),
  ].slice(0, 4);

  return (
    <main className="bg-ivory pt-16 text-ink lg:pt-[72px]">
      <div className="relative overflow-hidden">
        <Watermark variant="monogram" tone="dark" className="-right-32 top-10 h-[38rem] w-[38rem]" />
        <div className="relative mx-auto max-w-[1560px] px-5 pb-20 pt-8 sm:px-8 lg:px-12 lg:pb-28">
          {/* breadcrumb */}
          <nav className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-ink/50" aria-label="Breadcrumb">
            <Link to="/shop" className="flex items-center gap-2 hover:text-ink">
              <ArrowLeft className="h-3.5 w-3.5" /> Shop
            </Link>
            <span>/</span>
            <Link to={`/category/${cat.slug}`} className="hover:text-ink">
              {cat.label}
            </Link>
            <span>/</span>
            <span className="text-ink">{p.name}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* gallery */}
            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-[84px_1fr]">
                <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
                  {p.images.map((im, i) => (
                    <button key={i} onClick={() => setImg(i)} aria-label={`Show image ${i + 1}`} className={`aspect-[4/5] w-20 overflow-hidden border bg-bone transition-all sm:w-full ${i === img ? "border-ink" : "border-transparent opacity-60 hover:opacity-100"}`}>
                      <ProductImage image={im} className="h-full w-full" />
                    </button>
                  ))}
                </div>
                <div className="relative order-1 aspect-[4/5] overflow-hidden bg-bone sm:order-2">
                  <ProductImage key={img} image={p.images[img]} className="anim-in h-full w-full" eager />
                  {p.badge && <span className="absolute left-4 top-4 bg-ink/85 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-ivory">{p.badge}</span>}
                </div>
              </div>
            </div>

            {/* info */}
            <div className="lg:col-span-5 lg:pt-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow text-bronze-dark">{cat.label}</p>
                <h1 className="display mt-4 text-[clamp(2.6rem,4.5vw,4.25rem)]">{p.name}</h1>
                <p className="mt-5 text-2xl">
                  {formatPrice(p.price)} <span className="ml-2 text-[10px] uppercase tracking-[0.22em] text-ink/40">Demo price</span>
                </p>
                <p className="mt-7 text-[15px] leading-[1.85] text-ink/70">{p.description}</p>

                <div className="mt-9 flex flex-wrap items-stretch gap-3">
                  <div className="flex items-center border border-ink/25" aria-label="Quantity">
                    <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-4 hover:bg-ink/5">
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm">{qty}</span>
                    <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="px-4 py-4 hover:bg-ink/5">
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    className="btn btn-dark min-w-[200px] flex-1"
                    onClick={() => {
                      addToCart(p, qty);
                      setAdded(true);
                      setTimeout(() => setAdded(false), 1800);
                    }}
                  >
                    {added ? (
                      <>
                        <CheckIcon className="h-4 w-4" /> Added
                      </>
                    ) : (
                      "Add to Bag"
                    )}
                  </button>
                </div>
                <button onClick={() => openPanel("cart")} className="link-underline mt-5 text-[11px] uppercase tracking-[0.24em] text-ink/60 hover:text-ink">
                  View bag
                </button>

                <div className="mt-10 border-t border-ink/15">
                  <Accordion title="Details" defaultOpen>
                    <ul className="space-y-2">
                      {p.details.map((d) => (
                        <li key={d} className="flex gap-3">
                          <span className="mt-[0.7em] h-px w-4 shrink-0 bg-bronze-dark" />
                          {d}
                        </li>
                      ))}
                      <li className="flex gap-3 text-ink/45">
                        <span className="mt-[0.7em] h-px w-4 shrink-0 bg-ink/30" />
                        Materials & dimensions: to be confirmed.
                      </li>
                    </ul>
                  </Accordion>
                  <Accordion title="Shipping & Returns">
                    <p>Placeholder copy. Shipping options, delivery times and return terms will be added once the store's policies are confirmed.</p>
                  </Accordion>
                  <Accordion title="About this demo">
                    <p>This is a design concept. Product details, pricing and imagery are placeholders, and no orders can be placed.</p>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* related */}
      <section className="bg-bone py-20 sm:py-28">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 className="display text-[clamp(2.4rem,5vw,4.25rem)]">
              COMPLETE <span className="italic">THE LOOK</span>
            </h2>
            <Link to="/shop" className="link-underline hidden text-[11px] font-medium uppercase tracking-[0.26em] sm:inline-block">
              Shop all
            </Link>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((r, i) => (
              <Reveal key={r.id} delay={i * 70}>
                <ProductCard product={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
