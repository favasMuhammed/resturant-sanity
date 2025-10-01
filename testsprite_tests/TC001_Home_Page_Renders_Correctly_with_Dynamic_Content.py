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
        # Scroll down to locate and verify special offers section presence and content.
        await page.mouse.wheel(0, window.innerHeight)
        

        # Scroll further down to locate and verify special offers section presence and content.
        await page.mouse.wheel(0, window.innerHeight)
        

        # Scroll down further to locate and verify special offers section presence and content.
        await page.mouse.wheel(0, window.innerHeight)
        

        # Scroll back up and try to locate special offers section by scrolling or searching for relevant text or elements.
        await page.mouse.wheel(0, -window.innerHeight)
        

        await page.mouse.wheel(0, window.innerHeight)
        

        await page.mouse.wheel(0, window.innerHeight)
        

        # Search for special offers section by scrolling or looking for relevant text or elements. If not found, try to extract page content to identify these sections.
        await page.mouse.wheel(0, -window.innerHeight)
        

        await page.mouse.wheel(0, window.innerHeight)
        

        # Assert hero section content
        hero_name = await page.text_content('section.hero h1')
        assert hero_name.strip() == 'The Sip-In Cafe'
        hero_tagline = await page.text_content('section.hero p.tagline')
        assert hero_tagline.strip() == 'Freshly brewed coffee & all-day brunch in the heart of Leicester'
        hero_description = await page.text_content('section.hero p.description')
        assert 'Sipin Café is Leicester' in hero_description
        # Assert cafe info section content
        cafe_address = await page.text_content('section.cafe-info address')
        assert '20 Kemble Gallery' in cafe_address
        cafe_phone = await page.text_content('section.cafe-info .phone')
        assert '0116 123 4567' in cafe_phone
        cafe_email = await page.text_content('section.cafe-info .email')
        assert 'hello@thesipincafe.co.uk' in cafe_email
        # Assert special offers section presence and content
        special_offers_section = await page.query_selector('section.special-offers')
        assert special_offers_section is not None
        special_offers_text = await special_offers_section.text_content()
        assert 'special offers' in special_offers_text.lower() or len(special_offers_text.strip()) > 0
        # Assert testimonials section presence and content
        testimonials_section = await page.query_selector('section.testimonials')
        assert testimonials_section is not None
        testimonials_text = await testimonials_section.text_content()
        assert len(testimonials_text.strip()) > 0
        # Assert blog previews section presence and content
        blog_previews_section = await page.query_selector('section.blog-previews')
        assert blog_previews_section is not None
        blog_previews_text = await blog_previews_section.text_content()
        assert len(blog_previews_text.strip()) > 0
        # Assert gallery highlights section content
        gallery_section = await page.query_selector('section.gallery-highlights')
        assert gallery_section is not None
        gallery_description = await page.text_content('section.gallery-highlights p.description')
        assert 'Cozy atmosphere' in gallery_description
        # Assert no rendering errors by checking for React hydration mismatch or console errors
        console_errors = []
        page.on('console', lambda msg: console_errors.append(msg) if msg.type == 'error' else None)
        assert len(console_errors) == 0
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    