const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'cw4sy9ik',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN || '', // You'll need to add this token
});

async function updateSipinCafe() {
  try {
    console.log('🔄 Starting Sip-In Café update...');

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
        name: 'The Sip-In Café',
        tagline: "What's Cooking Inside?",
        description: `Welcome to the Sip-In Cafe — a cozy sanctuary where fresh flavours meet comforting classics. Whether you're fueling your morning or winding down your afternoon, our thoughtfully crafted menu promises something delightful for every palate.

At the Sip-In Cafe, every dish is prepared fresh, with quality ingredients and a whole lot of heart. Come cosy up and savour the flavours. Your perfect cup and plate await.`,
        openingHours: [
          { day: 'monday', isOpen: true, openTime: '08:00', closeTime: '16:00' },
          { day: 'tuesday', isOpen: true, openTime: '08:00', closeTime: '16:00' },
          { day: 'wednesday', isOpen: true, openTime: '08:00', closeTime: '16:00' },
          { day: 'thursday', isOpen: true, openTime: '08:00', closeTime: '16:00' },
          { day: 'friday', isOpen: true, openTime: '08:00', closeTime: '16:00' },
          { day: 'saturday', isOpen: true, openTime: '08:00', closeTime: '16:00' },
          { day: 'sunday', isOpen: true, openTime: '08:00', closeTime: '16:00' }
        ]
      })
      .commit();

    console.log('✅ Cafe info updated successfully!');
    console.log('📋 Updated details:');
    console.log('   Name:', updatedCafeInfo.name);
    console.log('   Tagline:', updatedCafeInfo.tagline);
    console.log('   Opening Hours: 8:00 AM – 4:00 PM Daily');

    // Now update menu categories and items
    console.log('\n🍽️ Updating menu data...');
    
    // Get existing menu categories
    const existingCategories = await client.fetch(`*[_type == "menuCategory"]`);
    
    // Update or create menu categories
    const menuCategories = [
      {
        name: '☕ Drinks',
        description: 'Freshly brewed coffees, teas, and specialty beverages',
        icon: 'coffee',
        color: '#8B4513',
        isActive: true,
        order: 1
      },
      {
        name: '🥐 Breakfast & Beyond',
        description: 'Hearty and wholesome breakfasts to energise your day',
        icon: 'sunrise',
        color: '#D2691E',
        isActive: true,
        order: 2
      },
      {
        name: '🧇 Cafe Specials',
        description: 'Our specials bring extra love and indulgence to your day',
        icon: 'star',
        color: '#CD853F',
        isActive: true,
        order: 3
      },
      {
        name: '🍰 Dessert',
        description: 'Sweet treats to end your meal perfectly',
        icon: 'cake',
        color: '#DEB887',
        isActive: true,
        order: 4
      }
    ];

    // Create or update categories
    const categoryIds = {};
    for (const category of menuCategories) {
      const existing = existingCategories.find(cat => cat.name === category.name);
      if (existing) {
        await client.patch(existing._id).set(category).commit();
        categoryIds[category.name] = existing._id;
        console.log(`   Updated category: ${category.name}`);
      } else {
        const newCategory = await client.create({
          _type: 'menuCategory',
          ...category
        });
        categoryIds[category.name] = newCategory._id;
        console.log(`   Created category: ${category.name}`);
      }
    }

    // Create comprehensive menu items
    const menuItems = [
      // Drinks - Coffees
      { name: 'Espresso', price: 2.00, category: '☕ Drinks', description: 'Rich and intense coffee shot' },
      { name: 'Double Espresso', price: 3.00, category: '☕ Drinks', description: 'Double shot of rich espresso' },
      { name: 'Americano', price: 3.00, category: '☕ Drinks', description: 'Espresso with hot water' },
      { name: 'Macchiato', price: 3.00, category: '☕ Drinks', description: 'Espresso with a dollop of foam' },
      { name: 'Cappuccino', price: 3.50, category: '☕ Drinks', description: 'Espresso with steamed milk and foam' },
      { name: 'Latte', price: 3.50, category: '☕ Drinks', description: 'Espresso with steamed milk' },
      { name: 'Iced Latte', price: 3.50, category: '☕ Drinks', description: 'Espresso with cold milk over ice' },
      { name: 'Mocha', price: 3.50, category: '☕ Drinks', description: 'Espresso with chocolate and steamed milk' },
      { name: 'Iced Mocha', price: 3.50, category: '☕ Drinks', description: 'Espresso with chocolate and cold milk over ice' },
      { name: 'Iced Americano', price: 2.00, category: '☕ Drinks', description: 'Espresso with cold water over ice' },
      
      // Drinks - Teas
      { name: 'Masala Tea', price: 2.50, category: '☕ Drinks', description: 'Spiced Indian tea' },
      { name: 'English Tea', price: 2.50, category: '☕ Drinks', description: 'Classic English breakfast tea' },
      { name: 'Green Tea', price: 2.50, category: '☕ Drinks', description: 'Light and refreshing green tea' },
      { name: 'Mint Tea', price: 2.50, category: '☕ Drinks', description: 'Refreshing mint herbal tea' },
      { name: 'Earl Grey', price: 2.50, category: '☕ Drinks', description: 'Classic Earl Grey tea' },
      
      // Drinks - Specialties
      { name: 'Chai Latte', price: 3.49, category: '☕ Drinks', description: 'Spiced chai with steamed milk' },
      { name: 'Matcha Latte', price: 3.99, category: '☕ Drinks', description: 'Green tea powder with steamed milk' },
      { name: 'Classic Hot Chocolate', price: 2.99, category: '☕ Drinks', description: 'Rich hot chocolate with optional cream and chocolate flakes' },
      { name: 'White Hot Chocolate', price: 3.49, category: '☕ Drinks', description: 'Creamy white chocolate drink' },
      
      // Drinks - Cold Beverages
      { name: 'Watermelon Smoothie', price: 3.49, category: '☕ Drinks', description: 'Refreshing seasonal smoothie' },
      { name: 'Mixed Fruit Juice', price: 3.99, category: '☕ Drinks', description: 'Fresh seasonal fruit blend' },
      { name: 'Fresh Grape Juice', price: 3.49, category: '☕ Drinks', description: 'Freshly squeezed grape juice' },
      { name: 'Orange & Pineapple Juice', price: 3.49, category: '☕ Drinks', description: 'Tropical fruit blend' },
      { name: 'Fresh Orange Juice', price: 3.49, category: '☕ Drinks', description: 'Freshly squeezed orange juice' },
      { name: 'Mango Lassi', price: 3.49, category: '☕ Drinks', description: 'Creamy mango yogurt drink' },
      { name: 'Banana Milkshake', price: 3.49, category: '☕ Drinks', description: 'Creamy banana milkshake' },
      
      // Breakfast Items
      { name: 'Scrambled Eggs on Toast', price: 3.49, category: '🥐 Breakfast & Beyond', description: 'Creamy scrambled eggs on fresh toast' },
      { name: 'Cheesy Scrambled Eggs', price: 3.79, category: '🥐 Breakfast & Beyond', description: 'Scrambled eggs with melted cheese' },
      { name: 'Fried or Poached Eggs on Toast', price: 3.49, category: '🥐 Breakfast & Beyond', description: 'Your choice of fried or poached eggs on toast' },
      { name: 'Avocado Toast', price: 4.29, category: '🥐 Breakfast & Beyond', description: 'Fresh avocado on artisan toast' },
      { name: 'Mushrooms, Beans, or Cheese on Toast', price: 3.79, category: '🥐 Breakfast & Beyond', description: 'Your choice of topping on fresh toast' },
      { name: 'Omelette', price: 4.29, category: '🥐 Breakfast & Beyond', description: 'Fluffy omelette with your choice of fillings' },
      
      // Breakfast Plates
      { name: 'Traditional English Breakfast', price: 6.99, category: '🥐 Breakfast & Beyond', description: '2 sausages, 2 bacon, 2 eggs, hash browns, beans, mushrooms, tomato, toast' },
      { name: 'Full English Breakfast', price: 7.99, category: '🥐 Breakfast & Beyond', description: '2 pork sausages, 2 chicken sausages, 2 eggs, beans, hash browns, mushrooms, tomatoes, toast' },
      { name: 'Vegetarian Breakfast', price: 6.49, category: '🥐 Breakfast & Beyond', description: 'Vegetarian sausages, eggs, beans, mushrooms, tomatoes, hash browns, toast' },
      { name: 'Vegan Breakfast', price: 5.99, category: '🥐 Breakfast & Beyond', description: 'Vegan sausages, tomatoes, mushrooms, beans, hash browns, vegan toast' },
      { name: 'Gluten-Free Breakfast', price: 5.49, category: '🥐 Breakfast & Beyond', description: 'Chicken sausages, eggs, mushrooms, tomatoes, beans, gluten-free toast' },
      { name: 'Moong Masoor Daal with Indian-Style ½ Omelette', price: 5.99, category: '🥐 Breakfast & Beyond', description: 'Hearty daal with spiced omelette, served with toast or paratha' },
      
      // Cafe Specials
      { name: 'Indian Brunch Plate', price: 6.99, category: '🧇 Cafe Specials', description: 'Chole, cumin aloo, porotta/paratha, yogurt, salad, suji ka halwa' },
      { name: 'Samosa Chaat', price: 3.99, category: '🧇 Cafe Specials', description: 'Crispy samosas with spiced chickpeas, yogurt, chutneys' },
      { name: 'Papdi Chaat', price: 3.99, category: '🧇 Cafe Specials', description: 'Crispy papdis with spiced chickpeas, potatoes, yogurt, chutneys' },
      { name: 'Chilli Pop Chicken Platter', price: 6.99, category: '🧇 Cafe Specials', description: 'Spicy chicken bites with choice of rice or noodles' },
      { name: 'Chilli Paneer Platter', price: 6.99, category: '🧇 Cafe Specials', description: 'Spicy paneer with rice and fries' },
      { name: 'Chilli Duo Sharing Meal Platter', price: 12.99, category: '🧇 Cafe Specials', description: 'Chicken and paneer platter for two with rice, noodles, and fries' },
      { name: 'Fish & Chips', price: 4.49, category: '🧇 Cafe Specials', description: 'Classic battered fish with thick-cut fries' },
      { name: 'Kids\' Meal', price: 4.49, category: '🧇 Cafe Specials', description: 'Chicken nuggets with fries and Mogu Mogu drink' },
      
      // Desserts
      { name: 'Waffles with Toppings', price: 6.49, category: '🍰 Dessert', description: 'Warm waffles with strawberries, bananas, and Nutella' },
      { name: 'Pancakes with Toppings', price: 6.49, category: '🍰 Dessert', description: 'Golden pancakes with strawberries, bananas, and Nutella' },
      { name: 'Fruit Platter', price: 4.99, category: '🍰 Dessert', description: 'Fresh strawberries and bananas with Nutella drizzle' }
    ];

    // Create menu items
    let createdItems = 0;
    for (const item of menuItems) {
      const categoryId = categoryIds[item.category];
      if (categoryId) {
        await client.create({
          _type: 'menuItem',
          name: item.name,
          description: item.description,
          price: item.price,
          currency: 'GBP',
          category: {
            _ref: categoryId,
            _type: 'reference'
          },
          isAvailable: true,
          isPopular: item.price <= 4.00, // Mark affordable items as popular
          isVegetarian: item.name.toLowerCase().includes('vegetarian') || 
                       item.name.toLowerCase().includes('paneer') ||
                       item.name.toLowerCase().includes('avocado'),
          isVegan: item.name.toLowerCase().includes('vegan'),
          isGlutenFree: item.name.toLowerCase().includes('gluten-free'),
          order: createdItems + 1
        });
        createdItems++;
      }
    }

    console.log(`✅ Created ${createdItems} menu items`);

    // Verify the update
    const verification = await client.fetch(`*[_type == "cafeInfo"][0]{
      _id,
      name,
      tagline,
      description,
      openingHours
    }`);

    console.log('\n🔍 Verification:');
    console.log('   Name:', verification.name);
    console.log('   Tagline:', verification.tagline);
    console.log('   Opening Hours:', verification.openingHours?.[0]?.openTime + ' - ' + verification.openingHours?.[0]?.closeTime);

  } catch (error) {
    console.error('❌ Error updating Sip-In Café:', error);
  }
}

// Run the update
updateSipinCafe();
