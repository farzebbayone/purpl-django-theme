# Style Guide

## Colors

| Name      | Hex       | CSS Variable    | Usage                          |
|-----------|-----------|-----------------|--------------------------------|
| Primary   | `#4F46E5` | `--bs-primary`  | CTAs, links, active states     |
| Secondary | `#64748B` | `--bs-secondary`| Supporting elements, labels    |
| Tertiary  | `#8B5CF6` | `--tertiary`    | Accents, highlights            |
| Accent    | `#0EA5E9` | `--accent`      | Info highlights, badges        |
| AI        | `#A78BFA` | `--ai`          | AI-related features            |
| Success   | `#10B981` | `--bs-success`  | Positive states, confirmations |
| Danger    | `#EF4444` | `--bs-danger`   | Errors, destructive actions    |
| Warning   | `#F59E0B` | `--bs-warning`  | Caution, warnings              |
| Info      | `#06B6D4` | `--bs-info`     | Informational messages         |

### Surface Colors (CSS Custom Properties)

| Variable             | Light       | Dark        | Usage              |
|----------------------|-------------|-------------|--------------------|
| `--surface-0`        | `#ffffff`   | `#0f172a`   | Page background    |
| `--surface-1`        | `#f8fafc`   | `#1e293b`   | Cards, topbar      |
| `--surface-2`        | `#f1f5f9`   | `#334155`   | Hover states       |
| `--surface-3`        | `#e2e8f0`   | `#475569`   | Active states      |
| `--text-primary`     | `#0f172a`   | `#f1f5f9`   | Headings, body     |
| `--text-secondary`   | `#475569`   | `#94a3b8`   | Labels, captions   |
| `--text-muted`       | `#94a3b8`   | `#64748b`   | Disabled, hints    |
| `--border-color`     | `#e2e8f0`   | `#334155`   | Borders            |

## Typography

- **Sans-serif**: Inter (variable, 100–900)
- **Monospace**: JetBrains Mono (400, 500, 700)
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

| Variable       | Default     | Description                  |
|----------------|-------------|------------------------------|
| `$primary`     | `#5E6AD2`   | Slate indigo — CTAs, links   |
| `$secondary`   | `#64748B`   | Supporting elements, labels  |
| `$success`     | `#10B981`   | Positive states              |
| `$danger`      | `#EF4444`   | Errors, destructive actions  |
| `$warning`     | `#F59E0B`   | Caution states               |
| `$info`        | `#06B6D4`   | Informational messages       |
| `$tertiary`    | `#8B5CF6`   | Accents, highlights          |
| `$accent`      | `#0EA5E9`   | Info highlights, badges      |
| `$ai`          | `#D946EF`   | Electric orchid — AI features|

### Typography

| Variable                    | Default          | Description              |
|-----------------------------|------------------|--------------------------|
| `$font-family-sans-serif`   | Inter            | Primary body font        |
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
|---------------------------|------------|-------------------------|
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
