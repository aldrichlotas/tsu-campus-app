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
        
        # -> Open the 'Print Hub' card from the Express Services section on the dashboard.
        # Print Hub Live Queue link
        elem = page.get_by_role("link", name="Print Hub Live Queue")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The app navigated to the print page (URL contains '/print').
        # Assert-outcome: passed
        # Assert: The page URL contains 'print'.
        await expect(page).to_have_url(re.compile("print"), timeout=15000), "The page URL contains 'print'."
        
        # --> The Verified Partners list is shown with 'TSU Main: Library Fleet' and 'TSU Lucinda: Tech Center'.
        await page.get_by_role("button", name="TSU Main: Library Fleet").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The 'TSU Main: Library Fleet' partner button is visible.
        await expect(page.get_by_role("button", name="TSU Main: Library Fleet").nth(0)).to_be_visible(timeout=15000), "The 'TSU Main: Library Fleet' partner button is visible."
        await page.get_by_role("button", name="TSU Lucinda: Tech Center").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The 'TSU Lucinda: Tech Center' partner button is visible.
        await expect(page.get_by_role("button", name="TSU Lucinda: Tech Center").nth(0)).to_be_visible(timeout=15000), "The 'TSU Lucinda: Tech Center' partner button is visible."
        
        # --> The Job Details panel is present with a Pages input, Color mode option, and the 'Submit Print Job' button.
        await page.get_by_role("spinbutton").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The Pages input is visible in the Job Details panel.
        await expect(page.get_by_role("spinbutton").nth(0)).to_be_visible(timeout=15000), "The Pages input is visible in the Job Details panel."
        await page.get_by_role("button", name="Color").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The Color mode 'Color' button is visible.
        await expect(page.get_by_role("button", name="Color").nth(0)).to_be_visible(timeout=15000), "The Color mode 'Color' button is visible."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    