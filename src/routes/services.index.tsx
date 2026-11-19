import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, servicesByCategory, services } from "@/lib/services";
import { ServiceIconPanel } from "@/components/service-icon";
import { business } from "@/lib/business";
import { pageHead } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { FinalCta } from "@/components/final-cta";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/services/")({
  head: () =>
    pageHead({
      title: "Cleaning, Handyman & Junk Removal Services",
      description: `Explore ${business.name}'s services in Bremen, IN: ${services
        .map((s) => s.title.toLowerCase())
        .join(", ")}. Request a free estimate.`,
      path: "/services",
      image: business.images.servicesHero.src,
    }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Clean It. Fix It. Clear It."
        description="Residential cleaning, handyman services, and junk removal and property cleanouts, all from one family-owned business in Bremen, Indiana."
        image={business.images.servicesHero.src}
        imageAlt={business.images.servicesHero.alt}
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {CATEGORIES.map((c) => (
            <div key={c.id} className="mb-14 last:mb-0">
              <div className="flex flex-col gap-1 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  <span className="text-brand">{c.label}</span>
                  <span className="mx-2 text-border">/</span>
                  <span className="text-lg font-semibold sm:text-xl">{c.title}</span>
                </h2>
                <p className="text-sm text-muted-foreground">{c.blurb}</p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {servicesByCategory(c.id).map((s, i) => (
                  <Reveal key={s.slug} delay={(i % 3) * 90}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(18,59,86,0.4)]"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {s.image ? (
                          <img
                            src={s.image}
                            alt={s.imageAlt}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <ServiceIconPanel
                            icon={s.icon}
                            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {s.card}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
                          Learn More <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
