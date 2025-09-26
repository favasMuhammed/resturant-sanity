const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'cw4sy9ik',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN || '', // You'll need to add this token
});

async function seedSanityData() {
  try {
    console.log('🌱 Starting Sanity data seeding...');

    // 1. Create Cafe Info
    console.log('📝 Creating cafe info...');
    const cafeInfo = await client.create({
      _type: 'cafeInfo',
      name: 'The Sip-In Cafe',
      tagline: 'Where every sip tells a story',
      description: 'Your perfect spot for coffee, food, and community in Leicester. Experience the perfect blend of coffee, community, and comfort in the heart of Leicester.',
      address: {
        street: '20 Kemble Gallery',
        city: 'Leicester',
        postcode: 'LE1 3YT',
        country: 'United Kingdom',
        coordinates: {
          lat: 52.6369,
          lng: -1.1398
        }
      },
      contact: {
        phone: '0116 123 4567',
        email: 'hello@thesipincafe.co.uk',
        website: 'https://thesipincafe.co.uk'
      },
      openingHours: [
        { day: 'monday', isOpen: true, openTime: '07:00', closeTime: '18:00' },
        { day: 'tuesday', isOpen: true, openTime: '07:00', closeTime: '18:00' },
        { day: 'wednesday', isOpen: true, openTime: '07:00', closeTime: '18:00' },
        { day: 'thursday', isOpen: true, openTime: '07:00', closeTime: '18:00' },
        { day: 'friday', isOpen: true, openTime: '07:00', closeTime: '18:00' },
        { day: 'saturday', isOpen: true, openTime: '08:00', closeTime: '19:00' },
        { day: 'sunday', isOpen: true, openTime: '08:00', closeTime: '19:00' }
      ],
      socialMedia: {
        instagram: 'https://instagram.com/thesipincafe',
        facebook: 'https://facebook.com/thesipincafe',
        tiktok: 'https://tiktok.com/@thesipincafe'
      },
      deliveryPlatforms: {
        uberEats: 'https://www.ubereats.com',
        deliveroo: 'https://deliveroo.co.uk',
        justEat: 'https://www.just-eat.co.uk'
      },
      features: ['wifi', 'outdoor', 'accessible', 'parking']
    });
    console.log('✅ Cafe info created:', cafeInfo._id);

    // 2. Create Menu Categories
    console.log('🍽️ Creating menu categories...');
    const menuCategories = await Promise.all([
      client.create({
        _type: 'menuCategory',
        name: 'Coffee & Drinks',
        description: 'Premium artisanal coffee blends and refreshing beverages',
        icon: 'coffee',
        color: '#8B4513',
        isActive: true,
        order: 1
      }),
      client.create({
        _type: 'menuCategory',
        name: 'Breakfast',
        description: 'Fresh morning meals to start your day right',
        icon: 'sunrise',
        color: '#D2691E',
        isActive: true,
        order: 2
      }),
      client.create({
        _type: 'menuCategory',
        name: 'Lunch',
        description: 'Satisfying midday meals and light bites',
        icon: 'utensils',
        color: '#CD853F',
        isActive: true,
        order: 3
      }),
      client.create({
        _type: 'menuCategory',
        name: 'Pastries & Desserts',
        description: 'Sweet treats and freshly baked goods',
        icon: 'cake',
        color: '#DEB887',
        isActive: true,
        order: 4
      })
    ]);
    console.log('✅ Menu categories created:', menuCategories.length);

    // 3. Create Menu Items
    console.log('☕ Creating menu items...');
    const menuItems = await Promise.all([
      // Coffee items
      client.create({
        _type: 'menuItem',
        name: 'Espresso',
        description: 'Rich, full-bodied single shot of premium coffee',
        price: 2.50,
        currency: 'GBP',
        category: { _ref: menuCategories[0]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: true,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        preparationTime: 2,
        order: 1
      }),
      client.create({
        _type: 'menuItem',
        name: 'Cappuccino',
        description: 'Espresso with steamed milk and rich foam',
        price: 3.50,
        currency: 'GBP',
        category: { _ref: menuCategories[0]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: true,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        preparationTime: 3,
        order: 2
      }),
      client.create({
        _type: 'menuItem',
        name: 'Latte',
        description: 'Smooth espresso with steamed milk and latte art',
        price: 3.80,
        currency: 'GBP',
        category: { _ref: menuCategories[0]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: true,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        preparationTime: 4,
        order: 3
      }),
      client.create({
        _type: 'menuItem',
        name: 'Americano',
        description: 'Espresso with hot water for a clean, bold taste',
        price: 3.00,
        currency: 'GBP',
        category: { _ref: menuCategories[0]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: false,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        preparationTime: 2,
        order: 4
      }),
      client.create({
        _type: 'menuItem',
        name: 'Flat White',
        description: 'Double espresso with microfoam milk',
        price: 3.75,
        currency: 'GBP',
        category: { _ref: menuCategories[0]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: true,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        preparationTime: 4,
        order: 5
      }),
      client.create({
        _type: 'menuItem',
        name: 'Mocha',
        description: 'Espresso with chocolate and steamed milk',
        price: 4.00,
        currency: 'GBP',
        category: { _ref: menuCategories[0]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: false,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        preparationTime: 4,
        order: 6
      }),
      client.create({
        _type: 'menuItem',
        name: 'Cold Brew',
        description: 'Smooth cold-brewed coffee served over ice',
        price: 3.25,
        currency: 'GBP',
        category: { _ref: menuCategories[0]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: false,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        preparationTime: 1,
        order: 7
      }),
      client.create({
        _type: 'menuItem',
        name: 'Iced Coffee',
        description: 'Chilled coffee served over ice with milk',
        price: 3.50,
        currency: 'GBP',
        category: { _ref: menuCategories[0]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: false,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        preparationTime: 2,
        order: 8
      }),
      // Breakfast items
      client.create({
        _type: 'menuItem',
        name: 'Full English Breakfast',
        description: 'Eggs, bacon, sausage, beans, toast, and grilled tomatoes',
        price: 12.50,
        currency: 'GBP',
        category: { _ref: menuCategories[1]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: true,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy', 'eggs'],
        preparationTime: 15,
        order: 1
      }),
      client.create({
        _type: 'menuItem',
        name: 'Avocado Toast',
        description: 'Smashed avocado on sourdough with poached egg',
        price: 8.50,
        currency: 'GBP',
        category: { _ref: menuCategories[1]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: true,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'eggs'],
        preparationTime: 8,
        order: 2
      }),
      client.create({
        _type: 'menuItem',
        name: 'Pancakes',
        description: 'Fluffy pancakes with maple syrup and fresh berries',
        price: 7.50,
        currency: 'GBP',
        category: { _ref: menuCategories[1]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: true,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy', 'eggs'],
        preparationTime: 10,
        order: 3
      }),
      client.create({
        _type: 'menuItem',
        name: 'Eggs Benedict',
        description: 'Poached eggs on English muffin with hollandaise sauce',
        price: 9.50,
        currency: 'GBP',
        category: { _ref: menuCategories[1]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: false,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy', 'eggs'],
        preparationTime: 12,
        order: 4
      }),
      client.create({
        _type: 'menuItem',
        name: 'Granola Bowl',
        description: 'Greek yogurt with homemade granola and fresh berries',
        price: 6.50,
        currency: 'GBP',
        category: { _ref: menuCategories[1]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: false,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['dairy', 'nuts'],
        preparationTime: 5,
        order: 5
      }),
      client.create({
        _type: 'menuItem',
        name: 'Breakfast Wrap',
        description: 'Scrambled eggs with bacon in a tortilla wrap',
        price: 7.00,
        currency: 'GBP',
        category: { _ref: menuCategories[1]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: false,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy', 'eggs'],
        preparationTime: 8,
        order: 6
      }),
      // Lunch items
      client.create({
        _type: 'menuItem',
        name: 'Club Sandwich',
        description: 'Chicken, bacon, lettuce, tomato, and mayo on toasted bread',
        price: 9.50,
        currency: 'GBP',
        category: { _ref: menuCategories[2]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: true,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy'],
        preparationTime: 10,
        order: 1
      }),
      client.create({
        _type: 'menuItem',
        name: 'Caesar Salad',
        description: 'Romaine lettuce, parmesan cheese, croutons, and caesar dressing',
        price: 8.50,
        currency: 'GBP',
        category: { _ref: menuCategories[2]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: true,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['dairy', 'gluten'],
        preparationTime: 8,
        order: 2
      }),
      client.create({
        _type: 'menuItem',
        name: 'Quiche of the Day',
        description: 'Freshly baked quiche with side salad',
        price: 7.50,
        currency: 'GBP',
        category: { _ref: menuCategories[2]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: false,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy', 'eggs'],
        preparationTime: 5,
        order: 3
      }),
      client.create({
        _type: 'menuItem',
        name: 'Soup & Sandwich',
        description: 'Soup of the day with choice of bread',
        price: 8.00,
        currency: 'GBP',
        category: { _ref: menuCategories[2]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: false,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy'],
        preparationTime: 6,
        order: 4
      }),
      client.create({
        _type: 'menuItem',
        name: 'Beef Burger',
        description: 'Beef patty with lettuce, tomato, onion, and chips',
        price: 11.50,
        currency: 'GBP',
        category: { _ref: menuCategories[2]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: true,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy'],
        preparationTime: 12,
        order: 5
      }),
      client.create({
        _type: 'menuItem',
        name: 'Veggie Wrap',
        description: 'Fresh vegetables and hummus in a tortilla wrap',
        price: 7.50,
        currency: 'GBP',
        category: { _ref: menuCategories[2]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: false,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: false,
        allergens: ['gluten'],
        preparationTime: 6,
        order: 6
      }),
      // Pastry items
      client.create({
        _type: 'menuItem',
        name: 'Croissant',
        description: 'Buttery, flaky French pastry',
        price: 2.80,
        currency: 'GBP',
        category: { _ref: menuCategories[3]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: true,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy', 'eggs'],
        preparationTime: 1,
        order: 1
      }),
      client.create({
        _type: 'menuItem',
        name: 'Danish Pastry',
        description: 'Fruit-filled pastry with glaze',
        price: 3.00,
        currency: 'GBP',
        category: { _ref: menuCategories[3]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: false,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy', 'eggs'],
        preparationTime: 1,
        order: 2
      }),
      client.create({
        _type: 'menuItem',
        name: 'Chocolate Muffin',
        description: 'Rich chocolate muffin with chocolate chips',
        price: 3.20,
        currency: 'GBP',
        category: { _ref: menuCategories[3]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: true,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy', 'eggs'],
        preparationTime: 1,
        order: 3
      }),
      client.create({
        _type: 'menuItem',
        name: 'Cake Slice',
        description: 'Selection of homemade cakes',
        price: 4.50,
        currency: 'GBP',
        category: { _ref: menuCategories[3]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: false,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy', 'eggs'],
        preparationTime: 1,
        order: 4
      }),
      client.create({
        _type: 'menuItem',
        name: 'Cheesecake',
        description: 'New York style cheesecake with berry compote',
        price: 4.75,
        currency: 'GBP',
        category: { _ref: menuCategories[3]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: true,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy', 'eggs'],
        preparationTime: 1,
        order: 5
      }),
      client.create({
        _type: 'menuItem',
        name: 'Brownie',
        description: 'Rich chocolate brownie with ice cream',
        price: 3.50,
        currency: 'GBP',
        category: { _ref: menuCategories[3]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: false,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy', 'eggs'],
        preparationTime: 1,
        order: 6
      })
    ]);
    console.log('✅ Menu items created:', menuItems.length);

    // 4. Create Special Offers
    console.log('🎯 Creating special offers...');
    const specialOffers = await Promise.all([
      client.create({
        _type: 'specialOffer',
        title: 'Morning Coffee Special',
        description: 'Get 20% off any coffee before 10 AM. Perfect start to your day!',
        type: 'discount',
        discountType: 'percentage',
        discountValue: 20,
        currency: 'GBP',
        validFrom: new Date().toISOString(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        timeRestrictions: {
          startTime: '07:00',
          endTime: '10:00',
          daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        },
        isActive: true,
        isFeatured: true,
        order: 1
      }),
      client.create({
        _type: 'specialOffer',
        title: 'Student Discount',
        description: 'Show your student ID and get 15% off your entire order.',
        type: 'student',
        currency: 'GBP',
        validFrom: new Date().toISOString(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true,
        isFeatured: true,
        order: 2
      }),
      client.create({
        _type: 'specialOffer',
        title: 'Happy Hour Pastries',
        description: '50% off all pastries and cakes from 3 PM to 5 PM.',
        type: 'happy-hour',
        discountType: 'percentage',
        discountValue: 50,
        currency: 'GBP',
        validFrom: new Date().toISOString(),
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        timeRestrictions: {
          startTime: '15:00',
          endTime: '17:00',
          daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        },
        isActive: true,
        isFeatured: true,
        order: 3
      }),
      client.create({
        _type: 'specialOffer',
        title: 'Weekend Brunch Deal',
        description: 'Any breakfast item + coffee for just £10 on weekends.',
        type: 'combo',
        originalPrice: 15.00,
        offerPrice: 10.00,
        currency: 'GBP',
        validFrom: new Date().toISOString(),
        validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        timeRestrictions: {
          startTime: '08:00',
          endTime: '14:00',
          daysOfWeek: ['saturday', 'sunday']
        },
        isActive: true,
        isFeatured: true,
        order: 4
      })
    ]);
    console.log('✅ Special offers created:', specialOffers.length);

    // 5. Create Testimonials
    console.log('💬 Creating testimonials...');
    const testimonials = await Promise.all([
      client.create({
        _type: 'testimonial',
        customerName: 'Sarah Johnson',
        customerInitials: 'SJ',
        content: 'The best coffee in Leicester! The atmosphere is cozy and the staff is incredibly friendly. I come here every morning before work.',
        rating: 5,
        customerLocation: 'Leicester',
        isVerified: true,
        isFeatured: true,
        isActive: true,
        order: 1
      }),
      client.create({
        _type: 'testimonial',
        customerName: 'Mike Chen',
        customerInitials: 'MC',
        content: 'Amazing pastries and excellent coffee. The croissants are to die for! Highly recommend this place.',
        rating: 5,
        customerLocation: 'Leicester',
        isVerified: true,
        isFeatured: true,
        isActive: true,
        order: 2
      }),
      client.create({
        _type: 'testimonial',
        customerName: 'Emma Williams',
        customerInitials: 'EW',
        content: 'Perfect spot for studying or catching up with friends. Great WiFi, comfortable seating, and delicious food.',
        rating: 4,
        customerLocation: 'Leicester',
        isVerified: true,
        isFeatured: true,
        isActive: true,
        order: 3
      }),
      client.create({
        _type: 'testimonial',
        customerName: 'David Thompson',
        customerInitials: 'DT',
        content: 'The breakfast here is outstanding. Fresh ingredients and generous portions. Will definitely be back!',
        rating: 5,
        customerLocation: 'Leicester',
        isVerified: true,
        isFeatured: true,
        isActive: true,
        order: 4
      }),
      client.create({
        _type: 'testimonial',
        customerName: 'Lisa Brown',
        customerInitials: 'LB',
        content: 'Great coffee, friendly service, and a lovely atmosphere. Perfect for a quick coffee or a leisurely brunch.',
        rating: 4,
        customerLocation: 'Leicester',
        isVerified: true,
        isFeatured: true,
        isActive: true,
        order: 5
      })
    ]);
    console.log('✅ Testimonials created:', testimonials.length);

    // 6. Create Gallery Items
    console.log('📸 Creating gallery items...');
    const galleryItems = await Promise.all([
      client.create({
        _type: 'galleryItem',
        title: 'Cozy Interior',
        description: 'Our warm and inviting cafe interior with comfortable seating',
        type: 'image',
        category: 'interior',
        tags: ['interior', 'cozy', 'atmosphere', 'seating'],
        isFeatured: true,
        isActive: true,
        order: 1
      }),
      client.create({
        _type: 'galleryItem',
        title: 'Fresh Coffee Preparation',
        description: 'Our barista crafting the perfect cup of coffee',
        type: 'image',
        category: 'coffee',
        tags: ['coffee', 'preparation', 'artisanal', 'barista'],
        isFeatured: true,
        isActive: true,
        order: 2
      }),
      client.create({
        _type: 'galleryItem',
        title: 'Delicious Pastries',
        description: 'Fresh baked goods and sweet treats on display',
        type: 'image',
        category: 'food',
        tags: ['pastries', 'fresh', 'baked', 'sweet'],
        isFeatured: true,
        isActive: true,
        order: 3
      }),
      client.create({
        _type: 'galleryItem',
        title: 'Latte Art',
        description: 'Beautiful latte art created by our skilled baristas',
        type: 'image',
        category: 'coffee',
        tags: ['latte', 'art', 'coffee', 'barista'],
        isFeatured: true,
        isActive: true,
        order: 4
      }),
      client.create({
        _type: 'galleryItem',
        title: 'Breakfast Platter',
        description: 'Fresh breakfast items beautifully presented',
        type: 'image',
        category: 'food',
        tags: ['breakfast', 'fresh', 'presentation', 'food'],
        isFeatured: true,
        isActive: true,
        order: 5
      }),
      client.create({
        _type: 'galleryItem',
        title: 'Outdoor Seating',
        description: 'Our outdoor seating area perfect for sunny days',
        type: 'image',
        category: 'atmosphere',
        tags: ['outdoor', 'seating', 'sunny', 'atmosphere'],
        isFeatured: true,
        isActive: true,
        order: 6
      }),
      client.create({
        _type: 'galleryItem',
        title: 'Coffee Beans',
        description: 'Premium coffee beans from around the world',
        type: 'image',
        category: 'coffee',
        tags: ['beans', 'coffee', 'premium', 'quality'],
        isFeatured: true,
        isActive: true,
        order: 7
      }),
      client.create({
        _type: 'galleryItem',
        title: 'Happy Customers',
        description: 'Customers enjoying their coffee and food',
        type: 'image',
        category: 'atmosphere',
        tags: ['customers', 'happy', 'enjoying', 'atmosphere'],
        isFeatured: true,
        isActive: true,
        order: 8
      }),
      client.create({
        _type: 'galleryItem',
        title: 'Espresso Machine',
        description: 'Our professional espresso machine in action',
        type: 'image',
        category: 'coffee',
        tags: ['espresso', 'machine', 'professional', 'coffee'],
        isFeatured: true,
        isActive: true,
        order: 9
      })
    ]);
    console.log('✅ Gallery items created:', galleryItems.length);

    // 7. Create Blog Posts
    console.log('📝 Creating blog posts...');
    const blogPosts = await Promise.all([
      client.create({
        _type: 'blogPost',
        title: 'The Art of Coffee Making',
        slug: { current: 'the-art-of-coffee-making' },
        excerpt: 'Discover the secrets behind crafting the perfect cup of coffee at The Sip-In Cafe.',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Coffee making is both an art and a science. At The Sip-In Cafe, we take pride in every step of the process, from selecting the finest beans to perfecting our brewing techniques.'
              }
            ]
          }
        ],
        author: {
          name: 'The Sip-In Cafe Team',
          role: 'Coffee Experts'
        },
        category: 'Coffee',
        tags: ['coffee', 'brewing', 'artisan', 'techniques'],
        publishedAt: new Date().toISOString(),
        isPublished: true,
        isFeatured: true,
        readingTime: 5
      }),
      client.create({
        _type: 'blogPost',
        title: 'Our Commitment to Sustainability',
        slug: { current: 'our-commitment-to-sustainability' },
        excerpt: 'Learn about our efforts to be environmentally conscious and support local communities.',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Sustainability is at the heart of everything we do at The Sip-In Cafe. From sourcing fair-trade coffee to using eco-friendly packaging, we\'re committed to making a positive impact.'
              }
            ]
          }
        ],
        author: {
          name: 'The Sip-In Cafe Team',
          role: 'Sustainability Team'
        },
        category: 'Sustainability',
        tags: ['sustainability', 'environment', 'fair-trade', 'eco-friendly'],
        publishedAt: new Date().toISOString(),
        isPublished: true,
        isFeatured: true,
        readingTime: 4
      })
    ]);
    console.log('✅ Blog posts created:', blogPosts.length);

    console.log('🎉 Sanity data seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Cafe Info: 1`);
    console.log(`   - Menu Categories: ${menuCategories.length}`);
    console.log(`   - Menu Items: ${menuItems.length}`);
    console.log(`   - Special Offers: ${specialOffers.length}`);
    console.log(`   - Testimonials: ${testimonials.length}`);
    console.log(`   - Gallery Items: ${galleryItems.length}`);
    console.log(`   - Blog Posts: ${blogPosts.length}`);
    console.log('');
    console.log('🚀 Your Sanity CMS is now populated with sample data!');
    console.log('💡 You can now view the data in your Sanity Studio at: http://localhost:3333');

  } catch (error) {
    console.error('❌ Error seeding Sanity data:', error);
    if (error.message.includes('token')) {
      console.log('💡 To add data to Sanity, you need to:');
      console.log('   1. Go to https://sanity.io/manage');
      console.log('   2. Select your project (cw4sy9ik)');
      console.log('   3. Go to API tab');
      console.log('   4. Create a new token with Editor permissions');
      console.log('   5. Add the token to your .env.local file as SANITY_TOKEN=your_token_here');
      console.log('   6. Run this script again');
    }
  }
}

// Run the seeding script
seedSanityData();
