# Integration Reference

Complete reference for integrating the Purpl theme into a Django project. The theme is a self-contained Django app — you should never need to edit files inside `theme/`.

## Architecture

```
theme/                          ← Read-only, do not modify
├── templates/theme/
│   ├── base.html               ← Master template
│   ├── sample_base.html        ← Copy this to your project
│   ├── layouts/
│   │   ├── full_width.html     ← No sidebar layout
│   │   └── with_sidebar.html   ← Default layout
│   ├── partials/
│   │   ├── _topbar.html        ← Topbar with overridable blocks
│   │   ├── _sidebar.html       ← Sidebar shell with sidebar_nav block
│   │   └── _command_palette.html
│   └── components/             ← Form rendering templates
├── templatetags/theme_tags.py  ← Template tags
├── static/theme/               ← CSS, JS, fonts
└── docs/                       ← Documentation

yourapp/                        ← Your project
├── templates/yourapp/
│   ├── base.html               ← Extends theme/base.html (copied from sample_base.html)
│   ├── products.html           ← Extends yourapp/base.html
│   └── orders.html             ← Extends yourapp/base.html
```

## Template Blocks Reference

### Page-level blocks (override in page templates)

| Block | Default | Purpose |
|-------|---------|---------|
| `title` | `Dashboard` | HTML `<title>` |
| `content` | empty | Main page content |
| `extra_head` | empty | Additional `<head>` content (CSS, meta) |
| `extra_js` | empty | Additional scripts before `</body>` |
| `layout_class` | `layout--sidebar-collapsed` | Layout CSS modifiers |

### App-level blocks (override in your base.html)

| Block | Default | Purpose |
|-------|---------|---------|
| `brand_name` | `Purpl` | Topbar brand text |
| `user_initials` | empty | Avatar button text |
| `user_avatar_initials` | empty | Avatar in dropdown header |
| `user_name` | empty | Display name in user menu |
| `user_email` | empty | Email in user menu |
| `sidebar_nav` | empty | Sidebar navigation content |
| `sidebar` | Renders `_sidebar.html` | Override to remove sidebar entirely |
| `topbar_actions` | empty | Custom buttons before search icon |
| `notification_count` | `0` | Badge number on bell icon |
| `notifications` | "No new notifications" | Notification dropdown body |
| `notifications_url` | `#` | "View all" link href |
| `topbar_user_menu_items` | Profile, Settings, Sign out | User dropdown menu links |
| `command_palette_pages` | empty | Cmd+K searchable page list |
| `command_palette_extra` | empty | Additional command palette groups |

## Template Tags

### `{% sidebar_link url icon label [active=False] %}`

Renders a sidebar navigation item with correct BEM classes, tooltip (`data-bs-title`), and active link attribute.

```html
{% load theme_tags %}
{% sidebar_link "/" "home" "Dashboard" %}
{% sidebar_link "/products/" "package" "Products" active=True %}
```

Output:
```html
<li class="sidebar__item">
  <a href="/products/" class="sidebar__link sidebar__link--active"
     data-sidebar-link data-bs-title="Products">
    <i data-lucide="package" class="sidebar__icon"></i>
    <span class="sidebar__label">Products</span>
  </a>
</li>
```

**Note:** Active state is also auto-detected by theme.js matching `window.location.pathname` against links with `data-sidebar-link`. The `active=True` parameter is for cases where you want to force active state.

### `{% sidebar_section title %}`

Renders a section heading in the sidebar.

```html
{% sidebar_section "Settings" %}
```

### `{% sidebar_divider %}`

Renders a horizontal divider line in the sidebar.

```html
{% sidebar_divider %}
```

### `{% cmd_palette_item url icon label %}`

Renders a searchable item in the command palette.

```html
{% cmd_palette_item "/products/" "package" "Products" %}
```

### `{% render_form form [layout] [compact] [submit_label] %}`

Renders an entire form with auto-detected field types.

```html
{% render_form form layout="horizontal" compact=True submit_label="Save" %}
```

### `{% render_field field [layout] [compact] %}`

Renders a single form field with label, errors, and help text.

```html
{% render_field form.email layout="vertical" %}
```

### `{{ text|markdown }}`

Converts markdown to HTML (supports fenced code, tables, line breaks).

## Sidebar Navigation Pattern

```html
{% block sidebar_nav %}
  {% sidebar_section "Main" %}
  <ul class="sidebar__nav">
    {% sidebar_link "/" "home" "Dashboard" %}
    {% sidebar_link "/products/" "package" "Products" %}
    {% sidebar_link "/orders/" "shopping-cart" "Orders" %}
  </ul>

  {% sidebar_divider %}
  {% sidebar_section "Admin" %}
  <ul class="sidebar__nav">
    {% sidebar_link "/users/" "users" "Users" %}
    {% sidebar_link "/settings/" "settings" "Settings" %}
  </ul>
{% endblock %}
```

Icons are Lucide icon names: https://lucide.dev/icons

## Topbar Customization

### Custom actions

Add buttons between the brand and the fixed actions (search, theme toggle, notifications, sidebar toggle, avatar):

```html
{% block topbar_actions %}
  <button class="topbar__btn" title="New order">
    <i data-lucide="plus" class="icon-sm"></i>
  </button>
  <span class="badge bg-warning text-dark me-2">STAGING</span>
{% endblock %}
```

### User menu

```html
{% block topbar_user_menu_items %}
  <a href="{% url 'profile' %}" class="topbar__user-item">
    <i data-lucide="user" class="icon-xs icon-muted"></i>
    <span>Profile</span>
  </a>
  <a href="{% url 'settings' %}" class="topbar__user-item">
    <i data-lucide="settings" class="icon-xs icon-muted"></i>
    <span>Settings</span>
  </a>
  <a href="#" class="topbar__user-item">
    <i data-lucide="keyboard" class="icon-xs icon-muted"></i>
    <span>Keyboard shortcuts</span>
    <kbd class="ms-auto">⌘K</kbd>
  </a>
  <div class="topbar__user-divider"></div>
  <a href="{% url 'logout' %}" class="topbar__user-item topbar__user-item--danger">
    <i data-lucide="log-out" class="icon-xs"></i>
    <span>Sign out</span>
  </a>
{% endblock %}
```

### Notifications

```html
{% block notification_count %}{{ unread_count }}{% endblock %}
{% block notifications %}
  {% for n in notifications %}
  <a href="{{ n.url }}" class="topbar__notification {% if not n.read %}topbar__notification--unread{% endif %}">
    <div class="topbar__notification-icon topbar__notification-icon--{{ n.type }}">
      <i data-lucide="{{ n.icon }}" class="icon-xs"></i>
    </div>
    <div class="topbar__notification-content">
      <div class="topbar__notification-text">{{ n.message }}</div>
      <div class="topbar__notification-time">{{ n.time }}</div>
    </div>
  </a>
  {% endfor %}
{% endblock %}
```

Notification icon types: `--primary`, `--success`, `--warning`, `--danger`, `--info`, `--ai`

## Command Palette

Add searchable pages to Cmd+K:

```html
{% block command_palette_pages %}
  <div class="cmd-palette__group">
    <div class="cmd-palette__group-label">Pages</div>
    {% cmd_palette_item "/" "home" "Dashboard" %}
    {% cmd_palette_item "/products/" "package" "Products" %}
  </div>
{% endblock %}

{% block command_palette_extra %}
  <div class="cmd-palette__group">
    <div class="cmd-palette__group-label">Documentation</div>
    {% cmd_palette_item "/docs/api/" "book-open" "API Reference" %}
  </div>
{% endblock %}
```

## JavaScript APIs

These are available globally after theme.js loads:

### Toast notifications

```javascript
ThemeToast.show({ message: "Saved!", type: "success", duration: 3000 });
ThemeToast.success("Record created");
ThemeToast.error("Something went wrong");
ThemeToast.warning("Unsaved changes");
ThemeToast.info("Processing...");
ThemeToast.ai("Analysis complete");
```

Toasts render with Purpl's `.bds-toast`, which has three variants (success / warning / error). `info`, `ai` and `primary` render as its neutral, info-accented base. See `theme/docs/UI_COMPONENTS.md`.

### Typewriter effect

```html
<div class="typewriter" data-typewriter data-typewriter-content="Hello world" data-typewriter-speed="20"></div>
```

Or programmatically:
```javascript
ThemeTypewriter.stream(element, "Text to type", 20);
```

## CSS Custom Properties

Use these for dark-mode-safe custom components:

```css
/* Surfaces */
var(--surface-0)     /* Page background */
var(--surface-1)     /* Cards, panels */
var(--surface-2)     /* Hover, nested */
var(--surface-3)     /* Active states */

/* Text */
var(--text-primary)     /* Headings, body */
var(--text-secondary)   /* Labels */
var(--text-muted)       /* Hints, timestamps */

/* Borders */
var(--border-color)        /* Standard */
var(--border-color-light)  /* Subtle */

/* Theme colors */
var(--tertiary)   var(--accent)   var(--ai)
```

## Full Example: Your Base Template

See `theme/templates/theme/sample_base.html` for a complete, commented example.
