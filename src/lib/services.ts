// ─────────────────────────────────────────────────────────────────────────
//  SERVICE CATALOG  ← edit this file to change which services a client offers
//  ─────────────────────────────────────────────────────────────────────────
//  One entry per service. Everything else is generated from this list:
//    • homepage services grid        • header dropdown (desktop + mobile)
//    • footer service links          • /services overview
//    • /services/<slug> pages        • sitemap.xml and structured data
//
//  Services are grouped into the three brand categories: Clean It, Fix It, Clear It.
//  • `category` decides the group and which phone number the page shows
//    (Clean It → cleaning line, Fix It / Clear It → handyman & property line).
//  • `formOption` must match one of the Service Needed options in estimate-form.tsx.
//  • `image: ""` shows a branded icon panel instead of a photo. Only use a client photo when
//    it reasonably fits the service (no stock photos). Move-In/Out and Decluttering have no
//    suitable client photo yet, so they keep the icon panel.
//  • Disabled services disappear everywhere and their URL returns a real 404.
// ─────────────────────────────────────────────────────────────────────────

import { IMG } from "./images";

export type ServiceCategory = "clean" | "fix" | "clear";
export type ServiceIcon =
  | "sparkles"
  | "repeat"
  | "calendar"
  | "truck"
  | "home"
  | "layers"
  | "wrench"
  | "plug"
  | "hammer"
  | "trash"
  | "package";

export const CATEGORIES: {
  id: ServiceCategory;
  label: string;
  title: string;
  blurb: string;
}[] = [
  {
    id: "clean",
    label: "Clean It",
    title: "Professional Residential Cleaning",
    blurb: "From weekly upkeep to deep cleans and move-outs.",
  },
  {
    id: "fix",
    label: "Fix It",
    title: "Handyman & Minor Repairs",
    blurb: "Everyday repairs, installations, and assembly around the house.",
  },
  {
    id: "clear",
    label: "Clear It",
    title: "Junk Removal & Property Cleanouts",
    blurb: "Hauling, cleanouts, and estate help so you can get your space back.",
  },
];

export type Service = {
  /** URL segment: the page lives at /services/<slug>. Lowercase letters, numbers and hyphens only. */
  slug: string;
  /** Set false to hide the service everywhere without deleting its content. */
  enabled: boolean;
  /** Marks a flagship service (listed first in related services + SEO copy). */
  priority: boolean;
  category: ServiceCategory;
  icon: ServiceIcon;
  /** Option in the "Service Needed" dropdown that this service preselects. */
  formOption: string;
  title: string;
  short: string;
  card: string;
  /** Card / page photo. "" = branded icon panel. */
  image: string;
  imageAlt: string;
  /** Hero background photo. "" = plain branded hero. */
  heroImage: string;
  heroAlt: string;
  eyebrow: string;
  tagline: string;
  intro: string;
  overview: string;
  tasks: string[];
  benefits: string[];
  faqs: { q: string; a: string }[];
  /** Optional custom <title> for the service page (otherwise "<title> | <business name>"). */
  seoTitle?: string;
  /** Optional custom meta description for the service page. */
  seoDescription?: string;
};

const allServices: Service[] = [
  // ── CLEAN IT ──────────────────────────────────────────────────────────
  {
    slug: "recurring-cleaning",
    enabled: true,
    priority: true,
    category: "clean",
    icon: "repeat",
    formOption: "Recurring Cleaning",
    title: "Recurring Residential Cleaning",
    short: "Weekly, biweekly, or monthly cleaning so your home stays fresh.",
    card: "Weekly, biweekly, or monthly visits that keep your home comfortably clean without the effort.",
    image: IMG.clientKitchenIsland,
    imageAlt: "Clean kitchen with island and hardwood floors",
    heroImage: IMG.clientKitchenIsland,
    heroAlt: "Clean kitchen with island, dark counters and hardwood floors",
    eyebrow: "Clean It",
    tagline: "A fresher home, every visit.",
    intro:
      "Spend less time worrying about cleaning with a weekly, biweekly, or monthly plan that keeps your home comfortably maintained.",
    overview:
      "Recurring cleaning brings consistency to your home. With regular visits, your space stays on top of things instead of catching up, and you get your time back. Cleaning includes general dusting, kitchen, bathroom, and floor cleaning. Carpet cleaning is not included.",
    tasks: [
      "Weekly, biweekly, or monthly visits",
      "General dusting throughout the home",
      "Kitchen cleaning",
      "Bathroom cleaning",
      "Floor cleaning",
      "Priorities tailored to the rooms you use most",
    ],
    benefits: [
      "A consistently clean home without the effort",
      "Predictable scheduling",
      "Detail-focused care, visit after visit",
    ],
    faqs: [
      {
        q: "How often can I schedule cleaning?",
        a: "Recurring cleaning is available weekly, biweekly, or monthly. Contact us and we'll help you choose the schedule that fits your home.",
      },
      {
        q: "Is carpet cleaning included?",
        a: "No. Our cleaning covers general dusting, kitchen, bathroom, and floor cleaning. Carpet cleaning is not included.",
      },
    ],
  },
  {
    slug: "deep-cleaning",
    enabled: true,
    priority: false,
    category: "clean",
    icon: "sparkles",
    formOption: "Deep Cleaning",
    title: "Deep Cleaning",
    short: "A more detailed clean for homes that need extra attention.",
    card: "A more detailed clean for homes that need additional time, attention, and care.",
    image: IMG.clientPrimaryBath,
    imageAlt: "Clean primary bathroom with soaking tub",
    heroImage: IMG.clientPrimaryBath,
    heroAlt: "Clean primary bathroom with soaking tub and tile floor",
    eyebrow: "Clean It",
    tagline: "Down to the last detail.",
    intro:
      "When your home needs more than routine upkeep, a deep clean gives overlooked areas the attention they deserve.",
    overview:
      "Deep cleaning is a more detailed clean for homes that require additional attention, such as seasonal refreshes or homes that haven't been cleaned in a while. Final pricing depends on property size, condition, and current upkeep. Carpet cleaning is not included.",
    tasks: [
      "More detailed kitchen and bathroom cleaning",
      "Extra attention to the little nooks and crannies",
      "Thorough dusting throughout",
      "Detailed floor cleaning",
      "Great for seasonal refreshes",
      "Good for homes that need to catch up",
    ],
    benefits: [
      "Reaches the spots routine cleaning can miss",
      "A thorough reset for your whole home",
      "Noticeable, lasting freshness",
    ],
    faqs: [
      {
        q: "How is deep cleaning different from a standard clean?",
        a: "A deep clean is more detailed and takes more time, which makes it a good fit for homes needing additional attention. Starting prices for each home size are on our pricing page.",
      },
      {
        q: "What affects the price?",
        a: "Property size, condition, current upkeep, and specific cleaning needs. Request an exact quote and we'll confirm.",
      },
    ],
  },
  {
    slug: "one-time-cleaning",
    enabled: true,
    priority: false,
    category: "clean",
    icon: "calendar",
    formOption: "Residential Cleaning",
    title: "One-Time & Routine Cleaning",
    short: "One-time appointments plus routine maintenance cleaning.",
    card: "One-time cleaning appointments, routine residential cleaning, and maintenance cleaning for homeowners.",
    image: IMG.clientDiningRoom,
    imageAlt: "Clean breakfast room with round table and hardwood floors",
    heroImage: IMG.clientDiningRoom,
    heroAlt: "Clean breakfast room with round table and hardwood floors",
    eyebrow: "Clean It",
    tagline: "Clean on your schedule.",
    intro:
      "Need a clean without a long-term commitment? Book a one-time appointment for your home, or routine maintenance cleaning when you need it.",
    overview:
      "One-time cleaning is a simple way to get your home refreshed before guests arrive, after a busy stretch, or any time you want help. Cleaning includes general dusting, kitchen, bathroom, and floor cleaning. Carpet cleaning is not included.",
    tasks: [
      "One-time cleaning appointments",
      "Routine residential cleaning",
      "Maintenance cleaning",
      "General dusting",
      "Kitchen and bathroom cleaning",
      "Floor cleaning",
    ],
    benefits: [
      "No long-term commitment required",
      "A fresh home when you need it",
      "Friendly, thorough service",
    ],
    faqs: [
      {
        q: "Can I book a single cleaning?",
        a: "Yes. One-time cleaning appointments are available for homeowners. Contact us to talk through your home and timing.",
      },
      {
        q: "How much does a standard cleaning cost?",
        a: "Standard cleaning starts at $200+ for a 2 bed / 1 bath home. See the pricing page for each home size; final pricing depends on your home's size and condition.",
      },
    ],
  },
  {
    slug: "move-in-move-out-cleaning",
    enabled: true,
    priority: false,
    category: "clean",
    icon: "truck",
    formOption: "Move-In / Move-Out Cleaning",
    title: "Move-In / Move-Out Cleaning",
    short: "Cleaning for people moving into or out of a property.",
    card: "Detailed cleaning for people moving into or out of a property.",
    image: "",
    imageAlt: "",
    heroImage: "",
    heroAlt: "",
    eyebrow: "Clean It",
    tagline: "A clean slate, every time.",
    intro:
      "Make your move easier with a thorough cleaning that leaves a property ready for its next chapter.",
    overview:
      "Whether you're settling into a new home or handing one off, move-in and move-out cleaning helps the property feel fresh and ready. Final pricing depends on property size and condition. Carpet cleaning is not included.",
    tasks: [
      "Kitchen cleaning",
      "Bathroom cleaning",
      "Floor cleaning",
      "General dusting",
      "Ready for new occupants or a final walkthrough",
      "Pricing based on property size",
    ],
    benefits: [
      "A fresh start for the next chapter",
      "Takes one big task off your moving list",
      "Straightforward starting prices",
    ],
    faqs: [
      {
        q: "What does move-in/move-out cleaning start at?",
        a: "Starting prices range from $275+ for a 2 bed / 1 bath home to $700+ for 5+ bed / 4+ bath. See the pricing page for details.",
      },
    ],
  },
  {
    slug: "real-estate-cleaning-staging",
    enabled: true,
    priority: false,
    category: "clean",
    icon: "home",
    formOption: "Real Estate Cleaning & Staging",
    title: "Real Estate Cleaning & Staging",
    short: "Cleaning and staging help for properties being prepared for sale.",
    card: "Cleaning and staging assistance for properties being prepared for sale or other real estate needs.",
    image: IMG.clientFormalDining,
    imageAlt: "Clean formal dining room with glass-top table",
    heroImage: IMG.clientFormalDining,
    heroAlt: "Clean formal dining room with glass-top table",
    eyebrow: "Clean It",
    tagline: "Make a great first impression.",
    intro:
      "Getting a property ready to sell? We offer cleaning and staging assistance to help it look its best.",
    overview:
      "Real estate cleaning and staging assistance is for properties being prepared for sale or other real estate needs. Every property is different, so contact us to talk through what yours needs and get an exact quote.",
    tasks: [
      "Cleaning for properties being prepared for sale",
      "Staging assistance",
      "Kitchen, bathroom, and floor cleaning",
      "General dusting",
      "Support for other real estate needs",
    ],
    benefits: [
      "Helps a property look its best",
      "Cleaning and staging help from one team",
      "Personal, responsive service",
    ],
    faqs: [
      {
        q: "How much does real estate cleaning cost?",
        a: "Pricing depends on the property. Contact us for a custom quote.",
      },
    ],
  },
  {
    slug: "decluttering-organizing",
    enabled: true,
    priority: false,
    category: "clean",
    icon: "layers",
    formOption: "Organizing / Decluttering",
    title: "Decluttering & Organizing",
    short: "Help organizing spaces and removing clutter.",
    card: "Help organizing your spaces and removing clutter so everything has its place.",
    image: "",
    imageAlt: "",
    heroImage: "",
    heroAlt: "",
    eyebrow: "Clean It",
    tagline: "Everything in its place.",
    intro:
      "Overwhelmed by clutter? We'll help you sort, organize, and clear out so your space works for you again.",
    overview:
      "Decluttering and organizing means working with you to sort through belongings, organize spaces, and remove clutter. Need items hauled away? Our Clear It services can help with that too.",
    tasks: [
      "Sorting and organizing spaces",
      "Removing clutter",
      "Help sorting boxes and paperwork",
      "Pairs well with cleaning",
      "Pairs with junk removal when items need to go",
    ],
    benefits: [
      "A calmer, more functional home",
      "Patient, personal help",
      "One company for organizing and hauling",
    ],
    faqs: [
      {
        q: "Can you help me get rid of what I don't need?",
        a: "Yes. Our Clear It services include household item removal. Call our handyman & property services line at (574) 850-3716 to talk it through.",
      },
    ],
  },

  // ── FIX IT ────────────────────────────────────────────────────────────
  {
    slug: "handyman-repairs",
    enabled: true,
    priority: true,
    category: "fix",
    icon: "wrench",
    formOption: "Minor Home Repairs",
    title: "Handyman & Minor Repairs",
    short: "Minor plumbing, drywall, door, caulking, and trim repairs.",
    card: "Minor plumbing issues, faucets, drywall, doors, caulking, trim, and other minor household repairs.",
    image: "",
    imageAlt: "",
    heroImage: "",
    heroAlt: "",
    eyebrow: "Fix It",
    tagline: "The small fixes that make a big difference.",
    intro:
      "From a leaky faucet to a sticky door, we handle the minor repairs that keep your home running smoothly.",
    overview:
      "Our handyman services focus on minor repairs and installations around the home. We do not offer major electrical, plumbing, or structural projects. Not sure whether your job fits? Call and ask.",
    tasks: [
      "Minor plumbing issues",
      "Replacing kitchen and sink faucets",
      "Door repair and adjustment",
      "Door replacement and pocket door installation",
      "Minor drywall repairs",
      "Caulking and sealing",
      "Trim and baseboard replacement",
      "Other minor household repairs",
    ],
    benefits: [
      "Minor repairs handled by a local, family-owned team",
      "Clear starting prices",
      "Cleaning and repairs under one roof",
    ],
    faqs: [
      {
        q: "Do you handle major plumbing, electrical, or structural work?",
        a: "Our handyman services are focused on minor repairs and installations. If you're unsure whether your project qualifies, call (574) 850-3716 and we'll talk it through.",
      },
      {
        q: "What is the house-call charge?",
        a: "A $150 house-call/initial assessment charge (up to one hour) is advertised. Please contact us to confirm how it applies to your project.",
      },
    ],
  },
  {
    slug: "installations-hanging",
    enabled: true,
    priority: false,
    category: "fix",
    icon: "plug",
    formOption: "TV / Fixture Installation",
    title: "Installations & Hanging",
    short: "TVs, ceiling fans, light fixtures, mirrors, shelving, and holiday lights.",
    card: "TV mounting, ceiling fans, light fixtures, outlets and switch plates, mirrors, shelving, and holiday lights.",
    image: "",
    imageAlt: "",
    heroImage: "",
    heroAlt: "",
    eyebrow: "Fix It",
    tagline: "Mounted, hung, and installed right.",
    intro:
      "Hanging a TV, swapping a light fixture, or putting up holiday lights? We'll take care of the installation.",
    overview:
      "We install and hang the everyday items that make a home feel finished. Our work is limited to minor installations, such as replacing outlets, switch plates, and light fixtures; we do not take on major electrical projects.",
    tasks: [
      "Hanging televisions",
      "Ceiling fan installation",
      "Changing or adding light fixtures",
      "Changing outlets and switch plates",
      "Hanging pictures and mirrors",
      "Shelving installation",
      "Holiday light installation and removal",
    ],
    benefits: [
      "Neat, secure installations",
      "Starting prices listed up front",
      "Friendly, reliable service",
    ],
    faqs: [
      {
        q: "How much does TV mounting cost?",
        a: "TV mounting starts at $100+, ceiling fan installation at $150+, and light fixture installation at $85+. See the pricing page for all starting prices.",
      },
    ],
  },
  {
    slug: "assembly",
    enabled: true,
    priority: false,
    category: "fix",
    icon: "hammer",
    formOption: "Handyman Services",
    title: "Assembly Services",
    short: "Furniture, grills, sheds, playsets, and more.",
    card: "Furniture, grill, shed, and playset assembly, plus other assembly and installations.",
    image: "",
    imageAlt: "",
    heroImage: "",
    heroAlt: "",
    eyebrow: "Fix It",
    tagline: "Skip the instruction manual.",
    intro: "Let us do the building. We assemble furniture, grills, sheds, playsets, and more.",
    overview:
      "From a bookcase to a backyard shed, assembly jobs are easier with the right help. Starting prices vary by project; contact us for an exact quote.",
    tasks: [
      "Furniture assembly",
      "Grill assembly",
      "Shed assembly",
      "Playset assembly",
      "Shelving installation",
      "Other assembly and installations",
    ],
    benefits: [
      "Saves you hours of frustration",
      "Starting prices listed up front",
      "Done by a local, family-owned business",
    ],
    faqs: [
      {
        q: "What do assembly jobs start at?",
        a: "Furniture and grill assembly start at $75+, shed assembly at $250+, and playset assembly at $300+. Final pricing may vary.",
      },
    ],
  },

  // ── CLEAR IT ──────────────────────────────────────────────────────────
  {
    slug: "junk-removal",
    enabled: true,
    priority: true,
    category: "clear",
    icon: "trash",
    formOption: "Junk Removal",
    title: "Junk Removal",
    short: "Furniture, appliances, yard debris, and household items hauled away.",
    card: "Household items, furniture, appliances, yard debris, construction debris, and general junk hauled away.",
    image: "",
    imageAlt: "",
    heroImage: "",
    heroAlt: "",
    eyebrow: "Clear It",
    tagline: "Gone, so you can get your space back.",
    intro:
      "Whether it's an old couch or a pile of yard debris, we'll haul it away so you can get your space back.",
    overview:
      "Our junk removal pricing is load-based, with starting prices from a small pickup-bed load to a full truck, plus per-item pricing for furniture and appliances. Final pricing may vary. Same-day service may be available; please call to ask.",
    tasks: [
      "Household item removal",
      "Furniture removal",
      "Appliance removal",
      "Clothing and unwanted item removal",
      "Yard debris removal",
      "Construction debris removal",
      "Deck and shed removal",
      "Hot tub removal",
      "General junk removal",
    ],
    benefits: [
      "Load-based starting prices",
      "Local, family-owned service",
      "Pairs with cleaning and organizing",
    ],
    faqs: [
      {
        q: "Do you offer same-day junk removal?",
        a: "Same-day service may be available. Call (574) 850-3716 to ask about availability.",
      },
      {
        q: "How is junk removal priced?",
        a: "By load size or by item or service. Starting prices are on our pricing page, and a $150 house-call/initial assessment charge is advertised. Please contact us to confirm how it applies to your project.",
      },
    ],
  },
  {
    slug: "property-estate-cleanouts",
    enabled: true,
    priority: false,
    category: "clear",
    icon: "package",
    formOption: "Property / Estate Cleanout",
    title: "Property & Estate Cleanouts",
    short: "Garage, basement, attic, property, and estate cleanouts.",
    card: "Garage, basement, and attic cleanouts, property cleanups, estate cleanouts, and estate sale assistance.",
    image: "",
    imageAlt: "",
    heroImage: "",
    heroAlt: "",
    eyebrow: "Clear It",
    tagline: "Big cleanouts, handled with care.",
    intro:
      "Overwhelmed by a full garage or an entire estate? We'll help you work through it, one room at a time.",
    overview:
      "Cleanouts can be a lot, especially during a difficult time. We offer garage, basement, and attic cleanouts, property cleanups, estate cleanouts, and estate sale assistance. Estate cleanouts are quoted individually, so please call us.",
    tasks: [
      "Garage cleanouts",
      "Basement and attic cleanouts",
      "Property cleanups",
      "Estate cleanouts",
      "Estate sale assistance",
      "Construction debris removal",
    ],
    benefits: [
      "Help from a personal, family-owned team",
      "Estate cleanouts quoted to fit your situation",
      "Cleaning available for the finished space",
    ],
    faqs: [
      {
        q: "How much does an estate cleanout cost?",
        a: "Estate cleanouts are a custom quote. Call (574) 850-3716 and we'll talk through the property.",
      },
      {
        q: "Are estate sales and estate cleanouts the same thing?",
        a: "No, they're different services. We offer estate sale assistance and estate cleanouts separately; let us know which you need.",
      },
    ],
  },
];

/** Enabled services, in display order. Import this everywhere a service list is needed. */
export const services: Service[] = allServices.filter((s) => s.enabled);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);

export function servicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category);
}

/** Other enabled services, priority ones first (keeps configured order within each group). */
export function relatedServices(slug: string): Service[] {
  const others = services.filter((s) => s.slug !== slug);
  return [...others.filter((s) => s.priority), ...others.filter((s) => !s.priority)];
}

/** Human list of enabled service titles, e.g. "House Cleaning, Deep Cleaning and Recurring Cleaning". */
export function serviceTitleList(): string {
  const titles = services.map((s) => s.title);
  if (titles.length <= 1) return titles.join("");
  return `${titles.slice(0, -1).join(", ")} and ${titles[titles.length - 1]}`;
}
