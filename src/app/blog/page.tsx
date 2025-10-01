import { client } from "@/sanity/client";
import { BLOG_POSTS_QUERY } from "@/sanity/queries";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/sanity/imageUtils";
import { formatDateWithFallback } from "@/utils/dateUtils";
import Navigation from "@/components/Navigation";
import type { BlogPost } from "@/sanity/api";

const options = { next: { revalidate: 30 } };

export default async function BlogPage() {
  const blogPosts = await client.fetch<BlogPost[]>(BLOG_POSTS_QUERY, {}, options);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dark luxury background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>
      
      {/* Navigation */}
      <Navigation currentPage="blog" hasBlogPosts={blogPosts && blogPosts.length > 0} cafeInfo={null} />

      {/* Blog Header */}
      <section className="relative py-20 px-6 pt-48 md:pt-32">
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Blog & News
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Stay updated with our latest news, coffee tips, and behind-the-scenes stories from The Sip-In Cafe.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto max-w-6xl p-8 relative z-10">

      {blogPosts && blogPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post._id}
              className="bg-background rounded-2xl shadow-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-500 h-full"
            >
              {post.featuredImage && post.featuredImage.asset && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={getImageUrl(post.featuredImage, 400, 300) || "/blog/placeholder.jpg"}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                  {post.readingTime && (
                    <span className="text-sm text-muted-foreground">
                      {post.readingTime} min read
                    </span>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                
                {post.excerpt && (
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{post.author?.name || "The Sip-In Cafe"}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateWithFallback(post.publishedAt, 'TBD')}
                      </p>
                    </div>
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="text-primary hover:text-primary/80 font-semibold flex items-center space-x-1 group"
                  >
                    <span>Read More</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-foreground mb-4">No blog posts yet</h2>
          <p className="text-muted-foreground mb-8">
            We&apos;re working on creating amazing content for you. Check back soon!
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      )}
      </main>
    </div>
  );
}
