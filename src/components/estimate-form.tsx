import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, RotateCcw, X } from "lucide-react";
import {
  business,
  handymanPhoneDisplay,
  handymanPhoneHref,
  phoneDisplay,
  phoneHref,
} from "@/lib/business";
import { setEstimateSelection, useEstimateSelection } from "@/lib/estimate-selection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Service dropdown options. Each service in services.ts and each calculator choice maps to one of these. */
export const SERVICE_OPTIONS = [
  "Residential Cleaning",
  "Deep Cleaning",
  "Recurring Cleaning",
  "Move-In / Move-Out Cleaning",
  "Real Estate Cleaning & Staging",
  "Organizing / Decluttering",
  "Handyman Services",
  "Minor Home Repairs",
  "TV / Fixture Installation",
  "Junk Removal",
  "Property / Estate Cleanout",
  "Other",
];

type FormState = {
  fullName: string;
  phone: string;
  service: string;
  message: string;
};

type Errors = Partial<Record<"fullName" | "phone" | "service", string>>;
type Status = "idle" | "sending" | "success" | "error";

/** Basic phone check: 10–15 digits once punctuation is stripped. */
function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function validate(v: FormState): Errors {
  const errors: Errors = {};
  if (!v.fullName.trim()) errors.fullName = "Please enter your name.";
  if (!v.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!isValidPhone(v.phone)) errors.phone = "Please enter a valid phone number.";
  if (!v.service) errors.service = "Please choose a service.";
  return errors;
}

const SUBMIT_TIMEOUT_MS = 20000;

/** Which page the request came from (sent to Formspree as `form_source`). */
function describeSource(hasEstimate: boolean): string {
  if (typeof window === "undefined") return "Website";
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  let where: string;
  if (path === "/") where = "Homepage";
  else if (path === "/contact") where = "Contact page";
  else if (path === "/pricing") where = "Pricing page";
  else if (path.startsWith("/services/")) {
    where = `Service page (${path.slice("/services/".length)})`;
  } else where = `Page ${path}`;
  return hasEstimate ? `${where} via Estimate Calculator` : where;
}

export function EstimateForm({
  id,
  variant = "card",
  className = "",
  defaultService = "",
  showHeading = true,
  submitLabel = "Request My Free Estimate",
}: {
  id?: string;
  variant?: "card" | "plain";
  className?: string;
  /** Preselects a service (used on individual service pages). Must match a SERVICE_OPTIONS entry. */
  defaultService?: string;
  /** Hide the "Get a Free Estimate" heading when the surrounding section already has one. */
  showHeading?: boolean;
  /** Label of the submit button (service pages use a service-specific call to action). */
  submitLabel?: string;
}) {
  const uid = useId();
  const emptyState: FormState = { fullName: "", phone: "", service: defaultService, message: "" };
  const [values, setValues] = useState<FormState>(emptyState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [attempted, setAttempted] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const selection = useEstimateSelection();

  // A choice made in the ballpark calculator preselects the matching service.
  useEffect(() => {
    if (selection) setValues((prev) => ({ ...prev, service: selection.formOption }));
  }, [selection]);
  const inFlight = useRef(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (attempted) setErrors(validate(next));
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (inFlight.current || status === "sending") return; // block duplicate submissions

    setAttempted(true);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Bots fill the hidden field; humans never see it. Send nothing.
    if (honeypot.current?.value) {
      setStatus("success");
      return;
    }

    const endpoint = business.form.endpoint.trim();
    // No endpoint configured: never report a false success. Show the call-us fallback instead.
    if (!endpoint) {
      setStatus("error");
      return;
    }

    inFlight.current = true;
    setStatus("sending");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        signal: controller.signal,
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.fullName.trim(),
          phone: values.phone.trim(),
          service: values.service,
          message: values.message.trim(),
          // Preliminary ballpark shown by the calculator (not a quoted amount). Blank if unused.
          form_source: describeSource(!!selection),
          estimate_category: selection?.category ?? "",
          estimate_service: selection?.service ?? "",
          estimate_starting_price: selection ? `${selection.price} (preliminary, not a quote)` : "",
          estimate_note: selection
            ? "Preliminary ballpark from the website calculator. Not a quote or a guarantee."
            : "",
          _subject: `New estimate request from ${values.fullName.trim()} (${values.service})`,
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      // Only a confirmed 2xx from Formspree counts as success. Anything else keeps the form as is.
      let accepted = res.ok;
      if (accepted) {
        try {
          const data: unknown = await res.json();
          if (data && typeof data === "object" && "ok" in data && data.ok === false) {
            accepted = false;
          }
        } catch {
          // A 2xx without a JSON body is still an accepted submission.
        }
      }
      if (accepted) {
        setValues(emptyState);
        setEstimateSelection(null);
        setErrors({});
        setAttempted(false);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timer);
      inFlight.current = false;
    }
  }

  function reset() {
    setValues(emptyState);
    setEstimateSelection(null);
    setErrors({});
    setAttempted(false);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        className={`flex flex-col items-center rounded-2xl border border-border bg-card text-center shadow-sm ${
          variant === "card" ? "p-7 sm:p-8" : "p-6"
        } ${className}`}
        role="status"
        aria-live="polite"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-foreground">{business.form.successTitle}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {business.form.successMessage.replace("{name}", business.name)}
        </p>
        <Button type="button" variant="outline" className="mt-6" onClick={reset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Send another request
        </Button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Free estimate request form"
      aria-busy={sending}
      className={`flex flex-col gap-4 ${
        variant === "card"
          ? "rounded-2xl border border-border bg-card p-6 shadow-[0_18px_45px_-20px_rgba(18,59,86,0.28)] sm:p-7"
          : ""
      } ${className}`}
    >
      {showHeading ? (
        <div className="flex flex-col gap-1.5">
          <h3 className="text-xl font-bold text-foreground">Get a Free Estimate</h3>
          <p className="text-sm text-muted-foreground">
            Tell us a little about your project and we&rsquo;ll help you get started.
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        {selection ? (
          <div
            role="status"
            className="flex items-start gap-3 rounded-xl border border-brand/25 bg-brand-soft/60 p-3 text-sm"
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">
                Your ballpark: {selection.category} &middot; {selection.price}
              </p>
              <p className="mt-0.5 break-words text-xs text-muted-foreground">
                {selection.service}. Preliminary starting price, not a quote. We&rsquo;ll confirm
                the exact price.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEstimateSelection(null)}
              aria-label="Remove ballpark estimate from request"
              className="-m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-background hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${uid}-name`} className="text-sm font-medium">
            Full Name <span className="text-primary">*</span>
          </Label>
          <Input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className="h-11"
            required
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? `${uid}-name-err` : undefined}
            disabled={sending}
          />
          {errors.fullName ? (
            <p id={`${uid}-name-err`} className="text-xs font-medium text-destructive">
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${uid}-phone`} className="text-sm font-medium">
            Phone Number <span className="text-primary">*</span>
          </Label>
          <Input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(555) 123-4567"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="h-11"
            required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
            disabled={sending}
          />
          {errors.phone ? (
            <p id={`${uid}-phone-err`} className="text-xs font-medium text-destructive">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${uid}-service`} className="text-sm font-medium">
            Service Needed <span className="text-primary">*</span>
          </Label>
          <Select
            value={values.service}
            onValueChange={(v) => update("service", v)}
            disabled={sending}
          >
            <SelectTrigger
              id={`${uid}-service`}
              className="h-11 w-full"
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? `${uid}-service-err` : undefined}
            >
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service ? (
            <p id={`${uid}-service-err`} className="text-xs font-medium text-destructive">
              {errors.service}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${uid}-message`} className="text-sm font-medium">
            Message / Project Details <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id={`${uid}-message`}
            name="message"
            rows={4}
            placeholder="A few details about your project, size, timing…"
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            className="resize-none"
            disabled={sending}
          />
        </div>

        {/* Spam trap: invisible to people, tempting to bots. */}
        <div aria-hidden className="sr-only">
          <label>
            Leave this field empty
            <input ref={honeypot} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 p-3.5 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            {business.form.errorMessage}{" "}
            <a href={phoneHref} className="font-semibold underline underline-offset-2">
              {phoneDisplay}
            </a>
            {handymanPhoneDisplay ? (
              <>
                {" "}
                or{" "}
                <a href={handymanPhoneHref} className="font-semibold underline underline-offset-2">
                  {handymanPhoneDisplay}
                </a>
              </>
            ) : null}
          </p>
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="mt-1 h-12 w-full text-base font-semibold"
        disabled={sending}
      >
        {sending ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}
