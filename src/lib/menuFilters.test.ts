import { describe, expect, it } from 'vitest';
import {
  DIETARY_FILTERS,
  avoidsSelectedAllergens,
  filterMenuItems,
  labelForAllergen,
  labelForDietary,
  matchesDietaryFilter,
  matchesDietaryFilters,
  presentAllergens,
} from './menuFilters';

const vegetarian = DIETARY_FILTERS.find((f) => f.key === 'vegetarian')!;
const vegan = DIETARY_FILTERS.find((f) => f.key === 'vegan')!;
const glutenFree = DIETARY_FILTERS.find((f) => f.key === 'gluten-free')!;

describe('menu dietary filters', () => {
  it('treats "vegetarian option" as matching the vegetarian filter', () => {
    expect(matchesDietaryFilter(['vegetarian option'], vegetarian)).toBe(true);
  });

  it('does not match vegetarian for items without a vegetarian tag', () => {
    expect(matchesDietaryFilter(['gluten-free'], vegetarian)).toBe(false);
    expect(matchesDietaryFilter([], vegetarian)).toBe(false);
  });

  it('matches vegan only for explicit vegan tags', () => {
    expect(matchesDietaryFilter(['vegan'], vegan)).toBe(true);
    expect(matchesDietaryFilter(['vegetarian'], vegan)).toBe(false);
  });

  it('treats "gluten-free option" as matching the gluten-free filter', () => {
    expect(matchesDietaryFilter(['gluten-free option'], glutenFree)).toBe(true);
  });
});

describe('menu allergen filters', () => {
  it('hides items containing a selected allergen', () => {
    expect(avoidsSelectedAllergens(['eggs', 'mustard'], ['eggs'])).toBe(false);
  });

  it('keeps items free of the selected allergens', () => {
    expect(avoidsSelectedAllergens(['eggs', 'mustard'], ['milk'])).toBe(true);
    expect(avoidsSelectedAllergens([], ['milk', 'eggs'])).toBe(true);
  });

  it('does not treat missing allergen information as allergen-free', () => {
    expect(avoidsSelectedAllergens(null, ['eggs'])).toBe(false);
    expect(avoidsSelectedAllergens(undefined, ['milk'])).toBe(false);
  });

  it('keeps items with unknown allergens when no exclusion is selected', () => {
    expect(avoidsSelectedAllergens(null, [])).toBe(true);
  });
});

describe('combined menu filters', () => {
  it('requires every selected dietary filter to match', () => {
    expect(matchesDietaryFilters(['vegan', 'gluten-free'], [vegan, glutenFree])).toBe(true);
    expect(matchesDietaryFilters(['vegan'], [vegan, glutenFree])).toBe(false);
  });

  it('combines category, dietary, and allergen rules', () => {
    const items = [
      { id: 'brunch', category: 'brunch', dietaryTags: ['vegetarian'], allergens: ['eggs'] },
      { id: 'drink', category: 'drinks', dietaryTags: ['vegan'], allergens: [] },
      { id: 'unknown', category: 'drinks', dietaryTags: ['vegan'], allergens: null },
    ];

    expect(filterMenuItems(items, { category: 'drinks' }).map((item) => item.id)).toEqual(['drink', 'unknown']);
    expect(filterMenuItems(items, { category: 'drinks', dietaryFilters: [vegan] }).map((item) => item.id)).toEqual(['drink', 'unknown']);
    expect(filterMenuItems(items, { category: 'drinks', avoidAllergens: ['milk'] }).map((item) => item.id)).toEqual(['drink']);
  });
});

describe('menu label helpers', () => {
  it('labels every known UK allergen', () => {
    expect(labelForAllergen('gluten')).toBe('Gluten');
    expect(labelForAllergen('tree-nuts')).toBe('Nuts');
    expect(labelForAllergen('sulphites')).toBe('Sulphites');
  });

  it('labels dietary tags readably', () => {
    expect(labelForDietary('gluten-free option')).toBe('Gluten-Free Option');
    expect(labelForDietary('vegetarian')).toBe('Vegetarian');
  });
});

describe('presentAllergens', () => {
  it('collects the union of allergens across items', () => {
    const items = [{ allergens: ['milk'] }, { allergens: ['eggs', 'milk'] }, { allergens: [] }];
    expect(presentAllergens(items)).toEqual(['eggs', 'milk']);
  });
});
