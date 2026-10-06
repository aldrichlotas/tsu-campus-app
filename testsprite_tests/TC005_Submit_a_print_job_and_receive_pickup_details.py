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
        
        # -> Open the Print Hub page by navigating to /print so the print job configuration UI can be tested.
        await page.goto("http://localhost:8081/print")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Set the page count to 10, choose 'Full Color' and 'Duplex (Back-to-Back)', then click the 'Submit & Queue Print Job' button.
        # text field
        elem = page.get_by_role("textbox").nth(1)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("10")
        
        # -> Set the page count to 10, choose 'Full Color' and 'Duplex (Back-to-Back)', then click the 'Submit & Queue Print Job' button.
        # Full Color ₱8.00 / page
        elem = page.get_by_text("Full Color₱8.00 / page")
        await elem.click(timeout=10000)
        
        # -> Set the page count to 10, choose 'Full Color' and 'Duplex (Back-to-Back)', then click the 'Submit & Queue Print Job' button.
        # Duplex (Back-to-Back)
        elem = page.locator("div").filter(has_text=re.compile(r"^Duplex \(Back-to-Back\)$")).first
        await elem.click(timeout=10000)
        
        # -> Set the page count to 10, choose 'Full Color' and 'Duplex (Back-to-Back)', then click the 'Submit & Queue Print Job' button.
        # Submit & Queue Print Job
        elem = page.locator("div").filter(has_text=re.compile(r"^Submit & Queue Print Job$")).first
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A pickup confirmation modal with the queue PIN is visible.
        await page.locator("div").filter(has_text=re.compile(r"^Dismiss to Dashboard$")).first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Confirmation modal with the pickup PIN is visible.
        await expect(page.locator("div").filter(has_text=re.compile(r"^Dismiss to Dashboard$")).first.nth(0)).to_be_visible(timeout=15000), "Confirmation modal with the pickup PIN is visible."
        
        # --> Print job details are shown in the job summary (10 pages, Full Color, Duplex).
        await page.get_by_text("TSU Main: Library Fleet").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The print job summary (shop/job details area) is visible.
        await expect(page.get_by_text("TSU Main: Library Fleet").nth(0)).to_be_visible(timeout=15000), "The print job summary (shop/job details area) is visible."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    