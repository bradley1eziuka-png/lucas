import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { business, handymanPhoneDisplay, handymanPhoneHref } from "@/lib/business";
import {
  CLEANING_DISCLAIMER,
  CLEANING_SIZES,
  CLEANING_TYPES,
  GENERAL_DISCLAIMER,
  HANDYMAN_ITEMS,
  HOUSE_CALL_NOTE,
  JUNK_LOADS,
  JUNK_SERVICES,
  formatPrice,
} from "@/lib/pricing";
import { pageHead, BRAND_SHORT } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { EstimateCalculator } from "@/components/estimate-calculator";
import { EstimateForm } from "@/components/estimate-form";
import { FinalCta } from "@/components/final-cta";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/pricing")({
  head: () =>
    pageHead({
      title: `Cleaning & Handyman Prices in Bremen, IN | ${BRAND_SHORT}`,
      rawTitle: true,
      description:
        "Starting prices for house cleaning, handyman services, and junk removal in Bremen, Indiana, plus a ballpark estimate calculator. Request an exact quote.",
      path: "/pricing",
      image: business.images.servicesHero.src,
    }),
  component: PricingPage,
});

function PriceTable({
  caption,
  rows,
}: {
  caption: string;
  rows: { label: string; price: string }[];
}) {
  return (
    <table className="w-full text-left text-sm">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
          <th scope="col" className="py-2 pr-3 font-semibold">
            Service
          </th>
          <th scope="col" className="py-2 pl-3 text-right font-semibold">
            Starting price
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} className="border-b border-border/70 last:border-0">
            <th scope="row" className="py-2.5 pr-3 font-medium text-foreground">
              {r.label}
            </th>
            <td className="whitespace-nowrap py-2.5 pl-3 text-right font-bold tabular-nums text-primary">
              {r.price}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Card({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand">{eyebrow}</span>
      <h3 className="mt-1 text-2xl font-bold text-foreground">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 flex gap-2 text-xs leading-relaxed text-muted-foreground">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
      <span>{children}</span>
    </p>
  );
}

function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Clear Starting Prices"
        description="See what our cleaning, handyman, and junk removal services start at, or use the calculator for an instant ballpark."
        image={business.images.servicesHero.src}
        imageAlt={business.images.servicesHero.alt}
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <EstimateCalculator />
      </section>

      <section
        id="price-list"
        className="border-t border-border bg-secondary/30 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Full Price List
            </span>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Advertised Starting Prices
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              All prices are &ldquo;starting at&rdquo; and preliminary. {GENERAL_DISCLAIMER}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal className="lg:col-span-2">
              <Card eyebrow="Clean It" title="Residential Cleaning">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[30rem] text-left text-sm">
                    <caption className="sr-only">
                      Residential cleaning starting prices by property size
                    </caption>
                    <thead>
                      <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                        <th scope="col" className="py-2 pr-3 font-semibold">
                          Property size
                        </th>
                        {CLEANING_TYPES.map((t) => (
                          <th key={t.id} scope="col" className="px-3 py-2 text-right font-semibold">
                            {t.id === "move" ? "Move-In/Out" : t.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CLEANING_SIZES.map((s) => (
                        <tr key={s.id} className="border-b border-border/70 last:border-0">
                          <th
                            scope="row"
                            className="whitespace-nowrap py-2.5 pr-3 font-medium text-foreground"
                          >
                            {s.short}
                          </th>
                          {CLEANING_TYPES.map((t) => (
                            <td
                              key={t.id}
                              className="px-3 py-2.5 text-right font-bold tabular-nums text-primary"
                            >
                              {formatPrice(s.prices[t.id])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Note>{CLEANING_DISCLAIMER}</Note>
              </Card>
            </Reveal>

            <Reveal>
              <Card eyebrow="Fix It" title="Handyman Services">
                <p className="mb-4 rounded-xl bg-brand-soft/70 px-4 py-3 text-sm font-semibold text-foreground">
                  House call: <span className="tabular-nums text-primary">$150</span>{" "}
                  <span className="font-normal text-muted-foreground">
                    (initial assessment, up to one hour)
                  </span>
                </p>
                <PriceTable
                  caption="Handyman starting prices"
                  rows={HANDYMAN_ITEMS.map((h) => ({
                    label: h.label,
                    price: formatPrice(h.price),
                  }))}
                />
                <Note>{HOUSE_CALL_NOTE}</Note>
              </Card>
            </Reveal>

            <Reveal delay={100}>
              <Card eyebrow="Clear It" title="Junk Removal">
                <p className="mb-4 rounded-xl bg-brand-soft/70 px-4 py-3 text-sm font-semibold text-foreground">
                  House call: <span className="tabular-nums text-primary">$150</span>{" "}
                  <span className="font-normal text-muted-foreground">
                    (initial assessment, up to one hour)
                  </span>
                </p>
                <h4 className="mb-1 text-sm font-bold text-foreground">By load size</h4>
                <PriceTable
                  caption="Junk removal starting prices by load size"
                  rows={JUNK_LOADS.map((l) => ({ label: l.label, price: formatPrice(l.price) }))}
                />
                <h4 className="mb-1 mt-6 text-sm font-bold text-foreground">Other services</h4>
                <PriceTable
                  caption="Other junk removal and cleanout starting prices"
                  rows={JUNK_SERVICES.map((j) => ({ label: j.label, price: formatPrice(j.price) }))}
                />
                <Note>
                  {HOUSE_CALL_NOTE} Final pricing may vary. Same-day service may be available;
                  please call to ask
                  {handymanPhoneDisplay ? (
                    <>
                      :{" "}
                      <a
                        href={handymanPhoneHref}
                        className="font-semibold text-primary hover:underline"
                      >
                        {handymanPhoneDisplay}
                      </a>
                    </>
                  ) : null}
                  .
                </Note>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div id="estimate" className="mx-auto max-w-2xl scroll-mt-24">
          <div className="mb-8 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Request Your Exact Quote
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Tell us about your project. If you used the calculator, your selection is included as
              a preliminary ballpark.
            </p>
          </div>
          <EstimateForm
            variant="plain"
            showHeading={false}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7"
          />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
