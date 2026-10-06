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
        
        # -> Click the 'Print Hub' card (labeled "Print Hub") to open the print services page.
        # Print Hub
        elem = page.get_by_text("Print Hub")
        await elem.click(timeout=10000)
        
        # -> Set the page count to '10', choose 'Full Color' and 'Single-Sided', then click the 'Submit & Queue Print Job' button.
        # text field
        elem = page.get_by_role("textbox").nth(1)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("10")
        
        # -> Set the page count to '10', choose 'Full Color' and 'Single-Sided', then click the 'Submit & Queue Print Job' button.
        # Full Color
        elem = page.get_by_text("Full Color")
        await elem.click(timeout=10000)
        
        # -> Set the page count to '10', choose 'Full Color' and 'Single-Sided', then click the 'Submit & Queue Print Job' button.
        # Single-Sided
        elem = page.get_by_text("Single-Sided")
        await elem.click(timeout=10000)
        
        # -> Set the page count to '10', choose 'Full Color' and 'Single-Sided', then click the 'Submit & Queue Print Job' button.
        # Submit & Queue Print Job
        elem = page.get_by_text("Submit & Queue Print Job")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A confirmation modal with the pickup PIN is visible.
        # Assert-outcome: passed
        # Assert: The confirmation modal's Dismiss button is visible, indicating the modal is displayed.
        await expect(page.locator("xpath=/html/body/div[5]/div/div[2]/div/div/div/div/div[6]").nth(0)).to_have_text("Dismiss to Dashboard", timeout=15000), "The confirmation modal's Dismiss button is visible, indicating the modal is displayed."
        
        # --> The submitted print job shows the configured details: 10 pages, Full Color, and Single-Sided.
        # Assert-outcome: passed
        # Assert: The page count input is set to 10.
        await expect(page.get_by_role("textbox").nth(1).nth(0)).to_have_value("10", timeout=15000), "The page count input is set to 10."
        # Assert-outcome: passed
        # Assert: The color option 'Full Color' is shown.
        await expect(page.locator("xpath=/html/body/div[1]/div/div[2]/div[2]/div/div/div/div[2]/div/div[4]/div[5]/div[2]/div[2]/div[1]").nth(0)).to_have_text("Full Color", timeout=15000), "The color option 'Full Color' is shown."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    