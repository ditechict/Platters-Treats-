# Zeren interactive café menu

## What I’ll build
- Add a dedicated interactive menu to `/menu`, while keeping the homepage’s shorter “A taste of Zeren” highlights unchanged.
- Organise the confirmed offer into Afro-Brunch, Pancakes & French Toast, Full English, Matcha, Mocktails, and Coffee sections with accessible category navigation.
- Expand each confirmed dish or drinks group with ingredient details and a clear dietary/allergen enquiry note.
- Add working vegetarian, vegan, gluten-free, and allergen-exclusion filters, result counts, clear-filter controls, and a useful empty state.
- Add a price field to every menu record. Until approved prices arrive, display “Price to be confirmed” rather than reuse retired-brand prices or invent new ones.
- Preserve the two-column mobile layout, sage/ink visual system, and reduced-motion/accessibility behavior.

## Technical notes
- Create a typed café-menu data module so content, filters, and future prices stay consistent.
- Extend the existing pure filter helpers and add focused tests for category and combined dietary/allergen filtering.
- Add a separate `InteractiveMenu` component and wire it into `src/pages/Menu.tsx`; no ordering, payment, or backend changes are needed for this informational menu.
- Verify the production build, run the menu tests, and check category navigation, filters, empty states, and mobile layout in the browser.

## Waiting on you
- Approved dish names, recipes/dietary labels, and current prices. The interface will be ready for those details without publishing guesses.
