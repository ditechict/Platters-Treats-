# Mobile Experience, Brand Mark, and Taste Recommendations

## Outcome
Make the mobile menu and gallery easier to browse, soften bright white surfaces, add a distinctive restaurant logo, and help diners discover dishes through a Lovable AI-powered Taste Concierge.

## Implementation
1. **Menu and gallery browsing**
   - Show gallery photos in a two-column mobile lookbook grid; retain the existing larger-screen gallery layout and full-resolution lightbox.
   - Add a clear grid/list switch to the menu. On mobile, default to a compact two-item grid with quick add-to-basket actions; keep a detailed list option for descriptions, dietary labels, and allergen information. On larger screens, preserve the existing multi-column menu unless the diner selects list view.
   - Keep tap targets comfortable and ensure complete dish details remain easy to open and read.
2. **Brighter, softer surfaces**
   - Adjust the semantic surface tokens so cards and popovers use a bright pearl/off-white rather than pure white, then audit explicit white page surfaces for consistency. Preserve intentional light text on dark sections and maintain readable contrast in both themes.
3. **Restaurant logo**
   - Create two distinct chef/hospitality logo concepts grounded in the existing ink, ivory, and champagne identity, recommend the best fit, and use the selected concept with the brand name in the header and footer. Create a matching favicon from the chosen emblem. Keep the exact business name as crisp text rather than relying on generated lettering.
4. **Taste Concierge**
   - Add a small invitation below the menu filters that opens a mobile-friendly bottom sheet (and an appropriately sized panel on larger screens). Offer preference chips and a short free-text prompt, then show matched menu items with one-tap basket actions.
   - Run matching through a server-side Lovable Cloud function and Lovable AI Gateway; validate input and constrain returned item IDs to currently available menu records. Send no personal information. Treat allergy exclusions as deterministic catalog filtering, never as an AI safety guarantee, and retain a clear reminder to confirm allergies with the restaurant.
   - Include loading, no-match, and service-error states without inventing recommendations when AI is unavailable.

## Verification
Check mobile and desktop layouts, menu grid/list switching and basket actions, gallery filtering/lightbox, logo readability and favicon, and Taste Concierge success/error paths. Run the existing tests and verify the deployed AI request and response without exposing credentials.

## Technical details
Use existing semantic tokens, UI controls, menu data, basket context, and gallery lightbox patterns. The AI call belongs in a validated Supabase Edge Function, not browser code; preserve CORS and gateway error semantics and use a supported model available to this workspace. Record any new structural rule in the project architecture notes.
