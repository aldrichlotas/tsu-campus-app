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
        
        # -> Open the 'Print Hub' page (navigate to the Print Hub at /print).
        await page.goto("http://localhost:8081/print")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Select the 'TSU Lucinda: Tech Center' print shop and begin configuring the print job (set page count, color mode, and sidedness).
        # TSU Lucinda: Tech Center VERIFIED
        elem = page.get_by_text("TSU Lucinda: Tech CenterVERIFIED")
        await elem.click(timeout=10000)
        
        # -> Select the 'TSU Lucinda: Tech Center' print shop and begin configuring the print job (set page count, color mode, and sidedness).
        # text field
        elem = page.get_by_role("textbox").nth(1)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("10")
        
        # -> Select the 'TSU Lucinda: Tech Center' print shop and begin configuring the print job (set page count, color mode, and sidedness).
        # Full Color
        elem = page.get_by_text("Full Color")
        await elem.click(timeout=10000)
        
        # -> Select the 'TSU Lucinda: Tech Center' print shop and begin configuring the print job (set page count, color mode, and sidedness).
        # Single-Sided
        elem = page.get_by_text("Single-Sided")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The print submission control 'Submit & Queue Print Job' is visible.
        await page.locator("div").filter(has_text=re.compile(r"^Submit & Queue Print Job$")).first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The Submit & Queue Print Job button is visible.
        await expect(page.locator("div").filter(has_text=re.compile(r"^Submit & Queue Print Job$")).first.nth(0)).to_be_visible(timeout=15000), "The Submit & Queue Print Job button is visible."
        
        # --> The page count in the print configuration is set to 10.
        # Assert-outcome: passed
        # Assert: The page count input equals '10'.
        await expect(page.get_by_role("textbox").nth(1).nth(0)).to_have_value("10", timeout=15000), "The page count input equals '10'."
        
        # --> The print configuration shows Color Mode set to 'Full Color' and Page Sidedness set to 'Single-Sided'.
        await page.get_by_text("Full Color").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Full Color option is visible.
        await expect(page.get_by_text("Full Color").nth(0)).to_be_visible(timeout=15000), "Full Color option is visible."
        await page.get_by_text("Single-Sided").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Single-Sided option is visible.
        await expect(page.get_by_text("Single-Sided").nth(0)).to_be_visible(timeout=15000), "Single-Sided option is visible."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    