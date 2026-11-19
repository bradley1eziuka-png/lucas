import { useId, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Info, Sparkles, Trash2, Wrench, type LucideIcon } from "lucide-react";
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
  type CleaningTypeId,
  type Price,
} from "@/lib/pricing";
import { setEstimateSelection, type EstimateSelection } from "@/lib/estimate-selection";
import { handymanPhoneDisplay, handymanPhoneHref } from "@/lib/business";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Tab = "cleaning" | "handyman" | "junk";

const TABS: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: "cleaning", label: "Cleaning", icon: Sparkles },
  { id: "handyman", label: "Handyman", icon: Wrench },
  { id: "junk", label: "Junk Removal", icon: Trash2 },
];

/** Segmented control (radio group semantics) used for cleaning type + junk mode. */
function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="grid gap-2 sm:grid-flow-col sm:auto-cols-fr"
    >
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.id)}
            className={cn(
              "min-h-11 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors",
              on
                ? "border-brand bg-brand text-brand-foreground shadow-sm"
                : "border-border bg-background text-foreground/80 hover:border-primary/30 hover:text-primary",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  options,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="h-11 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.id} value={o.id}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function EstimateCalculator({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const uid = useId();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("cleaning");

  const [size, setSize] = useState(CLEANING_SIZES[1]?.id ?? "");
  const [cleanType, setCleanType] = useState<CleaningTypeId>("standard");
  const [handyId, setHandyId] = useState(HANDYMAN_ITEMS[0]?.id ?? "");
  const [junkMode, setJunkMode] = useState<"load" | "service">("load");
  const [loadId, setLoadId] = useState(JUNK_LOADS[0]?.id ?? "");
  const [junkSvcId, setJunkSvcId] = useState(JUNK_SERVICES[0]?.id ?? "");

  const result = useMemo<{
    price: Price;
    summary: string;
    selection: Omit<EstimateSelection, "price">;
  }>(() => {
    if (tab === "cleaning") {
      const s = CLEANING_SIZES.find((x) => x.id === size);
      const t = CLEANING_TYPES.find((x) => x.id === cleanType);
      const label = s && t ? `${s.label} · ${t.label}` : "Cleaning";
      return {
        price: s?.prices[cleanType] ?? "custom",
        summary: label,
        selection: {
          category: "Cleaning",
          service: label,
          formOption: t?.formOption ?? "Residential Cleaning",
        },
      };
    }
    if (tab === "handyman") {
      const h = HANDYMAN_ITEMS.find((x) => x.id === handyId);
      const label = h?.label ?? "Handyman service";
      return {
        price: h?.price ?? "custom",
        summary: label,
        selection: {
          category: "Handyman",
          service: label,
          formOption: h?.formOption ?? "Handyman Services",
        },
      };
    }
    if (junkMode === "load") {
      const l = JUNK_LOADS.find((x) => x.id === loadId);
      const label = l?.label ?? "Junk removal";
      return {
        price: l?.price ?? "custom",
        summary: label,
        selection: { category: "Junk Removal", service: label, formOption: "Junk Removal" },
      };
    }
    const j = JUNK_SERVICES.find((x) => x.id === junkSvcId);
    const label = j?.label ?? "Junk removal";
    return {
      price: j?.price ?? "custom",
      summary: label,
      selection: {
        category: "Junk Removal",
        service: label,
        formOption: j?.formOption ?? "Junk Removal",
      },
    };
  }, [tab, size, cleanType, handyId, junkMode, loadId, junkSvcId]);

  const isCustom = result.price === "custom";
  const priceLabel = isCustom
    ? "Custom Quote"
    : `Starting at ${formatPrice(result.price).replace("+", "")}`;
  const phoneNote = tab !== "cleaning";

  function requestQuote() {
    setEstimateSelection({ ...result.selection, price: priceLabel });
    const target = typeof document !== "undefined" ? document.getElementById("estimate") : null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        target.querySelector<HTMLElement>("input, button[role='combobox'], textarea")?.focus({
          preventScroll: true,
        });
      }, 450);
    } else {
      void navigate({ to: "/contact", hash: "estimate" });
    }
  }

  const Heading = headingLevel;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Ballpark Estimate
        </span>
        <Heading className="text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.7rem] lg:leading-[1.1]">
          Get an Instant Ballpark Estimate
        </Heading>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Get an idea of what your project may cost. Select your service and a few details to see
          our starting prices.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-[0_18px_45px_-20px_rgba(18,59,86,0.28)]">
        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Estimate category"
          className="grid grid-cols-3 gap-1 border-b border-border bg-secondary/60 p-1.5"
        >
          {TABS.map(({ id, label, icon: Icon }) => {
            const on = tab === id;
            return (
              <button
                key={id}
                id={`${uid}-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={`${uid}-panel`}
                onClick={() => setTab(id)}
                className={cn(
                  "flex min-h-12 items-center justify-center gap-2 rounded-xl px-2 text-sm font-semibold transition-colors sm:text-base",
                  on
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground/70 hover:bg-background hover:text-primary",
                )}
              >
                <Icon className={cn("hidden h-4 w-4 sm:block", on && "text-brand-soft")} />
                {label}
              </button>
            );
          })}
        </div>

        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${tab}`}
          className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]"
        >
          {/* Inputs */}
          <div className="flex flex-col gap-5">
            {tab === "cleaning" ? (
              <>
                <Field
                  label="Property size"
                  id={`${uid}-size`}
                  value={size}
                  onChange={setSize}
                  options={CLEANING_SIZES.map((s) => ({ id: s.id, label: s.label }))}
                />
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">Cleaning type</span>
                  <div className="grid gap-2">
                    <Segmented
                      label="Cleaning type"
                      value={cleanType}
                      onChange={setCleanType}
                      options={CLEANING_TYPES.map((t) => ({ id: t.id, label: t.label }))}
                    />
                  </div>
                </div>
              </>
            ) : null}

            {tab === "handyman" ? (
              <Field
                label="Handyman service"
                id={`${uid}-handy`}
                value={handyId}
                onChange={setHandyId}
                options={HANDYMAN_ITEMS.map((h) => ({ id: h.id, label: h.label }))}
              />
            ) : null}

            {tab === "junk" ? (
              <>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">Estimate by</span>
                  <Segmented
                    label="Estimate by"
                    value={junkMode}
                    onChange={setJunkMode}
                    options={[
                      { id: "load", label: "Load size" },
                      { id: "service", label: "Specific service" },
                    ]}
                  />
                </div>
                {junkMode === "load" ? (
                  <Field
                    label="Load size"
                    id={`${uid}-load`}
                    value={loadId}
                    onChange={setLoadId}
                    options={JUNK_LOADS.map((l) => ({ id: l.id, label: l.label }))}
                  />
                ) : (
                  <Field
                    label="Service"
                    id={`${uid}-junk`}
                    value={junkSvcId}
                    onChange={setJunkSvcId}
                    options={JUNK_SERVICES.map((j) => ({ id: j.id, label: j.label }))}
                  />
                )}
              </>
            ) : null}
          </div>

          {/* Result */}
          <div className="flex flex-col rounded-2xl border border-brand/25 bg-brand-soft/60 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Your ballpark
            </p>
            <p className="mt-1 text-sm text-foreground/75">{result.summary}</p>
            <p
              className="mt-3 text-4xl font-extrabold tabular-nums text-primary sm:text-[2.6rem]"
              aria-live="polite"
              aria-atomic="true"
              data-testid="estimate-price"
            >
              {priceLabel}
            </p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">
              {isCustom
                ? "Pricing for this service is quoted individually."
                : "A starting price, not a guaranteed quote."}
            </p>

            <button
              type="button"
              onClick={requestQuote}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
            >
              Request My Exact Quote
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="flex flex-col gap-2.5 border-t border-border bg-secondary/40 px-5 py-4 text-xs leading-relaxed text-muted-foreground sm:px-8">
          {tab === "cleaning" ? (
            <p className="flex gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
              {CLEANING_DISCLAIMER}
            </p>
          ) : (
            <p className="flex gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
              <span>
                {HOUSE_CALL_NOTE}
                {tab === "junk" ? " Same-day service may be available; please call to ask." : ""}
              </span>
            </p>
          )}
          <p className="flex gap-2">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
            {GENERAL_DISCLAIMER}
          </p>
          {phoneNote && handymanPhoneDisplay ? (
            <p className="pl-5">
              Questions? Call{" "}
              <a
                href={handymanPhoneHref}
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                {handymanPhoneDisplay}
              </a>
              .
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
