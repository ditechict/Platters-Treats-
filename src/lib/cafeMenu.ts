export const MENU_CATEGORIES = [
  {
    id: 'afro-brunch',
    name: 'Afro-Brunch',
    description: 'Generous brunch plates with Afro-inspired flavour.',
  },
  {
    id: 'pancakes-french-toast',
    name: 'Pancakes & French Toast',
    description: 'Golden café favourites for a slower start to the day.',
  },
  {
    id: 'full-english',
    name: 'Full English & Brunch',
    description: 'Classic breakfast favourites, served the Zeren way.',
  },
  {
    id: 'matcha',
    name: 'Matcha',
    description: 'Matcha drinks from the café bar.',
  },
  {
    id: 'mocktails',
    name: 'Mocktails',
    description: 'Refreshing mixed drinks to enjoy alongside brunch.',
  },
  {
    id: 'coffee',
    name: 'Coffee',
    description: 'Café coffee for mornings, meet-ups and everything between.',
  },
] as const;

export type MenuCategoryId = (typeof MENU_CATEGORIES)[number]['id'];

export interface CafeMenuItem {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  ingredients: string[];
  dietaryTags: string[];
  // Null means the kitchen has not confirmed a complete allergen list yet.
  allergens: string[] | null;
  // Null keeps unapproved prices out of the public menu.
  price: number | null;
}

export const CAFE_MENU: CafeMenuItem[] = [
  {
    id: 'savanna-sunrise',
    category: 'afro-brunch',
    name: 'The Savanna Sunrise',
    description: 'A generous Afro-brunch plate with savoury, sweet and spiced elements.',
    ingredients: ['Scrambled eggs', 'Seasoned beans', 'Fried plantain', 'Cumberland sausage', 'Agege bread'],
    dietaryTags: [],
    allergens: null,
    price: null,
  },
  {
    id: 'pancakes',
    category: 'pancakes-french-toast',
    name: 'Pancakes',
    description: 'Pancakes from the café’s brunch selection.',
    ingredients: [],
    dietaryTags: [],
    allergens: null,
    price: null,
  },
  {
    id: 'french-toast',
    category: 'pancakes-french-toast',
    name: 'French Toast',
    description: 'Golden French toast served with a runny egg and bacon.',
    ingredients: ['Toast', 'Runny egg', 'Bacon'],
    dietaryTags: [],
    allergens: null,
    price: null,
  },
  {
    id: 'full-english',
    category: 'full-english',
    name: 'Full English',
    description: 'A full brunch plate with classic breakfast favourites.',
    ingredients: [],
    dietaryTags: [],
    allergens: null,
    price: null,
  },
  {
    id: 'matcha',
    category: 'matcha',
    name: 'Matcha',
    description: 'Matcha prepared as a café drink.',
    ingredients: [],
    dietaryTags: [],
    allergens: null,
    price: null,
  },
  {
    id: 'mocktails',
    category: 'mocktails',
    name: 'Mocktails',
    description: 'Mocktail selections from the café.',
    ingredients: [],
    dietaryTags: [],
    allergens: null,
    price: null,
  },
  {
    id: 'coffee',
    category: 'coffee',
    name: 'Coffee',
    description: 'Coffee from the café bar.',
    ingredients: [],
    dietaryTags: [],
    allergens: null,
    price: null,
  },
];
