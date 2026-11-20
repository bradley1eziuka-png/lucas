import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Check,
  Clock,
  Heart,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { business } from "@/lib/business";
import { pageHead, BRAND_SHORT } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { FinalCta } from "@/components/final-cta";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: `About April & Guy Lucas | Family-Owned in Bremen, IN | ${BRAND_SHORT}`,
      rawTitle: true,
      description:
        "Meet April and Guy Lucas, the family behind Lucas Property Solutions in Bremen, Indiana. Insured and bonded, with April's 25 years of cleaning experience.",
      path: "/about",
      image: business.images.about.src,
    }),
  component: AboutPage,
});

const ICONS = {
  sparkles: Sparkles,
  clock: Clock,
  heart: Heart,
  message: MessageSquareText,
  shield: ShieldCheck,
  search: Search,
  wrench: Wrench,
};

const POINTS = [
  "More than 25 years of professional cleaning experience",
  "Family-owned and operated",
  "Insured and bonded; references available upon request",
  "Cleaning, handyman, and cleanout help from one business",
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Meet April & Guy Lucas"
        description="A family-owned business helping homeowners in Bremen, Indiana and surrounding communities keep their properties clean, maintained, and comfortable."
        image={business.images.about.src}
        imageAlt={business.images.about.alt}
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Why Choose Us
            </span>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Your Home Deserves Reliable, Personalized Care
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Clean it. Fix it. Clear it. Lucas Property Solutions LLC gives homeowners one
              dependable place to turn for cleaning, minor repairs, and property cleanouts, with the
              personalized customer service April&rsquo;s cleaning business has always been known
              for.
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-foreground">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link to="/contact">Get a Free Estimate</Link>
              </Button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
            {business.differentiators.map((v, i) => {
              const Icon = ICONS[v.icon];
              return (
                <Reveal key={v.title} delay={i * 90}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{v.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {v.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {business.foundingStory ? (
        <section className="border-t border-border bg-secondary/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="mx-auto max-w-3xl">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Our Story
            </span>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              How Lucas Property Solutions got started
            </h2>
            {business.foundingStory
              .split(/\n{2,}/)
              .filter(Boolean)
              .map((para) => (
                <p
                  key={para}
                  className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
                >
                  {para}
                </p>
              ))}
          </Reveal>
        </section>
      ) : null}

      <FinalCta />
    </>
  );
}
