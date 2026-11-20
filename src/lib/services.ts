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
  /** Custom <title> for the service page. */
  seoTitle: string;
  /** Custom meta description for the service page. */
  seoDescription: string;
  /** Service-specific call-to-action label (hero, final CTA and form button). */
  cta: string;
  /** Longer copy shown below the overview: who it is for, what is (not) included, pricing. */
  sections: { heading: string; body: string[] }[];
  /** Names of existing testimonials (see reviews.ts) that fit this service. Omit when none do. */
  testimonials?: string[];
  /** Contextual links to closely related services, rendered as "before <link>anchor</link> after". */
  links: { before: string; anchor: string; slug: string; after: string }[];
};

const allServices: Service[] = [
  // ── CLEAN IT ──────────────────────────────────────────────────────────
  {
    slug: "recurring-cleaning",
    seoTitle: "Recurring House Cleaning in Bremen, IN | Lucas Property Solutions",
    seoDescription:
      "Weekly, biweekly, or monthly house cleaning in Bremen, Indiana from a family-owned, insured and bonded team. Starting at $200+. Get your estimate.",
    cta: "Get My Cleaning Estimate",
    sections: [
      {
        heading: "Who recurring cleaning is for",
        body: [
          "Recurring cleaning suits busy households, working families, and homeowners who would rather spend weekends on something other than scrubbing. Instead of cleaning in bursts before guests arrive, you keep a steady baseline: dusting, kitchen, bathrooms, and floors looked after on a schedule that works for you.",
        ],
      },
      {
        heading: "How a recurring schedule works",
        body: [
          "Visits can be weekly, biweekly, or monthly. Tell us how your household uses the home and which rooms matter most, and we'll help you choose a schedule that fits. If your home hasn't been cleaned in a while, we may suggest starting with a deep clean before settling into a regular rhythm.",
        ],
      },
      {
        heading: "What's included and what isn't",
        body: [
          "Cleaning includes general dusting, kitchen cleaning, bathroom cleaning, and floor cleaning. Carpet cleaning is not included.",
        ],
      },
      {
        heading: "How pricing works",
        body: [
          "Standard cleaning starts at $200+ for a 2 bed / 1 bath home and $300+ for a 3 bed / 2 bath home, with starting prices for larger homes listed on our pricing page. Final pricing depends on property size, condition, current upkeep, and specific cleaning needs, so request an exact quote and we'll confirm it.",
        ],
      },
      {
        heading: "Why homeowners choose us",
        body: [
          "Lucas Property Solutions is a family-owned and operated business based in Bremen, Indiana. April brings 25 years of professional cleaning experience, and the business is insured and bonded, with references available upon request.",
        ],
      },
    ],
    testimonials: ["Peggy H.", "Steven W."],
    links: [
      {
        before: "If your home needs to catch up first, start with a ",
        anchor: "deep cleaning",
        slug: "deep-cleaning",
        after: ", then move to a regular schedule.",
      },
      {
        before: "Only need one visit? We also offer ",
        anchor: "one-time and routine cleaning",
        slug: "one-time-cleaning",
        after: ".",
      },
    ],
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
    seoTitle: "Deep Cleaning Services in Bremen, IN | Lucas Property Solutions",
    seoDescription:
      "Detailed deep cleaning for Bremen, Indiana homes: kitchens, bathrooms, floors, and the nooks routine cleaning misses. Starting at $250+. Get an estimate.",
    cta: "Get My Deep Cleaning Estimate",
    sections: [
      {
        heading: "When a deep clean makes sense",
        body: [
          "A deep clean is a more detailed, more time-intensive visit than a standard clean. It's a good fit for seasonal refreshes, for homes that haven't been cleaned in a while, and for any time you'd like the little nooks and crannies handled and not only the surfaces everyone sees.",
        ],
      },
      {
        heading: "Common situations",
        body: [
          "Homes often need a deep clean after a long stretch between cleanings, after a busy or stressful season, before hosting family, or as a reset before starting a recurring cleaning schedule.",
        ],
      },
      {
        heading: "What's included and what isn't",
        body: [
          "Deep cleaning focuses on more detailed kitchen and bathroom cleaning, thorough dusting throughout, and detailed floor cleaning. Carpet cleaning is not included.",
        ],
      },
      {
        heading: "How pricing works",
        body: [
          "Deep cleaning starts at $250+ for a 2 bed / 1 bath home, $350+ for 3 bed / 2 bath, $475+ for 4 bed / 3 bath, and $600+ for 5+ bed / 4+ bath. Final pricing depends on property size, condition, current upkeep, and specific cleaning needs. Request an exact quote and we'll confirm.",
        ],
      },
    ],
    testimonials: ["Dawn C.", "Clifford H."],
    links: [
      {
        before: "Once your home is caught up, a ",
        anchor: "recurring cleaning schedule",
        slug: "recurring-cleaning",
        after: " keeps it that way.",
      },
      {
        before: "Preparing for a move? See ",
        anchor: "move-in and move-out cleaning",
        slug: "move-in-move-out-cleaning",
        after: ".",
      },
    ],
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
    seoTitle: "Residential Cleaning in Bremen, Indiana | Lucas Property Solutions",
    seoDescription:
      "One-time and routine residential cleaning in Bremen, Indiana with no long-term commitment. Kitchen, bathroom, and floor cleaning from $200+. Get an estimate.",
    cta: "Request a One-Time Cleaning",
    sections: [
      {
        heading: "Cleaning without a long-term commitment",
        body: [
          "Sometimes you just need the house cleaned once: before company arrives, after a busy few weeks, or to get ahead of a big event. One-time and routine appointments are available for homeowners, with no recurring schedule required.",
        ],
      },
      {
        heading: "What a standard clean covers",
        body: [
          "Cleaning includes general dusting, kitchen cleaning, bathroom cleaning, and floor cleaning. Carpet cleaning is not included.",
        ],
      },
      {
        heading: "Routine and maintenance cleaning",
        body: [
          "If one visit turns out to be something you want regularly, routine maintenance cleaning is available too, and we can talk through a recurring schedule.",
        ],
      },
      {
        heading: "How pricing works",
        body: [
          "Standard cleaning starts at $200+ for a 2 bed / 1 bath home, $300+ for 3 bed / 2 bath, $400+ for 4 bed / 3 bath, and $500+ for 5+ bed / 4+ bath. Final pricing depends on your home's size, condition, and current upkeep.",
        ],
      },
    ],
    testimonials: ["Kaitlyn J.", "Debbie M."],
    links: [
      {
        before: "Want extra attention in every room? Ask about ",
        anchor: "deep cleaning",
        slug: "deep-cleaning",
        after: ".",
      },
      {
        before: "For ongoing upkeep, see ",
        anchor: "recurring residential cleaning",
        slug: "recurring-cleaning",
        after: ".",
      },
    ],
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
    seoTitle: "Move-Out & Move-In Cleaning in Bremen, IN | Lucas Property Solutions",
    seoDescription:
      "Move-out and move-in cleaning in Bremen, Indiana for anyone moving into or out of a property. Starting at $275+ by home size. Request your estimate.",
    cta: "Get My Move-Out Cleaning Estimate",
    sections: [
      {
        heading: "A fresh start, in either direction",
        body: [
          "Moving comes with a long to-do list. Move-in and move-out cleaning takes the cleaning off it, whether you're handing a property back or settling into a new place that you'd like cleaned before the boxes arrive.",
        ],
      },
      {
        heading: "What to expect",
        body: [
          "Move cleaning covers kitchen cleaning, bathroom cleaning, floor cleaning, and general dusting, so the property is ready for new occupants or a final walkthrough. Carpet cleaning is not included.",
        ],
      },
      {
        heading: "How pricing works",
        body: [
          "Move-in/move-out cleaning starts at $275+ for a 2 bed / 1 bath home, $400+ for 3 bed / 2 bath, $550+ for 4 bed / 3 bath, and $700+ for 5+ bed / 4+ bath. Final pricing depends on property size and condition; request an exact quote and we'll confirm.",
        ],
      },
    ],
    testimonials: ["Karen M.", "Christie A."],
    links: [
      {
        before: "Getting a property ready to sell? See our ",
        anchor: "real estate cleaning and staging",
        slug: "real-estate-cleaning-staging",
        after: " help.",
      },
      {
        before: "Still sorting through belongings? ",
        anchor: "Decluttering and organizing",
        slug: "decluttering-organizing",
        after: " can make the move easier.",
      },
    ],
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
    seoTitle: "Real Estate Cleaning & Staging in Bremen, IN | Lucas Property Solutions",
    seoDescription:
      "Cleaning and staging help for Bremen, Indiana properties being prepared for sale. Custom quotes from a family-owned, insured and bonded team.",
    cta: "Request a Property Cleaning Quote",
    sections: [
      {
        heading: "Helping a property show its best",
        body: [
          "A property heading to market is judged quickly, and cleanliness is a big part of the first impression. We offer cleaning and staging assistance for properties being prepared for sale, as well as other real estate needs.",
        ],
      },
      {
        heading: "Who this is for",
        body: [
          "Homeowners preparing to list a house, and anyone helping get a property ready for sale. Every property is different, so we talk through yours first.",
        ],
      },
      {
        heading: "What's included",
        body: [
          "Cleaning covers kitchens, bathrooms, floors, and general dusting, with staging assistance to help the space look its best. Carpet cleaning is not included.",
        ],
      },
      {
        heading: "How pricing works",
        body: [
          "Real estate cleaning and staging is quoted per property. Contact us with a few details and we'll provide a custom quote. For reference, our starting prices for standard and move-out cleaning are on our pricing page.",
        ],
      },
    ],
    testimonials: ["Karen M."],
    links: [
      {
        before: "If the property is vacant, see ",
        anchor: "move-in and move-out cleaning",
        slug: "move-in-move-out-cleaning",
        after: ".",
      },
      {
        before: "If it still holds a lot of belongings, ",
        anchor: "property and estate cleanouts",
        slug: "property-estate-cleanouts",
        after: " can clear the way first.",
      },
    ],
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
    seoTitle: "Decluttering & Organizing in Bremen, IN | Lucas Property Solutions",
    seoDescription:
      "Help sorting, organizing, and decluttering your home in Bremen, Indiana, with junk removal available when items need to go. Request an estimate.",
    cta: "Get My Decluttering Estimate",
    sections: [
      {
        heading: "Getting your space working again",
        body: [
          "Clutter builds up slowly: boxes of paperwork, closets that never got sorted, rooms that quietly became storage. We work with you to sort belongings, organize spaces, and remove clutter at a pace that makes sense for you.",
        ],
      },
      {
        heading: "Common situations",
        body: [
          "Help is often wanted for sorting boxes of paperwork and things collected over the years, or for getting started when the pile feels too big to tackle alone. It also pairs naturally with a cleaning once the space is clear.",
        ],
      },
      {
        heading: "When items need to go",
        body: [
          "Decluttering often turns up things that need to leave the house. Our junk removal service can haul away household items, furniture, and appliances.",
        ],
      },
      {
        heading: "How pricing works",
        body: [
          "Decluttering and organizing isn't on our advertised price list, since it depends on the space and the help you need. Contact us to talk it through and get an exact quote.",
        ],
      },
    ],
    testimonials: ["Beth S.", "Jennifer K."],
    links: [
      {
        before: "Need things hauled away? See ",
        anchor: "junk removal",
        slug: "junk-removal",
        after: ".",
      },
      {
        before: "Clearing out an entire property? See ",
        anchor: "property and estate cleanouts",
        slug: "property-estate-cleanouts",
        after: ".",
      },
    ],
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
    seoTitle: "Handyman Services in Bremen, IN | Lucas Property Solutions",
    seoDescription:
      "Handyman services and minor home repairs in Bremen, Indiana: faucets, doors, drywall patches, caulking, and trim from $75+. Request a handyman quote.",
    cta: "Request a Handyman Quote",
    sections: [
      {
        heading: "Minor home repairs, handled",
        body: [
          "Small repairs have a way of piling up: a door that sticks, a faucet that needs replacing, a drywall patch, trim that is pulling away. Our handyman service focuses on exactly these minor repairs and installations around the home.",
        ],
      },
      {
        heading: "What we take on",
        body: [
          "Common jobs include replacing kitchen and sink faucets, door repair and adjustment, door replacement and pocket door installation, minor drywall repairs, caulking and sealing, trim and baseboard replacement, and minor plumbing issues.",
        ],
      },
      {
        heading: "What we don't take on",
        body: [
          "We do not offer major electrical, plumbing, or structural projects. If you're not sure whether your job fits, give us a call and we'll talk it through.",
        ],
      },
      {
        heading: "How pricing works",
        body: [
          "Starting prices are $75+ for minor repairs, door repair or adjustment, small drywall repairs, and caulking or sealing, and $85+ for replacing trim or baseboards. A $150 house-call/initial assessment charge (up to one hour) is advertised for this kind of project; please contact us to confirm how it applies to yours. Final pricing may vary with the size and details of the job.",
        ],
      },
    ],
    links: [
      {
        before: "Need something mounted or hung? See ",
        anchor: "installations and hanging",
        slug: "installations-hanging",
        after: ".",
      },
      {
        before: "Building something new? Our ",
        anchor: "assembly services",
        slug: "assembly",
        after: " cover furniture, grills, sheds, and playsets.",
      },
    ],
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
    seoTitle: "TV Mounting & Fixture Installation in Bremen, IN | Lucas Property Solutions",
    seoDescription:
      "TV mounting, ceiling fans, light fixtures, mirrors, and shelving installed in Bremen, Indiana. Starting prices from $50+. Request an installation quote.",
    cta: "Request an Installation Quote",
    sections: [
      {
        heading: "Installed securely, the first time",
        body: [
          "TVs, ceiling fans, light fixtures, mirrors, and shelves all need to be mounted properly to look right and stay where you put them. We handle everyday installations so you don't have to tackle them yourself.",
        ],
      },
      {
        heading: "Common installation jobs",
        body: [
          "We hang televisions, install ceiling fans, change or add light fixtures, change outlets and switch plates, hang pictures and mirrors, install shelving, and put up and take down holiday lights.",
        ],
      },
      {
        heading: "What's outside our scope",
        body: [
          "Our work is limited to minor installations, such as replacing outlets, switch plates, and light fixtures. We do not take on major electrical projects.",
        ],
      },
      {
        heading: "How pricing works",
        body: [
          "TV mounting starts at $100+, ceiling fan installation at $150+, light fixture installation at $85+, mirror hanging and shelving at $75+, and electrical plates at $50+. A $150 house-call/initial assessment charge (up to one hour) is advertised for this kind of project; please contact us to confirm how it applies to yours. Final pricing may vary.",
        ],
      },
    ],
    links: [
      {
        before: "Need a repair rather than an installation? See ",
        anchor: "handyman and minor repairs",
        slug: "handyman-repairs",
        after: ".",
      },
      {
        before: "Need something built first? Our ",
        anchor: "assembly services",
        slug: "assembly",
        after: " can help.",
      },
    ],
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
    seoTitle: "Furniture, Grill & Shed Assembly in Bremen, IN | Lucas Property Solutions",
    seoDescription:
      "Furniture, grill, shed, and playset assembly in Bremen, Indiana, with starting prices from $75+. Skip the instruction manual and request an assembly quote.",
    cta: "Request an Assembly Quote",
    sections: [
      {
        heading: "Let someone else read the instructions",
        body: [
          "Flat-pack furniture, a new grill, a backyard shed, a playset: assembly jobs can eat a whole weekend and a lot of patience. We'll do the building for you.",
        ],
      },
      {
        heading: "What we assemble",
        body: [
          "Furniture, grills, sheds, and playsets, plus shelving and other assembly and installation jobs around the home.",
        ],
      },
      {
        heading: "How pricing works",
        body: [
          "Furniture and grill assembly start at $75+, shed assembly at $250+, playset assembly at $300+, and other assembly and installations at $75+. A $150 house-call/initial assessment charge (up to one hour) is advertised for this kind of project; please contact us to confirm how it applies to yours. Final pricing may vary by project, so request an exact quote.",
        ],
      },
    ],
    links: [
      {
        before: "Need it mounted or hung once it's built? See ",
        anchor: "installations and hanging",
        slug: "installations-hanging",
        after: ".",
      },
      {
        before: "For repairs around the house, see ",
        anchor: "handyman and minor repairs",
        slug: "handyman-repairs",
        after: ".",
      },
    ],
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
    seoTitle: "Junk Removal & Hauling in Bremen, IN | Lucas Property Solutions",
    seoDescription:
      "Junk removal and hauling in Bremen, Indiana: furniture, appliances, yard debris, and household items, with load-based starting prices from $200+.",
    cta: "Get a Junk Removal Estimate",
    sections: [
      {
        heading: "Hauling away what you don't need",
        body: [
          "Old furniture, worn-out appliances, yard debris, and leftover construction material take up space and are hard to move on your own. We haul away household items, furniture, appliances, clothing and unwanted items, yard debris, and construction debris.",
        ],
      },
      {
        heading: "Bigger removals",
        body: ["For larger jobs, we also handle deck and shed removal and hot tub removal."],
      },
      {
        heading: "How junk removal pricing works",
        body: [
          "Pricing is load-based. Starting prices run from $200+ for a small load or pickup bed to $500+ for a full truck, with $275+ for a quarter truck, $350+ for a half truck, and $425+ for a three-quarter truck. Furniture and appliance removal start at $75+ per item, yard debris at $250+ per load, and construction debris at $400+. A $150 house-call/initial assessment charge (up to one hour) is advertised for this kind of project; please contact us to confirm how it applies to yours. Final pricing may vary.",
        ],
      },
      {
        heading: "Same-day service",
        body: ["Same-day service may be available. Please call to ask about availability."],
      },
    ],
    links: [
      {
        before: "Clearing a whole garage, basement, or estate? See ",
        anchor: "property and estate cleanouts",
        slug: "property-estate-cleanouts",
        after: ".",
      },
      {
        before: "Sorting before you toss? ",
        anchor: "Decluttering and organizing",
        slug: "decluttering-organizing",
        after: " can help you decide what stays.",
      },
    ],
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
    seoTitle: "Estate & Property Cleanouts in Bremen, IN | Lucas Property Solutions",
    seoDescription:
      "Garage, basement, attic, property, and estate cleanouts in Bremen, Indiana, handled with care by a family-owned team. Call for a custom estate quote.",
    cta: "Request a Cleanout Quote",
    sections: [
      {
        heading: "Clearing a space with care",
        body: [
          "A cleanout can be a big project, and sometimes it comes at a difficult time. Garages, basements, and attics fill up over the years, and an estate can hold a lifetime of belongings. We help you work through it, one room at a time.",
        ],
      },
      {
        heading: "Types of cleanouts",
        body: [
          "We offer garage cleanouts, basement and attic cleanouts, property cleanups, estate cleanouts, and estate sale assistance. Estate sale assistance and estate cleanouts are separate services, so let us know which you need.",
        ],
      },
      {
        heading: "How pricing works",
        body: [
          "Garage cleanouts start at $350+ and basement or attic cleanouts at $400+. Estate cleanouts are custom quotes because every property is different. A $150 house-call/initial assessment charge (up to one hour) is advertised for this kind of project; please contact us to confirm how it applies to yours. Final pricing may vary.",
        ],
      },
      {
        heading: "After the cleanout",
        body: ["Once the space is cleared, cleaning is available for the finished space."],
      },
    ],
    links: [
      {
        before: "For smaller hauling jobs, see ",
        anchor: "junk removal",
        slug: "junk-removal",
        after: ".",
      },
      {
        before: "When the space is empty, ",
        anchor: "deep cleaning",
        slug: "deep-cleaning",
        after: " can finish the job.",
      },
    ],
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
