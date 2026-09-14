# UI Components

## Toasts

Notification system with auto-dismiss and stacking, rendered with Purpl's
`.bds-toast`. The JS builds the markup for you — you never write toast HTML.

### JS API

```js
ThemeToast.success("Saved!", { title: "Success" });
ThemeToast.error("Failed to save.", { title: "Error" });
ThemeToast.warning("Session expiring.", { title: "Warning" });
ThemeToast.info("Update available.", { title: "Info" });
ThemeToast.ai("Analysis complete.", { title: "AI Assistant" });

// Full options
ThemeToast.show({
  message: "Custom message",
  title: "Title",
  type: "primary",  // success, danger/error, warning, info, ai, primary
  duration: 5000,   // ms, 0 = no auto-dismiss
});
```

`show()` returns `{ dismiss, el }` so you can close a toast programmatically.

### Variants

Purpl's Toast has three variants. Its unmodified base is info-accented, so
`info`, `ai`, and `primary` all render as that neutral base:

| `type` | Renders as | `role` |
|--------|-----------|--------|
| `success` | `.bds-toast--success` | `status` |
| `warning` | `.bds-toast--warning` | `status` |
| `danger` / `error` | `.bds-toast--error` | `alert` |
| `info` / `ai` / `primary` | `.bds-toast` (neutral base) | `status` |

Only errors use `role="alert"` (interrupts the screen reader); everything else
is announced politely by the viewport's `aria-live="polite"`.

### Notes

- **Position is fixed.** Purpl's viewport is bottom-right and has no position
  variants, so the old `position` option is accepted but ignored.
- **No timer bar.** Purpl's toast has no progress-bar element; auto-dismiss
  still works, it just isn't visualised.
- Toasts are appended to an inner wrapper inside `.bds-toast-viewport`, because
  Purpl styles the stack via `.bds-toast-viewport > div`.

## Progress Bars

### Tinted Progress
`.progress .progress-tint-{color}` — Colored progress bars. Colors: primary, success, danger, warning, info, ai, accent.

### Thin Progress
`.progress .progress-thin` — 2px height, suitable for top-of-page loading indicators.

### Indeterminate
`.progress-bar .progress-indeterminate` — Animated sliding bar for unknown durations.

## Spinners

Bootstrap spinners with theme additions:

| Class | Size |
|-------|------|
| `.spinner-xs` | 1rem (extra small) |
| `.spinner-border-sm` | Bootstrap small |
| (default) | Bootstrap default |
| `.spinner-lg` | 2.5rem (large) |

Color variants: `.spinner-border-ai`, `.spinner-border-accent` — adds themed colors.

### Button Spinners
```html
<button class="btn btn-primary btn-sm" disabled>
  <span class="spinner-border spinner-xs me-1"></span> Loading...
</button>
```

## Skeleton Loaders

Shimmer animation placeholders. Add `.skeleton` base class plus a shape modifier.

| Class | Shape |
|-------|-------|
| `.skeleton--text` | Single line of text (100% width, 0.75rem height) |
| `.skeleton--heading` | Heading placeholder (60% width, 1.25rem height) |
| `.skeleton--avatar` | Circle (2.5rem) |
| `.skeleton--image` | Rectangle (100% x 12rem) |
| `.skeleton--chart` | Tall rectangle (100% x 16rem) |
| `.skeleton--btn` | Button placeholder (6rem x 2rem) |

Respects `prefers-reduced-motion` — animation disabled when user prefers reduced motion.

```html
<!-- Text block skeleton -->
<div class="skeleton skeleton--heading"></div>
<div class="skeleton skeleton--text"></div>
<div class="skeleton skeleton--text" style="width:75%"></div>
```

## Avatars

Purpl's `.bds-avatar` supplies the base, sizes, shapes and six colours. Both a
size and a shape class are required — neither has a default.

```html
<span class="bds-avatar bds-avatar--square bds-avatar--md bds-avatar--primary">AC</span>
```

### Sizes

| Class | Size |
|-------|------|
| `.bds-avatar--xs` | 20px |
| `.bds-avatar--sm` | 28px |
| `.bds-avatar--md` | 36px |
| `.bds-avatar--lg` | 48px |
| `.bds-avatar--xl` | 64px |

### Shape
`.bds-avatar--square` (rounded square) or `.bds-avatar--circle`.

### Colours

Purpl owns six; Synth adds the rest as `.avatar--{colour}`, the same way
`.btn-ai` extends Purpl's Button. They set Purpl's own custom properties, so
every other avatar rule still applies.

| Colour | Class |
|--------|-------|
| primary, secondary, success, warning, neutral | `.bds-avatar--{colour}` |
| error | `.bds-avatar--error` |
| ai, accent, tertiary, info | `.avatar--{colour}` (Synth) |
| danger | `.avatar--danger` (Synth; aliases Purpl's error tokens) |

**For a colour coming from view data, emit both shapes:**

```html
<span class="bds-avatar bds-avatar--square bds-avatar--sm
             bds-avatar--{{ user.colour }} avatar--{{ user.colour }}">AC</span>
```

Exactly one of the two is ever defined for a given value, so the other is a
no-op. This keeps dynamic values working without rewriting them in the view.

### Status Indicators

The dot lives *outside* `.bds-avatar` — the avatar sets `overflow:hidden` to
clip images to its shape, which would swallow a dot positioned at its edge.
Purpl sizes the dot with a descendant selector, so the wrapper repeats the
avatar's size class to keep it in scope:

```html
<div class="avatar-wrapper bds-avatar--md">
  <span class="bds-avatar bds-avatar--circle bds-avatar--md bds-avatar--primary">AC</span>
  <span class="bds-avatar__status bds-avatar__status--online"></span>
</div>
```

Status values: `bds-avatar__status--online` (green), `--away` (amber),
`--offline` (grey), and Synth's `avatar__status--busy` (red), which Purpl has
no equivalent for.

### Avatar Groups
```html
<div class="avatar-group">
  <span class="bds-avatar bds-avatar--square bds-avatar--md bds-avatar--primary">AC</span>
  <span class="bds-avatar bds-avatar--square bds-avatar--md bds-avatar--success">BM</span>
  <span class="avatar-group__more">+5</span>
</div>
```

## Steps (Wizard)

Horizontal multi-step indicator with connector lines.

```html
<div class="steps">
  <div class="step step--completed">
    <div class="step__indicator"></div>
    <div class="step__label">Account</div>
    <div class="step__desc">Create account</div>
  </div>
  <div class="step step--active">
    <div class="step__indicator"></div>
    <div class="step__label">Profile</div>
  </div>
  <div class="step">
    <div class="step__indicator"></div>
    <div class="step__label">Done</div>
  </div>
</div>
```

| Class | State |
|-------|-------|
| `.step--completed` | Green check, filled connector |
| `.step--active` | Primary color, filled connector |
| `.step--error` | Red X mark |
| (default) | Gray, unfilled |

Step numbers auto-increment via CSS counters.

## Timeline

Vertical activity feed with colored dots and connector line.

```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-item__dot timeline-item__dot--success">
      <i data-lucide="check" class="icon-xs"></i>
    </div>
    <div class="timeline-item__time">2 hours ago</div>
    <div class="timeline-item__title">Deployment complete</div>
    <div class="timeline-item__desc">v2.1.0 deployed to production.</div>
  </div>
</div>
```

Dot colors: `--primary`, `--success`, `--danger`, `--warning`, `--info`, `--ai`, `--accent`. Dots use solid backgrounds with a box-shadow ring to visually break the connector line.

## Tooltips & Popovers

### Tinted Tooltips
Add `data-bs-custom-class` to color a tooltip:

```html
<button data-bs-toggle="tooltip"
        data-bs-title="Success!"
        data-bs-custom-class="tooltip-success">Hover</button>
```

Colors: `tooltip-primary`, `tooltip-success`, `tooltip-danger`, `tooltip-warning`, `tooltip-ai`.

### Popovers
Standard Bootstrap popovers with theme-aware surface colors and borders. Work in both light and dark modes.

```js
// Initialize all tooltips and popovers
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new bootstrap.Popover(el));
```

## Icon Sizes

Utility classes for consistent icon sizing. Apply directly to Lucide `<i>` elements.

### Size Scale

| Class | Size |
|-------|------|
| `.icon-2xs` | 0.75rem (12px) |
| `.icon-xs` | 1rem (16px) |
| `.icon-sm` | 1.25rem (20px) |
| `.icon` / `.icon-md` | 1.5rem (24px) |
| `.icon-lg` | 2rem (32px) |
| `.icon-xl` | 2.5rem (40px) |
| `.icon-2xl` | 3rem (48px) |

### Color Helpers
`.icon-{color}` — primary, success, danger, warning, info, ai, accent, muted, secondary.

### Usage
```html
<i data-lucide="home" class="icon-lg icon-primary"></i>
<i data-lucide="sparkles" class="icon-sm icon-ai"></i>
```

## Command Palette

Global search overlay opened with `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux).

### Features
- Fuzzy text filtering across all items
- Grouped results (Pages, Actions, Documentation)
- Keyboard navigation: arrow keys + Enter
- Groups auto-hide when no matches
- Close with Escape or clicking backdrop

### Template
Include in your base template:
```html
{% include "theme/partials/_command_palette.html" %}
```

### CSS Classes

| Class | Usage |
|-------|-------|
| `.cmd-palette` | Root overlay (fixed, full viewport) |
| `.cmd-palette__backdrop` | Dark semi-transparent background |
| `.cmd-palette__dialog` | Centered dialog container |
| `.cmd-palette__input` | Search text input |
| `.cmd-palette__group` | Category section |
| `.cmd-palette__group-title` | Category heading |
| `.cmd-palette__item` | Individual result row |
| `.cmd-palette__item--active` | Keyboard-highlighted item |
| `.cmd-palette__footer` | Keyboard hints bar |
