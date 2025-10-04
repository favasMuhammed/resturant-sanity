import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POST_BY_SLUG_QUERY, LEGACY_POST_BY_SLUG_QUERY, BLOG_POSTS_QUERY } from "@/sanity/queries";
import { formatDateWithFallback } from "@/utils/dateUtils";
import Navigation from "@/components/Navigation";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
// import { generateBlogPostSchema } from "@/lib/structuredData";
import { getCafeInfo } from "@/sanity/api";
import type { Metadata } from "next";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cafeInfo = await getCafeInfo();
  
  // Try to fetch the post for metadata
  let post = await client.fetch<SanityDocument>(BLOG_POST_BY_SLUG_QUERY, { slug }, options);
  if (!post) {
    post = await client.fetch<SanityDocument>(LEGACY_POST_BY_SLUG_QUERY, { slug }, options);
  }
  
  if (post) {
    return generatePageMetadata(cafeInfo, post.title);
  }
  
  return generatePageMetadata(cafeInfo, "Blog Post");
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Fetch blog posts and cafe info
  const [blogPosts, cafeInfo] = await Promise.all([
    client.fetch(BLOG_POSTS_QUERY, {}, options),
    getCafeInfo()
  ]);
  
  // Try to fetch from blogPost first, then fallback to legacy post
  let post = await client.fetch<SanityDocument>(BLOG_POST_BY_SLUG_QUERY, { slug }, options);
  
  if (!post) {
    post = await client.fetch<SanityDocument>(LEGACY_POST_BY_SLUG_QUERY, { slug }, options);
  }
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Dark luxury background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>
        
        {/* Navigation */}
        <Navigation currentPage="blog" hasBlogPosts={blogPosts && blogPosts.length > 0} cafeInfo={cafeInfo} />
        
        <main className="container mx-auto min-h-screen max-w-4xl px-6 pt-32 pb-12 relative z-10">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* 404 Content */}
          <div className="text-center py-20">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Post Not Found</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                The blog post you&apos;re looking for doesn&apos;t exist or may have been moved.
              </p>
            </div>
            
            <div className="bg-muted/50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Available Posts:</h3>
              <p className="text-muted-foreground">
                Currently, there are no blog posts available. Please check back later or contact us for more information.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
              >
                View All Posts
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const postImageUrl = post.featuredImage || post.image
    ? urlFor(post.featuredImage || post.image)?.width(550).height(310).url()
    : null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dark luxury background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>
      
      {/* Navigation */}
      <Navigation currentPage="blog" hasBlogPosts={blogPosts && blogPosts.length > 0} cafeInfo={cafeInfo} />
      
      <main className="container mx-auto min-h-screen max-w-4xl px-6 pt-32 pb-12 relative z-10">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-xl overflow-hidden">
          {postImageUrl && (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image
                src={postImageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
                width={800}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full border border-primary/20">
                {post.category}
              </span>
              {post.readingTime && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readingTime} min read
                </span>
              )}
              <span className="text-sm text-muted-foreground">
                {formatDateWithFallback(post.publishedAt, 'TBD')}
              </span>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author Info */}
            {post.author && (
              <div className="flex items-center gap-4 mb-8 p-4 bg-muted/50 rounded-xl">
                {post.author.photo && post.author.photo.asset ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={urlFor(post.author.photo)?.width(48).height(48).url() || ""}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg font-bold">
                      {post.author.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-foreground">{post.author.name}</p>
                  {post.author.role && (
                    <p className="text-sm text-muted-foreground capitalize">{post.author.role}</p>
                  )}
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground">
              {Array.isArray(post.content) && <PortableText value={post.content} />}
              {Array.isArray(post.body) && <PortableText value={post.body} />}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
