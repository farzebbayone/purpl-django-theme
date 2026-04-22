import hashlib
import json
from pathlib import Path

from django.apps import AppConfig
from django.core.checks import Warning, register


class ThemeConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "theme"


def _file_hash(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


@register()
def check_theme_integrity(app_configs, **kwargs):
    """Warn if installed theme files have been modified locally."""
    theme_dir = Path(__file__).resolve().parent
    lock_path = theme_dir / ".theme-lock"

    # Only check if this is an installed copy (has .theme-lock)
    if not lock_path.exists():
        return []

    try:
        lock_data = json.loads(lock_path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return [Warning(
            "Theme lock file is corrupted.",
            hint="Run install_theme to restore it.",
            id="theme.W001",
        )]

    checksums = lock_data.get("checksums", {})
    modified = []

    for rel_str, expected_hash in checksums.items():
        file_path = theme_dir / rel_str
        if file_path.exists():
            if _file_hash(file_path) != expected_hash:
                modified.append(rel_str)

    if modified:
        file_list = ", ".join(modified[:5])
        extra = f" and {len(modified) - 5} more" if len(modified) > 5 else ""
        return [Warning(
            f"Theme files modified locally: {file_list}{extra}",
            hint=(
                "The theme/ directory is managed by install_theme and should not be "
                "edited directly. Local changes will be overwritten on the next update. "
                "Run 'python manage.py install_theme --dest . --check' from the theme "
                "repo to see full details."
            ),
            id="theme.W002",
        )]

    return []
