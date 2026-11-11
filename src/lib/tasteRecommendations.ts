import { avoidsSelectedAllergens } from '@/lib/menuFilters';

export interface TasteRecommendationInput {
  itemId: string;
  reason: string;
}

export interface TasteRecommendationItem {
  id: string;
  allergens?: string[] | null;
}

export interface SafeTasteRecommendation<T extends TasteRecommendationItem> {
  item: T;
  reason: string;
}

export function selectSafeTasteRecommendations<T extends TasteRecommendationItem>(
  recommendations: TasteRecommendationInput[],
  availableItems: T[],
  excludedAllergens: string[],
): SafeTasteRecommendation<T>[] {
  const eligibleItems = new Map(
    availableItems
      .filter((item) => avoidsSelectedAllergens(item.allergens ?? [], excludedAllergens))
      .map((item) => [item.id, item]),
  );
  const seen = new Set<string>();

  return recommendations.flatMap(({ itemId, reason }) => {
    const item = eligibleItems.get(itemId);
    if (!item || seen.has(itemId)) return [];
    seen.add(itemId);
    return [{ item, reason: reason.trim().slice(0, 180) }];
  }).slice(0, 3);
}