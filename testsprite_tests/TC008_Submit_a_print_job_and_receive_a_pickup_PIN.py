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
        
        # -> Open the Print page by navigating to the '/print' route (go to the Print page).
        await page.goto("http://localhost:8081/print")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'TSU Main: Library Fleet' print shop card to select that shop.
        # TSU Main: Library Fleet VERIFIED Ground Floor...
        elem = page.locator("div:nth-child(2) > div:nth-child(2) > div > div").first
        await elem.click(timeout=10000)
        
        # -> Select the 'Full Color' option under Color Mode to configure the print job.
        # Full Color ₱8.00 / page
        elem = page.get_by_text("Full Color₱8.00 / page")
        await elem.click(timeout=10000)
        
        # -> Click the 'Submit & Queue Print Job' button to submit the print job.
        # Submit & Queue Print Job
        elem = page.get_by_text("Submit & Queue Print Job")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A pickup PIN confirmation modal was displayed.
        await page.locator("div").filter(has_text=re.compile(r"^Dismiss to Dashboard$")).first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Confirmation modal (pickup PIN) is visible.
        await expect(page.locator("div").filter(has_text=re.compile(r"^Dismiss to Dashboard$")).first.nth(0)).to_be_visible(timeout=15000), "Confirmation modal (pickup PIN) is visible."
        
        # --> The print submission summary (uploaded file section) is visible on the page.
        await page.locator("div").filter(has_text=re.compile(r"^PDF$")).first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Uploaded file section is visible on the print page.
        await expect(page.locator("div").filter(has_text=re.compile(r"^PDF$")).first.nth(0)).to_be_visible(timeout=15000), "Uploaded file section is visible on the print page."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    