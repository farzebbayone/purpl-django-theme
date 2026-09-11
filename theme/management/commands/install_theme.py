"""
Install or update the Purpl theme into a consuming Django project.

Usage:
    python manage.py install_theme --dest /path/to/myproject
    python manage.py install_theme --dest /path/to/myproject --check
    python manage.py install_theme --dest /path/to/myproject --force
"""

import hashlib
import json
import shutil
from datetime import datetime, timezone
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError

# Theme root (parent of management/)
THEME_DIR = Path(__file__).resolve().parent.parent.parent

# Directories and files to exclude from copying
EXCLUDE_DIRS = {"__pycache__", "scss"}
EXCLUDE_FILES = {"theme.css.map"}

# Header markers injected into copied files
MARKERS = {
    ".css": "/* DO NOT EDIT — managed by Purpl theme. Changes will be overwritten on update. */\n",
    ".js": "/* DO NOT EDIT — managed by Purpl theme. Changes will be overwritten on update. */\n",
    ".html": "{# DO NOT EDIT — managed by Purpl theme. Changes will be overwritten on update. #}\n",
    ".py": "# DO NOT EDIT — managed by Purpl theme. Changes will be overwritten on update.\n",
}

LOCK_FILE = ".theme-lock"
THEME_VERSION = "1.0.0"


def file_hash(path):
    """Compute SHA-256 of a file."""
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def should_include(path, theme_root):
    """Check if a file should be included in the install."""
    rel = path.relative_to(theme_root)

    # Exclude directories
    for part in rel.parts:
        if part in EXCLUDE_DIRS:
            return False

    # Exclude specific files
    if path.name in EXCLUDE_FILES:
        return False

    # Exclude management commands (they stay in the theme repo only)
    if "management" in rel.parts:
        return False

    return True


def collect_files(theme_root):
    """Collect all files to install, returning list of (relative_path, absolute_path)."""
    files = []
    for path in sorted(theme_root.rglob("*")):
        if path.is_file() and should_include(path, theme_root):
            rel = path.relative_to(theme_root)
            files.append((rel, path))
    return files


def inject_marker(content, suffix):
    """Prepend a DO NOT EDIT marker to file content if applicable."""
    marker = MARKERS.get(suffix)
    if not marker:
        return content

    # Don't double-inject
    if "DO NOT EDIT" in content[:200]:
        return content

    # For HTML, inject after any {% load %} or {% extends %} on line 1
    if suffix == ".html":
        lines = content.split("\n", 1)
        if lines[0].strip().startswith("{%"):
            return lines[0] + "\n" + marker + (lines[1] if len(lines) > 1 else "")
        return marker + content

    return marker + content


def read_lock(dest_theme):
    """Read the lock file from destination, return dict or None."""
    lock_path = dest_theme / LOCK_FILE
    if not lock_path.exists():
        return None
    try:
        return json.loads(lock_path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return None


def write_lock(dest_theme, checksums):
    """Write the lock file to destination."""
    lock_data = {
        "version": THEME_VERSION,
        "installed_at": datetime.now(timezone.utc).isoformat(),
        "file_count": len(checksums),
        "checksums": checksums,
    }
    lock_path = dest_theme / LOCK_FILE
    lock_path.write_text(json.dumps(lock_data, indent=2) + "\n", encoding="utf-8")


def check_drift(dest_theme, lock_data):
    """Compare installed files against lock checksums. Returns (ok, modified, missing, extra)."""
    expected = lock_data.get("checksums", {})
    modified = []
    missing = []

    for rel_str, expected_hash in expected.items():
        dest_file = dest_theme / rel_str
        if not dest_file.exists():
            missing.append(rel_str)
        else:
            actual_hash = file_hash(dest_file)
            if actual_hash != expected_hash:
                modified.append(rel_str)

    ok = not modified and not missing
    return ok, modified, missing


class Command(BaseCommand):
    help = "Install or update the Purpl theme into a consuming Django project."

    def add_arguments(self, parser):
        parser.add_argument(
            "--dest",
            required=True,
            help="Path to the consuming Django project root.",
        )
        parser.add_argument(
            "--check",
            action="store_true",
            help="Check integrity of installed theme without making changes.",
        )
        parser.add_argument(
            "--force",
            action="store_true",
            help="Overwrite without prompting, even if local modifications detected.",
        )

    def handle(self, **options):
        dest_root = Path(options["dest"]).resolve()
        check_only = options["check"]
        force = options["force"]

        if not dest_root.is_dir():
            raise CommandError(f"Destination does not exist: {dest_root}")

        dest_theme = dest_root / "theme"
        lock_data = read_lock(dest_theme)
        is_update = lock_data is not None

        if check_only:
            self._check(dest_theme, lock_data)
            return

        if is_update:
            self._update(dest_theme, lock_data, force)
        else:
            self._install(dest_theme)

    def _install(self, dest_theme):
        """Fresh install — copy all theme files to destination."""
        self.stdout.write(self.style.MIGRATE_HEADING("Installing Purpl theme..."))
        self.stdout.write(f"  Destination: {dest_theme}")

        files = collect_files(THEME_DIR)
        checksums = {}

        for rel, src in files:
            dest_file = dest_theme / rel
            dest_file.parent.mkdir(parents=True, exist_ok=True)

            if src.suffix in MARKERS and src.suffix not in (".woff2",):
                # Text file — inject marker
                try:
                    content = src.read_text(encoding="utf-8")
                    content = inject_marker(content, src.suffix)
                    dest_file.write_text(content, encoding="utf-8")
                except UnicodeDecodeError:
                    # Binary file, just copy
                    shutil.copy2(src, dest_file)
            else:
                shutil.copy2(src, dest_file)

            checksums[str(rel)] = file_hash(dest_file)

        write_lock(dest_theme, checksums)

        self.stdout.write(self.style.SUCCESS(
            f"\n  Installed {len(files)} files (v{THEME_VERSION})"
        ))
        self.stdout.write(
            "\n  Next steps:"
            "\n    1. Add 'theme' to INSTALLED_APPS in settings.py"
            "\n    2. Copy theme/templates/theme/sample_base.html to your app"
            "\n    3. Run: python manage.py collectstatic"
            "\n    4. See theme/docs/MIGRATION.md for full guide"
        )

    def _update(self, dest_theme, lock_data, force):
        """Update — check for drift, warn, then overwrite."""
        self.stdout.write(self.style.MIGRATE_HEADING("Updating Purpl theme..."))

        prev_version = lock_data.get("version", "unknown")
        installed_at = lock_data.get("installed_at", "unknown")
        self.stdout.write(f"  Current: v{prev_version} (installed {installed_at})")
        self.stdout.write(f"  Updating to: v{THEME_VERSION}")

        # Check for local modifications
        ok, modified, missing = check_drift(dest_theme, lock_data)

        if modified:
            self.stdout.write(self.style.WARNING(
                f"\n  {len(modified)} file(s) modified locally:"
            ))
            for f in modified:
                self.stdout.write(f"    - {f}")

            if not force:
                self.stdout.write(
                    "\n  These files will be overwritten."
                    "\n  Run with --force to skip this prompt, or back up your changes."
                )
                confirm = input("\n  Proceed with update? [y/N] ")
                if confirm.lower() != "y":
                    self.stdout.write(self.style.NOTICE("  Update cancelled."))
                    return

        # Perform update
        files = collect_files(THEME_DIR)
        checksums = {}

        for rel, src in files:
            dest_file = dest_theme / rel
            dest_file.parent.mkdir(parents=True, exist_ok=True)

            if src.suffix in MARKERS and src.suffix not in (".woff2",):
                try:
                    content = src.read_text(encoding="utf-8")
                    content = inject_marker(content, src.suffix)
                    dest_file.write_text(content, encoding="utf-8")
                except UnicodeDecodeError:
                    shutil.copy2(src, dest_file)
            else:
                shutil.copy2(src, dest_file)

            checksums[str(rel)] = file_hash(dest_file)

        # Remove files that no longer exist in source
        prev_files = set(lock_data.get("checksums", {}).keys())
        current_files = set(checksums.keys())
        removed = prev_files - current_files
        for rel_str in removed:
            dest_file = dest_theme / rel_str
            if dest_file.exists():
                dest_file.unlink()
                self.stdout.write(f"  Removed: {rel_str}")

        write_lock(dest_theme, checksums)

        self.stdout.write(self.style.SUCCESS(
            f"\n  Updated {len(files)} files to v{THEME_VERSION}"
        ))
        if removed:
            self.stdout.write(f"  Removed {len(removed)} obsolete file(s)")
        self.stdout.write("  Run: python manage.py collectstatic")

    def _check(self, dest_theme, lock_data):
        """Check integrity without making changes."""
        if lock_data is None:
            self.stdout.write(self.style.WARNING(
                "  Theme not installed at this destination (no .theme-lock found)."
            ))
            return

        version = lock_data.get("version", "unknown")
        installed_at = lock_data.get("installed_at", "unknown")
        file_count = lock_data.get("file_count", 0)

        self.stdout.write(self.style.MIGRATE_HEADING("Theme integrity check"))
        self.stdout.write(f"  Version: v{version}")
        self.stdout.write(f"  Installed: {installed_at}")
        self.stdout.write(f"  Files: {file_count}")

        ok, modified, missing = check_drift(dest_theme, lock_data)

        if ok:
            self.stdout.write(self.style.SUCCESS("\n  All files intact. No drift detected."))
        else:
            if modified:
                self.stdout.write(self.style.WARNING(f"\n  {len(modified)} file(s) modified:"))
                for f in modified:
                    self.stdout.write(f"    - {f}")
            if missing:
                self.stdout.write(self.style.ERROR(f"\n  {len(missing)} file(s) missing:"))
                for f in missing:
                    self.stdout.write(f"    - {f}")
            self.stdout.write(
                "\n  Run without --check to update and restore original files."
            )
