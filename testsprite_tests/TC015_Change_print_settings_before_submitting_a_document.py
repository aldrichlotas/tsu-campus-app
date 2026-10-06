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
        
        # -> Click the 'Print Hub' card to open the print partner / print options area
        # Print Hub
        elem = page.get_by_text("Print Hub")
        await elem.click(timeout=10000)
        
        # -> Click the 'TSU Lucinda: Tech Center' print shop to select it.
        # TSU Lucinda: Tech Center VERIFIED Open 8:00 AM...
        elem = page.locator("div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)")
        await elem.click(timeout=10000)
        
        # -> Set the page count to 10, select 'Full Color' and 'Single-Sided', then change the options to 'B&W Monochrome' and 'Duplex (Back-to-Back)'.
        # text field
        elem = page.get_by_role("textbox").nth(1)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("10")
        
        # -> Set the page count to 10, select 'Full Color' and 'Single-Sided', then change the options to 'B&W Monochrome' and 'Duplex (Back-to-Back)'.
        # Full Color ₱8.00 / page
        elem = page.get_by_text("Full Color₱8.00 / page")
        await elem.click(timeout=10000)
        
        # -> Set the page count to 10, select 'Full Color' and 'Single-Sided', then change the options to 'B&W Monochrome' and 'Duplex (Back-to-Back)'.
        # Single-Sided
        elem = page.locator("div").filter(has_text=re.compile(r"^Single-Sided$")).first
        await elem.click(timeout=10000)
        
        # -> Set the page count to 10, select 'Full Color' and 'Single-Sided', then change the options to 'B&W Monochrome' and 'Duplex (Back-to-Back)'.
        # B&W Monochrome ₱2.00 / page
        elem = page.get_by_text("B&W Monochrome₱2.00 / page")
        await elem.click(timeout=10000)
        
        # -> Set the page count to 10, select 'Full Color' and 'Single-Sided', then change the options to 'B&W Monochrome' and 'Duplex (Back-to-Back)'.
        # Duplex (Back-to-Back)
        elem = page.locator("div").filter(has_text=re.compile(r"^Duplex \(Back-to-Back\)$")).first
        await elem.click(timeout=10000)
        
        # -> Click the 'Submit & Queue Print Job' button to submit the print job and trigger the confirmation UI.
        # Submit & Queue Print Job
        elem = page.get_by_text("Submit & Queue Print Job")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A submission confirmation modal is visible after submitting the print job.
        # Assert-outcome: passed
        # Assert: Confirmation modal shows the 'Dismiss to Dashboard' button.
        await expect(page.locator("xpath=/html/body/div[5]/div/div[2]/div/div/div/div/div[6]").nth(0)).to_have_text("Dismiss to Dashboard", timeout=15000), "Confirmation modal shows the 'Dismiss to Dashboard' button."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    