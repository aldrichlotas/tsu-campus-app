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
        
        # -> Click the 'TSU Main Campus' campus selector dropdown to open campus options.
        # TSU Main Campus
        elem = page.get_by_text("TSU Main Campus")
        await elem.click(timeout=10000)
        
        # -> Click the 'TSU Lucinda Campus' option in the 'Select Campus' menu to change the active campus.
        # TSU Lucinda Campus
        elem = page.get_by_text("TSU Lucinda Campus")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Active campus label changed to 'TSU Lucinda Campus'.
        # Assert-outcome: passed
        # Assert: Active campus label is 'TSU Lucinda Campus'.
        await expect(page.locator("xpath=/html/body/div[1]/div/div[2]/div/div/div/div/div[2]/div/div[1]/div[2]").nth(0)).to_have_text("TSU Lucinda Campus", timeout=15000), "Active campus label is 'TSU Lucinda Campus'."
        
        # --> Live service tracker updated for the selected campus and shows departure information.
        # Assert-outcome: passed
        # Assert: Service tracker shows departure time '8m'.
        await expect(page.locator("xpath=/html/body/div[1]/div/div[2]/div/div/div/div/div[2]/div/div[3]/div[2]/div/div[2]/div[2]/div[1]").nth(0)).to_have_text("8m", timeout=15000), "Service tracker shows departure time '8m'."
        # Assert-outcome: passed
        # Assert: Service tracker displays the route between Main Campus and Lucinda Campus.
        await expect(page.locator("#root").nth(0)).to_contain_text("Main Campus \u2194 Lucinda Campus corridor & seats.", timeout=15000), "Service tracker displays the route between Main Campus and Lucinda Campus."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    