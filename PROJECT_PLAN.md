# Purpl Theme for Django - Project Plan

## Project Overview

A modern, elegant Bootstrap 5 theme for Django with native dark mode, Slack-style chat interface, and rich component library. Designed for data-rich and AI-first applications. Palette and typography are repainted with Bayone's Purpl design tokens (`node_modules/@bayone-solutions/purpl`) while keeping Bootstrap for layout/grid/utilities and Synth's own component variety (soft/outline/tertiary/accent buttons, badges, alerts) — see `theme/docs/MIGRATION.md`.

**Package management**: Poetry (Python), npm (SCSS compilation only)
**Server**: Django dev server on port 8999

---

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Styling | SCSS (compiled to CSS) | Native Bootstrap 5 customization pipeline |
| Fonts | Figtree + Nunito Sans + JetBrains Mono (local) | Purpl's font pair for display/body, JetBrains Mono kept for code (Purpl has no mono opinion) |
| Icons | Lucide + Bootstrap Icons | Wide coverage, both SVG-based, no conflicts |
| Charts | ECharts | Rich viz for data-dense apps, astrology charts |
| htmx | Not bundled (CDN) | Project provides it |
| Dark mode | Bootstrap 5.3 `data-bs-theme` | Native, no flash |
| CSS framework | Bootstrap 5.3 | Drop-in for existing django-bootstrap projects; Purpl has no grid/utility system of its own |
| Demo data | Hardcoded context | Portable, AI-readable |
| Chat style | Full-width, thin-line separated | No bubbles, supports embedded HTML components |

---

## Color System

Mirrors Purpl's semantic tokens (`node_modules/@bayone-solutions/purpl/docs/tokens.md`) — see `theme/docs/STYLE_GUIDE.md` for the full table with Purpl token names.

```scss
$primary:    #CC297A;   // Purpl magenta (--bds-primary-600)
$secondary:  #844190;   // Purpl purple (--bds-secondary-600)
$tertiary:   #AB68BF;   // Lighter purple - for depth
$accent:     #1D4ED8;   // Deeper blue - alternate highlight
$success:    #15803D;
$danger:     #DC2626;
$warning:    #B45309;
$info:       #2563EB;
$ai:         #E85EA8;   // Lighter magenta - AI content marker

// Surface colors (auto-switch for dark mode), built from Purpl's neutral scale
$surface-0:  #F5F5F5;   // Page background
$surface-1:  #FFFFFF;   // Cards, panels
$surface-2:  #F5F5F5;   // Nested containers
$surface-3:  #E5E5E5;   // Borders, dividers
```

## Typography

```scss
$font-size-base: 0.9375rem;  // 15px - comfortable for data-dense UIs
$font-family-base: 'Nunito Sans', system-ui, sans-serif;   // Purpl body font
$headings-font-family: 'Figtree', system-ui, sans-serif;   // Purpl display font
$font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

---

## Phases

### Phase 1: Core Foundation [DONE]
- [x] Project scaffolding (Poetry, Django, npm)
- [x] SCSS architecture with Bootstrap 5 overrides
- [x] Color system + CSS custom properties
- [x] Typography (Inter, JetBrains Mono local)
- [x] Dark mode / light mode toggle
- [x] Layout: thin topbar + collapsible right sidebar + content area
- [x] Base template hierarchy
- [x] Basic demo page (dashboard) showing layout working
- [x] Core documentation (STYLE_GUIDE.md, LAYOUT.md)

### Phase 2: Component Library [DONE]
- [x] Buttons (variants, sizes, CTA with animations)
- [x] Cards (stat, content, chart container)
- [x] Alerts and notifications
- [x] Badges and status indicators
- [x] Modals and drawers
- [x] Breadcrumbs and navigation
- [x] Empty states
- [x] CSS animation classes
- [x] Component demo page
- [x] COMPONENTS.md, ANIMATIONS.md docs

### Phase 3: Forms & Tables [DONE]
- [x] Django form integration (native form rendering)
- [x] Form field styling (inputs, selects, checkboxes, radios, switches)
- [x] Form layouts (horizontal, vertical, inline)
- [x] Validation states
- [x] Data tables (sortable, responsive, dense)
- [x] Table pagination
- [x] Form and table demo pages
- [x] htmx form submission patterns

### Phase 4: Chat Interface (Slack-style) [DONE]
- [x] Message row component (full-width, thin-line separated)
- [x] User vs AI vs system message distinction
- [x] Avatar + username + timestamp header
- [x] Threaded replies (collapsible)
- [x] Message actions (hover: reply, react, pin, edit, delete)
- [x] Emoji reactions
- [x] Typing indicator (CSS animated)
- [x] Typewriter/streaming text effect for AI messages
- [x] Message composer with formatting toolbar
- [x] File/image attachments
- [x] Embedded HTML components within messages
- [x] Channel/conversation sidebar
- [x] htmx integration (send, load thread, react)
- [x] Chat demo page
- [x] CHAT_INTERFACE.md docs

### Phase 5: Data Visualization & Advanced [DONE]
- [x] ECharts integration patterns
- [x] Chart card components
- [x] Dashboard layout patterns
- [x] KPI/metric cards
- [x] Advanced demo pages
- [x] Final polish and MIGRATION.md
- [x] DATA_VIZ.md docs

### Phase 6: UI Polish & Advanced Components [DONE]
- [x] **UI Essentials** — themed progress bars, spinners, tooltips, popovers
- [x] **Toast/Snackbar System** — auto-dismiss, stacking, tinted variants, JS API
- [x] **Animated Borders** — gradient shimmer, AI glow, accent pulse, focus rings
- [x] **Skeleton Loaders** — placeholder shimmer for cards, text, avatars
- [x] **Avatars** — initials/image, sizes, groups with overlap, status dot
- [x] **Steps & Timeline** — wizard steps, vertical activity timeline
- [x] **Command Palette** — Cmd+K search modal with fuzzy filtering
- [x] **Accessibility** — ARIA labels, focus management, reduced-motion, skip links, keyboard nav
- [x] **Demo page** — showcase all Phase 6 components
- [x] **UI_COMPONENTS.md docs**

### Phase 7: SaaS Landing Page
- [x] **Scroll Animations JS** — IntersectionObserver to trigger fade-in, stagger on scroll
- [x] **Landing SCSS** (`_landing.scss`) — hero, pricing, testimonials, logo cloud, footer, gradient utilities
- [x] **Landing Navbar** — transparent, sticky, scrolls with page (distinct from app topbar)
- [x] **Hero Section** — large gradient background, oversized typography, CTA, decorative orbs
- [x] **Feature Grid** — icon + title + description cards with hover effects
- [x] **Pricing Cards** — tiered plans with highlighted "popular" tier
- [x] **Testimonials** — quote + avatar + name + role cards
- [x] **Logo Cloud** — row of grayscale partner logos
- [x] **Stats / Social Proof** — large numbers with labels
- [x] **FAQ Section** — accordion-based
- [x] **Footer** — multi-column links, social icons, copyright
- [x] **Move typography & color palette** — from dashboard to Components page as tabs
- [x] **Landing page template + view** — replace current dashboard route
- [ ] **LANDING_PAGE.md docs**

### Phase 8: Advanced Features & Bootstrap Extras [DONE]
- [x] **Bootstrap extras** — Offcanvas, button groups (segmented control), close button, figures, spinner variants
- [x] **Calendar** — FullCalendar v6 CDN integration with theme overrides, demo page with events
- [x] **Email** — Email client layout (sidebar, list, detail, compose), demo page with Quill compose
- [x] **Docs update** — COMPONENT_INDEX.md entries for Calendar, Email, Bootstrap extras

---

## Project Structure

```
bootstrap_theme_django/
├── pyproject.toml
├── package.json                      # SCSS compilation only
├── manage.py
├── PROJECT_PLAN.md                   # This file
├── README.md
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── theme/                            # The reusable theme app
│   ├── __init__.py
│   ├── static/theme/
│   │   ├── scss/                     # Source SCSS
│   │   ├── css/                      # Compiled CSS
│   │   ├── js/                       # Minimal JS
│   │   ├── bayone-purpl/             # Vendored Purpl tokens, components.css, fonts
│   │   ├── fonts/                    # JetBrains Mono (Purpl ships Figtree + Nunito Sans)
│   │   └── img/
│   ├── templates/theme/
│   │   ├── base.html
│   │   ├── layouts/
│   │   ├── components/
│   │   └── partials/
│   ├── templatetags/
│   │   └── theme_tags.py
│   ├── docs/                      # Markdown docs (bundled with theme)
│   │   ├── STYLE_GUIDE.md
│   │   ├── COMPONENTS.md
│   │   ├── LAYOUT.md
│   │   ├── ANIMATIONS.md
│   │   ├── FORMS_TABLES.md
│   │   ├── CHAT_INTERFACE.md
│   │   ├── DATA_VIZ.md
│   │   └── MIGRATION.md
│   └── apps.py
├── demo/                             # Demo app
│   ├── __init__.py
│   ├── templates/demo/
│   ├── views.py
│   ├── urls.py
│   └── apps.py
└── staticfiles/                      # collectstatic output (gitignored)
```

---

## Testing & Review

- Django dev server on port 8999
- Visual QA completed manually
- Each phase produces a working demo page
