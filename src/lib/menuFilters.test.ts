import { describe, expect, it } from 'vitest';
import {
  DIETARY_FILTERS,
  avoidsSelectedAllergens,
  labelForAllergen,
  labelForDietary,
  matchesDietaryFilter,
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
