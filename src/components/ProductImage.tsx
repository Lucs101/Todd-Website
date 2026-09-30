import type { ProductImage as PI } from "@/data/products";

type Props = {
  image: PI;
  className?: string;
  /** Adds a gentle zoom when an ancestor with the `group` class is hovered. */
  hoverZoom?: boolean;
  eager?: boolean;
};

/**
 * Renders a product photo with optional crop (position + zoom),
 * so one source photo can produce several consistent gallery shots.
 */
export function ProductImage({ image, className = "", hoverZoom = false, eager = false }: Props) {
  const pos = image.position ?? "50% 50%";
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="h-full w-full"
        style={{
          transform: image.zoom ? `scale(${image.zoom})` : undefined,
          transformOrigin: pos,
        }}
      >
        <img
          src={image.src}
          alt={image.alt ?? ""}
          loading={eager ? "eager" : "lazy"}
          draggable={false}
          className={`h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            hoverZoom ? "group-hover:scale-[1.06]" : ""
          }`}
          style={{ objectPosition: pos }}
        />
      </div>
    </div>
  );
}
