#!/usr/bin/env python3
"""Pre-commit checks for the AlphaDog Lodging site.

Run from the repository root:  python3 scripts/check.py
Uses only the Python standard library. Exits 1 if any error is found.
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote

SITE = Path(__file__).resolve().parent.parent / "site"
PAGES = sorted(SITE.glob("*.html"))
MAX_IMAGE_KB = 500

errors, warnings = [], []


class RefParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in ("href", "src", "poster") and value:
                self.refs.append(value)


def is_external(ref):
    return re.match(r"^(https?:|mailto:|tel:|#|data:|javascript:|//)", ref)


def block(html, tag):
    match = re.search(rf"<{tag}>.*?</{tag}>", html, re.S)
    if not match:
        return None
    # The current page's menu link is marked class="active"; ignore that difference.
    return re.sub(r'\s+class="active"', "", match.group(0))


# 1. No references back into the old WordPress site.
for path in SITE.rglob("*"):
    if path.suffix in (".html", ".css", ".js"):
        for n, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            if re.search(r"wp-(content|includes|admin|json)", line):
                errors.append(f"WordPress reference: {path.relative_to(SITE)}:{n}")

# 2. Every local link and asset exists.
for page in PAGES:
    parser = RefParser()
    parser.feed(page.read_text(encoding="utf-8"))
    for ref in parser.refs:
        if is_external(ref):
            continue
        target = unquote(ref.split("#")[0].split("?")[0])
        if target and not (SITE / target).exists():
            errors.append(f"Broken link: {page.name} -> {ref}")

# 3. Header and footer are identical on every page. The version most pages
#    share is treated as correct; pages that differ from it are reported.
for tag in ("header", "footer"):
    versions = {}
    for page in PAGES:
        found = block(page.read_text(encoding="utf-8"), tag)
        if found is None:
            errors.append(f"Missing <{tag}>: {page.name}")
        else:
            versions.setdefault(found, []).append(page.name)
    if len(versions) > 1:
        majority = max(versions.values(), key=len)
        for names in versions.values():
            if names is not majority:
                for name in names:
                    errors.append(f"<{tag}> in {name} differs from the other pages")

# 3b. Every page loads Google Analytics.
GA_ID = "G-RBP0XGS02Y"
for page in PAGES:
    html = page.read_text(encoding="utf-8")
    if f"googletagmanager.com/gtag/js?id={GA_ID}" not in html or f"gtag('config', '{GA_ID}')" not in html:
        errors.append(f"Missing Google Analytics tag ({GA_ID}): {page.name}")

# 4. Oversized images (warning only).
for path in (SITE / "images").rglob("*"):
    if path.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
        kb = path.stat().st_size // 1024
        if kb > MAX_IMAGE_KB:
            warnings.append(f"Large image ({kb} KB): {path.relative_to(SITE)}")

# 5. Unfilled price placeholders (warning only).
for page in PAGES:
    for n, line in enumerate(page.read_text(encoding="utf-8").splitlines(), 1):
        if "$XX" in line:
            warnings.append(f"Placeholder $XX: {page.name}:{n}")

# 6. Every redirect in site/_redirects points at a page or file that exists.
redirects = SITE / "_redirects"
if redirects.exists():
    for n, line in enumerate(redirects.read_text(encoding="utf-8").splitlines(), 1):
        parts = line.split()
        if len(parts) < 2 or parts[0].startswith("#"):
            continue
        target = parts[1].split("#")[0].strip("/")
        if parts[1].startswith("/") and target:
            if not ((SITE / target).exists() or (SITE / f"{target}.html").exists()):
                errors.append(f"Redirect to missing page: _redirects:{n} -> {parts[1]}")

for w in warnings:
    print(f"WARNING  {w}")
for e in errors:
    print(f"ERROR    {e}")
print(f"\n{len(PAGES)} pages checked: {len(errors)} errors, {len(warnings)} warnings.")
sys.exit(1 if errors else 0)
