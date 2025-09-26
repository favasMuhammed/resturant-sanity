const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'cw4sy9ik',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function testAPI() {
  try {
    console.log('🧪 Testing Sanity API connection...\n');

    // Test Cafe Info
    console.log('📝 Testing Cafe Info...');
    const cafeInfo = await client.fetch('*[_type == "cafeInfo"][0]');
    if (cafeInfo) {
      console.log('✅ Cafe Info found:', cafeInfo.name);
    } else {
      console.log('❌ No Cafe Info found');
    }

    // Test Menu Categories
    console.log('\n🍽️ Testing Menu Categories...');
    const menuCategories = await client.fetch('*[_type == "menuCategory" && isActive == true] | order(order asc)');
    console.log(`✅ Found ${menuCategories.length} menu categories`);
    menuCategories.forEach(cat => console.log(`   - ${cat.name}`));

    // Test Menu Items
    console.log('\n☕ Testing Menu Items...');
    const menuItems = await client.fetch('*[_type == "menuItem" && isAvailable == true] | order(order asc)');
    console.log(`✅ Found ${menuItems.length} menu items`);
    menuItems.slice(0, 5).forEach(item => console.log(`   - ${item.name}: £${item.price}`));

    // Test Special Offers
    console.log('\n🎯 Testing Special Offers...');
    const specialOffers = await client.fetch('*[_type == "specialOffer" && isActive == true && isFeatured == true] | order(order asc)');
    console.log(`✅ Found ${specialOffers.length} special offers`);
    specialOffers.forEach(offer => console.log(`   - ${offer.title}`));

    // Test Testimonials
    console.log('\n💬 Testing Testimonials...');
    const testimonials = await client.fetch('*[_type == "testimonial" && isActive == true && isFeatured == true] | order(order asc)');
    console.log(`✅ Found ${testimonials.length} testimonials`);
    testimonials.forEach(testimonial => console.log(`   - ${testimonial.customerName}: ${testimonial.rating} stars`));

    // Test Gallery Items
    console.log('\n📸 Testing Gallery Items...');
    const galleryItems = await client.fetch('*[_type == "galleryItem" && isActive == true && isFeatured == true] | order(order asc)');
    console.log(`✅ Found ${galleryItems.length} gallery items`);
    galleryItems.forEach(item => console.log(`   - ${item.title} (${item.category})`));

    // Test Blog Posts
    console.log('\n📝 Testing Blog Posts...');
    const blogPosts = await client.fetch('*[_type == "blogPost" && isPublished == true] | order(publishedAt desc)');
    console.log(`✅ Found ${blogPosts.length} blog posts`);
    blogPosts.forEach(post => console.log(`   - ${post.title}`));

    console.log('\n🎉 API Test Complete!');
    console.log('\n📊 Summary:');
    console.log(`   - Cafe Info: ${cafeInfo ? '✅' : '❌'}`);
    console.log(`   - Menu Categories: ${menuCategories.length}`);
    console.log(`   - Menu Items: ${menuItems.length}`);
    console.log(`   - Special Offers: ${specialOffers.length}`);
    console.log(`   - Testimonials: ${testimonials.length}`);
    console.log(`   - Gallery Items: ${galleryItems.length}`);
    console.log(`   - Blog Posts: ${blogPosts.length}`);

    if (cafeInfo && menuCategories.length > 0 && specialOffers.length > 0) {
      console.log('\n✅ Your website should now display all sections properly!');
    } else {
      console.log('\n❌ Some sections may not display properly. Please add the missing data using the Sanity Studio.');
      console.log('📖 See SANITY_DATA_GUIDE.md for detailed instructions.');
    }

  } catch (error) {
    console.error('❌ Error testing API:', error);
    console.log('\n💡 Make sure your Sanity project is set up correctly and the development server is running.');
  }
}

// Run the test
testAPI();
