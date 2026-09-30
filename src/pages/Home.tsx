import { useRef, useState } from "react";
import { categories } from "@/data/categories";
import { featuredProducts, getProduct } from "@/data/products";
import { heroVideo, lifestyle } from "@/data/media";
import { Link } from "@/router";
import { ArrowRight, PauseIcon, PlayIcon } from "@/components/Icons";
import { LogoLockup, Watermark } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";
import { Newsletter } from "@/components/Newsletter";

/* ------------------------------ HERO ------------------------------ */
function Hero() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink text-ivory">
      {/* video */}
      <video
        ref={ref}
        className="anim-slowzoom absolute inset-0 -z-20 h-full w-full object-cover object-[60%_50%] sm:object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={heroVideo.poster}
        aria-hidden="true"
      >
        {heroVideo.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>

      {/* overlays: readable type + cinematic vignette */}
      <div className="absolute inset-0 -z-10 bg-ink/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-transparent to-ink" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(13,12,11,0.65)_100%)]" />
      <Watermark variant="monogram" tone="light" className="-right-24 top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 max-lg:hidden" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-28 pt-32 text-center">
        <div className="anim-up" style={{ animationDelay: "0.2s" }}>
          <LogoLockup />
        </div>

        <h1 className="display mt-10 text-[clamp(2.6rem,9.2vw,7.25rem)] anim-up" style={{ animationDelay: "0.5s" }}>
          CURATED ESSENTIALS.
          <br />
          <span className="italic text-ivory/90">DEFINED BY DETAIL.</span>
        </h1>

        <p className="anim-up mt-7 max-w-xl text-[15px] leading-relaxed text-ivory/75 sm:text-base" style={{ animationDelay: "0.8s" }}>
          Thoughtfully selected men's accessories for those who believe the details make the difference.
        </p>

        <div className="anim-up mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4" style={{ animationDelay: "1.05s" }}>
          <Link to="/shop" className="btn btn-solid">
            Explore the Collection
          </Link>
          <Link to="/about" className="btn btn-ghost">
            Discover the Brand
          </Link>
        </div>
      </div>

      {/* bottom bar */}
      <div className="anim-in absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-6 sm:px-8 lg:px-12" style={{ animationDelay: "1.6s" }}>
        <p className="eyebrow hidden text-[10px] text-ivory/50 sm:block">Demo Concept — 2026</p>
        <div className="flex flex-col items-center gap-3 max-sm:mx-auto">
          <span className="eyebrow text-[10px] text-ivory/60">Scroll</span>
          <span className="block h-10 w-px overflow-hidden bg-ivory/20">
            <span className="anim-scrollline block h-full w-full bg-ivory" />
          </span>
        </div>
        <button onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"} className="flex h-10 w-10 items-center justify-center border border-ivory/30 text-ivory/80 transition-colors hover:bg-ivory hover:text-ink max-sm:absolute max-sm:bottom-6 max-sm:right-5">
          {playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
        </button>
      </div>
    </section>
  );
}

/* ----------------------------- MARQUEE ---------------------------- */
function Marquee() {
  const words = ["Curated", "Personal", "Defined by detail", "Sophisticated", "Some edge", "Everyday essentials", "Considered"];
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-ivory/10 bg-ink py-5 text-ivory" aria-hidden="true">
      <div className="anim-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={i} className="flex items-center">
                <span className="px-8 font-serif text-2xl italic text-ivory/70 sm:text-3xl">{w}</span>
                <span className="text-bronze">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ INTRO ----------------------------- */
function Intro() {
  return (
    <section className="relative overflow-hidden bg-ivory py-24 text-ink sm:py-32 lg:py-40">
      <Watermark variant="monogram" tone="dark" className="-left-32 top-10 h-[40rem] w-[40rem]" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-6 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow text-bronze-dark">The Brand</p>
            <h2 className="display mt-6 text-[clamp(2.8rem,6.4vw,5.75rem)]">
              ACCESSORIES
              <br />
              WITH <span className="italic">CHARACTER.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-10 max-w-lg font-serif text-[1.65rem] italic leading-snug text-ink/85 sm:text-[1.9rem]">
              “Not just something you wear. Something that becomes part of how you carry yourself.”
            </p>
            <p className="mt-8 max-w-lg text-[15px] leading-[1.85] text-ink/65">
              Todd is a curated collection built around pieces that add personality to everyday style. Bracelets, journals, wallets and caps — chosen one by one, for men who care about the details and aren't interested in looking like everyone else.
            </p>
            <Link to="/about" className="link-underline mt-10 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.26em]">
              Discover the brand <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6" delay={150}>
          <div className="relative mx-auto max-w-[520px] lg:ml-auto">
            <div className="absolute -bottom-5 -left-5 h-full w-full border border-ink/20 max-sm:hidden" />
            <div className="group relative aspect-[4/5] overflow-hidden bg-coal">
              <img src={lifestyle.introPortrait} alt="Man in a dark tailored jacket against a black backdrop" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- CATEGORIES --------------------------- */
function Categories() {
  return (
    <section className="bg-char py-24 text-ivory sm:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-bronze">Shop by category</p>
            <h2 className="display mt-5 text-[clamp(2.8rem,6vw,5.5rem)]">
              FOUR WAYS TO <span className="italic">DEFINE IT.</span>
            </h2>
          </div>
          <Link to="/shop" className="link-underline self-start text-[11px] font-medium uppercase tracking-[0.26em] md:self-auto">
            View the full collection
          </Link>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90}>
              <Link to={`/category/${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden bg-coal sm:aspect-[3/4] lg:aspect-[3/4.4]">
                <img
                  src={c.cardImage}
                  alt={`${c.label} collection`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                  style={{ objectPosition: c.cardPosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/5 transition-opacity duration-500 group-hover:from-ink/95" />
                <span className="absolute left-5 top-5 font-serif text-lg italic text-ivory/70">0{i + 1}</span>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <h3 className="display text-[2.4rem] sm:text-[2.6rem]">{c.title}</h3>
                  <p className="mt-2 font-serif text-xl italic text-ivory/80">{c.tagline}</p>
                  <span className="mt-6 flex items-center gap-3 border-t border-ivory/25 pt-4 text-[10px] font-medium uppercase tracking-[0.26em] transition-colors group-hover:text-bronze">
                    Explore category
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- THE EDIT ---------------------------- */
function TheEdit() {
  const items = featuredProducts().slice(0, 8);
  return (
    <section className="relative overflow-hidden bg-ivory py-24 text-ink sm:py-32">
      <Watermark variant="monogram" tone="dark" className="-right-40 top-24 h-[44rem] w-[44rem]" />
      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-bronze-dark">Selected pieces</p>
            <h2 className="display mt-5 text-[clamp(3rem,7vw,6.5rem)]">THE EDIT</h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink/60">
            A tight selection of pieces we'd keep for ourselves. Everyday essentials, considered differently.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center">
          <Link to="/shop" className="btn btn-outline-dark">
            Shop all <ArrowRight className="arrow h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------- BRACELET SPOTLIGHT ----------------------- */
function Spotlight() {
  const p = getProduct("obsidian-bronze-stack")!;
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <div className="grid lg:grid-cols-2">
        <Reveal className="relative aspect-square lg:aspect-auto lg:min-h-[720px]">
          <Link to={`/product/${p.slug}`} className="group absolute inset-0 block overflow-hidden">
            <ProductImage image={p.images[0]} hoverZoom className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/40 max-lg:hidden" />
          </Link>
        </Reveal>
        <div className="relative flex items-center px-6 py-20 sm:px-12 lg:px-20 lg:py-28">
          <Watermark variant="monogram" tone="light" className="-right-16 -top-10 h-[26rem] w-[26rem]" />
          <Reveal className="relative max-w-md">
            <p className="eyebrow text-bronze">Spotlight — Bracelets</p>
            <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.5rem)]">
              WORN CLOSE.
              <br />
              <span className="italic">NOTICED ANYWAY.</span>
            </h2>
            <p className="mt-8 text-[15px] leading-[1.85] text-ivory/65">
              Stone, metal and texture, stacked with intent. The {p.name} sits quietly on the wrist and catches the light when it matters.
            </p>
            <div className="mt-10 flex items-center gap-8">
              <Link to={`/product/${p.slug}`} className="btn btn-solid">
                View piece
              </Link>
              <Link to="/category/bracelets" className="link-underline text-[11px] font-medium uppercase tracking-[0.26em]">
                All bracelets
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- EDITORIAL --------------------------- */
function Editorial() {
  return (
    <section className="relative overflow-hidden bg-bone py-24 text-ink sm:py-32">
      <div className="mx-auto grid max-w-[1560px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <Reveal className="lg:col-span-7">
          <div className="group relative aspect-[4/3] overflow-hidden bg-coal sm:aspect-[16/11]">
            <img src={lifestyle.editorialWrist} alt="Close-up of a man in a black suit adjusting his wrist" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
            <p className="absolute bottom-5 left-5 eyebrow text-[10px] text-ivory/80">Editorial — The Details</p>
          </div>
        </Reveal>
        <div className="relative lg:col-span-5">
          <Watermark variant="monogram" tone="dark" className="-right-16 -top-28 h-[24rem] w-[24rem]" />
          <Reveal className="relative">
            <p className="eyebrow text-bronze-dark">The Journal</p>
            <h2 className="display mt-6 text-[clamp(2.8rem,5.6vw,5.25rem)]">
              THE DETAILS
              <br />
              <span className="italic">MATTER</span>
            </h2>
            <p className="mt-9 font-serif text-[1.45rem] leading-[1.45] text-ink/85 sm:text-[1.6rem]">
              Personal style is rarely about one statement piece. It is built through the small details — the bracelet on your wrist, the wallet in your pocket, the journal in your bag, the cap that finishes the look.
            </p>
            <Link to="/shop" className="btn btn-dark mt-10">
              Explore the edit <ArrowRight className="arrow h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ PAGE ------------------------------ */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <Categories />
      <TheEdit />
      <Spotlight />
      <Editorial />
      <Newsletter />
    </>
  );
}
