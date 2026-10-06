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
        
        # --> Assertions to verify final state
        
        # --> Dashboard header 'TSU' is visible on the landing page.
        await page.get_by_text("TSU", exact=True).nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Dashboard header shows 'TSU'.
        await expect(page.get_by_text("TSU", exact=True).nth(0)).to_be_visible(timeout=15000), "Dashboard header shows 'TSU'."
        
        # --> Active shuttle tracker is visible showing the Main Campus ↔ Lucinda Campus route.
        # Assert-outcome: passed
        # Assert: Shuttle card displays the route 'Main Campus ↔ Lucinda Campus corridor & seats.'.
        await expect(page.locator("#root").nth(0)).to_contain_text("Main Campus \u2194 Lucinda Campus corridor & seats.", timeout=15000), "Shuttle card displays the route 'Main Campus \u2194 Lucinda Campus corridor & seats.'."
        
        # --> Canteen tracker/shortcut '14 Stalls' is visible on the dashboard.
        # Assert-outcome: passed
        # Assert: Canteen Pre-Order card lists '14 Stalls'.
        await expect(page.locator("#root").nth(0)).to_contain_text("14 Stalls", timeout=15000), "Canteen Pre-Order card lists '14 Stalls'."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    