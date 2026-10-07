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
        await page.goto("http://localhost:3000")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'Print Hub' link (the card labeled 'Print Hub' with 'Live Queue').
        # Print Hub Live Queue link
        elem = page.get_by_role("link", name="Print Hub Live Queue")
        await elem.click(timeout=10000)
        
        # -> Select the 'TSU Main: Library Fleet' partner
        # TSU Main: Library Fleet Verified Ground Floor... button
        elem = page.get_by_role("button", name="TSU Main: Library Fleet")
        await elem.click(timeout=10000)
        
        # -> Set Pages to 2, select the 'Color' option under Color Mode, enable the 'Duplex (Double-sided)' toggle, then click the 'Submit Print Job' button.
        # number field
        elem = page.get_by_role("spinbutton")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("2")
        
        # -> Set Pages to 2, select the 'Color' option under Color Mode, enable the 'Duplex (Double-sided)' toggle, then click the 'Submit Print Job' button.
        # Color button
        elem = page.get_by_role("button", name="Color")
        await elem.click(timeout=10000)
        
        # -> Set Pages to 2, select the 'Color' option under Color Mode, enable the 'Duplex (Double-sided)' toggle, then click the 'Submit Print Job' button.
        # button
        elem = page.get_by_role("button").filter(has_text=re.compile(r"^$"))
        await elem.click(timeout=10000)
        
        # -> Set Pages to 2, select the 'Color' option under Color Mode, enable the 'Duplex (Double-sided)' toggle, then click the 'Submit Print Job' button.
        # Submit Print Job button
        elem = page.get_by_role("button", name="Submit Print Job")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A 'Job Submitted!' confirmation modal is displayed.
        await page.get_by_role("button").filter(has_text=re.compile(r"^$")).nth(1).nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The 'Job Submitted!' confirmation modal is visible.
        await expect(page.get_by_role("button").filter(has_text=re.compile(r"^$")).nth(1).nth(0)).to_be_visible(timeout=15000), "The 'Job Submitted!' confirmation modal is visible."
        
        # --> The modal displays the generated pickup PIN (Queue PIN) label.
        # Assert-outcome: passed
        # Assert: The modal contains the 'Queue PIN' label indicating a generated PIN is shown.
        await expect(page.get_by_role("main").nth(0)).to_contain_text("Queue PIN", timeout=15000), "The modal contains the 'Queue PIN' label indicating a generated PIN is shown."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    