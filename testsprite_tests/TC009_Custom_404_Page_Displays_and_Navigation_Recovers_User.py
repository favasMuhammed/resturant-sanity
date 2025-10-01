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
        # Navigate to a random non-existent URL to trigger the custom 404 page.
        await page.goto('http://localhost:3000/non-existent-random-url-12345', timeout=10000)
        

        # Click the 'Back to posts' link to test navigation from the 404 page.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/main/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Test navigation from the 404 page to another valid page (e.g., Menu) and verify if navigation highlights update correctly.
        await page.goto('http://localhost:3000/non-existent-random-url-12345', timeout=10000)
        

        # Click the 'Back to posts' link to navigate away from the 404 page and verify navigation highlight updates.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/main/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Assert that the custom 404 page is displayed with appropriate messaging
        not_found_text = await page.locator('main').inner_text()
        assert '404' in not_found_text or 'not found' in not_found_text.lower() or 'page not found' in not_found_text.lower(), 'Custom 404 page message not found',
        # Assert that the 'Back to posts' link is visible on the 404 page
        back_to_posts_link = page.locator('xpath=html/body/main/a').nth(0)
        assert await back_to_posts_link.is_visible(), "Back to posts link is not visible on 404 page",
        # After clicking the 'Back to posts' link, verify navigation to the posts page
        await back_to_posts_link.click()
        await page.wait_for_load_state('networkidle')
        current_url = page.url
        assert '/posts' in current_url or current_url.endswith('/'), 'Did not navigate to posts or home page after clicking back to posts link',
        # Verify navigation highlight updates accordingly (assuming a nav item with 'active' class)
        active_nav = page.locator('nav .active')
        assert await active_nav.is_visible(), 'Navigation highlight did not update after navigation from 404 page'
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    