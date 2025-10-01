const { client } = require('./src/sanity/client.ts');

async function populateMissingData() {
  try {
    console.log('🚀 Starting to populate missing data...');
    
    // Create sample blog posts
    console.log('📝 Creating sample blog posts...');
    const blogPosts = [
      {
        _type: 'blogPost',
        title: 'Welcome to The Sip-In Cafe',
        slug: { current: 'welcome-to-the-sip-in-cafe' },
        excerpt: 'Discover our story and what makes us special in the heart of Leicester.',
        content: [
          {
            _type: 'block',
            _key: 'intro',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'intro-text',
                text: 'Welcome to The Sip-In Cafe, where every sip tells a story. We are passionate about serving exceptional coffee and creating memorable experiences for our community.'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'story',
            style: 'h2',
            children: [
              {
                _type: 'span',
                _key: 'story-title',
                text: 'Our Story'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'story-content',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'story-text',
                text: 'Founded in the heart of Leicester, The Sip-In Cafe has been serving our community with love, care, and exceptional coffee. Our journey began with a simple mission: to create a space where people can connect, relax, and enjoy the finest coffee and food.'
              }
            ]
          }
        ],
        featuredImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-cafe-interior'
          }
        },
        author: {
          name: 'The Sip-In Team',
          role: 'owner'
        },
        category: 'news',
        tags: ['welcome', 'cafe', 'community'],
        publishedAt: new Date().toISOString(),
        isPublished: true,
        isFeatured: true,
        readingTime: 3,
        seo: {
          metaTitle: 'Welcome to The Sip-In Cafe - Leicester\'s Premier Coffee Destination',
          metaDescription: 'Discover The Sip-In Cafe in Leicester. Exceptional coffee, delicious food, and a warm community atmosphere.',
          keywords: ['cafe', 'coffee', 'Leicester', 'community', 'food']
        }
      },
      {
        _type: 'blogPost',
        title: 'Our Coffee Journey',
        slug: { current: 'our-coffee-journey' },
        excerpt: 'Learn about our commitment to sourcing the finest coffee beans and our brewing process.',
        content: [
          {
            _type: 'block',
            _key: 'intro',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'intro-text',
                text: 'At The Sip-In Cafe, we believe that great coffee starts with great beans. Our journey takes us around the world to source the finest coffee beans, ensuring every cup we serve meets our high standards.'
              }
            ]
          }
        ],
        author: {
          name: 'Coffee Master',
          role: 'barista'
        },
        category: 'coffee-tips',
        tags: ['coffee', 'beans', 'brewing', 'quality'],
        publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        isPublished: true,
        isFeatured: false,
        readingTime: 5,
        seo: {
          metaTitle: 'Our Coffee Journey - The Sip-In Cafe',
          metaDescription: 'Discover our commitment to sourcing the finest coffee beans and our meticulous brewing process.',
          keywords: ['coffee', 'beans', 'brewing', 'quality', 'sourcing']
        }
      }
    ];

    for (const post of blogPosts) {
      try {
        const result = await client.create(post);
        console.log(`✅ Created blog post: ${post.title}`);
      } catch (error) {
        console.log(`⚠️  Blog post might already exist: ${post.title}`);
      }
    }

    // Create sample gallery items
    console.log('📸 Creating sample gallery items...');
    const galleryItems = [
      {
        _type: 'galleryItem',
        title: 'Artisan Coffee Preparation',
        description: 'Our skilled baristas crafting the perfect cup of coffee',
        type: 'image',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-coffee-preparation'
          },
          alt: 'Barista preparing coffee'
        },
        category: 'coffee',
        tags: ['coffee', 'barista', 'preparation'],
        isFeatured: true,
        isActive: true,
        order: 1,
        photographer: 'The Sip-In Team',
        takenAt: new Date().toISOString()
      },
      {
        _type: 'galleryItem',
        title: 'Fresh Pastries',
        description: 'Delicious pastries baked fresh daily',
        type: 'image',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-pastries'
          },
          alt: 'Fresh pastries on display'
        },
        category: 'food',
        tags: ['pastries', 'fresh', 'baked'],
        isFeatured: true,
        isActive: true,
        order: 2,
        photographer: 'The Sip-In Team',
        takenAt: new Date().toISOString()
      },
      {
        _type: 'galleryItem',
        title: 'Cafe Atmosphere',
        description: 'The warm and welcoming atmosphere of our cafe',
        type: 'image',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-cafe-atmosphere'
          },
          alt: 'Cafe interior showing warm atmosphere'
        },
        category: 'atmosphere',
        tags: ['atmosphere', 'interior', 'welcoming'],
        isFeatured: false,
        isActive: true,
        order: 3,
        photographer: 'The Sip-In Team',
        takenAt: new Date().toISOString()
      }
    ];

    for (const item of galleryItems) {
      try {
        const result = await client.create(item);
        console.log(`✅ Created gallery item: ${item.title}`);
      } catch (error) {
        console.log(`⚠️  Gallery item might already exist: ${item.title}`);
      }
    }

    // Create sample testimonials
    console.log('⭐ Creating sample testimonials...');
    const testimonials = [
      {
        _type: 'testimonial',
        customerName: 'Sarah Johnson',
        customerInitials: 'SJ',
        content: 'The best coffee in Leicester! The atmosphere is perfect for working or catching up with friends. Highly recommend the cappuccino!',
        rating: 5,
        customerLocation: 'Leicester, UK',
        visitDate: '2024-09-20',
        isVerified: true,
        isFeatured: true,
        isActive: true,
        order: 1,
        socialMedia: '@sarahj_leicester'
      },
      {
        _type: 'testimonial',
        customerName: 'Mike Chen',
        customerInitials: 'MC',
        content: 'Amazing pastries and excellent service. The staff is always friendly and the coffee is consistently great. My go-to place for breakfast!',
        rating: 5,
        customerLocation: 'Leicester, UK',
        visitDate: '2024-09-18',
        isVerified: true,
        isFeatured: true,
        isActive: true,
        order: 2,
        socialMedia: '@mikechen_foodie'
      },
      {
        _type: 'testimonial',
        customerName: 'Emma Williams',
        customerInitials: 'EW',
        content: 'Love the cozy atmosphere and the variety of drinks. The baristas are knowledgeable and always happy to recommend something new.',
        rating: 4,
        customerLocation: 'Leicester, UK',
        visitDate: '2024-09-15',
        isVerified: true,
        isFeatured: false,
        isActive: true,
        order: 3,
        socialMedia: '@emma_w_coffee'
      }
    ];

    for (const testimonial of testimonials) {
      try {
        const result = await client.create(testimonial);
        console.log(`✅ Created testimonial: ${testimonial.customerName}`);
      } catch (error) {
        console.log(`⚠️  Testimonial might already exist: ${testimonial.customerName}`);
      }
    }

    // Create sample special offers
    console.log('🎯 Creating sample special offers...');
    const specialOffers = [
      {
        _type: 'specialOffer',
        title: 'Morning Coffee Special',
        description: 'Get 20% off any coffee drink before 10 AM',
        type: 'discount',
        discountType: 'percentage',
        discountValue: 20,
        currency: 'GBP',
        validFrom: new Date().toISOString(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        timeRestrictions: {
          startTime: '06:00',
          endTime: '10:00',
          daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        },
        isActive: true,
        isFeatured: true,
        order: 1,
        termsAndConditions: 'Valid for coffee drinks only. Cannot be combined with other offers. Valid Monday-Friday 6 AM - 10 AM.'
      },
      {
        _type: 'specialOffer',
        title: 'Student Discount',
        description: '15% off your entire order with valid student ID',
        type: 'discount',
        discountType: 'percentage',
        discountValue: 15,
        currency: 'GBP',
        validFrom: new Date().toISOString(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
        isActive: true,
        isFeatured: true,
        order: 2,
        termsAndConditions: 'Valid student ID required. Cannot be combined with other offers. Valid on all items.'
      }
    ];

    for (const offer of specialOffers) {
      try {
        const result = await client.create(offer);
        console.log(`✅ Created special offer: ${offer.title}`);
      } catch (error) {
        console.log(`⚠️  Special offer might already exist: ${offer.title}`);
      }
    }

    console.log('🎉 Data population completed!');
    console.log('\n📊 Summary:');
    console.log('- Blog posts: 2 created');
    console.log('- Gallery items: 3 created');
    console.log('- Testimonials: 3 created');
    console.log('- Special offers: 2 created');
    
  } catch (error) {
    console.error('❌ Error populating data:', error.message);
  }
}

populateMissingData();
