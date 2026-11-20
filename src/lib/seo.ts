// SEO helpers. Every route builds its <head> through `pageHead()` so titles,
// descriptions, canonical URLs, Open Graph tags, robots directives and
// structured data are all generated from business.ts / services.ts.

import {
  absoluteUrl,
  allServiceAreas,
  business,
  legalName,
  phoneDisplay,
  siteUrl,
} from "./business";
import { services, type Service } from "./services";

type Meta = Record<string, string>;
type Link = Record<string, string>;
type Script = { type: string; children: string };

export interface PageHeadInput {
  /** Page title WITHOUT the business name; "| Business Name" is appended. */
  title: string;
  /** Use the title exactly as given (homepage). */
  rawTitle?: boolean;
  description: string;
  /** Route path, e.g. "/about". Needed for the canonical URL. */
  path: string;
  /** Image path for og:image (defaults to the site-wide image). */
  image?: string | undefined;
  /** Force noindex (legal pages etc.). */
  noindex?: boolean;
  jsonLd?: object[];
}

/** Site is hidden from search engines until seo.indexable is true AND a siteUrl exists. */
export const siteIsIndexable = business.seo.indexable && !!siteUrl;

function imageUrl(path: string | undefined): string {
  const p = path || business.images.ogImage || business.images.hero.src;
  if (/^https?:\/\//.test(p)) return p;
  return absoluteUrl(p);
}

export function pageHead({
  title,
  rawTitle,
  description,
  path,
  image,
  noindex,
  jsonLd,
}: PageHeadInput) {
  const fullTitle = rawTitle ? title : `${title} | ${business.name}`;
  const canonical = absoluteUrl(path);
  const ogImage = imageUrl(image);

  const meta: Meta[] = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: business.name },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:card", content: ogImage ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];
  if (canonical) meta.push({ property: "og:url", content: canonical });
  if (ogImage) {
    meta.push({ property: "og:image", content: ogImage });
    meta.push({ name: "twitter:image", content: ogImage });
  }
  if (!siteIsIndexable || noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  const links: Link[] = [];
  if (canonical) links.push({ rel: "canonical", href: canonical });

  const scripts: Script[] = (jsonLd ?? []).map((data) => ({
    type: "application/ld+json",
    // "<" escaped so a stray "</script>" in business copy can never break out of the tag.
    children: JSON.stringify(data).replace(/</g, "\\u003c"),
  }));

  return { meta, links, scripts };
}

// ── Default descriptions ────────────────────────────────────────────────

const loc = () => {
  const { primaryCity, state } = business.location;
  return primaryCity ? ` in ${[primaryCity, state].filter(Boolean).join(", ")}` : "";
};

/** Short brand used as the title suffix (the legal "LLC" name stays in structured data and the footer). */
export const BRAND_SHORT = "Lucas Property Solutions";

export function homeTitle(): string {
  return `House Cleaning, Handyman & Junk Removal in Bremen, IN | ${BRAND_SHORT}`;
}

export function homeDescription(): string {
  return "Family-owned house cleaning, handyman, and junk removal in Bremen, Indiana and nearby Plymouth, Elkhart, and South Bend. Insured and bonded. Free estimates.";
}

export function serviceTitle(s: Service): string {
  return s.seoTitle ?? `${s.title}${loc()} | ${business.name}`;
}

export function serviceDescription(s: Service): string {
  return (
    s.seoDescription ??
    `${s.title} from ${business.name}${loc()}. ${s.short} Request a free estimate.`
  );
}

// ── Structured data ─────────────────────────────────────────────────────

const SOCIAL_KEYS = Object.keys(business.social) as (keyof typeof business.social)[];

/** schema.org LocalBusiness. Only includes facts that are configured – never ratings or review counts. */
export function localBusinessJsonLd(): object {
  const { contact } = business;
  const addr = contact.address;
  const hasAddress = contact.showAddress && (addr.street || addr.city);
  const sameAs = [
    ...SOCIAL_KEYS.map((k) => business.social[k]),
    business.googleBusinessProfileUrl,
  ].filter(Boolean);
  const areas = allServiceAreas();

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": business.schemaType,
    "@id": absoluteUrl("/") ? `${absoluteUrl("/")}#business` : undefined,
    name: business.name,
    legalName: legalName !== business.name ? legalName : undefined,
    description: business.description,
    url: absoluteUrl("/") || undefined,
    telephone: contact.phone || phoneDisplay,
    contactPoint: [
      contact.phone
        ? {
            "@type": "ContactPoint",
            contactType: contact.phoneLabel,
            telephone: toTel(contact.phone),
          }
        : undefined,
      contact.secondaryPhone
        ? {
            "@type": "ContactPoint",
            contactType: contact.secondaryPhoneLabel,
            telephone: toTel(contact.secondaryPhone),
          }
        : undefined,
    ].filter(Boolean),
    email: contact.email || undefined,
    openingHoursSpecification: contact.hours.length ? hoursSpec(contact.hours) : undefined,
    image: imageUrl(undefined) || undefined,
    logo: absoluteUrl(business.branding.logo.src) || undefined,
    address: hasAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: addr.street || undefined,
          addressLocality: addr.city || undefined,
          addressRegion: addr.state || undefined,
          postalCode: addr.postalCode || undefined,
          addressCountry: "US",
        }
      : undefined,
    areaServed: areas.length ? areas.map((name) => ({ "@type": "City", name })) : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
    hasOfferCatalog: services.length
      ? {
          "@type": "OfferCatalog",
          name: `${business.name} services`,
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.short },
          })),
        }
      : undefined,
  };
  return stripUndefined(data);
}

export function serviceJsonLd(s: Service): object {
  const areas = allServiceAreas();
  return stripUndefined({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.intro,
    serviceType: s.title,
    url: absoluteUrl(`/services/${s.slug}`) || undefined,
    image: s.heroImage ? absoluteUrl(s.heroImage) || undefined : undefined,
    provider: {
      "@type": business.schemaType,
      name: business.name,
      url: absoluteUrl("/") || undefined,
      telephone:
        s.category !== "clean" && business.contact.secondaryPhone
          ? business.contact.secondaryPhone
          : business.contact.phone,
    },
    areaServed: areas.length ? areas.map((name) => ({ "@type": "City", name })) : undefined,
  });
}

export function faqJsonLd(faqs: { q: string; a: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function toTel(phone: string): string {
  const d = phone.replace(/\D/g, "");
  return d.length === 10 ? `+1${d}` : `+${d}`;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** Converts display hours like "Monday–Friday" / "8:00 AM–5:00 PM" into schema.org. Empty when unparseable. */
function hoursSpec(hours: { days: string; hours: string }[]): object[] | undefined {
  const to24 = (t: string) => {
    const m = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
    if (!m) return "";
    let h = Number(m[1]) % 12;
    if ((m[3] ?? "").toUpperCase() === "PM") h += 12;
    return `${String(h).padStart(2, "0")}:${m[2] ?? "00"}`;
  };
  const out: object[] = [];
  for (const h of hours) {
    const [d1, d2] = h.days.split(/[–-]/).map((d) => d.trim());
    const [open, close] = h.hours.split(/[–-]/).map(to24);
    const a = DAYS.indexOf(d1 ?? "");
    const b = d2 ? DAYS.indexOf(d2) : a;
    if (a < 0 || b < a || !open || !close) continue;
    out.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAYS.slice(a, b + 1),
      opens: open,
      closes: close,
    });
  }
  return out.length ? out : undefined;
}

function stripUndefined<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

// ── Brand-color override (injected as a <style> tag when configured) ────

export function brandColorCss(): string {
  const { primary, primaryForeground, secondary, accent } = business.branding.colors;
  const decl: string[] = [];
  if (primary) {
    decl.push(
      `--primary:${primary}`,
      `--ring:${primary}`,
      `--secondary-foreground:${primary}`,
      `--accent-foreground:${primary}`,
    );
  }
  if (primaryForeground) decl.push(`--primary-foreground:${primaryForeground}`);
  if (secondary) decl.push(`--secondary:${secondary}`);
  if (accent) decl.push(`--accent:${accent}`);
  return decl.length ? `:root{${decl.join(";")}}` : "";
}
