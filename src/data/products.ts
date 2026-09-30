/**
 * PRODUCT CATALOG
 * ------------------------------------------------------------------
 * This single array drives the homepage, shop, category pages, search,
 * quick view, product detail pages and cart. To add a SKU, add one object.
 * To edit copy or pricing, change it here — nothing else needs touching.
 * Built to scale to 60–70+ products (or be swapped for a CMS / API feed).
 *
 * ALL PRICES AND NAMES BELOW ARE DEMO PLACEHOLDERS — not final retail pricing.
 */
import { productPhotos as ph } from "./media";
import type { CategorySlug } from "./categories";

export type ProductImage = {
  src: string;
  /** CSS object-position, e.g. "50% 20%". Useful for cropping shared photos. */
  position?: string;
  /** Extra crop zoom (1 = none). Used to derive detail shots from one photo. */
  zoom?: number;
  alt?: string;
};

export type Badge = "New" | "Featured" | "Best Seller";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  /** One-line descriptor shown on cards */
  tagline: string;
  /** Longer description for quick view / detail page */
  description: string;
  /** Demo price in USD */
  price: number;
  images: ProductImage[];
  featured: boolean;
  isNew: boolean;
  badge?: Badge;
  /** Bullet points shown under "Details" — keep to facts visible in the photos */
  details: string[];
  /** Ordering helper for "Newest" sort (higher = newer) */
  addedAt: number;
};

export const products: Product[] = [
  /* ------------------------------ CAPS ------------------------------ */
  {
    id: "cap-001",
    slug: "flag-patch-cap-sand",
    name: "Flag Patch Cap — Sand",
    category: "caps",
    tagline: "Structured sand-tone cap with a tonal flag patch.",
    description:
      "A structured, mid-profile cap in a warm sand tone, finished with a small tonal flag patch at the front. Quiet in colour, confident in detail — the easy way to finish a weekend outfit.",
    price: 48,
    images: [
      { src: ph.capTan, alt: "Sand cap with flag patch, front view" },
      { src: ph.capTan, position: "50% 42%", zoom: 2.1, alt: "Flag patch detail" },
    ],
    featured: true,
    isNew: false,
    badge: "Best Seller",
    details: ["Sand colourway", "Structured front panel", "Flag patch at front", "Curved brim"],
    addedAt: 6,
  },
  {
    id: "cap-002",
    slug: "crown-cap-black",
    name: "Crown Cap — Black",
    category: "caps",
    tagline: "All-black cap with a hand-drawn crown patch.",
    description:
      "Black on black with a single, slightly irregular crown drawn in copper tones. A cap with some edge — understated from a distance, all character up close.",
    price: 52,
    images: [
      { src: ph.capBlack, alt: "Black cap with crown patch, front view" },
      { src: ph.capBlack, position: "50% 42%", zoom: 2.1, alt: "Crown patch detail" },
    ],
    featured: true,
    isNew: false,
    badge: "Featured",
    details: ["Black colourway", "Hand-drawn crown patch", "Structured front panel", "Curved brim"],
    addedAt: 7,
  },
  {
    id: "cap-003",
    slug: "crown-cap-navy",
    name: "Crown Cap — Navy",
    category: "caps",
    tagline: "Deep navy with a bold outlined crown.",
    description:
      "The crown in a sharper outline on deep navy. Pairs naturally with dark denim, grey knitwear and a good jacket.",
    price: 52,
    images: [
      { src: ph.capNavyJournal, position: "60% 20%", zoom: 1.35, alt: "Navy crown cap" },
      { src: ph.capNavyJournal, alt: "Navy crown cap styled with a journal" },
    ],
    featured: false,
    isNew: true,
    badge: "New",
    details: ["Navy colourway", "Outlined crown graphic", "Structured front panel", "Curved brim"],
    addedAt: 9,
  },

  /* ---------------------------- JOURNALS ---------------------------- */
  {
    id: "jrn-001",
    slug: "fear-is-a-liar-journal",
    name: "Fear Is a Liar Journal",
    category: "journals",
    tagline: "Deep blue cover. Four lines that say enough.",
    description:
      "A slim, deep-blue journal with a single stacked phrase on the cover. A reminder to keep close, and a place to put everything it inspires.",
    price: 42,
    images: [
      { src: ph.journalBlue, alt: "Blue journal with cover text" },
      { src: ph.journalBlue, position: "50% 52%", zoom: 1.9, alt: "Cover typography detail" },
    ],
    featured: true,
    isNew: false,
    badge: "Best Seller",
    details: ["Blue cover", "Slim, portable format", "Minimal cover typography"],
    addedAt: 5,
  },
  {
    id: "jrn-002",
    slug: "curate-the-mayhem-journal",
    name: "Curate the Mayhem Journal",
    category: "journals",
    tagline: "Stone-grey cover with an attitude.",
    description:
      "Stone-grey with small lowercase type and a slightly irreverent message. For lists, plans, sketches and whatever else needs organising.",
    price: 48,
    images: [
      { src: ph.capNavyJournal, position: "30% 82%", zoom: 1.45, alt: "Grey journal with cover text" },
      { src: ph.capNavyJournal, alt: "Journal styled with a navy cap" },
    ],
    featured: true,
    isNew: true,
    badge: "New",
    details: ["Grey cover", "Hardcover format", "Minimal cover typography"],
    addedAt: 10,
  },
  {
    id: "jrn-003",
    slug: "cognac-notebook",
    name: "Cognac Notebook",
    category: "journals",
    tagline: "Warm cognac tone with an elastic closure.",
    description:
      "A warm cognac-toned notebook with an elastic closure to keep everything in place. A natural companion for the desk, the bag and the long flight.",
    price: 58,
    images: [
      { src: ph.journalCognac, alt: "Cognac notebook with elastic closure" },
      { src: ph.journalCognac, position: "60% 40%", zoom: 1.8, alt: "Notebook detail" },
    ],
    featured: false,
    isNew: false,
    details: ["Cognac colourway", "Elastic closure", "Hardcover format"],
    addedAt: 3,
  },

  /* ---------------------------- BRACELETS --------------------------- */
  {
    id: "brc-001",
    slug: "obsidian-bronze-stack",
    name: "Obsidian & Bronze Stack",
    category: "bracelets",
    tagline: "Polished metal-tone beads with warm bronze accents.",
    description:
      "Designed for everyday wear, this understated stack balances polished silver-grey beads with darker bronze tones and small metal accents. A versatile piece that works alone or layered with your everyday essentials.",
    price: 68,
    images: [
      { src: ph.braceletObsidian, alt: "Obsidian and bronze bracelet stack" },
      { src: ph.braceletObsidian, position: "45% 50%", zoom: 1.9, alt: "Bead detail" },
    ],
    featured: true,
    isNew: true,
    badge: "New",
    details: ["Stackable bead bracelets", "Silver-grey and bronze-tone beads", "Metal bar accents", "Stretch fit"],
    addedAt: 11,
  },
  {
    id: "brc-002",
    slug: "slate-cross-stack",
    name: "Slate Cross Stack",
    category: "bracelets",
    tagline: "Grey stone beads with a single black cross.",
    description:
      "Matte grey stone beads and glossy black accents, anchored by a small cross charm. Quiet texture with a subtle edge — made to be layered.",
    price: 75,
    images: [
      { src: ph.braceletSlate, alt: "Slate cross bracelet stack" },
      { src: ph.braceletSlate, position: "62% 45%", zoom: 2, alt: "Cross charm detail" },
    ],
    featured: true,
    isNew: false,
    badge: "Featured",
    details: ["Grey stone and black beads", "Cross charm", "Stackable", "Stretch fit"],
    addedAt: 8,
  },
  {
    id: "brc-003",
    slug: "tigers-eye-hematite-stack",
    name: "Tiger's Eye Stack",
    category: "bracelets",
    tagline: "Warm brown flecks against cool metal-tone beads.",
    description:
      "Cool metal-tone beads set against warm brown tones, with black bar accents to finish. Layer with a watch or wear on its own.",
    price: 62,
    images: [
      { src: ph.braceletTiger, alt: "Tiger's eye bracelet stack on suede" },
      { src: ph.braceletTiger, position: "45% 50%", zoom: 1.8, alt: "Bead detail" },
    ],
    featured: false,
    isNew: false,
    details: ["Silver-grey and brown-tone beads", "Black bar accents", "Stackable", "Stretch fit"],
    addedAt: 4,
  },

  /* ----------------------------- WALLETS ---------------------------- */
  {
    id: "wlt-001",
    slug: "slim-bifold-black",
    name: "Slim Bifold — Black",
    category: "wallets",
    tagline: "Clean, low-profile bifold in black.",
    description:
      "A slim bifold in black with understated stitching and room for the essentials. Built to sit flat in a jacket pocket and look right every time it comes out.",
    price: 89,
    images: [
      { src: ph.walletBlack, alt: "Black bifold wallet" },
      { src: ph.walletBlack, position: "50% 45%", zoom: 1.8, alt: "Wallet stitching detail" },
    ],
    featured: true,
    isNew: false,
    badge: "Featured",
    details: ["Black colourway", "Bifold format", "Card slots", "Slim profile"],
    addedAt: 2,
  },
  {
    id: "wlt-002",
    slug: "card-holder-espresso",
    name: "Card Holder — Espresso",
    category: "wallets",
    tagline: "Minimal card holder in deep espresso brown.",
    description:
      "For the man who carries less. A minimal card holder in deep espresso brown — enough for the cards you actually use and nothing you don't.",
    price: 64,
    images: [
      { src: ph.walletBrown, alt: "Espresso brown card holder" },
      { src: ph.walletBrown, position: "50% 45%", zoom: 1.8, alt: "Card holder detail" },
    ],
    featured: true,
    isNew: true,
    badge: "New",
    details: ["Espresso colourway", "Card holder format", "Minimal profile"],
    addedAt: 12,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (cat: CategorySlug) => products.filter((p) => p.category === cat);
export const featuredProducts = () => products.filter((p) => p.featured);

export const formatPrice = (n: number) => `$${n.toFixed(0)}`;
