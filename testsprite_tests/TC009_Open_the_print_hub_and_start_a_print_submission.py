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
        
        # -> Click the 'Print Hub' card in the Express Campus Services section to open the print configuration view.
        # Print Hub
        elem = page.get_by_text("Print Hub")
        await elem.click(timeout=10000)
        
        # -> Select the 'TSU Lucinda: Tech Center' print shop from the Verified Partner Print Shops list.
        # TSU Lucinda: Tech Center VERIFIED Open 8:00 AM...
        elem = page.locator("div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div").first
        await elem.click(timeout=10000)
        
        # -> Select the 'Full Color' color mode and then choose the 'Single-Sided' page sidedness to begin configuring the print job.
        # Full Color ₱8.00 / page
        elem = page.get_by_text("Full Color₱8.00 / page")
        await elem.click(timeout=10000)
        
        # -> Select the 'Full Color' color mode and then choose the 'Single-Sided' page sidedness to begin configuring the print job.
        # Single-Sided
        elem = page.get_by_text("Single-Sided")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The submission control 'Submit & Queue Print Job' is visible.
        await page.locator("div").filter(has_text=re.compile(r"^Submit & Queue Print Job$")).first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Verify the 'Submit & Queue Print Job' control is visible.
        await expect(page.locator("div").filter(has_text=re.compile(r"^Submit & Queue Print Job$")).first.nth(0)).to_be_visible(timeout=15000), "Verify the 'Submit & Queue Print Job' control is visible."
        
        # --> A print configuration summary is displayed with the page count and color mode options visible.
        await page.get_by_role("textbox").nth(1).nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Page count input is visible in the configuration form.
        await expect(page.get_by_role("textbox").nth(1).nth(0)).to_be_visible(timeout=15000), "Page count input is visible in the configuration form."
        await page.get_by_text("Full Color₱8.00 / page").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Full Color option is visible in the color mode choices.
        await expect(page.get_by_text("Full Color₱8.00 / page").nth(0)).to_be_visible(timeout=15000), "Full Color option is visible in the color mode choices."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    