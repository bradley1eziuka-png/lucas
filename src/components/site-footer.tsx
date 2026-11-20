import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import {
  allServiceAreas,
  business,
  handymanPhoneDisplay,
  handymanPhoneHref,
  legalName,
  phoneDisplay,
  phoneHref,
} from "@/lib/business";
import { CATEGORIES, servicesByCategory } from "@/lib/services";
import { SiteLogo } from "@/components/site-logo";

const SOCIAL_LABELS = [
  ["facebook", "Facebook"],
  ["instagram", "Instagram"],
  ["youtube", "YouTube"],
  ["tiktok", "TikTok"],
  ["linkedin", "LinkedIn"],
  ["x", "X"],
  ["nextdoor", "Nextdoor"],
  ["yelp", "Yelp"],
] as const;

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "Pricing & Estimate Calculator", to: "/pricing" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteFooter() {
  const { contact } = business;
  const socials = SOCIAL_LABELS.map(([key, label]) => ({
    label,
    href: business.social[key],
  })).filter((s) => s.href);
  const year = new Date().getFullYear();
  const areas = allServiceAreas();

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <SiteLogo imgClassName="h-28" />
            <p className="mt-4 font-serif text-base italic text-foreground/80">
              {business.tagline}
            </p>
            <p className="mt-1 text-sm font-semibold text-brand">{business.tagline2}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {business.description}
            </p>
            {socials.length ? (
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-4">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
                    {c.label}
                  </p>
                  <ul className="mt-1.5 flex flex-col gap-1.5">
                    {servicesByCategory(c.id).map((sv) => (
                      <li key={sv.slug}>
                        <Link
                          to="/services/$slug"
                          params={{ slug: sv.slug }}
                          className="text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {sv.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3.5 text-sm text-muted-foreground">
              <li>
                <span className="block text-xs font-semibold text-foreground">
                  {contact.phoneLabel}
                </span>
                <a
                  href={phoneHref}
                  className="inline-flex min-h-9 items-center gap-2 font-semibold tabular-nums text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  {phoneDisplay}
                </a>
              </li>
              {handymanPhoneDisplay ? (
                <li>
                  <span className="block text-xs font-semibold text-foreground">
                    {contact.secondaryPhoneLabel}
                  </span>
                  <a
                    href={handymanPhoneHref}
                    className="inline-flex min-h-9 items-center gap-2 font-semibold tabular-nums text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    {handymanPhoneDisplay}
                  </a>
                </li>
              ) : null}
              {contact.email ? (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 break-all hover:text-primary"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {contact.showAddress && contact.address.street ? (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {contact.address.street}
                    <br />
                    {contact.address.city}, {contact.address.state} {contact.address.postalCode}
                  </span>
                </li>
              ) : null}
              {contact.hours.length ? (
                <li className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <span className="block text-xs font-semibold text-foreground">
                      Business Hours
                    </span>
                    {contact.hours.map((h) => (
                      <span key={h.days} className="block">
                        {h.days}
                        <br />
                        {h.hours}
                      </span>
                    ))}
                  </span>
                </li>
              ) : null}
            </ul>
            <Link
              to="/contact"
              className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get a Free Estimate
            </Link>
          </div>
        </div>

        {areas.length ? (
          <p className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Proudly serving: </span>
            {areas.join(", ")}, Indiana.
          </p>
        ) : null}

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            &copy; {year} {legalName}. All rights reserved.
          </p>
          <p className="text-center text-xs text-muted-foreground sm:text-right">
            <a
              href="https://getarclo.com"
              target="_blank"
              rel="noopener"
              className="transition-colors hover:text-primary hover:underline"
            >
              Website by Arclo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
