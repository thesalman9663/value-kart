# Design Brief: Value Kart

## Concept
Trust-driven modern e-commerce for Indian budget shoppers. Pure minimalism with strategic green accent pop. Clean card-based layout emphasizing product discovery and secure checkout.

## Tone
Trustworthy, professional, modern. Zero fluff. Confident action buttons with subtle elevation.

## Color Palette

| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary (Accent) | `0.55 0.23 142` | Green action buttons, highlights, badges |
| Background | `0.99 0 0` | Main surface (white) |
| Card | `0.995 0 0` | Elevated content containers |
| Foreground | `0.25 0.01 250` | Text, dark elements |
| Muted | `0.92 0.01 250` | Subtle backgrounds, disabled states |
| Border | `0.92 0 0` | Subtle dividers, input borders |
| Destructive | `0.55 0.22 25` | Error states, critical actions |

## Typography

| Role | Font | Usage |
|------|------|-------|
| Display | General Sans (700, 600) | Headlines, trust badges, CTAs |
| Body | DM Sans (400, 500) | Body copy, product descriptions, form labels |
| Mono | Geist Mono | Pricing, order codes, order IDs |

## Elevation & Depth

- Base: `bg-background` (white, no shadow)
- Card: `bg-card` with `shadow-sm` + `border-border` (product containers, form sections)
- Elevated: `shadow-md` (buttons on hover, modals)
- Popover: `shadow-lg` (dropdowns, tooltips)

## Structural Zones

| Zone | Background | Border | Shadow | Purpose |
|------|-----------|--------|--------|---------|
| Header | `bg-card` | `border-b border-border` | `shadow-sm` | Navigation, logo, sticky top |
| Hero | `bg-background` | None | None | Full-width image background with overlay |
| Product Grid | `bg-background` | None | None | Main content, cards within grid |
| Card (Product) | `bg-card` | `border border-border` | `shadow-sm` | Individual product container |
| Footer | `bg-card` | `border-t border-border` | None | Trust badges, links, contact |
| Modal/Overlay | `bg-popover` | None | `shadow-lg` | Forms, checkout, admin panel |

## Component Patterns

- **Buttons**: Primary (green bg, white text), Secondary (muted bg, dark text), Ghost (text-only)
- **Cards**: Subtle border + shadow, 8px radius, light hover state
- **Badges**: Green background for cashback, inline with product cards
- **Form Inputs**: Muted background, dark border on focus, 8px radius
- **Trust Badges**: Green accent text + icon, footer prominence (UPI, COD, WhatsApp)

## Motion

- Transitions: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` for interactive elements
- Button hover: Background opacity shift, no scale distortion
- Page load: Staggered `fade-in` + `slide-up` for product cards (30ms stagger)
- Loading states: Subtle pulse animation on skeleton loaders

## Spacing & Rhythm

- Base unit: 4px (Tailwind default)
- Padding: 16px (cards), 24px (sections), 8px (inline elements)
- Gap: 16px (product grid), 12px (form fields)
- Line height: 1.5 (body), 1.2 (headlines)

## Shape Language

- Cards & inputs: `rounded-md` (8px, `calc(var(--radius) - 2px)`)
- Buttons: `rounded-md` (8px)
- Large sections: `rounded-lg` (10px, `var(--radius)`)

## Signature Detail

Trust badges prominently displayed in hero and footer with green accent text and icons. Every product card shows green "₹100 Cashback" badge to reinforce value proposition. Subtle elevation on cards creates visual hierarchy without clutter.

## Differentiation

Non-generic e-commerce: emerald green + pure white (not the default blue SaaS palette), confident product-focused layout with zero decorative gradients, trust signals integrated as design elements, not afterthoughts.

## Dark Mode

Inverted lightness with adjusted saturation: Primary accent shifts to lighter green (`0.65 0.19 142`), backgrounds darken to near-black (`0.14`), text lightens to near-white (`0.92`). All contrast ratios maintained above 4.5:1 for readability.

## Responsive

Mobile-first: base styles for mobile, breakpoints at `sm: 640px`, `md: 768px`, `lg: 1024px`. Product grid: 1 column mobile, 2 columns at `sm:`, 3 columns at `md:`. Hero CTA full-width on mobile, centered on desktop.

## Constraints

- No gradients on text or buttons (solid colors only)
- No drop shadows deeper than `shadow-lg`
- No arbitrary Tailwind colors (all tokens via CSS variables)
- Header/footer always visible or sticky on mobile
- Form fields must have visible focus state (ring + border-accent)
