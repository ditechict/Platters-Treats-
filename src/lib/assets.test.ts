import { describe, expect, it } from 'vitest';
import { managedAssetUrl } from './assets';

describe('managed restaurant photo URLs', () => {
  it('uses the public Zeren media host for managed photos by default', () => {
    const path = '/__l5e/assets-v1/photo-id/brunch.webp';
    expect(managedAssetUrl(path)).toBe(`https://zerend.lovable.app${path}`);
  });

  it('supports an explicit media host and removes trailing slashes', () => {
    const path = '/__l5e/assets-v1/photo-id/brunch.webp';
    expect(managedAssetUrl(path, 'https://media.example.com/')).toBe(`https://media.example.com${path}`);
  });

  it('leaves bundled, storage, and already-absolute image references unchanged', () => {
    expect(managedAssetUrl('/assets/brunch.jpg')).toBe('/assets/brunch.jpg');
    expect(managedAssetUrl('private/gallery/brunch.jpg')).toBe('private/gallery/brunch.jpg');
    expect(managedAssetUrl('https://images.example.com/brunch.jpg')).toBe('https://images.example.com/brunch.jpg');
  });
});
