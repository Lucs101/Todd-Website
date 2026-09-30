import { lifestyle, productPhotos } from "./media";

export type CategorySlug = "bracelets" | "journals" | "wallets" | "caps";

export type Category = {
  slug: CategorySlug;
  label: string; // Display name in nav / filters
  title: string; // Uppercase editorial title
  tagline: string;
  intro: string;
  introTitle: string;
  cardImage: string;
  cardPosition?: string;
  heroImage: string;
  heroPosition?: string;
  lifestyleImage: string;
  lifestylePosition?: string;
  lifestyleCaption: string;
};

export const categories: Category[] = [
  {
    slug: "bracelets",
    label: "Bracelets",
    title: "BRACELETS",
    tagline: "Subtle statements. Everyday edge.",
    introTitle: "Worn close. Noticed anyway.",
    intro:
      "Stone, metal and texture, stacked with intent. These bracelets are designed to sit quietly on the wrist and pick up the light when it matters — worn alone, or layered until they become a signature.",
    cardImage: productPhotos.braceletSlate,
    heroImage: lifestyle.braceletsHero,
    heroPosition: "50% 45%",
    lifestyleImage: lifestyle.braceletsLife,
    lifestylePosition: "50% 40%",
    lifestyleCaption: "Stack them. Mix them. Make it yours.",
  },
  {
    slug: "journals",
    label: "Journals",
    title: "JOURNALS",
    tagline: "For ideas worth keeping.",
    introTitle: "Keep what's worth keeping.",
    intro:
      "A notebook is a private conversation. These journals carry a little attitude on the cover and plenty of room inside — made for the desk, the carry-on, and the thoughts that arrive at inconvenient hours.",
    cardImage: productPhotos.journalBlue,
    heroImage: lifestyle.journalsHero,
    heroPosition: "50% 55%",
    lifestyleImage: lifestyle.journalsLife,
    lifestylePosition: "50% 50%",
    lifestyleCaption: "Dark wood. Strong coffee. A sharp pen.",
  },
  {
    slug: "wallets",
    label: "Wallets",
    title: "WALLETS",
    tagline: "Built around the essentials.",
    introTitle: "Carry less. Carry better.",
    intro:
      "The wallet is the one object that's always with you. Clean lines, a slim profile and nothing you don't need — designed to disappear into a jacket pocket and still feel considered every time it comes out.",
    cardImage: productPhotos.walletBlack,
    heroImage: lifestyle.walletsHero,
    heroPosition: "50% 40%",
    lifestyleImage: lifestyle.walletsLife,
    lifestylePosition: "50% 50%",
    lifestyleCaption: "Made for the inside pocket.",
  },
  {
    slug: "caps",
    label: "Caps",
    title: "CAPS",
    tagline: "Finish the look.",
    introTitle: "The finishing line.",
    intro:
      "A good cap does quiet work. Structured shapes, muted tones and small, deliberate details — the kind of piece that makes a simple outfit feel resolved, and works just as well at the weekend as it does on the road.",
    cardImage: productPhotos.capBlack,
    heroImage: lifestyle.capsHero,
    heroPosition: "50% 35%",
    lifestyleImage: lifestyle.capsLife,
    lifestylePosition: "50% 30%",
    lifestyleCaption: "Understated. Structured. Yours.",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
