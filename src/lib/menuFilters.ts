// Pure menu filtering + label helpers, shared by the menu UI and its tests.

export const ALLERGEN_LABELS: Record<string, string> = {
  gluten: 'Gluten',
  eggs: 'Eggs',
  milk: 'Milk',
  fish: 'Fish',
  crustaceans: 'Crustaceans',
  molluscs: 'Molluscs',
  'tree-nuts': 'Nuts',
  peanuts: 'Peanuts',
  sesame: 'Sesame',
  soya: 'Soya',
  mustard: 'Mustard',
  sulphites: 'Sulphites',
  celery: 'Celery',
  lupin: 'Lupin',
};

export const DIETARY_LABELS: Record<string, string> = {
  vegetarian: 'Vegetarian',
  'vegetarian option': 'Vegetarian Option',
  vegan: 'Vegan',
  'vegan option': 'Vegan Option',
  'gluten-free': 'Gluten-Free',
  'gluten-free option': 'Gluten-Free Option',
  halal: 'Halal',
};

export interface DietaryFilter {
  key: string;
  label: string;
  tags: string[];
}

export const DIETARY_FILTERS: DietaryFilter[] = [
  { key: 'vegetarian', label: 'Vegetarian', tags: ['vegetarian', 'vegetarian option'] },
  { key: 'vegan', label: 'Vegan', tags: ['vegan', 'vegan option'] },
  { key: 'gluten-free', label: 'Gluten-Free', tags: ['gluten-free', 'gluten-free option'] },
];

export const labelForAllergen = (key: string) => ALLERGEN_LABELS[key] ?? key;

export const labelForDietary = (tag: string) =>
  DIETARY_LABELS[tag] ?? tag.replace(/(^|\s|-)\S/g, (c) => c.toUpperCase());

export const matchesDietaryFilter = (
  dietaryTags: string[],
  filter: DietaryFilter
) => filter.tags.some((tag) => dietaryTags.includes(tag));

export const avoidsSelectedAllergens = (allergens: string[], avoid: string[]) =>
  !allergens.some((a) => avoid.includes(a));

export const presentAllergens = (items: { allergens?: string[] | null }[]) => {
  const present = new Set<string>();
  items.forEach((item) => item.allergens?.forEach((a) => present.add(a)));
  return [...present].sort((a, b) => (ALLERGEN_LABELS[a] ?? a).localeCompare(ALLERGEN_LABELS[b] ?? b));
};
