import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:8081")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Open the Shuttle booking page by navigating to the Shuttle page (visit /shuttle).
        await page.goto("http://localhost:8081/shuttle")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'Lucinda ↔ Main' route button to select the opposite campus route.
        # Lucinda ↔ Main
        elem = page.get_by_text("Lucinda ↔ Main")
        await elem.click(timeout=10000)
        
        # -> Click the 'Lucinda ↔ Main' route button to select the opposite campus route.
        # Seat #13
        elem = page.locator("div").filter(has_text=re.compile(r"^Seat #13$")).first
        await elem.click(timeout=10000)
        
        # -> Click the 'Lucinda ↔ Main' route button to select the opposite campus route.
        # Confirm & Generate Instant Boarding Pass (₱25)
        elem = page.get_by_text("Confirm & Generate Instant")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The boarding pass is displayed with ticket header "#TSU-SHT-2026-7857".
        await page.get_by_text("Download Pass / Save to Photos").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The boarding-pass download area is visible, indicating the pass is displayed.
        await expect(page.get_by_text("Download Pass / Save to Photos").nth(0)).to_be_visible(timeout=15000), "The boarding-pass download area is visible, indicating the pass is displayed."
        
        # --> The ticket shows the selected route "Lucinda Campus → Main Campus".
        # Assert-outcome: passed
        # Assert: The boarding pass displays the selected route.
        await expect(page.locator("#root").nth(0)).to_contain_text("Lucinda Campus \u2192 Main Campus", timeout=15000), "The boarding pass displays the selected route."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    