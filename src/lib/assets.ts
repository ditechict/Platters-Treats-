const DEFAULT_MANAGED_ASSET_ORIGIN = 'https://zerend.lovable.app';
const MANAGED_ASSET_PATH = '/__l5e/assets-v1/';

/**
 * Managed photo paths are served by Lovable's public media host. Absolute URLs
 * keep those requests away from SPA rewrites on external hosts such as Vercel.
 */
export const managedAssetUrl = (
  url: string,
  origin = import.meta.env.VITE_MANAGED_ASSET_ORIGIN || DEFAULT_MANAGED_ASSET_ORIGIN,
) => {
  if (!url.startsWith(MANAGED_ASSET_PATH)) return url;
  return `${origin.replace(/\/+$/, '')}${url}`;
};
