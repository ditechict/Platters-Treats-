import salmonBenedict from "@/assets/salmon-benedict.jpg";
import breakfastPlatter from "@/assets/breakfast-platter.jpg";
import deviledEggs from "@/assets/deviled-eggs.jpg";
import gourmetBreakfast from "@/assets/gourmet-breakfast.jpg";
import platterMeats from "@/assets/platter-meats.jpg";
import buffetDisplay from "@/assets/buffet-display.jpg";
import elegantSpread from "@/assets/elegant-spread.jpg";
import presentationDisplay from "@/assets/presentation-display.jpg";
import heroCanapes from "@/assets/hero-canapes.jpg";
import chocolateTruffles from "@/assets/chocolate-truffles.jpg";
import prosciuttoAsparagus from "@/assets/prosciutto-asparagus.jpg";
import salmonCanape from "@/assets/salmon-canape.jpg";
import truffleTartlets from "@/assets/truffle-tartlets.jpg";
import coolerOriginal from '@/assets/guest-spotlight-botanical-cooler.jpg.asset.json';
import breakfastOriginal from '@/assets/guest-spotlight-breakfast-spread.jpg.asset.json';
import skilletOriginal from '@/assets/guest-spotlight-gouda-skillet.jpg.asset.json';
import toastOriginal from '@/assets/guest-spotlight-golden-toast.jpg.asset.json';
import atmosphereOriginal from '@/assets/guest-spotlight-table-atmosphere.jpg.asset.json';
import coolerWeb from '@/assets/guest-spotlight-botanical-cooler.webp.asset.json';
import breakfastWeb from '@/assets/guest-spotlight-breakfast-spread.webp.asset.json';
import skilletWeb from '@/assets/guest-spotlight-gouda-skillet.webp.asset.json';
import toastWeb from '@/assets/guest-spotlight-golden-toast.webp.asset.json';
import atmosphereWeb from '@/assets/guest-spotlight-table-atmosphere.webp.asset.json';
import coolerMenu from '@/assets/menu-botanical-cooler.webp.asset.json';
import breakfastMenu from '@/assets/menu-breakfast-spread.webp.asset.json';
import skilletMenu from '@/assets/menu-gouda-skillet.webp.asset.json';

import { supabase } from "@/integrations/supabase/client";

const bundled: Record<string, string> = {
  "salmon-benedict.jpg": salmonBenedict,
  "breakfast-platter.jpg": breakfastPlatter,
  "deviled-eggs.jpg": deviledEggs,
  "gourmet-breakfast.jpg": gourmetBreakfast,
  "platter-meats.jpg": platterMeats,
  "buffet-display.jpg": buffetDisplay,
  "elegant-spread.jpg": elegantSpread,
  "presentation-display.jpg": presentationDisplay,
  "hero-canapes.jpg": heroCanapes,
  "chocolate-truffles.jpg": chocolateTruffles,
  "prosciutto-asparagus.jpg": prosciuttoAsparagus,
  "salmon-canape.jpg": salmonCanape,
  "truffle-tartlets.jpg": truffleTartlets,
  'guest-spotlight-botanical-cooler.jpg': coolerOriginal.url,
  'guest-spotlight-breakfast-spread.jpg': breakfastOriginal.url,
  'guest-spotlight-gouda-skillet.jpg': skilletOriginal.url,
  'guest-spotlight-golden-toast.jpg': toastOriginal.url,
  'guest-spotlight-table-atmosphere.jpg': atmosphereOriginal.url,
  'menu-botanical-cooler.webp': coolerMenu.url,
  'menu-breakfast-spread.webp': breakfastMenu.url,
  'menu-gouda-skillet.webp': skilletMenu.url,
};

export const GUEST_MOMENTS = [
  { key: 'botanical-cooler', title: 'Signature Sip', src: coolerWeb.url, fullSrc: coolerOriginal.url, alt: 'Guest raising a vibrant green layered botanical cooler seated before a breakfast platter at Canapés & Treats.', caption: 'Signature crafted coolers—custom beverage pairings to accompany your event menu.' },
  { key: 'gouda-skillet', title: 'Hearty Flavours', src: skilletWeb.url, fullSrc: skilletOriginal.url, alt: 'Guest enjoying a piping hot skillet of gourmet sausage, pasta, and melted cheese seasoned with fresh herbs.', caption: 'Hearty, comforting flavours that prove luxury presentation never sacrifices portion or depth.' },
  { key: 'breakfast-spread', title: 'Breakfast & Brunch', src: breakfastWeb.url, fullSrc: breakfastOriginal.url, alt: 'Overhead view of an artisanal British breakfast platter with grilled sourdough, Cumberland sausage, baked beans, and sautéed mushrooms.', caption: 'Morning gatherings elevated: substantial brunch platters designed for executive breakfasts and launch events.' },
  { key: 'table-atmosphere', title: 'The Atmosphere', src: atmosphereWeb.url, fullSrc: atmosphereOriginal.url, alt: 'Family and friends gathered around a generous breakfast table enjoying platters together.', caption: 'Unforgettable celebrations: hospitality built around warmth, abundance, and shared plates.' },
  { key: 'golden-toast', title: 'Golden Details', src: toastWeb.url, fullSrc: toastOriginal.url, alt: 'Close-up of golden toasted brioche held above an artisanal morning breakfast plate.', caption: 'Every element prepared to order with obsessive attention to taste and texture.' },
];

export const guestMomentForRef = (ref: string) =>
  GUEST_MOMENTS.find((moment) => ref === `asset:guest-spotlight-${moment.key}.jpg`);

export const BUNDLED_IMAGE_KEYS = Object.keys(bundled);

/**
 * Resolves a stored image reference to a usable URL.
 * Supports "asset:<file>" (shipped photography), absolute URLs,
 * and storage paths inside the private site-images bucket.
 */
export async function resolveImage(ref?: string | null): Promise<string> {
  if (!ref) return heroCanapes;
  if (ref.startsWith("asset:")) return bundled[ref.slice(6)] ?? heroCanapes;
   if (ref.startsWith("http") || ref.startsWith('/__l5e/assets-v1/')) return ref;
  const { data } = await supabase.storage
    .from("site-images")
    .createSignedUrl(ref, 60 * 60);
  return data?.signedUrl ?? heroCanapes;
}

export async function resolveImages<T extends { image_url?: string | null }>(
  rows: T[]
): Promise<(T & { src: string })[]> {
  return Promise.all(
    rows.map(async (row) => ({ ...row, src: await resolveImage(row.image_url) }))
  );
}

export { heroCanapes as fallbackImage };
