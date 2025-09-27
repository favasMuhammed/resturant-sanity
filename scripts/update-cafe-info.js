const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'cw4sy9ik',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN || '', // You'll need to add this token
});

async function updateCafeInfo() {
  try {
    console.log('🔄 Starting cafe info update...');

    // First, get the existing cafe info
    const existingCafeInfo = await client.fetch(`*[_type == "cafeInfo"][0]`);
    
    if (!existingCafeInfo) {
      console.log('❌ No existing cafe info found. Please run the seed script first.');
      return;
    }

    console.log('📝 Found existing cafe info:', existingCafeInfo._id);

    // Update the cafe info with new content
    const updatedCafeInfo = await client
      .patch(existingCafeInfo._id)
      .set({
        name: 'Sipin Café',
        tagline: 'Freshly brewed coffee & all-day brunch in the heart of Leicester',
        description: `Welcome to Sipin Café, Leicester's cozy spot where coffee meets craft.
Our journey began with a simple idea: create a space where every cup feels special and every visit feels like home.

We source ethically grown beans and roast them to perfection for a cup that's smooth, rich, and unforgettable. From the first morning espresso to late-afternoon lattes, each drink is made with care. Our all-day brunch menu celebrates fresh, local ingredients—think buttery pastries, vibrant bowls, and seasonal treats.

Sipin Café isn't just about coffee. It's about moments—catching up with friends, pausing between meetings, or simply taking time for yourself.`
      })
      .commit();

    console.log('✅ Cafe info updated successfully!');
    console.log('📋 Updated details:');
    console.log('   Name:', updatedCafeInfo.name);
    console.log('   Tagline:', updatedCafeInfo.tagline);
    console.log('   Description length:', updatedCafeInfo.description?.length || 0, 'characters');

    // Verify the update
    const verification = await client.fetch(`*[_type == "cafeInfo"][0]{
      _id,
      name,
      tagline,
      description
    }`);

    console.log('\n🔍 Verification:');
    console.log('   ID:', verification._id);
    console.log('   Name:', verification.name);
    console.log('   Tagline:', verification.tagline);
    console.log('   Description preview:', verification.description?.substring(0, 100) + '...');

  } catch (error) {
    console.error('❌ Error updating cafe info:', error);
  }
}

// Run the update
updateCafeInfo();
