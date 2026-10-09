import { describe, it, expect } from 'vitest';
import { computeEstimate } from './useQuoteSettings';

describe('computeEstimate', () => {
  it('applies per-guest price and service markup', () => {
    expect(computeEstimate(50, 18, 1.15, 250)).toBe(1035);
  });
  it('never goes below the minimum spend', () => {
    expect(computeEstimate(10, 14, 1, 250)).toBe(250);
  });
});
