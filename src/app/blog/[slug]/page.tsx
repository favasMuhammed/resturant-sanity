import { notFound } from 'next/navigation';
import { getBlogPosts } from '@/sanity/api';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // For static export, we need to provide actual route parameters
  // Since we can't reliably fetch data at build time without SANITY_TOKEN,
  // we'll provide a fallback route that will handle dynamic content at runtime
  return [
    { slug: 'introducing-indian-brunch-chaat-dal-and-paratha-in-leicester' },
    { slug: 'welcome-to-the-sip-in-cafe' },
    { slug: 'our-coffee-story' },
    { slug: 'menu-highlights' },
    { slug: 'community-spotlight' }
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const blogPosts = await getBlogPosts();
    const blogPost = blogPosts.find(post => post.slug?.current === slug);
    
    if (!blogPost) {
      return generatePageMetadata(null, 'Blog Post Not Found');
    }
    
    return generatePageMetadata(null, blogPost.title);
  } catch (error) {
    console.warn('Failed to fetch blog post metadata:', error);
    return generatePageMetadata(null, `Blog Post: ${slug}`);
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    // Get all blog posts to find the specific post
    const blogPosts = await getBlogPosts();
    const blogPost = blogPosts.find(post => post.slug?.current === slug);
    
    if (!blogPost) {
      notFound();
    }
    
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-20">
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gradient">
                {blogPost.title}
              </h1>
              {blogPost.publishedAt && (
                <time className="text-muted-foreground">
                  {new Date(blogPost.publishedAt).toLocaleDateString()}
                </time>
              )}
            </header>
            
            {blogPost.content && (
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
              </div>
            )}
          </article>
        </div>
      </div>
    );
  } catch (error) {
    console.warn('Failed to fetch blog post:', error);
    notFound();
  }
}