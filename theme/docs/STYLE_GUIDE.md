# Style Guide

## Colors

Mirrors Purpl's semantic tokens (`node_modules/@bayone-solutions/purpl/docs/tokens.md`) so Bootstrap's palette and Purpl's own `.bds-*` components share one source of truth. Sass compiles ahead of time, so `_variables.scss` holds a literal copy of each primitive rather than referencing the `--bds-*` custom property directly — re-sync by hand if Purpl's palette changes.

| Name      | Hex       | CSS Variable    | Purpl token           | Usage                          |
|-----------|-----------|-----------------|------------------------|---------------------------------|
| Primary   | `#CC297A` | `--bs-primary`  | `--bds-primary-600`    | CTAs, links, active states     |
| Secondary | `#844190` | `--bs-secondary`| `--bds-secondary-600`  | Supporting elements, labels    |
| Tertiary  | `#AB68BF` | `--tertiary`    | `--bds-secondary-400`  | Accents, highlights            |
| Accent    | `#1D4ED8` | `--accent`      | `--bds-blue-700`       | Info highlights, badges        |
| AI        | `#E85EA8` | `--ai`          | `--bds-primary-400`    | AI-related features            |
| Success   | `#15803D` | `--bs-success`  | `--bds-green-700`      | Positive states, confirmations |
| Danger    | `#DC2626` | `--bs-danger`   | `--bds-red-600`        | Errors, destructive actions    |
| Warning   | `#B45309` | `--bs-warning`  | `--bds-amber-700`      | Caution, warnings              |
| Info      | `#2563EB` | `--bs-info`     | `--bds-blue-600`       | Informational messages         |

### Surface Colors (CSS Custom Properties)

Built from Purpl's neutral primitive scale (`--bds-neutral-0…1000`), not hand-picked slate values, so the theme's surfaces share one palette with the Purpl components layer.

| Variable             | Light       | Dark        | Usage              |
|----------------------|-------------|-------------|--------------------|
| `--surface-0`        | `#f5f5f5`   | `#171717`   | Page background    |
| `--surface-1`        | `#ffffff`   | `#262626`   | Cards, topbar      |
| `--surface-2`        | `#f5f5f5`   | `#404040`   | Hover states       |
| `--surface-3`        | `#e5e5e5`   | `#525252`   | Active states      |
| `--text-primary`     | `#171717`   | `#f5f5f5`   | Headings, body     |
| `--text-secondary`   | `#525252`   | `#a3a3a3`   | Labels, captions   |
| `--text-muted`       | `#a3a3a3`   | `#737373`   | Disabled, hints    |
| `--border-color`     | `#d4d4d4`   | `#404040`   | Borders            |

## Typography

- **Display/headings**: Figtree (variable, 400–800) — Purpl's display font
- **Body/sans-serif**: Nunito Sans (variable, 400–800) — Purpl's body font
- **Monospace**: JetBrains Mono (400, 500, 700) — code and data, no Purpl equivalent so this stays a Synth addition
- **Base size**: 15px (`$font-size-base: 0.9375rem`)
- **Line height**: 1.6
- **Heading weight**: 600

### Utility Classes

| Class       | Size  | Usage                        |
|-------------|-------|------------------------------|
| `.fs-7`     | 13px  | Labels, secondary info       |
| `.fs-8`     | 11px  | Timestamps, badges, captions |
| `.text-mono`| —     | Applies monospace font       |

### Icon Sizes

| Class | Size | Pixels |
|-------|------|--------|
| `.icon-2xs` | 0.75rem | 12px |
| `.icon-xs` | 1rem | 16px |
| `.icon-sm` | 1.25rem | 20px |
| `.icon` / `.icon-md` | 1.5rem | 24px |
| `.icon-lg` | 2rem | 32px |
| `.icon-xl` | 2.5rem | 40px |
| `.icon-2xl` | 3rem | 48px |

Icon color helpers: `.icon-primary`, `.icon-success`, `.icon-danger`, `.icon-warning`, `.icon-info`, `.icon-ai`, `.icon-accent`, `.icon-muted`, `.icon-secondary`.

```html
<i data-lucide="home" class="icon-lg icon-primary"></i>
```

## Spacing

Uses Bootstrap 5 spacing scale (`m-*`, `p-*`, `gap-*`).

## Borders & Shadows

- `$border-radius`: 0.5rem (default)
- `$border-radius-sm`: 0.375rem
- `$border-radius-lg`: 0.75rem
- `$box-shadow-sm`: subtle 1px shadow
- `$box-shadow`: standard card shadow
- `$box-shadow-lg`: elevated element shadow

## SCSS Variables

The customization entry point is `_variables.scss`. All theme tokens are defined here and consumed by Bootstrap's build pipeline and custom component styles. Override any variable before importing Bootstrap to customize the theme.

### Colors

| Variable       | Default     | Description                              |
|----------------|-------------|-------------------------------------------|
| `$primary`     | `#CC297A`   | Purpl magenta (`--bds-primary-600`) — CTAs, links |
| `$secondary`   | `#844190`   | Purpl purple (`--bds-secondary-600`) — supporting elements |
| `$success`     | `#15803D`   | Positive states                          |
| `$danger`      | `#DC2626`   | Errors, destructive actions              |
| `$warning`     | `#B45309`   | Caution states                           |
| `$info`        | `#2563EB`   | Informational messages                   |
| `$tertiary`    | `#AB68BF`   | Accents, highlights                      |
| `$accent`      | `#1D4ED8`   | Info highlights, badges                  |
| `$ai`          | `#E85EA8`   | Lighter magenta — AI features            |

### Typography

| Variable                    | Default          | Description              |
|-----------------------------|------------------|--------------------------|
| `$font-family-sans-serif`   | Nunito Sans      | Primary body font        |
| `$headings-font-family`     | Figtree          | Headings/display font    |
| `$font-family-monospace`    | JetBrains Mono   | Code and data font       |
| `$font-size-base`           | `0.9375rem`      | 15px — data-dense default|
| `$font-size-sm`             | smaller step     | Labels, captions         |
| `$font-size-lg`             | larger step      | Emphasized text          |
| `$line-height-base`         | `1.6`            | Comfortable reading      |
| `$headings-font-weight`     | `600`            | Semi-bold headings       |

### Border Radius

| Variable            | Default     |
|---------------------|-------------|
| `$border-radius`    | `0.5rem`    |
| `$border-radius-sm` | `0.375rem`  |
| `$border-radius-lg` | `0.75rem`   |

### Shadows

| Variable        | Description              |
|-----------------|--------------------------|
| `$box-shadow-sm`| Subtle 1px shadow        |
| `$box-shadow`   | Standard card shadow     |
| `$box-shadow-lg`| Elevated element shadow  |

### Layout

| Variable                  | Default    | Description             |
|---------------------------|------------|--------------------------|
| `$topbar-height`          | `3.25rem`  | Fixed top bar height    |
| `$sidebar-width`          | `16rem`    | Expanded sidebar width  |
| `$sidebar-collapsed-width`| `3.5rem`   | Icon-only sidebar width |

### Cards

| Variable             | Description                    |
|----------------------|--------------------------------|
| `$card-border-radius`| Card corner radius             |
| `$card-spacer-y`     | Vertical padding inside cards  |
| `$card-spacer-x`     | Horizontal padding inside cards|
| `$card-border-color` | Card border color              |

### Z-Index Scale

| Variable                    | Value  | Usage                     |
|-----------------------------|--------|---------------------------|
| `$zindex-sidebar`           | `1020` | Left sidebar              |
| `$zindex-topbar`            | `1030` | Fixed top bar             |
| `$zindex-drawer-backdrop`   | `1040` | Right-drawer overlay      |
| `$zindex-drawer`            | `1050` | Right-drawer panel        |
| `$zindex-picker-dropdown`   | `1050` | Picker dropdowns          |
| `$zindex-toast`             | `1090` | Toast notifications       |
| `$zindex-cmd-palette`       | `1100` | Command palette overlay   |
| `$zindex-skip-link`         | `9999` | Accessibility skip link   |

### Focus Ring

| Variable              | Default  | Description            |
|-----------------------|----------|------------------------|
| `$focus-ring-width`   | `0.25rem`| Width of focus outline |
| `$focus-ring-opacity` | `0.15`   | Opacity of focus ring  |

## Dark Mode

Toggle via `data-bs-theme="dark"` on `<html>`. Bootstrap 5.3 handles most elements natively. Custom overrides in `_dark-mode.scss` and `_colors.scss` cover surface colors, cards, forms, and tables.

**Persistence**: JavaScript reads from `localStorage('bs-theme')`. An inline script in `<head>` applies the stored preference before first paint to prevent flash of wrong theme.

### CSS Custom Property System

The theme defines a set of CSS custom properties that automatically switch between light and dark values when `data-bs-theme` toggles:

- **Surfaces**: `--surface-0` (page background), `--surface-1` (cards, topbar, sidebar), `--surface-2` (hover states), `--surface-3` (active states). The key distinction is that surface-0 is the page background and surface-1 is for elevated elements like cards — they must be visibly different in both modes.
- **Text**: `--text-primary` (headings, body), `--text-secondary` (labels, captions), `--text-muted` (disabled, hints).
- **Borders**: `--border-color` adapts to each mode automatically.

See the **Surface Colors** table above for exact hex values.

### ECharts Theme Integration

ECharts instances automatically re-render when the theme changes. The theme toggle dispatches a custom event that chart components listen for, updating color schemes and background colors to match the active mode.

## Responsive Breakpoints

The theme uses Bootstrap's responsive mixins instead of hardcoded pixel values:

- `@include media-breakpoint-down(md)` — tablets and below (sidebar collapses, layout stacks)
- `@include media-breakpoint-down(sm)` — phones (further simplification, reduced padding)

Always prefer these mixins over raw `@media (max-width: ...)` queries to stay consistent with Bootstrap's breakpoint scale and ensure maintainability when breakpoints change.
