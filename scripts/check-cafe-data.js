const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'cw4sy9ik',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkCafeData() {
  try {
    console.log('🔍 Checking current cafe data...\n');

    // Get current cafe info
    const cafeInfo = await client.fetch(`*[_type == "cafeInfo"][0]{
      _id,
      name,
      tagline,
      description,
      address,
      contact,
      socialMedia,
      features
    }`);

    if (!cafeInfo) {
      console.log('❌ No cafe info found in Sanity.');
      console.log('💡 Please run the seed script first: npm run seed:sanity');
      return;
    }

    console.log('📋 Current Cafe Information:');
    console.log('   ID:', cafeInfo._id);
    console.log('   Name:', cafeInfo.name);
    console.log('   Tagline:', cafeInfo.tagline);
    console.log('   Description:', cafeInfo.description?.substring(0, 100) + '...');
    console.log('   Address:', `${cafeInfo.address?.street}, ${cafeInfo.address?.city}`);
    console.log('   Phone:', cafeInfo.contact?.phone);
    console.log('   Email:', cafeInfo.contact?.email);
    console.log('   Social Media:', Object.keys(cafeInfo.socialMedia || {}).join(', '));
    console.log('   Features:', cafeInfo.features?.join(', ') || 'None');

    console.log('\n📝 New Content to Update:');
    console.log('   Name: Sipin Café');
    console.log('   Tagline: Freshly brewed coffee & all-day brunch in the heart of Leicester');
    console.log('   Description: [New detailed description about Sipin Café]');

    console.log('\n🛠️  Update Options:');
    console.log('1. Run update script: node scripts/update-cafe-info.js');
    console.log('2. Manual update via Sanity Studio: https://cw4sy9ik.api.sanity.io/v2024-01-01/data/manage/production');
    console.log('3. Use Sanity CLI: sanity documents edit [document-id]');

  } catch (error) {
    console.error('❌ Error checking cafe data:', error);
  }
}

// Run the check
checkCafeData();
