// Homepage FAQ. Answers that mention a specific service are only shown while
// that service is enabled in services.ts, so disabling a service never leaves
// a stale FAQ behind. Edit freely per client.

import { services } from "./services";
import { business, handymanPhoneDisplay, phoneDisplay } from "./business";

export type Faq = { q: string; a: string };

type FaqSource = Faq & {
  /** Only show this question when this service slug is enabled. */
  requiresService?: string;
};

const sources = (): FaqSource[] => [
  {
    q: "What services do you offer?",
    a: `${business.name} offers three kinds of help: Clean It (residential cleaning, deep cleaning, move-in/move-out cleaning, real estate cleaning and staging, decluttering and organizing), Fix It (handyman services and minor repairs), and Clear It (junk removal and property cleanouts).`,
  },
  {
    q: "How much does cleaning cost?",
    a: "Standard cleaning starts at $200+ for a 2 bed / 1 bath home, deep cleaning at $250+, and move-in/move-out cleaning at $275+. Final pricing depends on property size, condition, current upkeep, and specific cleaning needs. Try the ballpark calculator on this page or request an exact quote.",
  },
  {
    q: "Is carpet cleaning included?",
    a: "No. Cleaning includes general dusting, kitchen, bathroom, and floor cleaning. Carpet cleaning is not included.",
  },
  {
    q: "How often can I schedule recurring cleaning?",
    a: "Recurring residential cleaning is available weekly, biweekly, or monthly. We'll help you choose the schedule that fits your home.",
    requiresService: "recurring-cleaning",
  },
  {
    q: "What kinds of handyman jobs do you take?",
    a: "We focus on minor repairs and installations, such as faucets, outlets and switch plates, light fixtures, ceiling fans, TV and mirror mounting, drywall patches, door adjustments, caulking, trim, and furniture, grill, shed, and playset assembly. We do not take on major electrical, plumbing, or structural projects.",
    requiresService: "handyman-repairs",
  },
  {
    q: "What is the $150 house call?",
    a: "A $150 house-call/initial assessment charge (up to one hour) is advertised for handyman and junk removal projects. Please contact us to confirm how it applies to your project.",
  },
  {
    q: "Do you offer junk removal and cleanouts?",
    a: "Yes. We remove household items, furniture, appliances, yard debris, and construction debris, and we handle garage, basement, attic, property, and estate cleanouts. Same-day service may be available; please call to ask.",
    requiresService: "junk-removal",
  },
  {
    q: "Which areas do you serve?",
    a: "We're based in Bremen, Indiana and serve Bremen, Elkhart, South Bend, Plymouth, Lake of the Woods, Bristol, Mishawaka, Granger, North Liberty, and Rochester.",
  },
  {
    q: "Are you insured and bonded?",
    a: "Yes. Lucas Property Solutions LLC is insured and bonded, and references are available upon request.",
  },
  {
    q: "Which phone number should I call?",
    a: `For residential cleaning, call ${phoneDisplay}. For handyman and property services, including junk removal and cleanouts, call ${handymanPhoneDisplay}.`,
  },
];

export function getHomeFaqs(): Faq[] {
  const enabled = new Set(services.map((s) => s.slug));
  return sources()
    .filter((f) => !f.requiresService || enabled.has(f.requiresService))
    .map(({ q, a }) => ({ q, a }));
}
