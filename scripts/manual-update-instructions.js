const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'cw4sy9ik',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function showUpdateInstructions() {
  console.log('🎯 SANITY CMS UPDATE INSTRUCTIONS');
  console.log('=====================================\n');

  try {
    // Get current cafe info
    const cafeInfo = await client.fetch(`*[_type == "cafeInfo"][0]{
      _id,
      name,
      tagline,
      description
    }`);

    if (!cafeInfo) {
      console.log('❌ No cafe info found. Please run the seed script first.');
      return;
    }

    console.log('📋 CURRENT DATA:');
    console.log(`   Document ID: ${cafeInfo._id}`);
    console.log(`   Name: "${cafeInfo.name}"`);
    console.log(`   Tagline: "${cafeInfo.tagline}"`);
    console.log(`   Description: "${cafeInfo.description?.substring(0, 80)}..."`);

    console.log('\n🔄 UPDATES NEEDED:');
    console.log('   Name: "The Sip-In Cafe" → "Sipin Café"');
    console.log('   Tagline: "Where every sip tells a story" → "Freshly brewed coffee & all-day brunch in the heart of Leicester"');
    console.log('   Description: [Replace with new Sipin Café description]');

    console.log('\n🛠️  UPDATE METHODS:');
    console.log('\n1. SANITY STUDIO (Easiest):');
    console.log('   • Go to: https://cw4sy9ik.api.sanity.io/v2024-01-01/data/manage/production');
    console.log('   • Find "Cafe Information" document');
    console.log('   • Click to edit');
    console.log('   • Update the three fields above');
    console.log('   • Click "Publish"');

    console.log('\n2. SANITY CLI:');
    console.log('   • Install: npm install -g @sanity/cli');
    console.log('   • Login: sanity login');
    console.log('   • Edit: sanity documents edit ' + cafeInfo._id);

    console.log('\n3. API SCRIPT (Requires Token):');
    console.log('   • Get token from Sanity dashboard');
    console.log('   • Set: export SANITY_TOKEN="your-token"');
    console.log('   • Run: node scripts/update-cafe-info.js');

    console.log('\n📝 NEW DESCRIPTION TO COPY:');
    console.log('=====================================');
    console.log(`Welcome to Sipin Café, Leicester's cozy spot where coffee meets craft.
Our journey began with a simple idea: create a space where every cup feels special and every visit feels like home.

We source ethically grown beans and roast them to perfection for a cup that's smooth, rich, and unforgettable. From the first morning espresso to late-afternoon lattes, each drink is made with care. Our all-day brunch menu celebrates fresh, local ingredients—think buttery pastries, vibrant bowls, and seasonal treats.

Sipin Café isn't just about coffee. It's about moments—catching up with friends, pausing between meetings, or simply taking time for yourself.`);
    console.log('=====================================\n');

    console.log('✅ After updating, verify with: node scripts/check-cafe-data.js');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

showUpdateInstructions();
