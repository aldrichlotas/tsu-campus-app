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
        
        # -> Open the Print page by navigating to /print so the print configuration UI can be inspected.
        await page.goto("http://localhost:8081/print")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'TSU Main: Library Fleet' print shop card to select it.
        # TSU Main: Library Fleet VERIFIED Ground Floor...
        elem = page.locator("div:nth-child(2) > div:nth-child(2) > div > div").first
        await elem.click(timeout=10000)
        
        # -> Select 'Full Color', select 'Duplex (Back-to-Back)', and enter 'Ring bind, staple top left' into the 'SPECIAL INSTRUCTIONS' field.
        # Full Color ₱8.00 / page
        elem = page.get_by_text("Full Color₱8.00 / page")
        await elem.click(timeout=10000)
        
        # -> Select 'Full Color', select 'Duplex (Back-to-Back)', and enter 'Ring bind, staple top left' into the 'SPECIAL INSTRUCTIONS' field.
        # Duplex (Back-to-Back)
        elem = page.get_by_text("Duplex (Back-to-Back)")
        await elem.click(timeout=10000)
        
        # -> Select 'Full Color', select 'Duplex (Back-to-Back)', and enter 'Ring bind, staple top left' into the 'SPECIAL INSTRUCTIONS' field.
        # e.g. Ring bind, staple top left... text area
        elem = page.get_by_role("textbox", name="e.g. Ring bind, staple top")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Ring bind, staple top left")
        
        # --> Assertions to verify final state
        
        # --> The page shows a visible submission control labeled 'Submit & Queue Print Job'.
        await page.locator("div").filter(has_text=re.compile(r"^Submit & Queue Print Job$")).first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The Submit & Queue Print Job button is visible on the page.
        await expect(page.locator("div").filter(has_text=re.compile(r"^Submit & Queue Print Job$")).first.nth(0)).to_be_visible(timeout=15000), "The Submit & Queue Print Job button is visible on the page."
        
        # --> The print configuration summary reflects the configured options: Full Color is shown and the special instructions contain the entered text.
        await page.get_by_text("Full Color").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The Full Color option is visible in the configuration summary.
        await expect(page.get_by_text("Full Color").nth(0)).to_be_visible(timeout=15000), "The Full Color option is visible in the configuration summary."
        # Assert-outcome: passed
        # Assert: The special instructions textarea contains the entered text.
        await expect(page.get_by_role("textbox", name="e.g. Ring bind, staple top").nth(0)).to_have_value("Ring bind, staple top left", timeout=15000), "The special instructions textarea contains the entered text."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    