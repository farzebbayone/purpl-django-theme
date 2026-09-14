# Purpl — Bootstrap 5 Theme for Django

A modern, elegant Bootstrap 5 theme for Django. Designed for data-rich and AI-first applications.

## Features

- **Bootstrap 5.3** with deep SCSS customization (30+ partials)
- **Dark mode** — native `data-bs-theme` toggle with no flash
- **Component library** — buttons, cards, alerts, badges, modals, drawers, offcanvas, accordion, carousel, pagination, and more
- **Data visualization** — ECharts integration with themed chart palette
- **Chat interface** — Slack-style full-width messages with threads, reactions, AI responses
- **Calendar** — FullCalendar v6 with themed overrides
- **Email client** — inbox, detail view, compose with Quill editor
- **Rich text editor** — Quill v2 integration (standard, compact, read-only variants)
- **Expandable cards** — summary/detail cards with height + width expansion
- **AI badges** — animated gradient badges for AI-generated content
- **Command palette** — Cmd+K search with fuzzy filtering
- **Fonts** — Figtree + Nunito Sans (Purpl's font pair) + JetBrains Mono, locally bundled
- **Icons** — Lucide + Bootstrap Icons
- **Accessibility** — ARIA labels, skip links, focus management, reduced motion
- **14 demo pages** showcasing every component

## Quick Start

### For theme development

```bash
# Clone and install
git clone <repo-url>
cd bootstrap_theme_django
poetry install
npm install

# Run dev server
poetry run python manage.py runserver 8999

# Compile SCSS after changes
npm run scss
```

### Installing into your Django project

```bash
# From the theme repo, push to your project
python manage.py install_theme --dest /path/to/your/project
```

Then in your project's `settings.py`:

```python
INSTALLED_APPS = [
    "theme",
    # your apps...
]
```

Copy the sample base template and customize:

```bash
cp theme/templates/theme/sample_base.html myapp/templates/myapp/base.html
```

See [theme/docs/MIGRATION.md](theme/docs/MIGRATION.md) for the full guide.

## Install Script

The theme ships with a management command for installation and updates.

### First install

```bash
python manage.py install_theme --dest /path/to/your/project
```

Copies all theme files (CSS, JS, fonts, templates, template tags, docs) and creates a `.theme-lock` integrity file at the destination.

### Update

```bash
python manage.py install_theme --dest /path/to/your/project
```

Detects the existing install, compares checksums, warns about any locally modified files, and updates to the latest version. Use `--force` to skip the confirmation prompt.

### Check integrity

```bash
python manage.py install_theme --dest /path/to/your/project --check
```

Reports version, install date, and any files that have drifted from the expected state. No files are changed.

### What gets installed

| Included | Excluded |
|----------|----------|
| Templates (`theme/templates/`) | SCSS source (`scss/`) |
| Compiled CSS (`css/theme.css`) | Source maps (`theme.css.map`) |
| JavaScript (`js/`) | Management commands |
| Fonts (`fonts/`) | Demo app (`demo/`) |
| Template tags (`templatetags/`) | Project config (`config/`) |
| Documentation (`docs/`) | Node modules, package files |
| Python app files (`apps.py`, `__init__.py`) | |

### Theme is read-only

The installed `theme/` directory is managed by the install script. Do not edit files directly — changes will be overwritten on update.

**Protections:**
- `.theme-lock` tracks SHA-256 checksums of all installed files
- "DO NOT EDIT" markers injected into CSS, JS, HTML, and Python files
- Django system check `theme.W002` warns on startup if theme files have been modified

**Where to customize:**
- Your app's `base.html` (extends `theme/base.html`)
- Your own CSS loaded after theme CSS
- Your own templates extending theme blocks

## Color Palette

Mirrors Purpl's semantic tokens (`node_modules/@bayone-solutions/purpl/docs/tokens.md`) so Bootstrap's palette and Purpl's own components share one source of truth.

| Color | Hex | Purpl token | Usage |
|-------|-----|-------------|-------|
| Primary | `#CC297A` | `--bds-primary-600` | Main actions, active states |
| Secondary | `#844190` | `--bds-secondary-600` | Neutral/supporting |
| Tertiary | `#AB68BF` | `--bds-secondary-400` | Depth, secondary accent |
| Accent | `#1D4ED8` | `--bds-blue-700` | Alternate highlight |
| AI | `#E85EA8` | `--bds-primary-400` | AI-generated content |
| Success | `#15803D` | `--bds-green-700` | Positive states |
| Danger | `#DC2626` | `--bds-red-600` | Errors, destructive |
| Warning | `#B45309` | `--bds-amber-700` | Caution states |
| Info | `#2563EB` | `--bds-blue-600` | Informational |

## Project Structure

```
purpl_django_theme/
├── theme/                    # The reusable theme app
│   ├── static/theme/
│   │   ├── scss/             # SCSS source (30+ partials)
│   │   ├── css/              # Compiled CSS
│   │   ├── js/               # Vanilla JS
│   │   ├── bayone-purpl/     # Vendored Purpl tokens, components.css, fonts
│   │   └── fonts/            # JetBrains Mono (Purpl ships Figtree + Nunito Sans)
│   ├── templates/theme/      # Base templates, layouts, partials
│   ├── templatetags/         # Django template tags
│   ├── management/commands/  # install_theme command
│   └── docs/                 # Component documentation (12 files)
├── demo/                     # Demo app (14 pages)
├── config/                   # Django project settings
└── PROJECT_PLAN.md           # Development roadmap
```

## Demo Pages

| Page | URL | Description |
|------|-----|-------------|
| Landing | `/` | SaaS landing page with hero, pricing, testimonials |
| Analytics | `/analytics/` | KPI cards, ECharts dashboards |
| Users | `/users/` | User list with presence indicators |
| Messages | `/messages/` | DM inbox and conversation thread |
| Components | `/components/` | Full component library |
| Forms & Tables | `/forms/` | Forms, validation, Quill editor, 4 table styles |
| Chat | `/chat/` | Slack-style messaging with AI |
| UI Components | `/ui/` | Progress, timeline, steps, avatars |
| Calendar | `/calendar/` | FullCalendar month/week/day/list |
| Email | `/email/` | Email client with compose |
| AI Assistant | `/ai/` | AI chat with model selection |
| Settings | `/settings/` | Preferences, notifications, API keys |
| Docs | `/docs/` | Rendered markdown documentation |

## Documentation

Comprehensive docs in `theme/docs/`:

- [Style Guide](theme/docs/STYLE_GUIDE.md) — colors, typography, spacing
- [Layout](theme/docs/LAYOUT.md) — topbar, sidebar, content area
- [Components](theme/docs/COMPONENTS.md) — all component classes and usage
- [Forms & Tables](theme/docs/FORMS_TABLES.md) — form integration, table styles, Quill, pagination
- [Chat Interface](theme/docs/CHAT_INTERFACE.md) — message components
- [Data Visualization](theme/docs/DATA_VIZ.md) — ECharts patterns
- [UI Components](theme/docs/UI_COMPONENTS.md) — progress, toasts, avatars, steps
- [Animations](theme/docs/ANIMATIONS.md) — CSS animation classes
- [Accessibility](theme/docs/ACCESSIBILITY.md) — ARIA, keyboard nav, reduced motion
- [Component Index](theme/docs/COMPONENT_INDEX.md) — searchable class reference
- [Integration](theme/docs/INTEGRATION.md) — third-party integration guide
- [Migration](theme/docs/MIGRATION.md) — adoption and update guide

## Tech Stack

- **Python** — Django 5.1, Poetry
- **SCSS** — Bootstrap 5.3.3, Sass
- **Fonts** — Figtree + Nunito Sans (variable, self-hosted by Purpl), JetBrains Mono (locally bundled)
- **Icons** — Lucide + Bootstrap Icons (CDN)
- **Charts** — ECharts (CDN)
- **Rich Text** — Quill v2 (CDN)
- **Calendar** — FullCalendar v6 (CDN)
- **htmx** — 2.0.4 (CDN, not bundled)
