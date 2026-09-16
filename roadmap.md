# Canapés & Treats Pretty Platters — Rebuild Roadmap

Approved plan: `.lovable/plan/` (agency-grade rebuild). Work in this order.

## Tasks

- [ ] 1. Design system + layout shell — brand tokens (ink/ivory/champagne gold), Cormorant Garamond display + Jost body, scroll-aware header, basket drawer, footer, section kit, reveal-on-scroll motion
- [ ] 2. Database schema, roles, storage, auth (menu items, categories, gallery, orders, enquiries, bookings, profiles, user_roles — all with RLS)
- [ ] 3. Rebuild pages against real data: Home (story-led), Our Story, Events, Menu, Gallery, Contact
- [ ] 4. Basket persistence, checkout with card payment, order confirmation, account area
- [ ] 5. Admin dashboard (menu, gallery, orders, enquiries, bookings)
- [ ] 6. SEO pass (per-page meta, JSON-LD, sitemap), performance pass, full click-through test

## Notes

- Email address: domain not registered yet — route contact form to a working inbox the user nominates; keep branded address out of footer until then.
- Payment: Lovable built-in payments, test mode first; needs Pro plan (fallback: confirmed order + invoice request, no rework).
- Real address, phone, hours, awards stay as-is.
