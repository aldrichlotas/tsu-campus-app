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
        
        # -> Open the campus selector labelled 'TSU Main Campus' in the header so campus options are revealed.
        # TSU Main Campus
        elem = page.get_by_text("TSU Main Campus")
        await elem.click(timeout=10000)
        
        # -> Click the 'TSU Lucinda Campus' option in the Select Campus dropdown to change the active campus.
        # TSU Lucinda Campus
        elem = page.get_by_text("TSU Lucinda Campus")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The page header updated to 'TSU Lucinda Campus' after selecting that campus.
        # Assert-outcome: failed
        # Assert: Expected the page header to show the selected campus 'TSU Lucinda Campus'.
        await expect(page.locator("xpath=/html/body/div[1]/div/div[2]/div/div/div/div/div[2]/div/div[1]/div[2]/div").nth(0)).to_have_text("TSU Lucinda Campus", timeout=15000), "Expected the page header to show the selected campus 'TSU Lucinda Campus'."
        
        # --> The Live Service Tracking did not update to the selected campus and still shows a Main Campus route.
        # Assert-outcome: failed
        # Assert: Expected the Live Service Tracking to update to the selected campus (Main Campus route should no longer be visible).
        await expect(page.locator("xpath=/html/body/div[1]/div/div[2]/div/div/div/div/div[2]/div/div[4]/div[2]/div[1]/div[1]/div[2]/div[2]").nth(0)).not_to_be_visible(timeout=15000), "Expected the Live Service Tracking to update to the selected campus (Main Campus route should no longer be visible)."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    