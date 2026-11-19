import { Link } from "@tanstack/react-router";
import { IMG } from "@/lib/images";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

/**
 * Confirmed before/after pairs only. A pair is listed here when both photos show the
 * same space with matching visual evidence (e.g. the same fixtures and products).
 *
 * Pair 1: unnamed-1.jpg (rust-streaked shower wall) → unnamed-3.jpg (same shower, same
 * brass valve and the same Nivea / purple pump bottles on the seat; the streak is gone).
 * The two photos are taken from different angles, so they are shown side by side rather
 * than in an overlay slider.
 */
const PAIRS = [
  {
    title: "Shower wall",
    before: {
      src: IMG.clientShowerBefore,
      alt: "Before: shower wall with an orange rust-colored streak beneath the brass valve",
    },
    after: {
      src: IMG.clientShowerClean2,
      alt: "After: the same shower with clean white walls and no streak",
    },
  },
];

function Frame({
  src,
  alt,
  label,
  tone,
}: {
  src: string;
  alt: string;
  label: "Before" | "After";
  tone: "before" | "after";
}) {
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-border shadow-sm">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={1050}
        height={1400}
        className="aspect-[4/5] w-full object-cover object-[center_35%] sm:aspect-[3/4]"
      />
      <figcaption
        className={`absolute left-3 top-3 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] shadow-md ${
          tone === "after" ? "bg-brand text-brand-foreground" : "bg-primary text-primary-foreground"
        }`}
      >
        {label}
      </figcaption>
    </figure>
  );
}

export function BeforeAfterSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Before & After"
          title="See the Difference"
          description="A closer look at the spaces we've helped care for."
        />

        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-12">
          {PAIRS.map((p) => (
            <Reveal key={p.title}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <Frame {...p.before} label="Before" tone="before" />
                <Frame {...p.after} label="After" tone="after" />
              </div>
              <p className="mt-4 text-center font-serif text-base italic text-muted-foreground">
                {p.title}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
          >
            View Our Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
