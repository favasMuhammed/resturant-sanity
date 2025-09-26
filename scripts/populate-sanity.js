const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'cw4sy9ik',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN || '', // You'll need to add this token
});

async function populateSanity() {
  try {
    console.log('🚀 Starting Sanity CMS population...');

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

    // 2. Create Special Offers
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
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
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
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
        isActive: true,
        isFeatured: true,
        order: 2
      }),
      client.create({
        _type: 'specialOffer',
        title: 'Happy Hour',
        description: '50% off all pastries and cakes from 3 PM to 5 PM.',
        type: 'happy-hour',
        discountType: 'percentage',
        discountValue: 50,
        currency: 'GBP',
        validFrom: new Date().toISOString(),
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
        timeRestrictions: {
          startTime: '15:00',
          endTime: '17:00',
          daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        },
        isActive: true,
        isFeatured: true,
        order: 3
      })
    ]);
    console.log('✅ Special offers created:', specialOffers.length);

    // 3. Create Menu Categories
    console.log('🍽️ Creating menu categories...');
    const menuCategories = await Promise.all([
      client.create({
        _type: 'menuCategory',
        name: 'Coffee',
        description: 'Premium artisanal coffee blends',
        icon: 'coffee',
        color: '#8B4513',
        isActive: true,
        order: 1
      }),
      client.create({
        _type: 'menuCategory',
        name: 'Pastries',
        description: 'Fresh baked goods and sweet treats',
        icon: 'croissant',
        color: '#D2691E',
        isActive: true,
        order: 2
      }),
      client.create({
        _type: 'menuCategory',
        name: 'Sandwiches',
        description: 'Fresh sandwiches and light meals',
        icon: 'sandwich',
        color: '#CD853F',
        isActive: true,
        order: 3
      }),
      client.create({
        _type: 'menuCategory',
        name: 'Desserts',
        description: 'Indulgent desserts and cakes',
        icon: 'cake',
        color: '#DEB887',
        isActive: true,
        order: 4
      })
    ]);
    console.log('✅ Menu categories created:', menuCategories.length);

    // 4. Create Menu Items
    console.log('☕ Creating menu items...');
    const menuItems = await Promise.all([
      // Coffee items
      client.create({
        _type: 'menuItem',
        name: 'Espresso',
        description: 'Rich, full-bodied espresso shot',
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
        description: 'Espresso with steamed milk and foam',
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
        description: 'Smooth espresso with steamed milk',
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
      // Pastry items
      client.create({
        _type: 'menuItem',
        name: 'Croissant',
        description: 'Buttery, flaky French croissant',
        price: 2.80,
        currency: 'GBP',
        category: { _ref: menuCategories[1]._id, _type: 'reference' },
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
        name: 'Chocolate Muffin',
        description: 'Rich chocolate muffin with chocolate chips',
        price: 3.20,
        currency: 'GBP',
        category: { _ref: menuCategories[1]._id, _type: 'reference' },
        isAvailable: true,
        isPopular: false,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ['gluten', 'dairy', 'eggs'],
        preparationTime: 1,
        order: 2
      })
    ]);
    console.log('✅ Menu items created:', menuItems.length);

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
      })
    ]);
    console.log('✅ Testimonials created:', testimonials.length);

    // 6. Create Gallery Items
    console.log('📸 Creating gallery items...');
    const galleryItems = await Promise.all([
      client.create({
        _type: 'galleryItem',
        title: 'Cozy Interior',
        description: 'Our warm and inviting cafe interior',
        type: 'image',
        category: 'interior',
        tags: ['interior', 'cozy', 'atmosphere'],
        isFeatured: true,
        isActive: true,
        order: 1
      }),
      client.create({
        _type: 'galleryItem',
        title: 'Fresh Coffee',
        description: 'Artisanal coffee being prepared',
        type: 'image',
        category: 'coffee',
        tags: ['coffee', 'preparation', 'artisanal'],
        isFeatured: true,
        isActive: true,
        order: 2
      }),
      client.create({
        _type: 'galleryItem',
        title: 'Delicious Pastries',
        description: 'Fresh baked goods on display',
        type: 'image',
        category: 'food',
        tags: ['pastries', 'fresh', 'baked'],
        isFeatured: true,
        isActive: true,
        order: 3
      })
    ]);
    console.log('✅ Gallery items created:', galleryItems.length);

    console.log('🎉 Sanity CMS population completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Cafe Info: 1`);
    console.log(`   - Special Offers: ${specialOffers.length}`);
    console.log(`   - Menu Categories: ${menuCategories.length}`);
    console.log(`   - Menu Items: ${menuItems.length}`);
    console.log(`   - Testimonials: ${testimonials.length}`);
    console.log(`   - Gallery Items: ${galleryItems.length}`);

  } catch (error) {
    console.error('❌ Error populating Sanity CMS:', error);
  }
}

// Run the population script
populateSanity();
