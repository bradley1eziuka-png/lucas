import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/lib/business";
import { pageHead } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { FinalCta } from "@/components/final-cta";
import { Reveal } from "@/components/reveal";
import { REVIEWS_NOTE, ReviewCard } from "@/components/reviews-section";
import { reviews } from "@/lib/reviews";

export const Route = createFileRoute("/reviews")({
  head: () =>
    pageHead({
      title: "Reviews",
      description: `Read what customers say about April's cleaning and ${business.name}: thorough, dependable, and above and beyond.`,
      path: "/reviews",
      image: business.images.reviewsHero.src,
    }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="Cleaning That Makes a Difference"
        description="Customers describe April as thorough, dependable, and willing to go above and beyond."
        image={business.images.reviewsHero.src}
        imageAlt={business.images.reviewsHero.alt}
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 80} className="break-inside-avoid">
                <ReviewCard review={r} />
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
            {REVIEWS_NOTE}
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
