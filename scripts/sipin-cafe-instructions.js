const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'cw4sy9ik',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function showSipinCafeInstructions() {
  console.log('🎯 THE SIP-IN CAFÉ UPDATE INSTRUCTIONS');
  console.log('==========================================\n');

  try {
    // Get current cafe info
    const cafeInfo = await client.fetch(`*[_type == "cafeInfo"][0]{
      _id,
      name,
      tagline,
      description,
      openingHours
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
    console.log(`   Opening Hours: ${cafeInfo.openingHours?.[0]?.openTime} - ${cafeInfo.openingHours?.[0]?.closeTime}`);

    console.log('\n🔄 UPDATES NEEDED:');
    console.log('   Name: "The Sip-In Cafe" → "The Sip-In Café"');
    console.log('   Tagline: "Where every sip tells a story" → "What\'s Cooking Inside?"');
    console.log('   Description: [Replace with new Sip-In Café description]');
    console.log('   Opening Hours: 7:00 AM - 6:00 PM → 8:00 AM - 4:00 PM (Daily)');

    console.log('\n🛠️  UPDATE METHODS:');
    console.log('\n1. SANITY STUDIO (Easiest):');
    console.log('   • Go to: https://cw4sy9ik.api.sanity.io/v2024-01-01/data/manage/production');
    console.log('   • Find "Cafe Information" document');
    console.log('   • Click to edit');
    console.log('   • Update the fields below');
    console.log('   • Click "Publish"');

    console.log('\n2. SANITY CLI:');
    console.log('   • Install: npm install -g @sanity/cli');
    console.log('   • Login: sanity login');
    console.log('   • Edit: sanity documents edit ' + cafeInfo._id);

    console.log('\n3. API SCRIPT (Requires Token):');
    console.log('   • Get token from Sanity dashboard');
    console.log('   • Set: export SANITY_TOKEN="your-token"');
    console.log('   • Run: node scripts/update-sipin-cafe.js');

    console.log('\n📝 NEW CAFE INFORMATION TO COPY:');
    console.log('=====================================');
    console.log('Name: The Sip-In Café');
    console.log('Tagline: "What\'s Cooking Inside?"');
    console.log('Description:');
    console.log('Welcome to the Sip-In Cafe — a cozy sanctuary where fresh flavours meet comforting classics. Whether you\'re fueling your morning or winding down your afternoon, our thoughtfully crafted menu promises something delightful for every palate.');
    console.log('');
    console.log('At the Sip-In Cafe, every dish is prepared fresh, with quality ingredients and a whole lot of heart. Come cosy up and savour the flavours. Your perfect cup and plate await.');
    console.log('=====================================\n');

    console.log('🕗 NEW OPENING HOURS:');
    console.log('=====================================');
    console.log('Monday: 8:00 AM - 4:00 PM');
    console.log('Tuesday: 8:00 AM - 4:00 PM');
    console.log('Wednesday: 8:00 AM - 4:00 PM');
    console.log('Thursday: 8:00 AM - 4:00 PM');
    console.log('Friday: 8:00 AM - 4:00 PM');
    console.log('Saturday: 8:00 AM - 4:00 PM');
    console.log('Sunday: 8:00 AM - 4:00 PM');
    console.log('=====================================\n');

    console.log('🍽️  MENU CATEGORIES TO CREATE:');
    console.log('=====================================');
    console.log('1. ☕ Drinks - Freshly brewed coffees, teas, and specialty beverages');
    console.log('2. 🥐 Breakfast & Beyond - Hearty and wholesome breakfasts to energise your day');
    console.log('3. 🧇 Cafe Specials - Our specials bring extra love and indulgence to your day');
    console.log('4. 🍰 Dessert - Sweet treats to end your meal perfectly');
    console.log('=====================================\n');

    console.log('📊 MENU ITEMS SUMMARY:');
    console.log('=====================================');
    console.log('☕ Drinks: 25 items (Coffees, Teas, Specialties, Cold Beverages)');
    console.log('🥐 Breakfast & Beyond: 12 items (Toasties, Breakfast Plates)');
    console.log('🧇 Cafe Specials: 8 items (Indian Specials, Fish & Chips, Kids Meals)');
    console.log('🍰 Dessert: 3 items (Waffles, Pancakes, Fruit Platter)');
    console.log('Total: 48+ menu items');
    console.log('=====================================\n');

    console.log('✅ After updating, verify with: node scripts/check-cafe-data.js');
    console.log('📖 Full guide available: SIPIN_CAFE_UPDATE_GUIDE.md');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

showSipinCafeInstructions();
