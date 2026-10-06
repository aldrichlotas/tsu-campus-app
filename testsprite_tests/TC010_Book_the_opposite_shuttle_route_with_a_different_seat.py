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
        
        # -> Navigate to the Shuttle page (open the URL /shuttle) so the route and seat-selection UI can be used.
        await page.goto("http://localhost:8081/shuttle")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'Lucinda ↔ Main' route button to switch to the opposite campus route.
        # Lucinda ↔ Main
        elem = page.locator("div").filter(has_text=re.compile(r"^Lucinda ↔ Main$")).first
        await elem.click(timeout=10000)
        
        # -> Click the 'Seat #13' button to choose a different available seat.
        # Seat #13
        elem = page.get_by_text("Seat #13")
        await elem.click(timeout=10000)
        
        # -> Click the 'Seat #13' button to choose a different available seat.
        # Confirm & Generate Instant Boarding Pass (₱25)
        elem = page.get_by_text("Confirm & Generate Instant")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A boarding pass page is displayed with the 'Download Pass / Save to Photos' action visible.
        await page.locator("div").filter(has_text=re.compile(r"^Download Pass / Save to Photos$")).first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The ticket page shows the 'Download Pass / Save to Photos' action, indicating the boarding pass is displayed.
        await expect(page.locator("div").filter(has_text=re.compile(r"^Download Pass / Save to Photos$")).first.nth(0)).to_be_visible(timeout=15000), "The ticket page shows the 'Download Pass / Save to Photos' action, indicating the boarding pass is displayed."
        
        # --> The generated ticket displays the selected route 'Lucinda Campus → Main Campus'.
        # Assert-outcome: passed
        # Assert: The ticket text matches the selected route 'Lucinda Campus → Main Campus'.
        await expect(page.locator("xpath=/html/body/div[1]/div/div[2]/div[2]/div/div/div/div/div/div[1]/div[3]/div[1]/div/div[2]").nth(0)).to_have_text("Lucinda Campus \u2192 Main Campus", timeout=15000), "The ticket text matches the selected route 'Lucinda Campus \u2192 Main Campus'."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    