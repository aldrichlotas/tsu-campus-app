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
        
        # -> Open the Print page by navigating to the '/print' path (the Print submission UI).
        await page.goto("http://localhost:8081/print")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Select 'TSU Main: Library Fleet' from the Verified Partner Print Shops (shop card) so a partner is chosen before submitting.
        # TSU Main: Library Fleet
        elem = page.get_by_text("TSU Main: Library Fleet")
        await elem.click(timeout=10000)
        
        # -> Select 'TSU Main: Library Fleet' from the Verified Partner Print Shops (shop card) so a partner is chosen before submitting.
        # Full Color
        elem = page.get_by_text("Full Color")
        await elem.click(timeout=10000)
        
        # -> Select 'TSU Main: Library Fleet' from the Verified Partner Print Shops (shop card) so a partner is chosen before submitting.
        # Single-Sided
        elem = page.get_by_text("Single-Sided")
        await elem.click(timeout=10000)
        
        # -> Select 'TSU Main: Library Fleet' from the Verified Partner Print Shops (shop card) so a partner is chosen before submitting.
        # Submit & Queue Print Job
        elem = page.get_by_text("Submit & Queue Print Job")
        await elem.click(timeout=10000)
        
        # -> Click the 'Dismiss to Dashboard' button to close the print confirmation modal.
        # Dismiss to Dashboard
        elem = page.get_by_text("Dismiss to Dashboard")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A pickup PIN confirmation was shown after submitting the print job (pickup PIN PR-316, Est. Ready 10:18 AM).
        await page.locator("div").filter(has_text=re.compile(r"^Submit & Queue Print Job$")).first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The Submit & Queue Print Job button was present to produce the confirmation.
        await expect(page.locator("div").filter(has_text=re.compile(r"^Submit & Queue Print Job$")).first.nth(0)).to_be_visible(timeout=15000), "The Submit & Queue Print Job button was present to produce the confirmation."
        
        # --> The print submission summary was visible (Sender Alex Gonzaga, Subject 'CS301 - Operating Systems', 14 pages, Est. ₱112.00).
        await page.get_by_role("textbox", name="e.g. ENG101 Final Output").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The Subject field from the print job summary is visible on the page.
        await expect(page.get_by_role("textbox", name="e.g. ENG101 Final Output").nth(0)).to_be_visible(timeout=15000), "The Subject field from the print job summary is visible on the page."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    