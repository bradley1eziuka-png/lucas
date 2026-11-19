import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { featuredReviews, type Review } from "@/lib/reviews";
import { cn } from "@/lib/utils";

export const REVIEWS_NOTE =
  "Testimonials shared by our customers and transcribed from Lucas Property Solutions' promotional materials. They are not verified third-party platform reviews.";

const AUTOPLAY_MS = 5500;

/** One testimonial, in the template's existing review-card style. */
export function ReviewCard({ review, stars = false }: { review: Review; stars?: boolean }) {
  return (
    <figure className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-8">
      <span aria-hidden className="pointer-events-none absolute -left-4 -top-4 text-brand/10">
        <Quote className="h-20 w-20" />
      </span>
      {stars ? (
        <div aria-hidden className="relative mb-4 flex gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" strokeWidth={1.5} />
          ))}
        </div>
      ) : null}
      <blockquote className="relative flex-1 text-pretty text-base font-medium leading-relaxed text-foreground">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="relative mt-5 border-t border-border pt-4 font-serif text-base italic text-muted-foreground">
        &mdash; {review.name}
      </figcaption>
    </figure>
  );
}

function ReviewsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    const onInit = () => {
      setSnaps(emblaApi.scrollSnapList());
      onSelect();
    };
    onInit();
    emblaApi.on("select", onSelect).on("reInit", onInit);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onInit);
    };
  }, [emblaApi]);

  // Autoplay: paused on hover / focus / while touching, and disabled for reduced motion.
  useEffect(() => {
    if (!emblaApi || paused || reduceMotion) return;
    const id = window.setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [emblaApi, paused, reduceMotion, selected]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  }

  const arrow =
    "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground/70 shadow-sm transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-6 flex" aria-live={paused || reduceMotion ? "polite" : "off"}>
          {featuredReviews.map((r, i) => (
            <div
              key={r.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${featuredReviews.length}`}
              className="min-w-0 shrink-0 grow-0 basis-full pb-4 pl-6 md:basis-1/2 lg:basis-1/3"
            >
              <ReviewCard review={r} stars />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button type="button" onClick={prev} aria-label="Previous testimonial" className={arrow}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1" role="group" aria-label="Choose testimonial">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === selected ? "true" : undefined}
              className="flex h-6 w-6 items-center justify-center"
            >
              <span
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === selected ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/40",
                )}
              />
            </button>
          ))}
        </div>
        <button type="button" onClick={next} aria-label="Next testimonial" className={arrow}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Customer Experience"
          title="Kind Words from Our Customers"
          description="Here's what customers say about April's cleaning."
        />

        <div className="mt-12">
          <ReviewsCarousel />
        </div>

        <Reveal delay={120} className="mx-auto mt-8 max-w-3xl text-center">
          <Link
            to="/reviews"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
          >
            Read More Reviews
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
