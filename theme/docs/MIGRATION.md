# Migration Guide

How to adopt this theme in a Django project.

## Important: Theme is Read-Only

The `theme/` directory in your consuming project is **managed by the install script** and should be treated as read-only. Do not edit files inside `theme/` directly — your changes will be overwritten on the next update.

**Where to customize:**
- Your app's `base.html` (extends `theme/base.html`) — brand, navigation, user identity
- Your own SCSS/CSS — additional styles layered on top
- Your own templates — extend theme templates via blocks

**What is protected:**
- A `.theme-lock` file tracks checksums of all installed files
- Django system check (`theme.W002`) warns on startup if any theme files have been modified
- The install script warns before overwriting local modifications

## Installation

### Using the install script (recommended)

From the **theme repository**, run:

```bash
python manage.py install_theme --dest /path/to/your/django/project
```

This copies all necessary theme files (CSS, JS, fonts, templates, template tags, docs) to the destination project's `theme/` directory and creates a `.theme-lock` integrity file.

Then in your consuming project:

```python
# settings.py
INSTALLED_APPS = [
    "theme",
    # your apps...
]
```

### Manual installation

If you prefer not to use the script, copy the `theme/` directory manually. Note that you won't get integrity checking or update warnings.

```bash
cp -r /path/to/theme-repo/theme /path/to/your-project/theme
```

## Updating the Theme

Run the same install command again:

```bash
python manage.py install_theme --dest /path/to/your/django/project
```

The script will:
1. Detect the existing `.theme-lock` file
2. Compare checksums to find any locally modified files
3. Warn you about modifications and ask for confirmation
4. Overwrite all theme files with the latest version
5. Remove files that no longer exist in the source
6. Update `.theme-lock` with new checksums

Use `--force` to skip the confirmation prompt:

```bash
python manage.py install_theme --dest /path/to/your/project --force
```

## Checking Integrity

Verify that no theme files have been modified without making changes:

```bash
python manage.py install_theme --dest /path/to/your/project --check
```

This reports:
- Theme version and install date
- Any files modified since installation
- Any files missing from the expected set

Django also runs an automatic system check on startup. If theme files have drifted, you'll see warning `theme.W002` in the console.

## Setup After Installation

### 1. Create your app's base template

Copy `theme/templates/theme/sample_base.html` to your app:

```
cp theme/templates/theme/sample_base.html myapp/templates/myapp/base.html
```

Edit it to set your brand name, navigation, and user identity. See the comments in the file — every block is documented.

### 2. Extend your base in page templates

```html
{% extends "myapp/base.html" %}

{% block title %}Products{% endblock %}
{% block content %}
  <h1>Products</h1>
{% endblock %}
```

**Important:** Page templates extend *your* base, not `theme/base.html`. This keeps all project-specific customization in one place.

### 3. Run collectstatic

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

The `theme/` directory is managed infrastructure. These work automatically and must not be edited directly:

- CSS, JS, fonts, and templates inside `theme/`
- Dark/light mode toggle + persistence
- Sidebar collapse/expand + persistence
- Command palette (Cmd+K) search + keyboard navigation
- Active sidebar link highlighting (matches URL automatically)
- Toast API, typewriter effect, form rendering

If you need to override theme styles, add your own CSS file loaded after the theme CSS — do not edit `theme.css`.

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

All standard Bootstrap 5.3 classes work unchanged: `row`, `col-*`, `btn`, `card`, `alert`, `badge`, `table`, etc.

**Exceptions — these moved to Purpl and no longer use Bootstrap's JS:**

| Was | Now |
|-----|-----|
| `<div class="modal">` + `data-bs-toggle="modal"` | `<dialog class="bds-modal">` + `data-bds-modal-open` (see COMPONENTS.md) |
| `shown.bs.modal` event | `bds:modal:open` event |
| `new bootstrap.Modal(el).show()` | `ThemeModal.open("#id")` |
| toast markup / `.theme-toast` | `ThemeToast` JS API, renders `.bds-toast` (see UI_COMPONENTS.md) |
| `.nav-tabs-minimal` + `data-bs-toggle="tab"` | `.bds-tabs` + `data-bds-tab-target` (see COMPONENTS.md) |
| `.nav-pills-soft` | `.bds-tabs .bds-tabs--contained` |

Bootstrap's JS bundle is still required — collapse, dropdown, tooltip, popover,
offcanvas and carousel all continue to use it.

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
| `.badge-ai-generated` | Animated AI content badge |

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

### First install
- [ ] Run `python manage.py install_theme --dest /path/to/project`
- [ ] Add `"theme"` to `INSTALLED_APPS`
- [ ] Copy `sample_base.html` to your app's `base.html`
- [ ] Set brand name, user identity, navigation in your base.html
- [ ] All page templates extend your base, not `theme/base.html`
- [ ] Remove old Bootstrap CSS/JS includes
- [ ] Replace form rendering tags
- [ ] Run `python manage.py collectstatic`
- [ ] Test dark mode toggle
- [ ] Test sidebar collapse/expand

### Updates
- [ ] Run `python manage.py install_theme --dest /path/to/project`
- [ ] Review any warnings about local modifications
- [ ] Run `python manage.py collectstatic`
- [ ] Test affected pages
