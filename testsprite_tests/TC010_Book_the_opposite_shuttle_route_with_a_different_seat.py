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
        
        # -> Click the 'Campus Shuttle' card (the 'Tap to Book' entry) to open shuttle booking.
        # 4m avg Campus Shuttle Main Campus ↔ Lucinda...
        elem = page.get_by_text("4m avgCampus ShuttleMain Campus ↔ Lucinda Campus corridor & seats.₱25 Fixed")
        await elem.click(timeout=10000)
        
        # -> Click the 'Lucinda ↔ Main' route button to switch to the opposite campus route, then select 'Seat #11' and press 'Confirm & Generate Instant Boarding Pass (₱25)'.
        # Lucinda ↔ Main
        elem = page.get_by_text("Lucinda ↔ Main")
        await elem.click(timeout=10000)
        
        # -> Click the 'Lucinda ↔ Main' route button to switch to the opposite campus route, then select 'Seat #11' and press 'Confirm & Generate Instant Boarding Pass (₱25)'.
        # Seat #11
        elem = page.locator("div").filter(has_text=re.compile(r"^Seat #11$")).first
        await elem.click(timeout=10000)
        
        # -> Click the 'Lucinda ↔ Main' route button to switch to the opposite campus route, then select 'Seat #11' and press 'Confirm & Generate Instant Boarding Pass (₱25)'.
        # Confirm & Generate Instant Boarding Pass (₱25)
        elem = page.get_by_text("Confirm & Generate Instant")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A boarding pass page is displayed with a visible download control and ticket id.
        await page.locator("div").filter(has_text=re.compile(r"^Download Pass / Save to Photos$")).first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The boarding pass download control is visible on the page.
        await expect(page.locator("div").filter(has_text=re.compile(r"^Download Pass / Save to Photos$")).first.nth(0)).to_be_visible(timeout=15000), "The boarding pass download control is visible on the page."
        
        # --> The ticket shows the selected route 'Lucinda Campus → Main Campus'.
        # Assert-outcome: passed
        # Assert: The boarding pass displays the route Lucinda Campus → Main Campus.
        await expect(page.locator("#root").nth(0)).to_contain_text("Lucinda Campus \u2192 Main Campus", timeout=15000), "The boarding pass displays the route Lucinda Campus \u2192 Main Campus."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    