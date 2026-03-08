# Migration Guide

How to adopt this theme in a Django project.

## Quick Start

### 1. Install the theme app

Copy the `theme/` directory into your Django project and add it to `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    "theme",
    # your apps...
]
```

### 2. Create your app's base template

Copy `theme/templates/theme/sample_base.html` to your app:

```
cp theme/templates/theme/sample_base.html myapp/templates/myapp/base.html
```

Edit it to set your brand name, navigation, and user identity. See the comments in the file — every block is documented.

### 3. Extend your base in page templates

```html
{% extends "myapp/base.html" %}

{% block title %}Products{% endblock %}
{% block content %}
  <h1>Products</h1>
{% endblock %}
```

**Important:** Page templates extend *your* base, not `theme/base.html`. This keeps all project-specific customization in one place.

### 4. Run collectstatic

```bash
python manage.py collectstatic
```

## What You Customize (in your base.html)

| Block | Purpose | Example |
|-------|---------|---------|
| `brand_name` | Topbar brand text | `MyApp` |
| `user_initials` | Avatar circle text | `JD` |
| `user_avatar_initials` | Avatar in dropdown | `JD` |
| `user_name` | User display name | `{{ request.user.get_full_name }}` |
| `user_email` | User email in menu | `{{ request.user.email }}` |
| `sidebar_nav` | Sidebar navigation links | Use `{% sidebar_link %}` tag |
| `topbar_actions` | Custom buttons before search | Add buttons, badges, etc. |
| `notification_count` | Bell badge number | `{{ unread_count }}` |
| `notifications` | Notification dropdown content | Notification HTML |
| `topbar_user_menu_items` | User dropdown menu links | Profile, Settings, Sign out |
| `command_palette_pages` | Cmd+K searchable pages | Use `{% cmd_palette_item %}` tag |

## Template Tags

```html
{% load theme_tags %}

{# Sidebar #}
{% sidebar_section "Main" %}
{% sidebar_link "/products/" "package" "Products" %}
{% sidebar_link "/orders/" "shopping-cart" "Orders" active=True %}
{% sidebar_divider %}

{# Command palette #}
{% cmd_palette_item "/products/" "package" "Products" %}

{# Forms #}
{% render_form form layout="vertical" %}
{% render_field form.name layout="horizontal" %}

{# Assets (already in base.html — only needed if building custom layouts) #}
{% theme_css %}
{% theme_js %}

{# Markdown filter #}
{{ text|markdown }}
```

## What You Do NOT Touch

These are theme infrastructure — they stay in `theme/` and work automatically:

- Dark/light mode toggle + persistence
- Sidebar collapse/expand + persistence
- Command palette (Cmd+K) search + keyboard navigation
- Active sidebar link highlighting (matches URL automatically)
- CSS, fonts, icons
- Toast API, typewriter effect, form rendering

## Migrating From django-bootstrap5

### Replace form tags

```html
<!-- Before -->
{% load django_bootstrap5 %}
{% bootstrap_form form %}

<!-- After -->
{% load theme_tags %}
{% render_form form layout="vertical" %}
```

### Remove old CSS/JS includes

The theme bundles Bootstrap 5.3, Bootstrap Icons, Lucide, and htmx. Remove any CDN links for these from your templates.

### CSS classes work as-is

All standard Bootstrap 5.3 classes work unchanged: `row`, `col-*`, `btn`, `card`, `alert`, `badge`, `table`, `modal`, etc.

### New utility classes

| Class | Purpose |
|-------|---------|
| `.fs-7` | 13px small text |
| `.fs-8` | 11px extra small text |
| `.text-mono` | JetBrains Mono monospace |
| `.btn-soft-*` | Soft/tinted button variants |
| `.btn-gradient` | Animated gradient CTA button |
| `.card-tint-*` | Tinted background cards |
| `.badge-soft-*` | Soft/tinted badges |

## Layout Options

### With sidebar (default)
```html
{% extends "myapp/base.html" %}
```

### Full width (no sidebar)
```html
{% extends "theme/layouts/full_width.html" %}
{% block content %}...{% endblock %}
```

Or override in your base.html:
```html
{% block sidebar %}{% endblock %}
{% block layout_class %}layout--no-sidebar{% endblock %}
```

## Dark Mode

No code needed. The theme handles it automatically via `data-bs-theme` on `<html>`. For custom components, use CSS custom properties:

```css
.my-widget {
  background: var(--surface-1);
  color: var(--text-primary);
  border-color: var(--border-color);
}
```

## Adding ECharts

```html
{% block extra_head %}
<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>
<script src="{% static 'theme/js/echarts-theme.js' %}"></script>
{% endblock %}

{% block extra_js %}
<script>
  var chart = ThemeCharts.create(document.getElementById("my-chart"), { ... });
</script>
{% endblock %}
```

## Checklist

- [ ] Copy `theme/` app to your project
- [ ] Add `"theme"` to `INSTALLED_APPS`
- [ ] Copy `sample_base.html` → `myapp/templates/myapp/base.html`
- [ ] Set brand name, user identity, navigation in your base.html
- [ ] All page templates extend your base, not `theme/base.html`
- [ ] Remove old Bootstrap CSS/JS includes
- [ ] Replace form rendering tags
- [ ] Run `python manage.py collectstatic`
- [ ] Test dark mode toggle
- [ ] Test sidebar collapse/expand
