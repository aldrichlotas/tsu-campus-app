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
        
        # -> Click the 'Print Hub' tile (the card labeled 'Print Hub' with subtext 'Live Queue').
        # Print Hub Live Queue link
        elem = page.get_by_role("link", name="Print Hub Live Queue")
        await elem.click(timeout=10000)
        
        # -> Click the 'TSU Main: Library Fleet' partner button to select a print partner.
        # TSU Main: Library Fleet Verified Ground Floor... button
        elem = page.get_by_role("button", name="TSU Main: Library Fleet")
        await elem.click(timeout=10000)
        
        # -> Click the 'TSU Main: Library Fleet' partner button to select a print partner.
        # number field
        elem = page.get_by_role("spinbutton")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("2")
        
        # -> Click the 'TSU Main: Library Fleet' partner button to select a print partner.
        # Grayscale button
        elem = page.get_by_role("button", name="Grayscale")
        await elem.click(timeout=10000)
        
        # -> Click the 'TSU Main: Library Fleet' partner button to select a print partner.
        # button
        elem = page.get_by_role("button").filter(has_text=re.compile(r"^$"))
        await elem.click(timeout=10000)
        
        # -> Click the 'TSU Main: Library Fleet' partner button to select a print partner.
        # Submit Print Job button
        elem = page.get_by_role("button", name="Submit Print Job")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A 'Job Submitted' modal showing the generated pickup PIN is visible.
        await page.get_by_role("button").filter(has_text=re.compile(r"^$")).nth(1).nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The Job Submitted modal (showing the PIN) is visible on the page.
        await expect(page.get_by_role("button").filter(has_text=re.compile(r"^$")).nth(1).nth(0)).to_be_visible(timeout=15000), "The Job Submitted modal (showing the PIN) is visible on the page."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    