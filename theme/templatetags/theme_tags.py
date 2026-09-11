import markdown as md
from django import template
from django.templatetags.static import static
from django.utils.safestring import mark_safe

register = template.Library()


@register.filter(name="markdown")
def markdown_filter(value):
    """Convert markdown text to HTML. Usage: {{ msg.body|markdown }}"""
    if not value:
        return ""
    html = md.markdown(
        value,
        extensions=["fenced_code", "tables", "nl2br"],
    )
    return mark_safe(html)


@register.simple_tag
def theme_css():
    tokens = static("theme/bayone-purpl/tokens.css")
    components = static("theme/bayone-purpl/components.css")
    compiled = static("theme/css/theme.css")
    return mark_safe(
        f'<link rel="stylesheet" href="{tokens}">\n'
        f'  <link rel="stylesheet" href="{components}">\n'
        f'  <link rel="stylesheet" href="{compiled}">'
    )


@register.simple_tag
def theme_js():
    return mark_safe(f'<script src="{static("theme/js/theme.js")}"></script>')


@register.inclusion_tag("theme/components/_form_field.html")
def render_field(field, layout="vertical", compact=False):
    widget_type = field.field.widget.__class__.__name__.lower()
    is_check = widget_type in ("checkboxinput",)
    is_select = widget_type in ("select", "selectmultiple")
    is_switch = getattr(field.field.widget, "attrs", {}).get("role") == "switch"
    return {
        "field": field,
        "layout": layout,
        "compact": compact,
        "is_check": is_check,
        "is_select": is_select,
        "is_switch": is_switch,
        "widget_type": widget_type,
    }


@register.inclusion_tag("theme/components/_form.html")
def render_form(form, layout="vertical", compact=False, submit_label="Submit"):
    return {
        "form": form,
        "layout": layout,
        "compact": compact,
        "submit_label": submit_label,
    }


# ---------------------------------------------------------------------------
# Sidebar navigation template tags
# ---------------------------------------------------------------------------


@register.simple_tag
def sidebar_link(url, icon, label, active=False):
    """Render a sidebar navigation link with correct BEM markup and tooltip.

    Usage: {% sidebar_link "/products/" "package" "Products" %}
           {% sidebar_link "/" "home" "Dashboard" active=True %}
    """
    active_cls = " sidebar__link--active" if active else ""
    return mark_safe(
        f'<li class="sidebar__item">'
        f'<a href="{url}" class="sidebar__link{active_cls}" data-sidebar-link data-bs-title="{label}">'
        f'<i data-lucide="{icon}" class="sidebar__icon"></i>'
        f'<span class="sidebar__label">{label}</span>'
        f"</a></li>"
    )


@register.simple_tag
def sidebar_section(title):
    """Render a sidebar section title.

    Usage: {% sidebar_section "Navigation" %}
    """
    return mark_safe(f'<div class="sidebar__section-title">{title}</div>')


@register.simple_tag
def sidebar_divider():
    """Render a sidebar divider.

    Usage: {% sidebar_divider %}
    """
    return mark_safe('<div class="sidebar__divider"></div>')


@register.simple_tag
def cmd_palette_item(url, icon, label):
    """Render a command palette navigation item.

    Usage: {% cmd_palette_item "/products/" "package" "Products" %}
    """
    return mark_safe(
        f'<div class="cmd-palette__item" data-href="{url}">'
        f'<i data-lucide="{icon}" class="cmd-palette__item-icon"></i>'
        f'<span class="cmd-palette__item-label">{label}</span>'
        f"</div>"
    )
