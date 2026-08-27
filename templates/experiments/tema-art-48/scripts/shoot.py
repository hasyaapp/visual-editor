"""Playwright screenshot tool for visual parity diff."""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

CHROME = "/Users/hasyaapp/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"

VIEWPORTS = {
    "mobile": {"width": 390, "height": 844, "device_scale_factor": 2},
    "desktop": {"width": 1440, "height": 900, "device_scale_factor": 1},
}

GATE_DISMISS = {
    "https://inv.kondanganmu.id/art-48/?to=nama+tamu": ".elementor-button:has-text('Buka Undangan'), button:has-text('BUKA UNDANGAN')",
}


def shoot(label, url, out_dir, viewport_key="mobile"):
    out_dir.mkdir(parents=True, exist_ok=True)
    vp = VIEWPORTS[viewport_key]
    out_path = out_dir / f"{label}-{viewport_key}.png"

    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME, headless=True)
        ctx = browser.new_context(
            viewport={"width": vp["width"], "height": vp["height"]},
            device_scale_factor=vp["device_scale_factor"],
            user_agent=(
                "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15"
                if viewport_key == "mobile"
                else "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
            ),
        )
        page = ctx.new_page()
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=30000)
        except Exception:
            pass
        page.wait_for_timeout(3000)

        sel = GATE_DISMISS.get(url.split("?")[0])
        if sel:
            try:
                page.wait_for_selector(sel, timeout=8000)
                page.click(sel)
                page.wait_for_timeout(1500)
            except Exception as e:
                print(f"  WARN gate dismiss: {e}")

        page.wait_for_timeout(2500)
        try:
            page.add_style_tag(content="""
                *, *::before, *::after {
                    animation-play-state: paused !important;
                    transition: none !important;
                }
                video { display: none !important; }
            """)
        except Exception:
            pass
        page.wait_for_timeout(300)
        page.screenshot(path=str(out_path), full_page=True)
        print(f"  saved: {out_path}")
        browser.close()
    return out_path


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("usage: shoot.py <label> <url> <out-dir> [mobile|desktop]")
        sys.exit(1)
    shoot(sys.argv[1], sys.argv[2], Path(sys.argv[3]), sys.argv[4] if len(sys.argv) > 4 else "mobile")
