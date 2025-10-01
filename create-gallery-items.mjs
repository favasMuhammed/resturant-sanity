import { client } from './src/sanity/client.ts';

async function createGalleryItems() {
  try {
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
      },
      {
        _type: 'galleryItem',
        title: 'Coffee Making Process Video',
        description: 'Watch our baristas create beautiful latte art',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoThumbnail: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-latte-art-thumbnail'
          }
        },
        category: 'coffee',
        tags: ['video', 'latte-art', 'coffee'],
        isFeatured: true,
        isActive: true,
        order: 4,
        photographer: 'The Sip-In Team',
        takenAt: new Date().toISOString()
      },
      {
        _type: 'galleryItem',
        title: 'Cafe Tour Video',
        description: 'Take a virtual tour of our beautiful cafe space',
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoThumbnail: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-cafe-tour-thumbnail'
          }
        },
        category: 'atmosphere',
        tags: ['video', 'tour', 'cafe'],
        isFeatured: false,
        isActive: true,
        order: 5,
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

    console.log('🎉 Gallery items creation completed!');
    
  } catch (error) {
    console.error('❌ Error creating gallery items:', error.message);
  }
}

createGalleryItems();
