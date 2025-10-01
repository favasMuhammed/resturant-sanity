import { client } from './src/sanity/client.ts';

async function createBlogPosts() {
  try {
    console.log('🚀 Creating sample blog posts...');
    
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
      },
      {
        _type: 'blogPost',
        title: 'The Perfect Latte Art',
        slug: { current: 'the-perfect-latte-art' },
        excerpt: 'Master the art of creating beautiful latte designs with our step-by-step guide.',
        content: [
          {
            _type: 'block',
            _key: 'intro',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'intro-text',
                text: 'Latte art is more than just decoration - it\'s an expression of our passion for coffee. Learn the techniques behind creating beautiful designs in your morning cup.'
              }
            ]
          }
        ],
        author: {
          name: 'Latte Artist',
          role: 'barista'
        },
        category: 'coffee-tips',
        tags: ['latte-art', 'coffee', 'techniques', 'tutorial'],
        publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        isPublished: true,
        isFeatured: true,
        readingTime: 4,
        seo: {
          metaTitle: 'The Perfect Latte Art - Coffee Tips from The Sip-In Cafe',
          metaDescription: 'Learn how to create beautiful latte art designs with our expert barista tips and techniques.',
          keywords: ['latte-art', 'coffee', 'barista', 'techniques', 'tutorial']
        }
      }
    ];

    for (const post of blogPosts) {
      try {
        const result = await client.create(post);
        console.log(`✅ Created blog post: ${post.title}`);
      } catch (error) {
        if (error.message.includes('already exists') || error.message.includes('duplicate')) {
          console.log(`⚠️  Blog post already exists: ${post.title}`);
        } else {
          console.error(`❌ Failed to create blog post "${post.title}":`, error.message);
        }
      }
    }

    console.log('🎉 Blog posts creation completed!');
    
  } catch (error) {
    console.error('❌ Error creating blog posts:', error.message);
  }
}

createBlogPosts();
