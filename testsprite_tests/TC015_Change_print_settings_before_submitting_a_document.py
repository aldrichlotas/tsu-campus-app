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
        
        # -> Click the 'Print Hub' card under 'Express Campus Services' to open the print hub page.
        # Print Hub
        elem = page.get_by_text("Print Hub")
        await elem.click(timeout=10000)
        
        # -> Set the 'PAGE COUNT' to 10, select 'Full Color' and 'Single-Sided', then change to 'B&W Monochrome' and 'Duplex (Back-to-Back)'.
        # text field
        elem = page.get_by_role("textbox").nth(1)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("10")
        
        # -> Set the 'PAGE COUNT' to 10, select 'Full Color' and 'Single-Sided', then change to 'B&W Monochrome' and 'Duplex (Back-to-Back)'.
        # Full Color
        elem = page.get_by_text("Full Color")
        await elem.click(timeout=10000)
        
        # -> Set the 'PAGE COUNT' to 10, select 'Full Color' and 'Single-Sided', then change to 'B&W Monochrome' and 'Duplex (Back-to-Back)'.
        # Single-Sided
        elem = page.get_by_text("Single-Sided")
        await elem.click(timeout=10000)
        
        # -> Set the 'PAGE COUNT' to 10, select 'Full Color' and 'Single-Sided', then change to 'B&W Monochrome' and 'Duplex (Back-to-Back)'.
        # B&W Monochrome
        elem = page.get_by_text("B&W Monochrome")
        await elem.click(timeout=10000)
        
        # -> Set the 'PAGE COUNT' to 10, select 'Full Color' and 'Single-Sided', then change to 'B&W Monochrome' and 'Duplex (Back-to-Back)'.
        # Duplex (Back-to-Back)
        elem = page.get_by_text("Duplex (Back-to-Back)")
        await elem.click(timeout=10000)
        
        # -> Click the 'Submit & Queue Print Job' button to submit the configured print job.
        # Submit & Queue Print Job
        elem = page.locator("div").filter(has_text=re.compile(r"^Submit & Queue Print Job$")).first
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A submission confirmation modal was shown after submitting the print job.
        await page.locator("div").filter(has_text=re.compile(r"^Dismiss to Dashboard$")).first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Confirmation modal is visible (Dismiss to Dashboard button shown).
        await expect(page.locator("div").filter(has_text=re.compile(r"^Dismiss to Dashboard$")).first.nth(0)).to_be_visible(timeout=15000), "Confirmation modal is visible (Dismiss to Dashboard button shown)."
        
        # --> The selected pickup location 'TSU Main: Library Fleet' is displayed on the Print Hub page.
        # Assert-outcome: passed
        # Assert: Selected print shop name is shown on the page.
        await expect(page.locator("xpath=/html/body/div[1]/div/div[2]/div[2]/div/div/div/div[2]/div/div[2]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]").nth(0)).to_have_text("TSU Main: Library Fleet", timeout=15000), "Selected print shop name is shown on the page."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    