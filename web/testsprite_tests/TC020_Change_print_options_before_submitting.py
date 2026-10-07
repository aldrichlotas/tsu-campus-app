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
        
        # -> Click the 'Print Hub' card labeled 'Print Hub' (sublabel 'Live Queue') to open the print page or print flow.
        # Print Hub Live Queue link
        elem = page.get_by_role("link", name="Print Hub Live Queue")
        await elem.click(timeout=10000)
        
        # -> Select the 'TSU Lucinda: Tech Center' partner by clicking its partner card to change the selected print partner.
        # TSU Lucinda: Tech Center Verified Open 8:00 AM... button
        elem = page.get_by_role("button", name="TSU Lucinda: Tech Center")
        await elem.click(timeout=10000)
        
        # -> Select the 'TSU Lucinda: Tech Center' partner by clicking its partner card to change the selected print partner.
        # number field
        elem = page.get_by_role("spinbutton")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("2")
        
        # -> Select the 'TSU Lucinda: Tech Center' partner by clicking its partner card to change the selected print partner.
        # button
        elem = page.get_by_role("button").filter(has_text=re.compile(r"^$"))
        await elem.click(timeout=10000)
        
        # -> Select the 'TSU Lucinda: Tech Center' partner by clicking its partner card to change the selected print partner.
        # Color button
        elem = page.get_by_role("button", name="Color")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Job Details shows Pages = 2.
        # Assert-outcome: passed
        # Assert: Pages input value is 2.
        await expect(page.get_by_role("spinbutton").nth(0)).to_have_value("2", timeout=15000), "Pages input value is 2."
        
        # --> Job Details shows Color mode set to Color.
        # Assert-outcome: passed
        # Assert: The Color button label is 'Color'.
        await expect(page.locator("xpath=/html/body/div[2]/main/div[1]/div[3]/div[2]/div/button[2]").nth(0)).to_have_text("Color", timeout=15000), "The Color button label is 'Color'."
        
        # --> Job Details shows a Duplex (Double-sided) toggle.
        # Assert-outcome: passed
        # Assert: Duplex toggle is labeled 'Duplex (Double-sided)'.
        await expect(page.get_by_role("main").nth(0)).to_contain_text("Duplex (Double-sided)", timeout=15000), "Duplex toggle is labeled 'Duplex (Double-sided)'."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    