# Components

## Buttons

### Standard
Bootstrap default: `.btn .btn-{color}` where color = primary, secondary, success, danger, warning, info, dark, light.

### Outline
`.btn .btn-outline-{color}`

### Soft (custom)
`.btn .btn-soft-{color}` — Translucent background, solid text, fills on hover.
Colors: primary, secondary, success, danger, warning, info, tertiary, ai.

### Icon Button
`.btn .btn-icon` — Square button for icons. Combine with `.btn-sm` or `.btn-lg`.

### CTA Button
`.btn .btn-cta` — Lifts on hover with shadow. Use for primary calls-to-action.

### Loading Button
`.btn .btn-loading` — Disabled with spinner. Add `<span class="btn-loading__spinner"></span>` inside.

## Cards

### Standard Card
Bootstrap `.card` with theme styling (rounded corners, subtle border).

### Stat Card
`.card .card-stat` — Hover lift effect. Inner classes:
- `.card-stat__value` — Large number
- `.card-stat__label` — Description text
- `.card-stat__trend` + `--up`/`--down` — Colored change indicator
- `.card-stat__icon` — Icon container

### Chart Card
`.card .card-chart` — Optimized for charts.
- `.card-chart__header` — Flex header with title and controls
- `.card-chart__title` — Chart name
- `.card-chart__container` — Chart render area (min-height: 250px)

### Tinted Cards
`.card .card-tint-{color}` — Subtle colored background tint with matching border. Colors: primary, success, danger, warning, info, ai.
- `.card-tint__icon` — Icon colored to match the tint
- `.card-tint__title` — Title colored to match the tint

### Horizontal Image Cards
`.card .card-horizontal` — Card with side-by-side image and content layout.
- `.card-horizontal__img` — Image element (35% width, cover-fit)
- `.card-horizontal__body` — Content area (flex column, vertically centered)
- `.card-horizontal--right` — Places image on the right side instead of left

Responsive: stacks vertically on small screens (image becomes full-width at 10rem height).

**When to use:** Product listings, article previews, or any card where a landscape image pairs with text content.

```html
<div class="card card-horizontal">
  <img src="photo.jpg" class="card-horizontal__img" alt="...">
  <div class="card-horizontal__body">
    <h5>Card title</h5>
    <p class="text-secondary">Supporting text goes here.</p>
    <a href="#" class="btn btn-sm btn-soft-primary">View details</a>
  </div>
</div>

<!-- Image on the right -->
<div class="card card-horizontal card-horizontal--right">
  <img src="photo.jpg" class="card-horizontal__img" alt="...">
  <div class="card-horizontal__body">
    <h5>Right-side image</h5>
    <p class="text-secondary">Image appears on the right.</p>
  </div>
</div>
```

## Expandable Cards

Summary/detail cards that expand to reveal charts, tables, and detailed content. Supports both height and width expansion.

### Structure

Three layers: **header** (clickable, slim) → **body** (always visible, key stats) → **detail** (expandable).

```html
<div class="card card-expandable card-expandable--primary" data-expandable>
  <!-- Header: clickable, always slim -->
  <div class="card-expandable__header">
    <div class="card-expandable__title">Revenue</div>
    <div class="card-expandable__header-right">
      <span class="card-expandable__subtitle">Q1 2026</span>
      <div class="card-expandable__toggle">
        <i data-lucide="chevron-down"></i>
      </div>
    </div>
  </div>
  <!-- Body: always visible, key metrics -->
  <div class="card-expandable__body">
    <div class="card-expandable__metrics">
      <div class="card-expandable__metric">
        <div class="card-expandable__metric-value">$2.4M</div>
        <div class="card-expandable__metric-label">Total Revenue</div>
      </div>
      <span class="card-expandable__change card-expandable__change--up">+18.3%</span>
    </div>
  </div>
  <!-- Detail: expandable -->
  <div class="card-expandable__detail">
    <div class="card-expandable__detail-inner">
      <div class="card-expandable__detail-body">
        <!-- Charts, tables, etc. -->
      </div>
    </div>
  </div>
</div>
```

Toggle `.card-expandable--expanded` class on click (via JS).

### Width Expansion

Wrap cards in `.expandable-grid` and add width modifier:
- `.card-expandable--expand-wide` — spans 2 columns when expanded
- `.card-expandable--expand-full` — spans full width when expanded

### Color Accents

`.card-expandable--{color}` — adds a top border accent. Colors: primary, success, danger, warning, info, ai, accent, tertiary.

### Detail Sections

- `.expandable-detail-tabs` — tab bar inside expanded area
- `.expandable-stat-row` — horizontal row of stat items
- `.card-expandable__change--up` / `--down` — green/red change indicator pill

## Alerts

### Standard
Bootstrap `.alert .alert-{color}`.

### Soft Alerts
`.alert .alert-{color} .alert-soft` — Lighter, borderless. Colors: primary, success, danger, warning, info.

### Notifications
`.notification` — Toast-style component.
- `.notification--success`, `--danger`, `--warning`, `--info` — Color variants
- `.notification__icon` — Left icon
- `.notification__title` — Bold title
- `.notification__message` — Description
- `.notification__close` — Dismiss button

## Badges

### Standard & Pill
Bootstrap `.badge .bg-{color}` and `.badge .rounded-pill .bg-{color}`.

### Soft Badges
`.badge .badge-soft-{color}` — Translucent background. Colors: primary, secondary, success, danger, warning, info, ai.

### AI-Generated Badges
Animated gradient badges for identifying AI-generated content.

| Class | Description |
|---|---|
| `.badge-ai-generated` | Solid gradient cycling primary → ai → tertiary → accent (4s loop) |
| `.badge-ai-generated-soft` | Animated tinted background with ai-colored text and subtle border |
| `.badge-ai-generated-outline` | Animated border + text color cycling through theme colors |

All variants work with `.rounded-pill` for pill shape. Respects `prefers-reduced-motion`.

```html
<!-- Solid -->
<span class="badge badge-ai-generated d-inline-flex align-items-center gap-1">
  <i data-lucide="sparkles" class="icon-2xs"></i> AI Generated
</span>

<!-- Soft -->
<span class="badge rounded-pill badge-ai-generated-soft d-inline-flex align-items-center gap-1">
  <i data-lucide="sparkles" class="icon-2xs"></i> AI Generated
</span>

<!-- Outline -->
<span class="badge badge-ai-generated-outline d-inline-flex align-items-center gap-1">
  <i data-lucide="sparkles" class="icon-2xs"></i> AI Generated
</span>
```

### Status Dot
`.status-dot` — Small colored circle.
- `.status-dot--online` (green), `--busy` (red), `--away` (yellow), `--offline` (gray)
- `.status-dot--pulse` — Animated pulse

### Status Badge
`.status-badge` — Pill with status dot inside.
- `.status-badge--success`, `--danger`, `--warning`

## Modals & Drawers

### Modals
Purpl's `.bds-modal` on the native `<dialog>` element. Opening with
`showModal()` is what makes this work without React — the browser supplies the
focus trap, Escape handling, top-layer stacking, background inerting and focus
restore, so there is no JS reimplementation of any of it.

```html
<button data-bds-modal-open="#confirm">Delete</button>

<dialog class="bds-modal bds-modal--sm" id="confirm" aria-labelledby="confirmTitle">
  <div class="bds-modal__inner">
    <div class="bds-modal__header">
      <h2 class="bds-modal__title" id="confirmTitle">Confirm action</h2>
      <button type="button" class="bds-modal__close" data-bds-modal-close aria-label="Close">
        <i data-lucide="x" class="icon-xs"></i>
      </button>
    </div>
    <p class="mb-0">This cannot be undone.</p>
    <div class="bds-modal__footer">
      <button class="btn btn-outline-secondary" data-bds-modal-close>Cancel</button>
      <button class="btn btn-danger" data-bds-modal-close>Delete</button>
    </div>
  </div>
</dialog>
```

| Hook | Purpose |
|------|---------|
| `data-bds-modal-open="#id"` | Opens that dialog |
| `data-bds-modal-close` | Closes the dialog it sits inside |
| `ThemeModal.open(sel)` / `.close(sel)` | Programmatic control |
| `bds:modal:open` event | Fires once visible — the replacement for `shown.bs.modal` |
| native `close` event | Fires on close; `<dialog>` provides it |

Sizes: `.bds-modal--sm` (400px), default (560px), `.bds-modal--lg` (720px).
Clicking the backdrop closes the dialog. Keep Cancel before the confirming
action, and make destructive confirms `.btn-danger`.

**Use `bds:modal:open` for anything that must measure itself when visible** —
rich-text editors, charts, maps. The email compose editor does exactly this.

Requires a browser with `<dialog>` support (Safari 15.4+, March 2022).

### Drawers
`.drawer` — Right-side slide-in panel (fixed position, 28rem wide, max 90vw). Slides in from the right edge with a 0.25s transition.
- `.drawer--open` — Makes the drawer visible (removes `translateX(100%)`)
- `.drawer__header` — Flex row with title and close button, bottom border
- `.drawer__title` — Semibold 1rem heading
- `.drawer__close` — Borderless close button, muted color
- `.drawer__body` — Scrollable content area with padding
- `.drawer__footer` — Bottom section with top border (for action buttons)
- `.drawer-backdrop` — Full-screen overlay (30% black)
- `.drawer-backdrop--visible` — Shows the backdrop and enables pointer events

**When to use:** Detail panels, edit forms, or secondary content that should overlay the page without a full modal. Ideal for record detail views in data-heavy applications.

```html
<!-- Backdrop -->
<div class="drawer-backdrop drawer-backdrop--visible" id="drawerBackdrop"></div>

<!-- Drawer -->
<div class="drawer drawer--open">
  <div class="drawer__header">
    <h5 class="drawer__title">Edit Record</h5>
    <button class="drawer__close" aria-label="Close">
      <i data-lucide="x"></i>
    </button>
  </div>
  <div class="drawer__body">
    <p>Drawer content goes here.</p>
  </div>
  <div class="drawer__footer">
    <button class="btn btn-sm btn-secondary">Cancel</button>
    <button class="btn btn-sm btn-primary">Save</button>
  </div>
</div>
```

## Navigation

### Breadcrumbs
Standard Bootstrap `.breadcrumb` with theme styling.

### Tabs
Purpl's `.bds-tabs`, driven by the theme's own controller — Bootstrap's tab
plugin is no longer used here. Two variants: `.bds-tabs--underline` (was
`.nav-tabs-minimal`) and `.bds-tabs--contained` (pills, was `.nav-pills-soft`).

```html
<nav class="bds-tabs bds-tabs--underline mb-4" data-bds-tabs>
  <button type="button" class="bds-tab bds-tab--md"
          data-bds-tab-target="#pane-a" aria-selected="true">Overview</button>
  <button type="button" class="bds-tab bds-tab--md"
          data-bds-tab-target="#pane-b" aria-selected="false">Activity</button>
</nav>

<div class="tab-content">
  <div class="tab-pane fade" id="pane-a">…</div>
  <div class="tab-pane fade" id="pane-b">…</div>
</div>
```

**`aria-selected` is load-bearing, not decorative** — Purpl styles the active
tab with `.bds-tab[aria-selected="true"]`, so a tab list that only toggles an
`.active` class will render with nothing highlighted. The controller maintains
it for you; just set it correctly in the initial markup.

Keyboard: ← / → move between tabs (wrapping), Home / End jump to first / last,
and roving `tabindex` means the group is a single tab stop. The controller sets
`role="tablist"` / `"tab"` / `"tabpanel"` and wires `aria-labelledby` itself.

Sizes: `.bds-tab--sm`, `--md`, `--lg`. Panes reuse Bootstrap's `.tab-pane`
classes for show/hide and the fade transition.

Omit `data-bds-tab-target` for a display-only tab group — selection still
moves on click, but no panes are switched.

## Accordion

Standard Bootstrap `.accordion` with theme overrides (surface colors, themed focus rings).

- `.accordion-item` — Uses `--surface-1` background and `--border-color`
- `.accordion-button` — Font-weight 500; expanded state uses `--surface-2` with inset border
- `.accordion-body` — Uses `--text-secondary` for body content
- `.accordion-flush` — Removes left/right borders (ideal inside cards)

### Tinted Variants
`.accordion--{color}` — Tints the expanded header background and text. Colors: primary, success, danger, info, accent, ai. Focus ring matches the tint color.

**When to use:** FAQ sections, collapsible settings panels, or any content that benefits from progressive disclosure.

```html
<div class="accordion accordion--primary" id="faqAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button"
              data-bs-toggle="collapse" data-bs-target="#faq1">
        What is this component?
      </button>
    </h2>
    <div id="faq1" class="accordion-collapse collapse show"
         data-bs-parent="#faqAccordion">
      <div class="accordion-body">
        A collapsible content panel with themed styling.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button"
              data-bs-toggle="collapse" data-bs-target="#faq2">
        Can I use it inside a card?
      </button>
    </h2>
    <div id="faq2" class="accordion-collapse collapse"
         data-bs-parent="#faqAccordion">
      <div class="accordion-body">
        Yes — add <code>.accordion-flush</code> to remove outer borders.
      </div>
    </div>
  </div>
</div>
```

## List Group

Standard Bootstrap `.list-group` with theme overrides.

- `.list-group-item` — Uses `--surface-1` background and `--border-color`
- `.list-group-item-action` — Hoverable/clickable items with surface-2 hover and surface-3 active
- `.list-group-flush` — Transparent background, no outer borders (for use inside cards)

### Helper Classes
- `.list-group-item__icon` — Fixed 1.25rem icon container, muted color
- `.list-group-item__content` — Flex-1 content area with `min-width: 0` for text truncation
- `.list-group-item__trailing` — Right-aligned secondary text (small, muted)

### Soft Color Variants
`.list-group-item-soft-{color}` — Translucent tinted background with matching text and border. Colors: primary, secondary, success, danger, warning, info, accent, ai. Action variants darken on hover.

**When to use:** Settings menus, notification lists, selectable option lists, or any vertical list of interactive items.

```html
<!-- Flush inside a card -->
<div class="card">
  <div class="card-header">Team Members</div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item d-flex align-items-center gap-2">
      <i data-lucide="user" class="list-group-item__icon"></i>
      <span class="list-group-item__content">Alice Johnson</span>
      <span class="list-group-item__trailing">Admin</span>
    </li>
    <li class="list-group-item d-flex align-items-center gap-2 list-group-item-soft-success">
      <i data-lucide="user-check" class="list-group-item__icon"></i>
      <span class="list-group-item__content">Bob Smith</span>
      <span class="list-group-item__trailing">Online</span>
    </li>
    <li class="list-group-item d-flex align-items-center gap-2">
      <i data-lucide="user" class="list-group-item__icon"></i>
      <span class="list-group-item__content">Carol Lee</span>
      <span class="list-group-item__trailing">Editor</span>
    </li>
  </ul>
</div>
```

## Dropdown

Standard Bootstrap `.dropdown-menu` with theme overrides (surface-1 background, rounded items, subtle shadow).

- `.dropdown-menu` — Themed background, border, shadow, and compact padding (0.375rem)
- `.dropdown-item` — Rounded corners, small font, surface-2 hover, primary-tinted active state
- `.dropdown-header` — Uppercase, small, muted section header with letter-spacing
- `.dropdown-divider` — Themed border color

### Special Classes
- `.dropdown-item__icon` — Fixed 1rem icon container for left-aligned icons
- `.dropdown-item__kbd` — Right-aligned keyboard shortcut badge (small bordered chip)
- `.dropdown-item--danger` — Red text with red-tinted hover (for destructive actions like delete)

**When to use:** Context menus, action menus on table rows, toolbar overflow menus, or any popup menu triggered by a button.

```html
<div class="dropdown">
  <button class="btn btn-soft-primary dropdown-toggle" data-bs-toggle="dropdown">
    Actions
  </button>
  <ul class="dropdown-menu">
    <li><h6 class="dropdown-header">File</h6></li>
    <li>
      <a class="dropdown-item d-flex align-items-center gap-2" href="#">
        <i data-lucide="pencil" class="dropdown-item__icon"></i>
        Edit
        <kbd class="dropdown-item__kbd">Ctrl+E</kbd>
      </a>
    </li>
    <li>
      <a class="dropdown-item d-flex align-items-center gap-2" href="#">
        <i data-lucide="copy" class="dropdown-item__icon"></i>
        Duplicate
        <kbd class="dropdown-item__kbd">Ctrl+D</kbd>
      </a>
    </li>
    <li><hr class="dropdown-divider"></li>
    <li>
      <a class="dropdown-item dropdown-item--danger d-flex align-items-center gap-2" href="#">
        <i data-lucide="trash-2" class="dropdown-item__icon"></i>
        Delete
        <kbd class="dropdown-item__kbd">Del</kbd>
      </a>
    </li>
  </ul>
</div>
```

## Carousel

Standard Bootstrap `.carousel` with theme overrides (rounded corners, polished controls).

- `.carousel` — Rounded corners with overflow hidden
- `.carousel-item img` — Cover-fit, full-width images
- `.carousel-control-prev` / `.carousel-control-next` — Hidden by default, appear on hover (0.2s fade)
- `.carousel-control-prev-icon` / `.carousel-control-next-icon` — Circular surface-1 backgrounds
- `.carousel-indicators [data-bs-target]` — Round dots (0.5rem) instead of default bars; active dot scales up 1.25x
- `.carousel-caption` — Semi-transparent black background, rounded, with styled heading and paragraph
- `.carousel--fixed-height` — Constrains images to 20rem height

Card nesting: when `.carousel` is a direct child of `.card`, outer border-radius is removed and top corners match the card radius.

**When to use:** Image galleries, feature showcases, testimonial sliders, or onboarding walkthroughs.

```html
<div id="heroCarousel" class="carousel slide carousel--fixed-height" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button data-bs-target="#heroCarousel" data-bs-slide-to="0" class="active"></button>
    <button data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
    <button data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="slide1.jpg" alt="...">
      <div class="carousel-caption">
        <h5>First Slide</h5>
        <p>Description text for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="slide2.jpg" alt="...">
    </div>
    <div class="carousel-item">
      <img src="slide3.jpg" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" data-bs-target="#heroCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" data-bs-target="#heroCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>
```

## Empty States
`.empty-state` — Centered vertical layout.
- `.empty-state__icon` — Large muted icon
- `.empty-state__title` — Heading
- `.empty-state__description` — Explanation text (max-width: 24rem)

## Colors

### Theme Palette
Nine named colors available as SCSS variables and CSS custom properties, mirroring Purpl's tokens (see `theme/docs/STYLE_GUIDE.md`):
- **Primary** `$primary` / `--primary` — #CC297A (Purpl magenta)
- **Secondary** `$secondary` / `--secondary` — #844190 (Purpl purple)
- **Tertiary** `$tertiary` / `--tertiary` — #AB68BF
- **Accent** `$accent` / `--accent` — #1D4ED8
- **AI** `$ai` / `--ai` — #E85EA8 (lighter magenta)
- **Success** `$success` / `--success` — #15803D
- **Danger** `$danger` / `--danger` — #DC2626
- **Warning** `$warning` / `--warning` — #B45309
- **Info** `$info` / `--info` — #2563EB

### Surface Colors
CSS custom properties that auto-switch between light and dark modes:
- `--surface-0` — Page background
- `--surface-1` — Cards, panels, topbar, sidebar
- `--surface-2` — Nested containers, hover states
- `--surface-3` — Borders, dividers

### Text Colors
- `--text-primary` — Main body text
- `--text-secondary` — Secondary/supporting text
- `--text-muted` — De-emphasized text (timestamps, captions)

### Border Colors
- `--border-color` — Standard borders
- `--border-color-light` — Subtle dividers

## Typography

### Fonts
- **Display/headings:** Figtree (variable weight, 400–800) — `$headings-font-family`
- **Body/sans-serif:** Nunito Sans (variable weight, 400–800) — `$font-family-sans-serif`
- **Monospace:** JetBrains Mono (400, 500, 700) — `$font-family-monospace`
- All locally bundled with `font-display: swap`

### Size Scale
- `$font-size-base: 0.9375rem` (15px) — body text
- `.fs-7` — 13px, secondary information and labels
- `.fs-8` — 11px, timestamps, badges, captions

### Utility Classes
- `.text-mono` — JetBrains Mono monospace font
- `.fw-bold`, `.fw-semibold`, `.fw-medium`, `.fw-normal` — font weights
- `.text-{color}` — text color using theme palette (primary, secondary, success, etc.)

## Offcanvas

Bootstrap's native Offcanvas with Purpl theme overrides:
- Background uses `--surface-1`, borders use `--border-color`
- Header gets a bottom border divider
- Close button styled for dark mode (inverted filter)
- Use `.offcanvas-end`, `.offcanvas-start`, `.offcanvas-bottom` for direction

## Button Groups

### Standard
Bootstrap `.btn-group` with themed border colors and active states.

### Segmented Control
`.btn-group-segmented` — Modern toggle control with pill-shaped background.

```html
<div class="btn-group-segmented">
  <input type="radio" class="btn-check" name="view" id="grid" checked>
  <label class="btn" for="grid">Grid</label>
  <input type="radio" class="btn-check" name="view" id="list">
  <label class="btn" for="list">List</label>
</div>
```

Uses `--surface-2` background, `--surface-1` for active pill, with subtle shadow.

## Calendar (FullCalendar)

Theme overrides for [FullCalendar v6](https://fullcalendar.io). Load via CDN:

```html
<link href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js"></script>
```

### Event Color Variants
Apply via `className` on events: `fc-event-primary`, `fc-event-success`, `fc-event-danger`, `fc-event-warning`, `fc-event-info`, `fc-event-ai`, `fc-event-accent`, `fc-event-tertiary`.

List view uses tinted style (colored left border + dot) instead of solid backgrounds.

## Email

Full email client layout components.

### Layout Structure

```html
<div class="email-layout">
  <div class="email-sidebar">...</div>
  <div class="email-list-panel">...</div>
  <div class="email-detail-panel">...</div>
</div>
```

### Components
- `.email-sidebar` — Folder navigation with `.email-sidebar__folder` links and `.email-sidebar__folder-count` badges
- `.email-list__item` — Email row. Modifiers: `--unread` (bold + dot), `--selected` (primary highlight), `--starred`
- `.email-detail` — Full email view with `__header`, `__actions`, `__body`, `__attachments`
- `.email-compose` — Compose form with `__field` inputs and `__editor` area (integrates with Quill)
