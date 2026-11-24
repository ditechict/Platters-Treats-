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

export const avoidsSelectedAllergens = (
  allergens: string[] | null | undefined,
  avoid: string[],
) => {
  if (avoid.length === 0) return true;
  // Unknown allergen information is never treated as allergen-free.
  if (!allergens) return false;
  return !allergens.some((allergen) => avoid.includes(allergen));
};

export const matchesDietaryFilters = (
  dietaryTags: string[],
  filters: DietaryFilter[],
) => filters.every((filter) => matchesDietaryFilter(dietaryTags, filter));

export interface FilterableMenuItem {
  category: string;
  dietaryTags: string[];
  allergens: string[] | null;
}

export interface MenuFilterSelection {
  category?: string;
  dietaryFilters?: DietaryFilter[];
  avoidAllergens?: string[];
}

export const filterMenuItems = <T extends FilterableMenuItem>(
  items: T[],
  selection: MenuFilterSelection,
) => items.filter((item) => {
  const categoryMatches = !selection.category || selection.category === 'all' || item.category === selection.category;
  return categoryMatches
    && matchesDietaryFilters(item.dietaryTags, selection.dietaryFilters ?? [])
    && avoidsSelectedAllergens(item.allergens, selection.avoidAllergens ?? []);
});

export const presentAllergens = (items: { allergens?: string[] | null }[]) => {
  const present = new Set<string>();
  items.forEach((item) => item.allergens?.forEach((a) => present.add(a)));
  return [...present].sort((a, b) => (ALLERGEN_LABELS[a] ?? a).localeCompare(ALLERGEN_LABELS[b] ?? b));
};
