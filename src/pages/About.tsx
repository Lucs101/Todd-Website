import { lifestyle } from "@/data/media";
import { categories } from "@/data/categories";
import { Link } from "@/router";
import { ArrowRight } from "@/components/Icons";
import { LogoLockup, Watermark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Newsletter } from "@/components/Newsletter";

const principles = [
  { t: "Personal style", d: "Style isn't a uniform. It's a set of decisions — and these are the ones that show." },
  { t: "Curated, not crowded", d: "A deliberately small selection. Every piece earns its place in the collection." },
  { t: "Everyday essentials", d: "Pieces designed to be worn, carried and used — not kept in a drawer." },
  { t: "Individuality", d: "Understated from a distance. Full of character when you look closer." },
  { t: "Detail", d: "The patch, the stitch, the bead, the cover line. The small things are the point." },
  { t: "Modern masculinity", d: "Confident without the noise. Sophisticated with a little edge." },
];

export default function About() {
  return (
    <main>
      {/* hero */}
      <section className="relative isolate flex min-h-[85svh] items-end overflow-hidden bg-ink text-ivory">
        <img src={lifestyle.aboutProfile} alt="Profile portrait of a man in a black suit on a dark backdrop" className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_25%]" />
        <div className="absolute inset-0 -z-10 bg-ink/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />
        <Watermark variant="monogram" tone="light" className="-right-20 top-20 h-[32rem] w-[32rem] max-md:hidden" />
        <div className="mx-auto w-full max-w-[1560px] px-5 pb-16 pt-40 sm:px-8 sm:pb-24 lg:px-12">
          <p className="eyebrow anim-up text-bronze">About</p>
          <h1 className="display anim-up mt-5 text-[clamp(3.2rem,10.5vw,9.5rem)]" style={{ animationDelay: "0.12s" }}>
            MORE THAN
            <br />
            <span className="italic">THE ESSENTIALS.</span>
          </h1>
        </div>
      </section>

      {/* story */}
      <section className="relative overflow-hidden bg-ivory py-24 text-ink sm:py-32">
        <Watermark variant="monogram" tone="dark" className="-left-28 top-10 h-[36rem] w-[36rem]" />
        <div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-bronze-dark">The idea</p>
            <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.5rem)]">
              A CAREFULLY
              <br />
              <span className="italic">CURATED</span> COLLECTION.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={120}>
            <p className="font-serif text-[1.6rem] leading-[1.45] text-ink/90 sm:text-[2rem]">
              Todd is a collection of men's accessories selected around one belief: personal style lives in the details.
            </p>
            <div className="mt-8 space-y-6 text-[15px] leading-[1.9] text-ink/65">
              <p>
                Not everything has to shout. The pieces here — bracelets, journals, wallets and caps — are chosen because they add something personal to everyday style. A texture. A small graphic. A line of type on a cover.
              </p>
              <p>
                The approach is simple: fewer things, chosen better. Each piece is meant to be worn or carried every day, and to say something about the man using it without saying too much.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* image band */}
      <section className="bg-char py-24 text-ivory sm:py-32">
        <div className="mx-auto grid max-w-[1560px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
          <Reveal className="lg:col-span-5">
            <div className="group relative mx-auto aspect-[3/4] max-w-md overflow-hidden bg-coal">
              <img src={lifestyle.aboutCuffs} alt="Man in a blue suit adjusting his cuffs" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105" />
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-bronze">What guides the edit</p>
            </Reveal>
            <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {principles.map((p, i) => (
                <Reveal key={p.t} delay={(i % 2) * 100}>
                  <div className="border-t border-ivory/20 pt-5">
                    <p className="font-serif text-lg italic text-bronze">0{i + 1}</p>
                    <h3 className="display mt-1 text-3xl">{p.t}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ivory/60">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* closing */}
      <section className="relative overflow-hidden bg-bone py-24 text-ink sm:py-32">
        <Watermark variant="wordmark" tone="dark" className="left-1/2 top-1/2 h-40 w-[90%] -translate-x-1/2 -translate-y-1/2 sm:h-72" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <LogoLockup className="text-ink" />
            <p className="display mt-12 text-[clamp(2.2rem,5vw,4rem)]">
              Carry something <span className="italic">with character.</span>
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {categories.map((c) => (
                <Link key={c.slug} to={`/category/${c.slug}`} className="btn btn-outline-dark">
                  {c.label}
                </Link>
              ))}
            </div>
            <Link to="/shop" className="link-underline mt-10 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.26em]">
              Explore the collection <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
