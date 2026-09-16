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
};

export const BUNDLED_IMAGE_KEYS = Object.keys(bundled);

/**
 * Resolves a stored image reference to a usable URL.
 * Supports "asset:<file>" (shipped photography), absolute URLs,
 * and storage paths inside the private site-images bucket.
 */
export async function resolveImage(ref?: string | null): Promise<string> {
  if (!ref) return heroCanapes;
  if (ref.startsWith("asset:")) return bundled[ref.slice(6)] ?? heroCanapes;
  if (ref.startsWith("http")) return ref;
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
