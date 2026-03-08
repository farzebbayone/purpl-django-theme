# UI Components

## Toasts

Notification system with auto-dismiss, timer bar, and stacking.

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
  type: "primary",    // success, danger, warning, info, ai, primary
  duration: 5000,     // ms, 0 = no auto-dismiss
  position: "top-right" // top-right, top-left, top-center, bottom-right, bottom-left, bottom-center
});
```

### CSS Classes

| Class | Usage |
|-------|-------|
| `.toast-container` | Fixed positioning wrapper |
| `.toast-container--top-right` | Position variant (also top-left, bottom-*, top/bottom-center) |
| `.theme-toast` | Base toast element |
| `.theme-toast--success` | Color variant (also danger, warning, info, ai, primary) |
| `.theme-toast--exiting` | Exit animation state |
| `.theme-toast__icon` | Left icon |
| `.theme-toast__content` | Text wrapper |
| `.theme-toast__title` | Bold title |
| `.theme-toast__message` | Description text |
| `.theme-toast__close` | Dismiss button |
| `.theme-toast__timer` | Auto-dismiss progress bar |

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

### Sizes

| Class | Size |
|-------|------|
| `.avatar--xs` | 1.5rem |
| `.avatar--sm` | 2rem |
| (default) | 2.5rem |
| `.avatar--lg` | 3rem |
| `.avatar--xl` | 3.5rem |

### Colors
`.avatar--{color}` — primary, success, danger, warning, info, ai, accent, tertiary, secondary.

### Round
`.avatar--round` — Fully circular (default is slightly rounded square).

### Status Indicators
Wrap avatar in `.avatar-wrapper`, add a status dot:

```html
<div class="avatar-wrapper">
  <span class="avatar avatar--primary">AC</span>
  <span class="avatar__status avatar__status--online"></span>
</div>
```

Status values: `--online` (green), `--away` (yellow), `--busy` (red), `--offline` (gray).

### Avatar Groups
```html
<div class="avatar-group">
  <span class="avatar avatar--primary">AC</span>
  <span class="avatar avatar--success">BM</span>
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
