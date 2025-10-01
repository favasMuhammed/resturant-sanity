import { client } from './src/sanity/client.ts';

async function checkDatabase() {
  try {
    console.log('Checking Sanity database content...');
    
    const cafeInfo = await client.fetch('*[_type == "cafeInfo"]');
    const menuCategories = await client.fetch('*[_type == "menuCategory"]');
    const menuItems = await client.fetch('*[_type == "menuItem"]');
    const galleryItems = await client.fetch('*[_type == "galleryItem"]');
    const specialOffers = await client.fetch('*[_type == "specialOffer"]');
    const testimonials = await client.fetch('*[_type == "testimonial"]');
    const blogPosts = await client.fetch('*[_type == "blogPost"]');
    const legacyPosts = await client.fetch('*[_type == "post"]');
    
    console.log('Cafe Info:', cafeInfo.length);
    console.log('Menu Categories:', menuCategories.length);
    console.log('Menu Items:', menuItems.length);
    console.log('Gallery Items:', galleryItems.length);
    console.log('Special Offers:', specialOffers.length);
    console.log('Testimonials:', testimonials.length);
    console.log('Blog Posts:', blogPosts.length);
    console.log('Legacy Posts:', legacyPosts.length);
    
    if (legacyPosts.length > 0) {
      console.log('Legacy posts found:', legacyPosts.map(p => ({ title: p.title, slug: p.slug?.current })));
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkDatabase();
