// ─────────────────────────────────────────────────────────────────────────
//  IMAGE LIBRARY
//  Every image file lives in /public/images and is referenced by a root-relative
//  path (so it works on any domain). To swap a photo, drop the new file into
//  /public/images (same name = zero code changes) or point the path below,
//  in business.ts, or in services.ts at a new file.
//
//  Files in /public/images/client are the client's real project photos.
//  The other files are the master template's stock images.
// ─────────────────────────────────────────────────────────────────────────

export const IMG = {
  kitchen: "/images/kitchen.jpg",
  bathroomCleaner: "/images/bathroom-cleaner.jpg",
  bathroomPristine: "/images/bathroom-pristine.jpg",
  emptyApartment: "/images/empty-apartment.jpg",
  office: "/images/office.jpg",
  rentalBedroom: "/images/rental-bedroom.jpg",
  familyLiving: "/images/family-living.jpg",
  whiteBedroom: "/images/white-bedroom.jpg",
  cleanerBright: "/images/cleaner-bright.jpg",
  cleanerDusting: "/images/cleaner-dusting.jpg",
  heroLivingRoom: "/images/hero-living-room.jpg",
  // Client-supplied project photos (resized copies; originals stay in /Images)
  clientHeroKitchen: "/images/client/hero-kitchen.jpg",
  clientKitchenIsland: "/images/client/kitchen-island.jpg",
  clientKitchenOpen: "/images/client/kitchen-open.jpg",
  clientDiningRoom: "/images/client/dining-room.jpg",
  clientFormalDining: "/images/client/formal-dining.jpg",
  clientPrimaryBath: "/images/client/primary-bath.jpg",
  clientLivingRoom: "/images/client/living-room.jpg",
  clientShowerClean1: "/images/client/shower-clean-1.jpg",
  clientShowerBefore: "/images/client/before-shower.jpg",
  clientShowerClean2: "/images/client/shower-clean-2.jpg",
  clientTransformationPoster: "/images/client/transformation-poster.jpg",
  clientLakeviewDining: "/images/client/lakeview-dining.jpg",
  clientLakeviewLiving: "/images/client/lakeview-living.jpg",
  clientChandelierDining: "/images/client/chandelier-dining.jpg",
} as const;

export type ImageRef = { src: string; alt: string };
