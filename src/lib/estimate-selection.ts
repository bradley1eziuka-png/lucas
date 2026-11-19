// Tiny shared store that carries a visitor's ballpark-calculator selection to the
// quote form (hero form on the homepage, form on /pricing and /contact). The data
// is kept in memory only: nothing is stored or sent until the visitor submits a form.

import { useSyncExternalStore } from "react";

export type EstimateSelection = {
  category: "Cleaning" | "Handyman" | "Junk Removal";
  /** Human-readable choice, e.g. "3 bedrooms / 2 bathrooms · Deep Cleaning". */
  service: string;
  /** What the calculator displayed, e.g. "Starting at $350" or "Custom Quote". */
  price: string;
  /** Option in the form's Service Needed dropdown to preselect. */
  formOption: string;
};

let current: EstimateSelection | null = null;
const listeners = new Set<() => void>();

export function setEstimateSelection(next: EstimateSelection | null) {
  current = next;
  listeners.forEach((l) => l());
}

export function useEstimateSelection(): EstimateSelection | null {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => null,
  );
}
