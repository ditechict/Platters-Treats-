export const siteBrand = {
  name: 'Zeren',
  descriptor: 'Café & Catering',
  address: ['82 Bolton Crescent', 'Oval, SE5 0SE'],
  phone: null,
  email: null,
  openingHours: null,
} as const;

export const siteNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Catering', href: '/quote' },
  { name: 'Visit', href: '/contact' },
] as const;