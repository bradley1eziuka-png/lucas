import {
  CalendarDays,
  Hammer,
  Home,
  Layers,
  Package,
  Plug,
  Repeat,
  Sparkles,
  Trash2,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/lib/services";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  sparkles: Sparkles,
  repeat: Repeat,
  calendar: CalendarDays,
  truck: Truck,
  home: Home,
  layers: Layers,
  wrench: Wrench,
  plug: Plug,
  hammer: Hammer,
  trash: Trash2,
  package: Package,
};

export function ServiceIconGlyph({ icon, className }: { icon: ServiceIcon; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={className} />;
}

/** Shown in place of a photo for services that have no client photo yet. */
export function ServiceIconPanel({
  icon,
  className = "",
}: {
  icon: ServiceIcon;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 ${className}`}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-primary-foreground ring-1 ring-white/20">
        <ServiceIconGlyph icon={icon} className="h-8 w-8" />
      </span>
    </div>
  );
}
