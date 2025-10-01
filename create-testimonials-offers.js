import { client } from './src/sanity/client.ts';

async function createTestimonialsAndOffers() {
  try {
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

    console.log('🎉 Testimonials and offers creation completed!');
    
  } catch (error) {
    console.error('❌ Error creating testimonials and offers:', error.message);
  }
}

createTestimonialsAndOffers();
