# Accessibility

## Skip Link

A visually hidden link at the top of the page that becomes visible on focus, allowing keyboard users to skip past navigation.

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

The skip link targets `id="main-content"` on the `<main>` element. Styled with primary color, appears top-center on focus.

## Focus Management

### Focus-Visible Rings
All interactive elements get a visible focus ring on keyboard navigation (`:focus-visible`), but not on mouse clicks.

Default ring: 2px offset, uses `--bs-primary` color.

### Themed Focus Rings
Apply to specific elements for colored focus indicators:

| Class | Color |
|-------|-------|
| `.focus-ring-primary` | Primary |
| `.focus-ring-success` | Success |
| `.focus-ring-danger` | Danger |
| `.focus-ring-ai` | AI |

```html
<button class="btn btn-primary focus-ring-primary">Save</button>
```

## Screen Reader Utilities

### `.sr-only`
Visually hides an element while keeping it accessible to screen readers. Use for labels, descriptions, and status text that sighted users don't need.

```html
<button class="btn btn-icon">
  <i data-lucide="x"></i>
  <span class="sr-only">Close dialog</span>
</button>
```

## ARIA Patterns

### Layout
- Topbar: `role="banner"`, buttons have `aria-label`
- Sidebar: `role="complementary"`, `aria-label="Sidebar navigation"`
- Main content: `role="main"`, `id="main-content"`
- Navigation: `aria-label="Main navigation"`

### Interactive Components
- Dark mode toggle: `aria-label="Toggle dark mode"`
- Sidebar toggle: `aria-label="Toggle sidebar"`
- Modals/drawers: use Bootstrap's built-in ARIA handling
- Command palette: keyboard-navigable with arrow keys, Escape to close

## Reduced Motion

When the user has `prefers-reduced-motion: reduce` set in their OS:

- All CSS `animation` durations set to near-zero (`0.01ms`)
- All CSS `transition` durations set to near-zero
- Skeleton shimmer animation stops
- Animated borders (shimmer, glow) stop animating
- Toast enter/exit animations are instant

```css
/* Automatically applied — no action needed */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## High Contrast Mode

Basic support for Windows High Contrast Mode via `forced-colors: active`:

- Focus rings use `Highlight` system color
- Borders use `ButtonText` system color
- Ensures interactive elements remain distinguishable

## Keyboard Navigation

### Global Shortcuts
| Key | Action |
|-----|--------|
| `Cmd/Ctrl + K` | Open command palette |
| `Escape` | Close command palette, modals, drawers |
| `Tab` | Navigate between interactive elements |

### Command Palette
| Key | Action |
|-----|--------|
| `Arrow Up/Down` | Move between results |
| `Enter` | Navigate to selected result |
| `Escape` | Close palette |
| Type to filter | Fuzzy search across all items |

### Chat Composer
| Key | Action |
|-----|--------|
| `Enter` | Send message |
| `Shift + Enter` | New line |
| `Cmd/Ctrl + B` | Bold |
| `Cmd/Ctrl + I` | Italic |
| `Cmd/Ctrl + K` | Link |
| `Cmd/Ctrl + E` | Code |

## Checklist for New Components

When building new components, ensure:

1. Interactive elements are focusable and have visible focus indicators
2. Buttons and links have accessible names (text content or `aria-label`)
3. Dynamic content changes are announced (use `aria-live` regions)
4. Color is not the sole means of conveying information
5. Touch targets are at least 44x44px on mobile
6. Animations respect `prefers-reduced-motion`
