export const TASTING_FEE = 85;

export function computeTastingFee(requested: boolean, eventEstimate: number, guests: number): number {
  if (!requested || eventEstimate > 1000 || guests >= 40) return 0;
  return TASTING_FEE;
}