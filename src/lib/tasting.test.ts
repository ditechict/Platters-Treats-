import { describe, expect, it } from 'vitest';
import { computeTastingFee } from './tasting';

describe('private tasting pricing', () => {
  it('charges the £85 flat fee when below both thresholds', () => {
    expect(computeTastingFee(true, 900, 39)).toBe(85);
  });
  it('is complimentary for event quotes over £1,000', () => {
    expect(computeTastingFee(true, 1001, 20)).toBe(0);
    expect(computeTastingFee(true, 1000, 20)).toBe(85);
  });
  it('is complimentary for 40 or more guests', () => {
    expect(computeTastingFee(true, 500, 40)).toBe(0);
    expect(computeTastingFee(true, 500, 39)).toBe(85);
  });
  it('adds nothing when tasting is not requested', () => {
    expect(computeTastingFee(false, 500, 20)).toBe(0);
  });
});