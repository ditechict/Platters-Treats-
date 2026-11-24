import { describe, expect, it } from 'vitest';
import deployment from '../../vercel.json';

describe('Vercel SPA deployment', () => {
  it('rewrites client-side navigation to /index.html', () => {
    expect(deployment.rewrites).toEqual([
      { source: '/(.*)', destination: '/index.html' },
    ]);
  });
});