// ─────────────────────────────────────────────────────────────────────────
//  ADVERTISED PRICING  ← supplied by the client; amounts are "starting at".
//  Every number on the website (calculator + price tables) is read from here.
//  Do not add the $150 house-call fee to any total: the flyer does not say
//  whether it is added, credited, or waived. See HOUSE_CALL_NOTE.
// ─────────────────────────────────────────────────────────────────────────

export const HOUSE_CALL_FEE = 150;
export const HOUSE_CALL_NOTE =
  "A $150 house-call/initial assessment charge (up to one hour) is advertised. Please contact us to confirm how this applies to your project.";
export const GENERAL_DISCLAIMER =
  "Estimates are preliminary starting prices, not a quote or a guarantee. Final pricing may vary with the size, condition, and details of your project.";
export const CLEANING_DISCLAIMER =
  "Final pricing depends on property size, condition, current upkeep, and specific cleaning needs. Cleaning includes general dusting, kitchen, bathroom, and floor cleaning. Carpet cleaning is not included.";

/** A price is a number ("starting at") or the literal "custom". */
export type Price = number | "custom";

export function formatPrice(p: Price): string {
  return p === "custom" ? "Custom Quote" : `$${p.toLocaleString("en-US")}+`;
}

// ── Cleaning ────────────────────────────────────────────────────────────

export const CLEANING_TYPES = [
  {
    id: "standard",
    label: "Standard Cleaning",
    short: "Standard",
    formOption: "Residential Cleaning",
  },
  { id: "deep", label: "Deep Cleaning", short: "Deep", formOption: "Deep Cleaning" },
  {
    id: "move",
    label: "Move-In / Move-Out Cleaning",
    short: "Move-In/Out",
    formOption: "Move-In / Move-Out Cleaning",
  },
] as const;
export type CleaningTypeId = (typeof CLEANING_TYPES)[number]["id"];

export const CLEANING_SIZES: {
  id: string;
  label: string;
  short: string;
  prices: Record<CleaningTypeId, Price>;
}[] = [
  {
    id: "2-1",
    label: "2 bedrooms / 1 bathroom",
    short: "2 Bed / 1 Bath",
    prices: { standard: 200, deep: 250, move: 275 },
  },
  {
    id: "3-2",
    label: "3 bedrooms / 2 bathrooms",
    short: "3 Bed / 2 Bath",
    prices: { standard: 300, deep: 350, move: 400 },
  },
  {
    id: "4-3",
    label: "4 bedrooms / 3 bathrooms",
    short: "4 Bed / 3 Bath",
    prices: { standard: 400, deep: 475, move: 550 },
  },
  {
    id: "5-4",
    label: "5+ bedrooms / 4+ bathrooms",
    short: "5+ Bed / 4+ Bath",
    prices: { standard: 500, deep: 600, move: 700 },
  },
];

// ── Handyman ────────────────────────────────────────────────────────────

export const HANDYMAN_ITEMS: { id: string; label: string; price: Price; formOption: string }[] = [
  { id: "minor-repairs", label: "Minor repairs", price: 75, formOption: "Minor Home Repairs" },
  {
    id: "door-repair",
    label: "Door repair / adjustment",
    price: 75,
    formOption: "Minor Home Repairs",
  },
  { id: "drywall", label: "Small drywall repair", price: 75, formOption: "Minor Home Repairs" },
  { id: "caulking", label: "Caulking / sealing", price: 75, formOption: "Minor Home Repairs" },
  { id: "trim", label: "Replacing trim / baseboards", price: 85, formOption: "Minor Home Repairs" },
  {
    id: "ceiling-fan",
    label: "Ceiling fan installation",
    price: 150,
    formOption: "TV / Fixture Installation",
  },
  {
    id: "light-fixture",
    label: "Light fixture installation",
    price: 85,
    formOption: "TV / Fixture Installation",
  },
  { id: "tv-mount", label: "TV mounting", price: 100, formOption: "TV / Fixture Installation" },
  { id: "mirror", label: "Mirror hanging", price: 75, formOption: "TV / Fixture Installation" },
  { id: "shelving", label: "Shelving", price: 75, formOption: "Handyman Services" },
  { id: "plates", label: "Electrical plates", price: 50, formOption: "TV / Fixture Installation" },
  { id: "furniture", label: "Furniture assembly", price: 75, formOption: "Handyman Services" },
  { id: "grill", label: "Grill assembly", price: 75, formOption: "Handyman Services" },
  { id: "shed", label: "Shed assembly", price: 250, formOption: "Handyman Services" },
  { id: "playset", label: "Playset assembly", price: 300, formOption: "Handyman Services" },
  {
    id: "other-assembly",
    label: "Other assembly / installations",
    price: 75,
    formOption: "Handyman Services",
  },
];

// ── Junk removal ────────────────────────────────────────────────────────

export const JUNK_LOADS: { id: string; label: string; price: Price }[] = [
  { id: "small", label: "Small Load / Pickup Bed", price: 200 },
  { id: "quarter", label: "1/4 Truck (approx. 3 cu yd)", price: 275 },
  { id: "half", label: "1/2 Truck (approx. 6 cu yd)", price: 350 },
  { id: "three-quarter", label: "3/4 Truck (approx. 9 cu yd)", price: 425 },
  { id: "full", label: "Full Truck (approx. 12–15 cu yd)", price: 500 },
];

export const JUNK_SERVICES: { id: string; label: string; price: Price; formOption: string }[] = [
  { id: "garage", label: "Garage Cleanout", price: 350, formOption: "Property / Estate Cleanout" },
  {
    id: "basement-attic",
    label: "Basement / Attic Cleanout",
    price: 400,
    formOption: "Property / Estate Cleanout",
  },
  {
    id: "furniture-removal",
    label: "Furniture Removal (per item)",
    price: 75,
    formOption: "Junk Removal",
  },
  {
    id: "appliance-removal",
    label: "Appliance Removal (per item)",
    price: 75,
    formOption: "Junk Removal",
  },
  { id: "yard-debris", label: "Yard Debris (per load)", price: 250, formOption: "Junk Removal" },
  { id: "hot-tub", label: "Hot Tub Removal", price: 500, formOption: "Junk Removal" },
  { id: "deck-shed", label: "Deck / Shed Removal", price: 600, formOption: "Junk Removal" },
  {
    id: "estate",
    label: "Estate Cleanouts",
    price: "custom",
    formOption: "Property / Estate Cleanout",
  },
  { id: "construction", label: "Construction Debris", price: 400, formOption: "Junk Removal" },
];
