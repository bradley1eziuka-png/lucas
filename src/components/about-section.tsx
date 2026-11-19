import { Link } from "@tanstack/react-router";
import { Check, Award, ShieldCheck, Users } from "lucide-react";
import { business } from "@/lib/business";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-1 lg:order-none">
            <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_70px_-30px_rgba(18,59,86,0.4)]">
              <img
                src={business.images.about.src}
                alt={business.images.about.alt}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
              />
              <div className="absolute bottom-4 left-4 rounded-xl bg-background/90 px-4 py-3 shadow-md backdrop-blur-sm">
                <p className="font-serif text-sm italic text-foreground/80">
                  &ldquo;Your Home. Our Solutions.&rdquo;
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Why Choose Us
            </span>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.7rem] lg:leading-[1.1]">
              Your Home Deserves Reliable, Personalized Care
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Built on April&rsquo;s more than 25 years of professional cleaning experience, Lucas
              Property Solutions LLC brings a personal approach to caring for your home, from
              routine cleaning to minor repairs and household item removal.
            </p>

            <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {business.differentiators.map((d) => (
                <li
                  key={d.title}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-foreground">{d.title}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/contact">Get a Free Estimate</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center sm:text-left">
              <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-start sm:gap-2">
                <Award className="hidden h-5 w-5 text-brand sm:block" />
                <div>
                  <p className="text-sm font-semibold text-foreground">25 Years</p>
                  <p className="text-xs text-muted-foreground">Cleaning Experience</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-start sm:gap-2">
                <ShieldCheck className="hidden h-5 w-5 text-brand sm:block" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Insured</p>
                  <p className="text-xs text-muted-foreground">&amp; Bonded</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-start sm:gap-2">
                <Users className="hidden h-5 w-5 text-brand sm:block" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Family-Owned</p>
                  <p className="text-xs text-muted-foreground">&amp; Operated</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
