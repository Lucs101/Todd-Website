import { useEffect, useMemo, useState } from "react";
import { categories, type CategorySlug } from "@/data/categories";
import { products } from "@/data/products";
import { useRoute } from "@/router";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Watermark } from "@/components/Logo";

type Sort = "featured" | "newest" | "low" | "high";

export default function Shop() {
  const { params } = useRoute();
  const initial = (params.get("cat") as CategorySlug | null) ?? "all";
  const [filter, setFilter] = useState<CategorySlug | "all">(initial);
  const [sort, setSort] = useState<Sort>("featured");

  useEffect(() => {
    setFilter((params.get("cat") as CategorySlug | null) ?? "all");
  }, [params]);

  const list = useMemo(() => {
    let l = filter === "all" ? [...products] : products.filter((p) => p.category === filter);
    switch (sort) {
      case "newest":
        l.sort((a, b) => b.addedAt - a.addedAt);
        break;
      case "low":
        l.sort((a, b) => a.price - b.price);
        break;
      case "high":
        l.sort((a, b) => b.price - a.price);
        break;
      default:
        l.sort((a, b) => Number(b.featured) - Number(a.featured) || b.addedAt - a.addedAt);
    }
    return l;
  }, [filter, sort]);

  const tabs: { key: CategorySlug | "all"; label: string }[] = [{ key: "all", label: "All" }, ...categories.map((c) => ({ key: c.slug, label: c.label }))];

  return (
    <main className="bg-ivory text-ink">
      {/* header */}
      <section className="relative overflow-hidden bg-char pb-16 pt-36 text-ivory sm:pb-24 sm:pt-44">
        <Watermark variant="monogram" tone="light" className="-right-24 -top-16 h-[30rem] w-[30rem]" />
        <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <p className="eyebrow anim-up text-bronze">Shop</p>
          <h1 className="display anim-up mt-5 text-[clamp(3rem,9vw,8rem)]" style={{ animationDelay: "0.12s" }}>
            THE COLLECTION
          </h1>
          <p className="anim-up mt-6 max-w-xl text-[15px] leading-relaxed text-ivory/65" style={{ animationDelay: "0.24s" }}>
            A considered selection of men's accessories chosen for everyday style, character, and individuality.
          </p>
        </div>
      </section>

      {/* toolbar */}
      <div className="sticky top-16 z-30 border-b border-ink/10 bg-ivory/95 backdrop-blur lg:top-[72px]">
        <div className="mx-auto flex max-w-[1560px] flex-col gap-3 px-5 py-4 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0" role="tablist" aria-label="Filter by category">
            {tabs.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={filter === t.key}
                onClick={() => setFilter(t.key)}
                className={`shrink-0 border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors ${
                  filter === t.key ? "border-ink bg-ink text-ivory" : "border-ink/20 text-ink/70 hover:border-ink hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 md:justify-end">
            <p className="text-xs text-ink/50">{list.length} pieces</p>
            <label className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/60">
              Sort
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="cursor-pointer border border-ink/20 bg-transparent py-2.5 pl-3 pr-8 text-xs normal-case tracking-normal text-ink focus:border-ink focus:outline-none">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* grid */}
      <section className="mx-auto max-w-[1560px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.id + filter + sort} delay={(i % 4) * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <p className="mt-20 text-center text-xs text-ink/40">Demo catalog — structured to grow to 60–70+ pieces. Prices are placeholders.</p>
      </section>
    </main>
  );
}
