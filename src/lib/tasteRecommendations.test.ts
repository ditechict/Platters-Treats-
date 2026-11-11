import { describe, expect, it } from 'vitest';
import { selectSafeTasteRecommendations } from './tasteRecommendations';

describe('selectSafeTasteRecommendations', () => {
  const menu = [
    { id: 'fresh', allergens: ['celery'] },
    { id: 'sweet', allergens: ['milk'] },
  ];

  it('only returns items in the available menu', () => {
    const result = selectSafeTasteRecommendations(
      [{ itemId: 'unknown', reason: 'Not on this menu' }, { itemId: 'fresh', reason: 'Bright and fresh' }],
      menu,
      [],
    );

    expect(result.map(({ item }) => item.id)).toEqual(['fresh']);
  });

  it('applies excluded-allergen labels after AI matching', () => {
    const result = selectSafeTasteRecommendations(
      [{ itemId: 'sweet', reason: 'A rich option' }, { itemId: 'fresh', reason: 'A fresh option' }],
      menu,
      ['milk'],
    );

    expect(result.map(({ item }) => item.id)).toEqual(['fresh']);
  });

  it('removes duplicate recommendations and limits output to three', () => {
    const items = ['one', 'two', 'three', 'four'].map((id) => ({ id, allergens: [] as string[] }));
    const result = selectSafeTasteRecommendations(
      [
        ...items.map(({ id }) => ({ itemId: id, reason: 'A good match' })),
        { itemId: 'one', reason: 'Duplicate' },
      ],
      items,
      [],
    );

    expect(result.map(({ item }) => item.id)).toEqual(['one', 'two', 'three']);
  });
});