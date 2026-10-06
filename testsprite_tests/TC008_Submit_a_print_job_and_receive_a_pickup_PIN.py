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
        
        # -> Open the 'Print Hub' card to access print services and partner shops.
        # 3 Hubs Print Hub Verified partner print shops...
        elem = page.get_by_text("HubsPrint HubVerified partner print shops around campuses.No Walk-in Wait")
        await elem.click(timeout=10000)
        
        # -> Click the 'TSU Main: Library Fleet' shop card to (re-)select it and ensure the shop is active for this print job.
        # Click the 'TSU Main: Library Fleet' shop card to (re-)select it and ensure the shop is active for this print job.
        elem = page.locator("div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div > div > div").first
        await elem.click(timeout=10000)
        
        # -> Click the 'Submit & Queue Print Job' button to submit the print job and trigger the confirmation screen.
        # Submit & Queue Print Job
        elem = page.get_by_text("Submit & Queue Print Job")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A confirmation modal with the pickup PIN is displayed.
        await page.locator("div").filter(has_text=re.compile(r"^Dismiss to Dashboard$")).first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Confirmation modal is visible (Dismiss to Dashboard button present).
        await expect(page.locator("div").filter(has_text=re.compile(r"^Dismiss to Dashboard$")).first.nth(0)).to_be_visible(timeout=15000), "Confirmation modal is visible (Dismiss to Dashboard button present)."
        
        # --> The print submission summary (Print Job Specifications) is visible on the page.
        await page.get_by_role("textbox", name="e.g. ENG101 Final Output").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Print job title input is visible in the submission summary.
        await expect(page.get_by_role("textbox", name="e.g. ENG101 Final Output").nth(0)).to_be_visible(timeout=15000), "Print job title input is visible in the submission summary."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    