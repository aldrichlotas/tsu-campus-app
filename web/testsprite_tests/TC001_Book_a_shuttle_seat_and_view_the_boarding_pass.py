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
        
        # -> Click the 'Campus Shuttle' link to open the shuttle booking page.
        # Campus Shuttle ₱25 Fixed link
        elem = page.get_by_role("link", name="Campus Shuttle ₱25 Fixed")
        await elem.click(timeout=10000)
        
        # -> Click the 'Lucinda Campus' button to switch the shuttle route direction and let the UI update.
        # button
        elem = page.get_by_role("button").filter(has_text=re.compile(r"^$"))
        await elem.click(timeout=10000)
        
        # -> Select seat '01' and click the 'Confirm Booking' button to submit the booking.
        # 01 button
        elem = page.get_by_role("button", name="01")
        await elem.click(timeout=10000)
        
        # -> Select seat '01' and click the 'Confirm Booking' button to submit the booking.
        # Confirm Booking button
        elem = page.get_by_role("button", name="Confirm Booking")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A boarding pass page is displayed.
        await page.locator(".absolute").first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The boarding pass card is visible on the page.
        await expect(page.locator(".absolute").first.nth(0)).to_be_visible(timeout=15000), "The boarding pass card is visible on the page."
        
        # --> The ticket shows the route 'Lucinda Campus → Main Campus' and the ticket's QR/detail section is visible.
        # Assert-outcome: passed
        # Assert: The ticket displays the route 'Lucinda Campus → Main Campus'.
        await expect(page.get_by_role("main").nth(0)).to_contain_text("Lucinda Campus \u2192 Main Campus", timeout=15000), "The ticket displays the route 'Lucinda Campus \u2192 Main Campus'."
        await page.locator("div > div > div:nth-child(2)").first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: The ticket's QR/detail section is visible.
        await expect(page.locator("div > div > div:nth-child(2)").first.nth(0)).to_be_visible(timeout=15000), "The ticket's QR/detail section is visible."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    