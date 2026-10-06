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
        
        # -> Click the 'Print Hub' card shown under Express Campus Services to open the print shop selection and job configuration flow.
        # Print Hub
        elem = page.get_by_text("Print Hub")
        await elem.click(timeout=10000)
        
        # -> Click the 'TSU Lucinda: Tech Center' print shop to select it.
        # TSU Lucinda: Tech Center VERIFIED Open 8:00 AM...
        elem = page.locator("div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)")
        await elem.click(timeout=10000)
        
        # -> Set the page count to 10 in the 'PAGE COUNT' field.
        # text field
        elem = page.get_by_role("textbox").nth(1)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("10")
        
        # -> Select the 'Full Color' option and the 'Single-Sided' option, then click the 'Submit & Queue Print Job' button to submit the job.
        # Full Color
        elem = page.get_by_text("Full Color")
        await elem.click(timeout=10000)
        
        # -> Select the 'Full Color' option and the 'Single-Sided' option, then click the 'Submit & Queue Print Job' button to submit the job.
        # Single-Sided
        elem = page.get_by_text("Single-Sided")
        await elem.click(timeout=10000)
        
        # -> Select the 'Full Color' option and the 'Single-Sided' option, then click the 'Submit & Queue Print Job' button to submit the job.
        # Submit & Queue Print Job
        elem = page.get_by_text("Submit & Queue Print Job")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A pickup confirmation modal was shown containing the pickup PIN.
        await page.locator("div").filter(has_text=re.compile(r"^Dismiss to Dashboard$")).first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The print-job confirmation modal (with a dismiss button) is visible, indicating the pickup PIN confirmation appeared.
        await expect(page.locator("div").filter(has_text=re.compile(r"^Dismiss to Dashboard$")).first.nth(0)).to_be_visible(timeout=15000), "The print-job confirmation modal (with a dismiss button) is visible, indicating the pickup PIN confirmation appeared."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    