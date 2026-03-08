# Animations

All animations are CSS-only, applied via utility classes.

## Entrance Animations

| Class                    | Effect                    | Duration |
|--------------------------|---------------------------|----------|
| `.animate-fade-in`       | Opacity 0 to 1            | 0.3s     |
| `.animate-fade-in-up`    | Fade + slide up 0.5rem    | 0.3s     |
| `.animate-fade-in-down`  | Fade + slide down 0.5rem  | 0.3s     |
| `.animate-slide-in-right`| Slide from right + fade   | 0.3s     |
| `.animate-scale-in`      | Scale 0.95 to 1 + fade    | 0.2s     |

## Continuous Animations

| Class            | Effect              | Duration |
|------------------|---------------------|----------|
| `.animate-spin`  | 360deg rotation     | 1s loop  |

## Hover Effects

Apply to any element. Effect triggers on `:hover`.

| Class                  | Effect                               |
|------------------------|--------------------------------------|
| `.hover-lift`          | translateY(-2px) + shadow            |
| `.hover-shadow`        | Elevated shadow                      |
| `.hover-border-primary`| Primary color border appears         |
| `.hover-glow`          | Primary color glow ring (3px)        |

## Skeleton Loading

See [UI Components > Skeletons](UI_COMPONENTS.md) for the full skeleton system with BEM modifiers (`.skeleton--text`, `--heading`, `--avatar`, `--image`, `--chart`, `--btn`).

## Animated Borders & Glow

| Class | Effect |
|-------|--------|
| `.border-shimmer` | Rotating conic-gradient border (AI content highlight) |
| `.border-glow-ai` | Pulsing AI-colored box-shadow |
| `.border-glow-accent` | Pulsing accent-colored box-shadow |
| `.border-glow-primary` | Pulsing primary-colored box-shadow |
| `.border-gradient` | Static gradient border (primary to accent to AI) |
| `.focus-ring-primary` | Primary focus ring on `:focus-visible` |
| `.focus-ring-success` | Success focus ring |
| `.focus-ring-danger` | Danger focus ring |
| `.focus-ring-ai` | AI focus ring |

All animated effects respect `prefers-reduced-motion`.

## Staggered Children

`.stagger-children` — Children animate in sequence with `fade-in-up`, 50ms delay between each (up to 10 children).

```html
<div class="row stagger-children">
  <div class="col">Item 1</div> <!-- delay: 50ms -->
  <div class="col">Item 2</div> <!-- delay: 100ms -->
  <div class="col">Item 3</div> <!-- delay: 150ms -->
</div>
```

## CTA Button Animation

`.btn-cta` — Button lifts on hover (translateY(-1px)) with elevated shadow. Returns on click.
