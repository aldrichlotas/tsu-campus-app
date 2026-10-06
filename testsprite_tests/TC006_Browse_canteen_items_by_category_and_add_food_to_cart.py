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
        
        # -> Click the 'Canteen Pre-Order' card to open the canteen page.
        # Canteen Pre-Order
        elem = page.get_by_text("Canteen Pre-Order")
        await elem.click(timeout=10000)
        
        # -> Click the 'Meals' category button to filter the menu to Meals.
        # Meals
        elem = page.get_by_text("Meals", exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Pre-Order' button for a listed meal (e.g., the first visible meal's 'Pre-Order') to add it to the cart.
        # Pre-Order
        elem = page.locator("div").filter(has_text=re.compile(r"^₱90\.00Pre-Order$")).locator("div").nth(1)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The cart summary shows that 1 item is in the cart.
        # Assert-outcome: passed
        # Assert: Cart summary contains the text '1 items in cart (View)'.
        await expect(page.locator("#root").nth(0)).to_contain_text("1 items in cart (View)", timeout=15000), "Cart summary contains the text '1 items in cart (View)'."
        
        # --> Filtered meal items remain visible after adding to the cart (meal cards with 'Pre-Order' are shown).
        await page.locator("div").filter(has_text=re.compile(r"^Pre-Order$")).nth(2).nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: A meal card 'Pre-Order' button is visible, indicating filtered results are shown.
        await expect(page.locator("div").filter(has_text=re.compile(r"^Pre-Order$")).nth(2).nth(0)).to_be_visible(timeout=15000), "A meal card 'Pre-Order' button is visible, indicating filtered results are shown."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    