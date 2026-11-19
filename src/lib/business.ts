// ─────────────────────────────────────────────────────────────────────────
//  CENTRAL BUSINESS CONFIGURATION  ← the main file to edit for each client
//  ─────────────────────────────────────────────────────────────────────────
//  Everything business-specific on the website (name, phone, email, colors,
//  logo, images, service area, SEO, lead form) is read from this file.
//  Services live in  src/lib/services.ts  (see CLIENT_SETUP.md).
//
//  Values here are baked into the site at build time, so server-rendered HTML,
//  page titles, meta tags and structured data always match what visitors see.
//
//  Leave a field as "" (or [] / null) when it does not apply. Anything left
//  blank is simply not displayed – the template never invents business facts.
// ─────────────────────────────────────────────────────────────────────────

import { IMG, type ImageRef } from "./images";

export type FormProvider = "formspree" | "demo";

export interface BusinessConfig {
  // ── Identity ──────────────────────────────────────────────────────────
  /** Customer-facing business name (logo, headings, titles, footer). */
  name: string;
  /** Registered/legal name. Falls back to `name` when blank. Used in © line + structured data. */
  legalName: string;
  /** Short tagline shown under the homepage headline. */
  tagline: string;
  /** Secondary tagline shown in the footer. "" to hide. */
  tagline2: string;
  /** One or two sentences describing the business (footer + default meta description). */
  description: string;
  /** Optional founding story. When non-empty it appears on the About page. Do not invent one. */
  foundingStory: string;
  /** Short descriptor shown above the homepage headline, e.g. "Professional Residential & Commercial Cleaning". */
  businessType: string;
  /** schema.org type for structured data. "LocalBusiness" is always valid; "ProfessionalService" also works. */
  schemaType: string;

  // ── Contact ───────────────────────────────────────────────────────────
  contact: {
    /** Main business phone (here: residential cleaning). Drives the primary tel: links and structured data. */
    phone: string;
    /** Second line for a different division (here: handyman & property services). "" to hide. */
    secondaryPhone: string;
    /** Short labels describing what each line is for. */
    phoneLabel: string;
    secondaryPhoneLabel: string;
    /** Phone text shown on the site. Leave "" to display `phone` as written. */
    displayPhone: string;
    /** Public email address. Leave "" to hide. */
    email: string;
    /** Physical address (only shown when `showAddress` is true; always omitted from structured data otherwise). */
    address: { street: string; city: string; state: string; postalCode: string };
    showAddress: boolean;
    /** e.g. [{ days: "Mon–Fri", hours: "8am – 5pm" }]. Leave [] to hide. */
    hours: { days: string; hours: string }[];
  };

  // ── Service area / marketing ──────────────────────────────────────────
  location: {
    primaryCity: string;
    state: string;
    /** Additional cities/areas served. Only list places the business genuinely serves. */
    serviceAreas: string[];
  };
  /** Selling points. Shown on the homepage "Why Choose Us" list and the About page cards. */
  differentiators: { title: string; description: string; icon: DifferentiatorIcon }[];
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    linkedin: string;
    x: string;
    nextdoor: string;
    yelp: string;
  };
  googleBusinessProfileUrl: string;

  // ── Branding ──────────────────────────────────────────────────────────
  branding: {
    /** Browser-tab icon in /public (SVG or PNG). Leave "" for none. */
    favicon: string;
    logo: {
      /** Path to a logo file in /public (e.g. "/images/logo.svg"). Leave "" to use the built-in text logo. */
      src: string;
      alt: string;
      /** Small italic line under the name in the text logo (e.g. "cleaning co."). Leave "" to hide. */
      subtitle: string;
    };
    /**
     * Optional brand color overrides – any CSS color (hex, rgb(), oklch()).
     * Leave "" to keep the master template's navy palette from src/styles.css.
     */
    colors: {
      primary: string;
      /** Text/icon color used on top of `primary` (buttons, CTA band). Default: near-white. */
      primaryForeground: string;
      secondary: string;
      accent: string;
    };
  };

  // ── Images (files live in /public/images) ─────────────────────────────
  images: {
    hero: ImageRef;
    about: ImageRef;
    servicesHero: ImageRef;
    contactHero: ImageRef;
    reviewsHero: ImageRef;
    /** Social-share image path (1200×630 recommended). Leave "" to fall back to the hero image. */
    ogImage: string;
  };
  gallery: {
    /**
     * true  = the images below are stock/demonstration images and are labelled as samples.
     * false = they are the business's real project photos; sample labels are hidden.
     */
    isSample: boolean;
    images: ImageRef[];
  };

  // ── Lead form ─────────────────────────────────────────────────────────
  form: {
    /** "formspree" posts to `endpoint`. "demo" never sends anything (and says so on screen). */
    provider: FormProvider;
    /** Full Formspree endpoint, e.g. "https://formspree.io/f/xxxxxxxx". Blank = automatic demo mode. */
    endpoint: string;
    successTitle: string;
    /** Shown after a successful submission. `{name}` is replaced with the business name. */
    successMessage: string;
    /** Shown when submission fails. */
    errorMessage: string;
  };

  // ── SEO / launch ──────────────────────────────────────────────────────
  seo: {
    /**
     * Canonical production origin with no trailing slash, e.g. "https://www.clientdomain.com".
     * Used for canonical URLs, the sitemap, Open Graph and structured data.
     */
    siteUrl: string;
    /**
     * LAUNCH SWITCH. While false, every page sends `noindex, nofollow` and robots.txt
     * disallows crawling, so the demo/staging site can never compete with a real client site.
     * Set true (and set `siteUrl`) only when the client's site is ready to go live.
     */
    indexable: boolean;
  };
}

export type DifferentiatorIcon =
  "sparkles" | "clock" | "heart" | "message" | "shield" | "search" | "wrench";

export const business: BusinessConfig = {
  // ── Identity ──────────────────────────────────────────────────────────
  name: "Lucas Property Solutions LLC",
  legalName: "",
  tagline: "Your Home. Our Solutions.",
  tagline2: "Clean It. Fix It. Clear It.",
  description:
    "Family-owned cleaning, handyman, and property services in Bremen, Indiana. Insured and bonded.",
  foundingStory: `Built on more than 25 years of professional cleaning experience, Lucas Property Solutions LLC brings a personal approach to caring for your home.

April originally founded April's Signature Cleaning Co in January 2026 with a focus on dependable service, attention to detail, and customer satisfaction. After April and Guy became engaged, they expanded their services to include handyman work and property solutions.

Today, their family-owned business helps homeowners throughout Bremen and surrounding communities keep their properties clean, maintained, and comfortable.

From routine cleaning and deep cleans to minor repairs and household item removal, the goal is simple: make caring for your property easier.`,
  businessType: "Residential Cleaning • Handyman • Property Services",
  schemaType: "LocalBusiness",

  // ── Contact ───────────────────────────────────────────────────────────
  contact: {
    phone: "(574) 703-8107",
    displayPhone: "",
    secondaryPhone: "(574) 850-3716",
    phoneLabel: "Residential Cleaning",
    secondaryPhoneLabel: "Handyman & Property Services",
    email: "fox.april1976@yahoo.com",
    address: { street: "224 E 3rd Street", city: "Bremen", state: "IN", postalCode: "46506" },
    showAddress: true,
    hours: [{ days: "Monday–Friday", hours: "8:00 AM–5:00 PM" }],
  },

  // ── Service area / marketing ──────────────────────────────────────────
  location: {
    primaryCity: "Bremen",
    state: "IN",
    serviceAreas: [
      "Elkhart",
      "South Bend",
      "Plymouth",
      "Lake of the Woods",
      "Bristol",
      "Mishawaka",
      "Granger",
      "North Liberty",
      "Rochester",
    ],
  },
  differentiators: [
    {
      title: "25 Years of Cleaning Experience",
      description:
        "April brings more than 25 years of professional cleaning experience to every home.",
      icon: "sparkles",
    },
    {
      title: "Family-Owned & Operated",
      description:
        "You work with a locally operated business that values personal, friendly service.",
      icon: "heart",
    },
    {
      title: "Insured & Bonded",
      description: "Lucas Property Solutions LLC identifies itself as insured and bonded.",
      icon: "shield",
    },
    {
      title: "Attention to Detail",
      description:
        "Customer reviews repeatedly highlight thorough cleaning and the little nooks and crannies.",
      icon: "search",
    },
    {
      title: "Cleaning & Property Services",
      description:
        "Request cleaning, handyman, and cleanout help from the same company, all in one place.",
      icon: "wrench",
    },
    {
      title: "Customer Satisfaction",
      description:
        "Clear communication and a strong focus on your experience from first call to finished job.",
      icon: "message",
    },
  ],
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: "",
    linkedin: "",
    x: "",
    nextdoor: "",
    yelp: "",
  },
  googleBusinessProfileUrl: "",

  // ── Branding ──────────────────────────────────────────────────────────
  branding: {
    favicon: "/favicon.png",
    logo: {
      src: "/images/logo.png",
      alt: "Lucas Property Solutions LLC: Clean It. Fix It.",
      subtitle: "",
    },
    colors: { primary: "", primaryForeground: "", secondary: "", accent: "" },
  },

  // ── Images ────────────────────────────────────────────────────────────
  images: {
    // Client photo (full-resolution kitchen); cropped to the band shown by object-position in home-hero.tsx.
    hero: {
      src: IMG.clientHeroKitchen,
      alt: "Clean kitchen with island, dark counters and hardwood floors",
    },
    about: {
      src: IMG.clientLivingRoom,
      alt: "Clean, comfortable living room in a Bremen-area home",
    },
    servicesHero: {
      src: IMG.clientKitchenIsland,
      alt: "Clean kitchen with hardwood floors and white cabinets",
    },
    contactHero: {
      src: IMG.clientFormalDining,
      alt: "Clean formal dining room with a glass-top table",
    },
    reviewsHero: { src: IMG.clientPrimaryBath, alt: "Clean primary bathroom with a soaking tub" },
    ogImage: "",
  },
  gallery: {
    isSample: false,
    // Real client photos (portrait, 3:4). Order is the display order.
    images: [
      {
        src: IMG.clientKitchenIsland,
        alt: "Clean kitchen with island, dark counters and hardwood floors",
      },
      { src: IMG.clientPrimaryBath, alt: "Clean primary bathroom with soaking tub and tile floor" },
      {
        src: IMG.clientLivingRoom,
        alt: "Clean great room with vaulted ceiling and sectional seating",
      },
      { src: IMG.clientFormalDining, alt: "Clean formal dining room with glass-top table" },
      {
        src: IMG.clientKitchenOpen,
        alt: "Clean open kitchen with brick accent wall and hardwood floors",
      },
      {
        src: IMG.clientDiningRoom,
        alt: "Clean breakfast room with round dining table and hardwood floors",
      },
      { src: IMG.clientShowerClean2, alt: "Clean fiberglass shower with brass fixtures" },
      { src: IMG.clientShowerClean1, alt: "Clean fiberglass shower with caddy and brass fixtures" },
      {
        src: IMG.clientLakeviewDining,
        alt: "Bright dining room with a wooden table, upholstered chairs, and large windows overlooking a lake",
      },
      {
        src: IMG.clientLakeviewLiving,
        alt: "Living room with a sectional sofa and tall windows overlooking a lake",
      },
      {
        src: IMG.clientChandelierDining,
        alt: "Dining room with a wooden table, mixed chairs, crystal chandelier, and large windows",
      },
    ],
  },

  // ── Lead form ─────────────────────────────────────────────────────────
  form: {
    provider: "formspree",
    endpoint: "", // ← paste the client's Formspree endpoint here. Blank = demo mode.
    successTitle: "Thank you! Your request is in.",
    successMessage:
      "Someone from {name} will reach out to talk through your project and help you get started.",
    errorMessage:
      "Sorry, we couldn't send your request. Please try again, or call us and we'll take care of it.",
  },

  // ── SEO / launch ──────────────────────────────────────────────────────
  seo: {
    siteUrl: "",
    indexable: false,
  },
};

/**
 * Notes that belong to the client file but must NEVER be shown on the website.
 * Nothing imports this object, so it is dropped from the production bundle.
 * (Lead alerts themselves are configured in the Formspree dashboard.)
 */
export const internal = {
  /** Mobile number that should receive new-lead alerts. Reference only. */
  leadNotificationPhone: "",
};

// ─────────────────────────────────────────────────────────────────────────
//  Derived helpers (no need to edit below this line)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Derive a clickable `tel:` href from a display phone number.
 * 10-digit US numbers get a +1 prefix; 11-digit numbers are used as-is.
 */
export function toPhoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+1${digits}`;
  return `tel:+${digits}`;
}

/** Phone number as shown on screen. */
export const phoneDisplay = business.contact.displayPhone || business.contact.phone;
/** `tel:` link for every call-to-action. */
export const phoneHref = toPhoneHref(business.contact.phone);
/** Handyman & property services line ("" when not configured). */
export const handymanPhoneDisplay = business.contact.secondaryPhone;
export const handymanPhoneHref = business.contact.secondaryPhone
  ? toPhoneHref(business.contact.secondaryPhone)
  : "";
/** Name used in the © line / structured data. */
export const legalName = business.legalName || business.name;

/** True when the lead form has a real endpoint and will really send. */
export const formIsLive = business.form.provider === "formspree" && !!business.form.endpoint.trim();

/** Site origin without a trailing slash ("" when not configured). */
export const siteUrl = business.seo.siteUrl.trim().replace(/\/+$/, "");

/** Absolute URL for a site path, or "" when no `siteUrl` is configured. */
export function absoluteUrl(path: string): string {
  if (!siteUrl) return "";
  return `${siteUrl}${path}`;
}

/** "City, ST" when both are configured, otherwise whichever exists, otherwise "". */
export function primaryLocationLabel(): string {
  const { primaryCity, state } = business.location;
  return [primaryCity, state].filter(Boolean).join(", ");
}

/** Cities/areas for display & structured data (primary first, no duplicates). */
export function allServiceAreas(): string[] {
  const { primaryCity, serviceAreas } = business.location;
  return Array.from(new Set([primaryCity, ...serviceAreas].filter(Boolean)));
}
