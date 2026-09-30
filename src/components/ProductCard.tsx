import { formatPrice, type Product } from "@/data/products";
import { categories } from "@/data/categories";
import { Link } from "@/router";
import { useStore } from "@/store";
import { PlusIcon } from "./Icons";
import { ProductImage } from "./ProductImage";

type Props = {
  product: Product;
  /** "light" = on ivory backgrounds, "dark" = on charcoal backgrounds */
  tone?: "light" | "dark";
};

export function ProductCard({ product, tone = "light" }: Props) {
  const { addToCart, openQuickView } = useStore();
  const catLabel = categories.find((c) => c.slug === product.category)?.label;
  const second = product.images[1];
  const dark = tone === "dark";

  return (
    <article className="group relative">
      <div className={`relative aspect-[4/5] overflow-hidden ${dark ? "bg-coal" : "bg-bone"}`}>
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="absolute inset-0 z-10" />

        {/* primary image */}
        <ProductImage
          image={product.images[0]}
          hoverZoom
          className={`h-full w-full transition-opacity duration-700 ${second ? "group-hover:opacity-0" : ""}`}
        />
        {/* secondary image (detail crop) fades in on hover */}
        {second && (
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
            <ProductImage image={second} hoverZoom className="h-full w-full" />
          </div>
        )}

        {product.badge && (
          <span className="absolute left-3 top-3 z-20 bg-ink/85 px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.24em] text-ivory backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        {/* hover actions */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex translate-y-full gap-px transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 max-md:translate-y-0">
          <button
            onClick={() => openQuickView(product)}
            className="flex-1 bg-ivory/95 py-3.5 text-[10px] font-medium uppercase tracking-[0.24em] text-ink backdrop-blur transition-colors hover:bg-ivory max-md:hidden"
          >
            Quick View
          </button>
          <button
            onClick={() => addToCart(product)}
            aria-label={`Quick add ${product.name}`}
            className="flex items-center justify-center gap-2 bg-ink px-5 py-3.5 text-[10px] font-medium uppercase tracking-[0.24em] text-ivory transition-colors hover:bg-bronze-dark max-md:w-full max-md:bg-ink/85 max-md:py-3 max-md:backdrop-blur"
          >
            <PlusIcon className="h-3.5 w-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={`text-[10px] uppercase tracking-[0.26em] ${dark ? "text-taupe" : "text-taupe"}`}>{catLabel}</p>
          <h3
            className={`mt-1.5 font-serif text-[1.35rem] leading-tight transition-transform duration-500 group-hover:translate-x-1 ${
              dark ? "text-ivory" : "text-ink"
            }`}
          >
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className={`mt-1.5 line-clamp-2 text-[13px] leading-relaxed ${dark ? "text-ivory/55" : "text-ink/55"} transition-colors duration-500 ${dark ? "group-hover:text-ivory/85" : "group-hover:text-ink/85"}`}>
            {product.tagline}
          </p>
        </div>
        <p className={`shrink-0 pt-5 text-sm tracking-wide ${dark ? "text-ivory" : "text-ink"}`}>{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
