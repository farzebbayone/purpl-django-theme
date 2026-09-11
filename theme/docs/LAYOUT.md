# Layout Architecture

## Structure

```
┌─────────────────────────────────────────────────┐
│ Topbar (fixed, 3.25rem height)                  │
├────────────────────────────────────┬─────────────┤
│                                    │  Sidebar    │
│  Main Content                      │  (right,    │
│  (.layout__content)                │  collapsible│
│                                    │  16rem /    │
│                                    │  3.5rem)    │
└────────────────────────────────────┴─────────────┘
```

## Components

### Topbar (`.topbar`)

Fixed to top, 3.25rem height, `--surface-1` background.

| Class              | Purpose                  |
|--------------------|--------------------------|
| `.topbar`          | Container                |
| `.topbar__brand`   | Left: logo + app name   |
| `.topbar__actions` | Right: action buttons    |
| `.topbar__btn`     | Icon button (2.25rem)    |
| `.topbar__avatar`  | User avatar circle       |

#### Brand (`.topbar__brand`)

The brand element sits on the left side of the topbar and links to the home page. It contains an icon and a text label. Override the text via the `{% block brand_name %}` template block.

| Class            | Purpose                        |
|------------------|--------------------------------|
| `.topbar__brand` | Anchor wrapping icon + text    |

```html
<a href="/" class="topbar__brand" aria-label="Home">
  <i data-lucide="hexagon" class="icon-sm"></i>
  <span>{% block brand_name %}Purpl{% endblock %}</span>
</a>
```

To change the brand name in a child template:

```html
{% block brand_name %}My App{% endblock %}
```

#### Topbar Dropdowns (`.topbar__dropdown-panel`)

Dropdown panels are toggled via `data-topbar-dropdown` on a trigger button. The attribute value maps to a panel `id` following the convention `{value}-panel`. JavaScript adds/removes the `.is-open` class on the panel. Only one panel can be open at a time. Panels close on outside click or the Escape key.

| Class / Attribute               | Purpose                                |
|---------------------------------|----------------------------------------|
| `.topbar__dropdown`             | Wrapper (positions the panel)          |
| `data-topbar-dropdown="{name}"` | Trigger attribute; targets `#{name}-panel` |
| `.topbar__dropdown-panel`       | The panel itself (hidden by default)   |
| `.topbar__dropdown-panel.is-open` | Visible state                        |
| `.topbar__dropdown-header`      | Panel header row (title + action)      |
| `.topbar__dropdown-body`        | Scrollable content area                |
| `.topbar__dropdown-footer`      | Panel footer with link                 |

```html
<div class="topbar__dropdown">
  <button class="topbar__btn" data-topbar-dropdown="notifications" aria-label="Notifications">
    <i data-lucide="bell" class="icon-sm"></i>
    <span class="topbar__badge">3</span>
  </button>
  <div class="topbar__dropdown-panel" id="notifications-panel">
    <div class="topbar__dropdown-header">
      <span class="fw-semibold">Notifications</span>
      <button class="btn btn-link btn-sm p-0 text-decoration-none fs-8">Mark all read</button>
    </div>
    <div class="topbar__dropdown-body">
      <!-- notification items here -->
    </div>
    <div class="topbar__dropdown-footer">
      <a href="#" class="fs-7">View all notifications</a>
    </div>
  </div>
</div>
```

#### Notification System (`.topbar__notification`)

Notification items live inside `.topbar__dropdown-body`. Each item contains a colored icon circle and text content. Unread items get a distinct background via `.topbar__notification--unread`.

| Class                                   | Purpose                                      |
|-----------------------------------------|----------------------------------------------|
| `.topbar__notification`                 | Single notification row (anchor)             |
| `.topbar__notification--unread`         | Unread styling (highlighted background)      |
| `.topbar__notification-icon`            | 2rem circle wrapping the icon                |
| `.topbar__notification-icon--success`   | Green icon circle                            |
| `.topbar__notification-icon--danger`    | Red icon circle                              |
| `.topbar__notification-icon--warning`   | Amber icon circle                            |
| `.topbar__notification-icon--info`      | Cyan icon circle                             |
| `.topbar__notification-icon--ai`        | Electric orchid icon circle                  |
| `.topbar__notification-icon--primary`   | Primary color icon circle                    |
| `.topbar__notification-content`         | Text wrapper                                 |
| `.topbar__notification-text`            | Main message line                            |
| `.topbar__notification-time`            | Relative timestamp                           |
| `.topbar__badge`                        | Count badge on topbar buttons (absolute-positioned) |

```html
<a href="#" class="topbar__notification topbar__notification--unread">
  <div class="topbar__notification-icon topbar__notification-icon--ai">
    <i data-lucide="sparkles" class="icon-xs"></i>
  </div>
  <div class="topbar__notification-content">
    <div class="topbar__notification-text">AI analysis complete — <strong>3 insights</strong> found.</div>
    <div class="topbar__notification-time">2 minutes ago</div>
  </div>
</a>
```

The badge is placed on the trigger button, not inside the panel:

```html
<button class="topbar__btn" data-topbar-dropdown="notifications">
  <i data-lucide="bell" class="icon-sm"></i>
  <span class="topbar__badge">3</span>
</button>
```

#### User Menu (`.topbar__dropdown-panel--user`)

The user menu is a dropdown panel variant triggered by the avatar button. It contains a user header with identity info and a list of menu items.

| Class                          | Purpose                                |
|--------------------------------|----------------------------------------|
| `.topbar__avatar-btn`          | Button wrapping the avatar             |
| `.topbar__avatar`              | Avatar circle with initials            |
| `.topbar__dropdown-panel--user`| User-specific panel variant            |
| `.topbar__user-header`         | Top section: avatar + name + email     |
| `.topbar__user-menu`           | Menu items container                   |
| `.topbar__user-item`           | Single menu link (icon + label)        |
| `.topbar__user-divider`        | Horizontal separator between groups    |
| `.topbar__user-item--danger`   | Red destructive action (e.g. sign out) |

```html
<div class="topbar__dropdown">
  <button class="topbar__avatar-btn" data-topbar-dropdown="user" aria-label="User menu">
    <span class="topbar__avatar" role="img" aria-label="User avatar">AC</span>
  </button>
  <div class="topbar__dropdown-panel topbar__dropdown-panel--user" id="user-panel">
    <div class="topbar__user-header">
      <span class="avatar avatar--primary">AC</span>
      <div>
        <div class="fw-semibold fs-7">{% block user_name %}Alice Chen{% endblock %}</div>
        <div class="fs-8 text-muted">{% block user_email %}alice@synth.io{% endblock %}</div>
      </div>
    </div>
    <div class="topbar__user-menu">
      <a href="/settings/" class="topbar__user-item">
        <i data-lucide="user" class="icon-xs icon-muted"></i>
        <span>Profile</span>
      </a>
      <a href="/settings/" class="topbar__user-item">
        <i data-lucide="settings" class="icon-xs icon-muted"></i>
        <span>Settings</span>
      </a>
      <div class="topbar__user-divider"></div>
      <a href="#" class="topbar__user-item topbar__user-item--danger">
        <i data-lucide="log-out" class="icon-xs"></i>
        <span>Sign out</span>
      </a>
    </div>
  </div>
</div>
```

Override user identity via template blocks: `{% block user_initials %}`, `{% block user_name %}`, `{% block user_email %}`.

### Sidebar (`.sidebar`)

Fixed right sidebar. Default collapsed (3.5rem), expands to 16rem.

| Class                      | Purpose                     |
|----------------------------|-----------------------------|
| `.sidebar`                 | Container                   |
| `.sidebar--collapsed`      | Collapsed state (3.5rem)    |
| `.sidebar--mobile-open`    | Visible on mobile           |
| `.sidebar__nav`            | Navigation list             |
| `.sidebar__link`           | Nav item link               |
| `.sidebar__link--active`   | Active nav item             |
| `.sidebar__icon`           | Icon (1.25rem)              |
| `.sidebar__label`          | Text label (hidden when collapsed) |
| `.sidebar__section-title`  | Group heading               |
| `.sidebar__divider`        | Horizontal separator        |

### Layout (`.layout`)

| Class                        | Purpose                          |
|------------------------------|----------------------------------|
| `.layout`                    | Content wrapper, `margin-right` for sidebar |
| `.layout--sidebar-collapsed` | Reduced margin for collapsed sidebar |
| `.layout__content`           | Inner content padding (1.5rem)   |

### Page Header (`.page-header`)

| Class                  | Purpose              |
|------------------------|----------------------|
| `.page-header__title`  | Page heading (h1)    |
| `.page-header__subtitle` | Description text  |

## Layout Templates

- `theme/layouts/with_sidebar.html` — Default layout with sidebar (extends base.html)
- `theme/layouts/full_width.html` — No sidebar, full width (extends base.html, empties sidebar block)

## Mobile Behavior (<768px)

- Sidebar moves off-screen (`translateX(100%)`)
- Content takes full width (`margin-right: 0`)
- Sidebar toggle opens it as an overlay (`sidebar--mobile-open`)

## Customization

Override sidebar content by overriding the `{% block sidebar %}` block.

## CSS Variables

| Variable                    | Default   |
|-----------------------------|-----------|
| `$topbar-height`            | 3.25rem   |
| `$sidebar-width`            | 16rem     |
| `$sidebar-collapsed-width`  | 3.5rem    |

## Persistence

Sidebar state saved to `localStorage` key `sidebar-state` (values: `collapsed`, `expanded`).
Dark mode saved to `localStorage` key `bs-theme` (values: `light`, `dark`).
