import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const STEPS = [
  {
    num: "01",
    title: "Tell Us What You Need",
    desc: "Choose cleaning, handyman, or junk removal services and describe your project.",
  },
  {
    num: "02",
    title: "Get an Estimate",
    desc: "Use the instant ballpark calculator or request a personalized quote.",
  },
  {
    num: "03",
    title: "We’ll Take Care of the Rest",
    desc: "Schedule the service and let the team handle the cleaning, repairs, or property work.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Simple & Convenient"
          title="Getting Started Takes Three Simple Steps"
        />
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 110}>
              <div className="relative h-full rounded-2xl border border-border bg-card p-7 shadow-sm">
                <span className="font-serif text-4xl italic text-brand/40">{s.num}</span>
                <h3 className="mt-3 text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                {i < STEPS.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute right-7 top-9 hidden h-px w-10 bg-border md:block"
                  />
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
