import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/lib/business";
import { pageHead, BRAND_SHORT } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { FinalCta } from "@/components/final-cta";
import { Reveal } from "@/components/reveal";
import { TRANSFORMATION_VIDEO, TransformationVideo } from "@/components/transformation-video";

export const Route = createFileRoute("/gallery")({
  head: () =>
    pageHead({
      title: `Home Photo Gallery | Cleaning in Bremen, IN | ${BRAND_SHORT}`,
      rawTitle: true,
      description:
        "Browse photos of homes in and around Bremen, Indiana from Lucas Property Solutions, from kitchens and bathrooms to dining and living rooms.",
      path: "/gallery",
      image: business.gallery.images[0]?.src,
    }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="See the Difference a Clean Space Makes"
        description="A look at homes we've cleaned in and around Bremen, Indiana."
        image={business.gallery.images[0]?.src ?? business.images.servicesHero.src}
        imageAlt={business.gallery.images[0]?.alt ?? business.images.servicesHero.alt}
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {business.gallery.isSample ? (
            <div className="mb-8 flex items-center justify-center gap-2">
              <span className="rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground">
                Sample Cleaning Gallery
              </span>
            </div>
          ) : null}
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            <Reveal>
              <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-foreground shadow-sm break-inside-avoid">
                <TransformationVideo />
                <figcaption className="pointer-events-none absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-md">
                  {TRANSFORMATION_VIDEO.label}
                </figcaption>
              </figure>
            </Reveal>
            {business.gallery.images.map((img, i) => (
              <Reveal key={img.src} delay={(i % 3) * 80}>
                <div className="group relative overflow-hidden rounded-2xl border border-border shadow-sm break-inside-avoid">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    width={1050}
                    height={1400}
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-primary/0 opacity-0 transition-opacity duration-300 group-hover:bg-primary/10 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-xs font-medium text-white">{img.alt}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
