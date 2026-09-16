# Canapés & Treats Pretty Platters — Agency-Grade Rebuild

A full redesign and re-architecture: a new visual language, a proper page structure, real online payment, and a private admin area where you manage menu, gallery, orders and enquiries yourself.

## Where the site is today

- Four pages (Home, Menu, Gallery, Contact) plus a basket page.
- Menu and gallery content is hard-coded; nothing is editable without a developer.
- The basket empties on page refresh and "Proceed to Checkout" only shows a "coming soon" message.
- The contact form validates input but sends nowhere — no message is stored or emailed.
- Home page is a generic stack of sections; no story, no events/catering offer, no reviews, no FAQ.
- One shared page title and description across all pages, so search and social previews are weak.

## New site architecture

```text
Home            story-led: cinematic hero, signature platters, occasions,
                process, reviews, journal teaser, enquiry call to action
Menu            filterable collections (canapés, platters, sweet, breakfast,
                seasonal), dietary tags, per-item detail panel, add to basket
Platters/Shop   buy platters online, choose size, guest count, delivery date
Events          weddings, corporate, private dining; packages + deposit payment
Our Story       ethos, craft, sourcing, kitchen team
Gallery         curated lookbook with lightbox and category filters
Journal         optional posts for seasonal menus and press (SEO)
Contact         enquiry form that saves and notifies, map, hours
Basket/Checkout persistent basket, card payment, order confirmation
Account         order history and enquiry status
Admin           private dashboard: menu, gallery, orders, enquiries, bookings
```

## Design direction

- One committed identity: deep charcoal ink, warm ivory, champagne gold used sparingly, editorial serif display with a clean sans body, generous whitespace, large-format imagery.
- A reusable section kit (eyebrow label, display heading, editorial two-column, image marquee, quote block) so every page reads as one brand.
- Restrained motion: reveal-on-scroll, subtle image parallax, hover states with intent — no bounce effects.
- Consistent header with scroll-aware background, refined mobile menu, and a basket drawer instead of a page jump.
- Accessibility and performance baked in: keyboard focus states, alt text, responsive image sizes, lazy loading.

## Functionality

- Menu, platters and gallery served from your database so edits show instantly.
- Basket persists across refresh and devices when signed in; a drawer shows it everywhere.
- Real card payment for platter orders and event deposits, with confirmation page and emailed receipt.
- Enquiry and event-booking forms stored in your backend and visible in admin, with email notification.
- Sign-in for customers (email plus Google) so they can see past orders.
- Admin area restricted to your account: add/edit/hide menu items and prices, upload gallery photos, view and update order and enquiry status.

## Content notes

- Your real address, phone, hours and awards stay as they are.
- The email address needs a registered domain. Until then I'll route the contact form to a working inbox you nominate and hold the branded address out of the footer, or keep it displayed if you prefer — tell me which.
- I'll write refined copy for the new sections (story, occasions, process, FAQ) for you to approve or replace.

## Technical notes

- Database tables: menu items, menu categories, gallery images, orders and order items, enquiries, event bookings, profiles, and user roles for admin access — each with row-level security so customers only see their own records and admin writes are role-checked.
- Card payment goes through Lovable's built-in payments (test mode first, then live after verification). This needs a Pro workspace plan; if the plan blocks it, I'll build the checkout as a confirmed order + invoice request and switch on live payment later without rework.
- Image uploads go to backend storage with size limits and served responsively.
- Per-page titles, descriptions, canonical URLs and structured data (Restaurant, Menu, Product) via react-helmet-async, plus a sitemap.
- All forms validated with Zod on both sides; existing error boundary retained.

## Build order

1. Design system + layout shell (header, footer, section kit, motion).
2. Database schema, roles, storage, and auth.
3. Home, Our Story, Events, Menu, Gallery, Contact rebuilt against real data.
4. Basket drawer, checkout and payment, order confirmation, account area.
5. Admin dashboard.
6. SEO, performance pass, and a full click-through of every button and form.
