export const Categories = [
  "bookmark",
  "range",
  "sar",
  "insar",
  "ship",
  "bridge",
  "water",
  "oilspill",
  "earthquake",
] as const;

export type CategoryType = (typeof Categories)[number];
