import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { resolveImages } from "@/lib/images";

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
}

export interface MenuItemRow {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  dietary_tags: string[];
  serves: string | null;
  is_featured: boolean;
  is_available: boolean;
  display_order: number;
  src: string;
}

export interface GalleryRow {
  id: string;
  title: string | null;
  category: string | null;
  image_url: string;
  display_order: number;
  src: string;
}

export const useMenuCategories = () =>
  useQuery({
    queryKey: ["menu-categories"],
    queryFn: async (): Promise<MenuCategory[]> => {
      const { data, error } = await supabase
        .from("menu_categories")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useMenuItems = () =>
  useQuery({
    queryKey: ["menu-items"],
    queryFn: async (): Promise<MenuItemRow[]> => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_available", true)
        .order("display_order");
      if (error) throw error;
      return (await resolveImages(data ?? [])) as MenuItemRow[];
    },
  });

export const useGalleryImages = () =>
  useQuery({
    queryKey: ["gallery-images"],
    queryFn: async (): Promise<GalleryRow[]> => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return (await resolveImages(data ?? [])) as GalleryRow[];
    },
  });
