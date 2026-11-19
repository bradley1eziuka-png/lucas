import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, servicesByCategory } from "@/lib/services";
import { ServiceIconPanel } from "@/components/service-icon";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function ServicesSection() {
  return (
    <section id="services" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What We Do"
          title="Clean It. Fix It. Clear It."
          description="Cleaning, handyman work, and property cleanouts from one family-owned business, so caring for your home is easier."
        />

        {CATEGORIES.map((c) => (
          <div key={c.id} className="mt-14 first-of-type:mt-14">
            <div className="flex flex-col gap-1 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="text-2xl font-bold text-foreground">
                <span className="text-brand">{c.label}</span>
                <span className="mx-2 text-border">/</span>
                <span className="text-lg font-semibold sm:text-xl">{c.title}</span>
              </h3>
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
                    <div className="relative aspect-[4/3] overflow-hidden">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {s.card}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:gap-2.5">
                        Learn More
                        <ArrowRight className="h-4 w-4 transition-all" />
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
  );
}
