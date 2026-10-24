# Reorder homepage sections and remove the Award Winning card

Two layout edits on the homepage (`src/pages/Index.tsx`), no backend or business-logic changes.

## Current homepage order

Header → Hero → About (with 4 cards) → Guest Spotlight carousel → Menu ("The Collection — Our Menu") → CTA → Footer

## New homepage order

Header → Hero → Menu ("The Collection — Our Menu") → About (3 cards) → Guest Spotlight carousel → CTA → Footer

## Changes

1. **Move the menu section up.** In `src/pages/Index.tsx`, move `<MenuSection />` so it renders immediately after `<Hero />`, before the About section. No changes to `MenuSection.tsx` itself — the "The Collection / Our Menu" heading, category filters, and add-to-basket cards stay exactly as they are.
2. **Remove the "Award Winning" card.** Delete the entire Award Winning `Card` (Award icon, "Recognized for culinary excellence") from the About section, leaving the three remaining cards: Private Events, Premium Quality, Fresh Daily. The 4-column grid already collapses gracefully at 3 items (3 cards fit evenly on the large-screen row). Also reduce the visible Guest Spotlight carousel on the homepage.  


## Verification

- Type-check/build passes.
- Playwright check on `/` desktop and mobile: menu section renders directly below the hero, About section shows exactly three cards, and no horizontal overflow or console errors.