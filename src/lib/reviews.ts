// Customer testimonials, transcribed from the promotional graphics supplied by the
// client. They are NOT verified platform (Google/Facebook/Yelp) reviews, so the site
// never links them to a platform and never shows an aggregate rating.

export type Review = { name: string; text: string };

export const reviews: Review[] = [
  {
    name: "Dawn C.",
    text: "April is fantastic, does such a great job cleaning and gets all the little nooks and crannies!",
  },
  {
    name: "Jennifer K.",
    text: "It was fun and exhausting all at the same time. Trying to purge things really made me think and take stuff from where it was to where it belonged lol.",
  },
  {
    name: "Christie A.",
    text: "Highly recommend! I've never had a cleaning service go above and beyond and clean things I wasn't even expecting. She is very thorough and genuinely cares about her work — your home!",
  },
  {
    name: "Kaitlyn J.",
    text: "I am so HAPPY that I was connected with April! I cannot tell you the relief that I felt when I got home from work and saw the results!",
  },
  { name: "Elizabeth E.", text: "Friendly and great work." },
  {
    name: "Steven W.",
    text: "We love April's cleaning. She has a great attitude and enjoys her work! You can't go wrong with April's!",
  },
  {
    name: "Debbie M.",
    text: "Every detail of your house smells and looks great. From the start of your services you will be pleased!",
  },
  {
    name: "Clifford H.",
    text: "April did a great job cleaning my 100 year old father's house that hadn't been cleaned in over a year. Looked great when she was done!",
  },
  {
    name: "Sharon M.",
    text: "Excellent job! Went above and beyond what I expected! Highly recommend.",
  },
  {
    name: "Patricia V.",
    text: "Sweetheart lady. If you want the best cleaning possible give April a call. She leaves nothing undone and works every single minute she is scheduled.",
  },
  {
    name: "Peggy H.",
    text: "April does a fantastic job! Our hardwood floors, kitchen, and bathrooms have never looked better!",
  },
  {
    name: "Patty S.",
    text: "April is very upbeat and energetic, she does a thorough job and makes the house sparkle.",
  },
  {
    name: "Beth S.",
    text: "April is a dynamo. I hired her to help sort boxes of paperwork and stuff collected over the years. She has gone way beyond this and is transforming our whole home.",
  },
  {
    name: "Karen M.",
    text: "April is the real deal!!! Very responsive, and dependable!! She went above and beyond cleaning a house that I needed to sell that was in rough shape. She exceeded my expectations!",
  },
];

/** Reviews featured on the homepage. */
const FEATURED = [
  "Christie A.",
  "Kaitlyn J.",
  "Karen M.",
  "Dawn C.",
  "Peggy H.",
  "Clifford H.",
  "Patricia V.",
  "Steven W.",
];
export const featuredReviews: Review[] = FEATURED.map((n) =>
  reviews.find((r) => r.name === n),
).filter((r): r is Review => !!r);
