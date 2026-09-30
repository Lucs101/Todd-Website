import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { Link } from "@/router";
import { ArrowRight } from "@/components/Icons";
import { Watermark } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Newsletter } from "@/components/Newsletter";
import NotFound from "./NotFound";

export default function Category({ slug }: { slug: string }) {
  const cat = getCategory(slug);
  if (!cat) return <NotFound />;

  const items = getProductsByCategory(cat.slug);
  const featured = items.filter((p) => p.featured);
  const others = categories.filter((c) => c.slug !== cat.slug);

  return (
    <main>
      {/* category hero */}
      <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-ink text-ivory">
        <img
          src={cat.heroImage}
          alt={`${cat.label} lifestyle`}
          className="anim-slowzoom absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ objectPosition: cat.heroPosition }}
        />
        <div className="absolute inset-0 -z-10 bg-ink/50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/20 to-ink/60" />
        <Watermark variant="monogram" tone="light" className="-right-20 top-16 h-[30rem] w-[30rem] max-md:hidden" />
        <div className="mx-auto w-full max-w-[1560px] px-5 pb-16 pt-40 sm:px-8 sm:pb-20 lg:px-12">
          <p className="eyebrow anim-up text-bronze">Category</p>
          <h1 className="display anim-up mt-5 text-[clamp(3.6rem,13vw,11rem)]" style={{ animationDelay: "0.12s" }}>
            {cat.title}
          </h1>
          <p className="anim-up mt-4 font-serif text-2xl italic text-ivory/85 sm:text-4xl" style={{ animationDelay: "0.25s" }}>
            {cat.tagline}
          </p>
        </div>
      </section>

      {/* intro + lifestyle */}
      <section className="relative overflow-hidden bg-ivory py-24 text-ink sm:py-32">
        <Watermark variant="monogram" tone="dark" className="-left-28 top-6 h-[34rem] w-[34rem]" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-6 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-bronze-dark">The {cat.label} edit</p>
            <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.5rem)]">{cat.introTitle}</h2>
            <p className="mt-8 text-[15px] leading-[1.9] text-ink/65">{cat.intro}</p>
            <a href="#grid" onClick={(e) => { e.preventDefault(); document.getElementById("grid")?.scrollIntoView({ behavior: "smooth" }); }} className="link-underline mt-9 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.26em]">
              Shop {cat.label.toLowerCase()} <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={120}>
            <div className="group relative aspect-[4/3] overflow-hidden bg-coal">
              <img src={cat.lifestyleImage} alt={cat.lifestyleCaption} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105" style={{ objectPosition: cat.lifestylePosition }} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
              <p className="absolute bottom-5 left-6 font-serif text-2xl italic text-ivory">{cat.lifestyleCaption}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* featured in category */}
      {featured.length > 0 && (
        <section className="bg-char py-20 text-ivory sm:py-28">
          <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <p className="eyebrow text-bronze">Featured</p>
              <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4.25rem)]">
                LEADING THE <span className="italic">{cat.label.toUpperCase()}</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
              {featured.slice(0, 4).map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <ProductCard product={p} tone="dark" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* full grid */}
      <section id="grid" className="scroll-mt-20 bg-ivory py-20 text-ink sm:py-28">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <Reveal className="flex items-end justify-between gap-6 border-b border-ink/15 pb-6">
            <h2 className="display text-[clamp(2.2rem,4.5vw,3.75rem)]">All {cat.label}</h2>
            <p className="text-xs text-ink/50">{items.length} pieces</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4">
            {items.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* other categories */}
      <section className="bg-bone py-16 text-ink">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <p className="eyebrow text-taupe">Continue exploring</p>
          <div className="mt-6 grid gap-px bg-ink/15 sm:grid-cols-3">
            {others.map((c) => (
              <Link key={c.slug} to={`/category/${c.slug}`} className="group flex items-center justify-between bg-bone px-6 py-8 transition-colors hover:bg-ink hover:text-ivory">
                <div>
                  <p className="display text-4xl">{c.title}</p>
                  <p className="mt-1 font-serif text-lg italic opacity-60">{c.tagline}</p>
                </div>
                <ArrowRight className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-2" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
