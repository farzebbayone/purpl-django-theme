# Forms & Tables

## Form Rendering

### Template Tags

```django
{% load theme_tags %}

{# Render full form with submit button #}
{% render_form my_form layout="vertical" submit_label="Save" %}

{# Render individual field #}
{% render_field my_form.email layout="horizontal" %}

{# Compact variant #}
{% render_form my_form compact=True %}
```

### Layouts

| Layout | Usage | Description |
|--------|-------|-------------|
| `vertical` | Default | Label above input |
| `horizontal` | Settings pages | Label left (col-3), input right (col-9) |
| Inline | Search bars | `.form-inline` wrapper, fields in a row |

### Compact Forms

Add `compact=True` to `render_field`/`render_form` or `.form-compact` class. Reduces padding, font size, and label size.

### Form Classes

| Class | Purpose |
|-------|---------|
| `.form-inline` | Flex row layout for filter/search forms |
| `.form-compact` | Smaller inputs and labels |
| `.form-horizontal .form-label` | Vertical centering for horizontal labels |

## Validation

Bootstrap validation classes work as-is:
- `.is-valid` / `.is-invalid` on inputs
- `.valid-feedback` / `.invalid-feedback` for messages
- `.was-validated` on form for native validation

Focus rings use theme primary color with subtle 3px glow.

## Date & Time Pickers

Custom date, time, datetime, and range pickers with tint variants. All pickers use vanilla JS — no external dependencies.

### Date Picker

```html
<div class="datepicker datepicker--accent">
  <input type="text" class="datepicker__input" placeholder="Select date..." readonly>
  <span class="datepicker__input-icon"><i data-lucide="calendar" class="icon-xs"></i></span>
  <div class="datepicker__dropdown"></div>
</div>
```

**Attributes:**

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-datepicker-format` | `YYYY-MM-DD` (default) | Date output format (e.g. `DD/MM/YYYY`, `MM/DD/YYYY`) |
| `data-datepicker-range` | `true` | Enables range selection (two clicks) |
| `data-datepicker-min` | `YYYY-MM-DD` | Earliest selectable date |
| `data-datepicker-max` | `YYYY-MM-DD` | Latest selectable date |

### Date Range Picker

```html
<div class="datepicker datepicker--info" data-datepicker-range="true">
  <input type="text" class="datepicker__input" placeholder="Select range..." readonly>
  <span class="datepicker__input-icon"><i data-lucide="calendar" class="icon-xs"></i></span>
  <div class="datepicker__dropdown"></div>
</div>
```

First click sets range start, hover previews the range, second click sets range end.

### Time Picker

```html
<div class="timepicker timepicker--accent">
  <input type="text" class="timepicker__input" placeholder="Select time..." readonly>
  <span class="timepicker__input-icon"><i data-lucide="clock" class="icon-xs"></i></span>
  <div class="timepicker__dropdown"></div>
</div>
```

12-hour format with scrollable hour/minute columns and AM/PM toggle. Default 5-minute steps.

**Precise mode** (1-minute steps): add `data-timepicker-precise` attribute.

```html
<div class="timepicker timepicker--info" data-timepicker-precise>
```

### DateTime Picker

Side-by-side calendar and time picker in a single dropdown.

```html
<div class="datetimepicker datetimepicker--ai">
  <input type="text" class="datetimepicker__input" placeholder="Select date & time..." readonly>
  <span class="datetimepicker__input-icon"><i data-lucide="calendar" class="icon-xs"></i></span>
  <div class="datetimepicker__dropdown">
    <div class="datetimepicker__date-section"></div>
    <div class="datetimepicker__time-section"></div>
  </div>
</div>
```

Falls back to stacked layout on mobile (<576px).

### Tint Variants

All pickers support tint classes that color the selected state, today indicator, range highlight, and time selections using translucent backgrounds.

| Class suffix | Color |
|-------------|-------|
| `--accent` | Accent (sky blue) |
| `--ai` | AI (electric orchid) |
| `--info` | Info (cyan) |

Apply to the picker container: `.datepicker--accent`, `.timepicker--ai`, `.datetimepicker--info`.

### Typeable Pickers (Smart Input)

Segmented input where users type directly into date/time parts. Ideal for power users and apps requiring precise time (e.g., astrology, scheduling).

```html
<div class="datepicker datepicker--accent" data-typeable-format="MM/DD/YYYY">
  <div class="input-group">
    <div class="picker-segments form-control"></div>
    <button type="button" class="btn btn-soft-accent" data-picker-trigger>
      <i data-lucide="calendar" class="icon-xs"></i>
    </button>
  </div>
  <div class="datepicker__dropdown"></div>
</div>
```

**Format tokens:**

| Token | Segment | Range | Example |
|-------|---------|-------|---------|
| `MM` | Month | 01–12 | `03` |
| `DD` | Day | 01–31 | `08` |
| `YYYY` | Year | 1900–2099 | `2026` |
| `HH` | Hour (12h) | 01–12 | `02` |
| `mm` | Minute | 00–59 | `45` |
| `ss` | Second | 00–59 | `30` |
| `A` | AM/PM | AM, PM | `PM` |

Any other characters in the format become visual separators (`/`, `:`, spaces).

**Common formats:**

| Use case | Format |
|----------|--------|
| Date (US) | `MM/DD/YYYY` |
| Date (International) | `DD/MM/YYYY` |
| Date (ISO) | `YYYY-MM-DD` |
| Time (no seconds) | `HH:mm A` |
| Time with seconds | `HH:mm:ss A` |
| DateTime (US) | `MM/DD/YYYY HH:mm A` |
| DateTime (International) | `DD/MM/YYYY HH:mm:ss A` |

Tokens can appear in any order — the format is position-independent.

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `0`–`9` | Type digits into segment (smart auto-advance) |
| `↑` / `↓` | Increment / decrement value (cycles within range) |
| `←` / `→` | Navigate between segments |
| `Backspace` | Clear segment, move to previous |
| `A` / `P` | Set AM/PM (on AM/PM segment) |
| `Tab` | Move to next segment (natural focus) |

**Smart auto-advance:** When a typed digit can only produce one valid result, the segment auto-completes and focus moves to the next segment. For example, typing `2` in a month field immediately sets `02` (no month is 20+).

**Cycling:** Each segment cycles independently — minutes go 59→00 without affecting hours.

**Dropdown trigger:** The button (with `data-picker-trigger`) opens the standard calendar/time dropdown as an alternative input method. Selections from the dropdown sync back to the segments.

**Typeable time picker with seconds:**

```html
<div class="timepicker timepicker--ai" data-typeable-format="HH:mm:ss A">
  <div class="input-group">
    <div class="picker-segments form-control"></div>
    <button type="button" class="btn btn-soft-ai" data-picker-trigger>
      <i data-lucide="clock" class="icon-xs"></i>
    </button>
  </div>
  <div class="timepicker__dropdown"></div>
</div>
```

**Typeable datetime picker:**

```html
<div class="datetimepicker datetimepicker--info" data-typeable-format="MM/DD/YYYY HH:mm A">
  <div class="input-group">
    <div class="picker-segments form-control"></div>
    <button type="button" class="btn btn-soft-info" data-picker-trigger>
      <i data-lucide="calendar-clock" class="icon-xs"></i>
    </button>
  </div>
  <div class="datetimepicker__dropdown">
    <div class="datetimepicker__date-section"></div>
    <div class="datetimepicker__time-section"></div>
  </div>
</div>
```

### CSS Classes Reference

| Class | Description |
|-------|-------------|
| `.datepicker` | Date picker container |
| `.datepicker__input` | Readonly text input |
| `.datepicker__dropdown` | Calendar dropdown panel |
| `.datepicker__day` | Individual day cell |
| `.datepicker__day--today` | Today's date (border accent) |
| `.datepicker__day--selected` | Selected date (tinted bg) |
| `.datepicker__day--in-range` | Days between range start/end |
| `.datepicker__day--other-month` | Days from adjacent months |
| `.datepicker__day--disabled` | Unselectable dates |
| `.timepicker` | Time picker container |
| `.timepicker__option--selected` | Selected hour/minute (tinted) |
| `.timepicker__ampm-btn--active` | Active AM/PM button (tinted) |
| `.datetimepicker` | Combined datetime container |
| `.picker-segments` | Typeable segments container |
| `.picker-segment` | Individual typeable segment |
| `.picker-segment--filled` | Segment with a value set |
| `.picker-sep` | Visual separator between segments |

## htmx Integration

```html
<form hx-post="/api/contact/" hx-target="#result" hx-swap="innerHTML">
  {% csrf_token %}
  {% render_form contact_form %}
</form>
<div id="result"></div>
```

## Tables

### Base Table

Standard Bootstrap `.table` with theme typography (small font, uppercase headers, subtle borders).

### Variants

| Class | Description |
|-------|-------------|
| `.table-hover` | Row highlight on hover |
| `.table-striped` | Alternating row colors |
| `.table-dense` | Reduced padding for data-heavy views |
| `.table-sortable` | Sort indicator arrows on `th[data-sort]` |

### Sort Indicators

Add `data-sort` attribute to `<th>`. Add `.sort-asc` or `.sort-desc` class for active state.

### Table Card

Wrap table in `.card.table-card` for card-style container with no body padding.

```html
<div class="card table-card">
  <div class="card-header">
    <h5 class="card-title mb-0">Title</h5>
  </div>
  <div class="table-responsive">
    <table class="table table-hover mb-0">...</table>
  </div>
  <div class="table-pagination">...</div>
</div>
```

### Pagination

`.table-pagination` — flex container with info text and Bootstrap pagination.

```html
<div class="table-pagination">
  <span class="table-pagination__info">Showing 1–10 of 50</span>
  <nav>
    <ul class="pagination pagination-sm">
      <li class="page-item active"><a class="page-link" href="#">1</a></li>
      ...
    </ul>
  </nav>
</div>
```

## Rich Text Editor (Quill)

The theme includes style overrides for [Quill v2](https://quilljs.com) that match surfaces, colors, typography, and dark mode.

### CDN Setup

Load Quill's CSS and JS on pages that need it (not globally):

```html
{% block extra_head %}
<link href="https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css" rel="stylesheet">
{% endblock %}

{% block extra_js %}
<script src="https://cdn.jsdelivr.net/npm/quill@2/dist/quill.js"></script>
<script>
const quill = new Quill('#editor', {
  theme: 'snow',
  placeholder: 'Write something...',
  modules: {
    toolbar: [
      [{ header: [2, 3, false] }],
      ['bold', 'italic', 'underline'],
      ['link', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean']
    ]
  }
});
</script>
{% endblock %}
```

### Variants

| Class | Description |
|---|---|
| *(default)* | Full toolbar, standard padding, 10rem min-height |
| `.quill-compact` | Smaller toolbar, 6rem min-height, smaller font — for comments/notes |
| `.quill-borderless` | No outer border, blends into parent card |

Wrap the editor container div with the variant class:

```html
<div class="quill-compact">
  <div id="editor"></div>
</div>
```

### Django Form Sync

Sync editor content to a hidden field for form submission:

```html
<form method="post">
  {% csrf_token %}
  <div id="editor"></div>
  <input type="hidden" name="content" id="content-field">
  <button type="submit" class="btn btn-primary mt-3">Submit</button>
</form>

<script>
const quill = new Quill('#editor', { theme: 'snow' });
document.querySelector('form').addEventListener('submit', function() {
  document.getElementById('content-field').value = quill.root.innerHTML;
});
</script>
```

### django-quill-editor Integration

For deeper Django integration, use [django-quill-editor](https://github.com/LeeHanYeong/django-quill-editor):

```bash
pip install django-quill-editor
```

```python
# settings.py
INSTALLED_APPS = [..., 'django_quill']

QUILL_CONFIGS = {
    'default': {
        'theme': 'snow',
        'modules': {
            'toolbar': [
                [{'header': [2, 3, False]}],
                ['bold', 'italic', 'underline'],
                ['link', 'code-block'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                ['clean']
            ]
        }
    }
}
```

```python
# models.py
from django_quill.fields import QuillField

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = QuillField()
```

```python
# forms.py
from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content']
```

```html
<!-- template.html -->
{{ form.media }}
{% render_form form %}
```

The Synth theme overrides in `_quill.scss` apply automatically — no additional configuration needed. The django-quill-editor widget renders standard Quill markup that the theme styles will pick up.
