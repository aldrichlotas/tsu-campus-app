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
        
        # -> Open the Print Hub page (navigate to the '/print' path) so the print shop selection and configuration controls can be accessed.
        await page.goto("http://localhost:8081/print")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'TSU Lucinda: Tech Center' print shop to select it (then update page count and print options).
        # TSU Lucinda: Tech Center VERIFIED Open 8:00 AM...
        elem = page.locator("div:nth-child(2) > div:nth-child(2) > div:nth-child(2)").first
        await elem.click(timeout=10000)
        
        # -> Click the 'TSU Lucinda: Tech Center' print shop to select it (then update page count and print options).
        # text field
        elem = page.get_by_role("textbox").nth(1)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("10")
        
        # -> Click the 'TSU Lucinda: Tech Center' print shop to select it (then update page count and print options).
        # Full Color
        elem = page.get_by_text("Full Color")
        await elem.click(timeout=10000)
        
        # -> Click the 'TSU Lucinda: Tech Center' print shop to select it (then update page count and print options).
        # Single-Sided
        elem = page.get_by_text("Single-Sided")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The Submit & Queue Print Job button is visible on the Print Hub page.
        await page.locator("div").filter(has_text=re.compile(r"^Submit & Queue Print Job$")).first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Submit & Queue Print Job button is visible.
        await expect(page.locator("div").filter(has_text=re.compile(r"^Submit & Queue Print Job$")).first.nth(0)).to_be_visible(timeout=15000), "Submit & Queue Print Job button is visible."
        
        # --> The Print Job Specifications show the configured page count of 10 and the color mode set to Full Color.
        # Assert-outcome: passed
        # Assert: Page count input contains "10".
        await expect(page.get_by_role("textbox").nth(1).nth(0)).to_have_value("10", timeout=15000), "Page count input contains \"10\"."
        # Assert-outcome: passed
        # Assert: Color mode displays "Full Color".
        await expect(page.locator("xpath=/html/body/div[1]/div/div[2]/div/div/div/div/div[2]/div/div[4]/div[5]/div[2]/div[2]/div[1]").nth(0)).to_have_text("Full Color", timeout=15000), "Color mode displays \"Full Color\"."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    