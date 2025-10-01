import asyncio
from playwright import async_api

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
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # Click on the 'Menu' link to navigate to the Menu page.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div[2]/nav/div/div/div[2]/div[2]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Scroll down to reveal more menu items and categories to verify their details and special offer badges.
        await page.mouse.wheel(0, 800)
        

        # Verify the layout responsiveness and check for additional menu categories or items by scrolling further or resizing viewport if possible.
        await page.mouse.wheel(0, 800)
        

        # Perform responsive layout checks on mobile, tablet, and desktop viewports to ensure menu items and categories display correctly.
        await page.mouse.wheel(0, -1600)
        

        # Perform responsive layout checks on mobile, tablet, and desktop viewports to ensure menu items and categories display correctly.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div[2]/nav/div/div/div[2]/div[2]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div[2]/nav/div/div/div[2]/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Perform responsive layout checks on the Menu page for mobile, tablet, and desktop viewports to ensure correct display of menu categories, items, and special offers.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div[2]/nav/div/div/div[2]/div[2]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Perform responsive layout checks on the Menu page for mobile, tablet, and desktop viewports to ensure correct display of menu categories, items, and special offers.
        await page.mouse.wheel(0, 400)
        

        # Perform responsive layout checks on the Menu page for mobile, tablet, and desktop viewports to ensure correct display of menu categories, items, and special offers.
        await page.mouse.wheel(0, -400)
        

        # Perform responsive layout checks on the Menu page for mobile, tablet, and desktop viewports to ensure correct display of menu categories, items, and special offers.
        await page.mouse.wheel(0, 400)
        

        # Assert that all menu categories are displayed correctly
        categories = ['Espresso & Lattes']
        for category in categories:
            category_locator = page.locator(f'text="{category}"')
            assert await category_locator.is_visible(), f'Category {category} should be visible on the menu page'
          
        # Assert each menu item shows correct name, price, dietary labels, allergen info, and special offer badges if applicable
        cappuccino_locator = page.locator('text="Cappuccino"')
        assert await cappuccino_locator.is_visible(), 'Menu item Cappuccino should be visible'
        price_locator = page.locator('text="£4.50"')
        assert await price_locator.is_visible(), 'Price £4.50 should be visible for Cappuccino'
        dietary_labels = ['Vegetarian', 'Gluten Free', 'Popular']
        for label in dietary_labels:
            label_locator = page.locator(f'text="{label}"')
            assert await label_locator.is_visible(), f'Dietary label {label} should be visible for Cappuccino'
        allergen_info_locator = page.locator('text="dairy"')
        assert await allergen_info_locator.is_visible(), 'Allergen info dairy should be visible for Cappuccino'
          
        # Assert special offer badges are displayed if applicable
        special_offers = ['Morning Special', 'Lunch Deal', 'Student Discount']
        for offer in special_offers:
            offer_locator = page.locator(f'text="{offer}"')
            assert await offer_locator.is_visible(), f'Special offer {offer} should be visible on the menu page'
          
        # Responsive layout checks for mobile, tablet, and desktop viewports
        viewports = {
            'mobile': {'width': 375, 'height': 667},
            'tablet': {'width': 768, 'height': 1024},
            'desktop': {'width': 1280, 'height': 800}
        }
        for device, size in viewports.items():
            await page.set_viewport_size(size)
            # Check categories and items are visible in each viewport
            for category in categories:
                category_locator = page.locator(f'text="{category}"')
                assert await category_locator.is_visible(), f'Category {category} should be visible on {device} viewport'
            assert await cappuccino_locator.is_visible(), f'Cappuccino should be visible on {device} viewport'
            for label in dietary_labels:
                label_locator = page.locator(f'text="{label}"')
                assert await label_locator.is_visible(), f'Dietary label {label} should be visible for Cappuccino on {device} viewport'
            assert await allergen_info_locator.is_visible(), f'Allergen info dairy should be visible for Cappuccino on {device} viewport'
            for offer in special_offers:
                offer_locator = page.locator(f'text="{offer}"')
                assert await offer_locator.is_visible(), f'Special offer {offer} should be visible on {device} viewport'
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    