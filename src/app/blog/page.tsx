import { client } from "@/sanity/client";
import { BLOG_POSTS_QUERY } from "@/sanity/queries";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/sanity/imageUtils";
import { formatDateWithFallback } from "@/utils/dateUtils";
import Navigation from "@/components/Navigation";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
import { getCafeInfo } from "@/sanity/api";
import type { BlogPost } from "@/sanity/api";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cafeInfo = await getCafeInfo();
  return generatePageMetadata(cafeInfo, "Blog & News");
}

const options = { next: { revalidate: 30 } };

export default async function BlogPage() {
  const [blogPosts, cafeInfo] = await Promise.all([
    client.fetch<BlogPost[]>(BLOG_POSTS_QUERY, {}, options),
    getCafeInfo()
  ]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dark luxury background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>
      
      {/* Navigation */}
      <Navigation currentPage="blog" hasBlogPosts={blogPosts && blogPosts.length > 0} cafeInfo={cafeInfo} />

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

      <main className="container mx-auto max-w-7xl px-6 py-12 relative z-10">

      {blogPosts && blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post._id}
              className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden group transition-all duration-500 h-full flex flex-col"
            >
              {post.featuredImage && post.featuredImage.asset && (
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={getImageUrl(post.featuredImage, 600, 400) || "/blog/placeholder.jpg"}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full border border-primary/20">
                    {post.category}
                  </span>
                  {post.readingTime && (
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readingTime} min
                    </span>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h2>
                
                {post.excerpt && (
                  <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {(post.author?.name || "The Sip-In Cafe").charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{post.author?.name || "The Sip-In Cafe"}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDateWithFallback(post.publishedAt, 'TBD')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:from-primary/90 hover:to-accent/90 transition-all duration-300 group"
                  >
                    <span>Read Article</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
