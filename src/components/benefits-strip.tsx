import { Sparkles, Wrench, Truck, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Clean It",
    desc: "Detailed residential cleaning, from weekly upkeep to deep cleans.",
  },
  {
    icon: Wrench,
    title: "Fix It",
    desc: "Handyman help with minor repairs, installs, and assembly.",
  },
  {
    icon: Truck,
    title: "Clear It",
    desc: "Junk removal, property cleanouts, and estate help.",
  },
  {
    icon: Users,
    title: "Family-Owned",
    desc: "Personal service from April and Guy Lucas.",
  },
];

export function BenefitsStrip() {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="flex flex-col gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-background text-brand shadow-[0_6px_18px_-10px_rgba(18,59,86,0.4)]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground sm:text-base">{title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
