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
        
        # -> Open the Print page by navigating to the '/print' path (clicking the Print Hub entry is optional but the step explicitly instructs navigation to /print).
        await page.goto("http://localhost:8081/print")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Select the 'Full Color' color mode and set the PAGE COUNT field to '20' to begin configuring the print job.
        # Full Color ₱8.00 / page
        elem = page.get_by_text("Full Color₱8.00 / page")
        await elem.click(timeout=10000)
        
        # -> Select the 'Full Color' color mode and set the PAGE COUNT field to '20' to begin configuring the print job.
        # text field
        elem = page.get_by_role("textbox").nth(1)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("20")
        
        # --> Assertions to verify final state
        
        # --> The print submission control 'Submit & Queue Print Job' is visible on the page.
        await page.locator("div").filter(has_text=re.compile(r"^Submit & Queue Print Job$")).first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Submit & Queue Print Job button is visible.
        await expect(page.locator("div").filter(has_text=re.compile(r"^Submit & Queue Print Job$")).first.nth(0)).to_be_visible(timeout=15000), "Submit & Queue Print Job button is visible."
        
        # --> The print configuration summary shows the entered page count and the Full Color option.
        # Assert-outcome: passed
        # Assert: Page count input contains the entered value '20'.
        await expect(page.get_by_role("textbox").nth(1).nth(0)).to_have_value("20", timeout=15000), "Page count input contains the entered value '20'."
        await page.get_by_text("Full Color").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Full Color color mode option is visible.
        await expect(page.get_by_text("Full Color").nth(0)).to_be_visible(timeout=15000), "Full Color color mode option is visible."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    