import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POST_BY_SLUG_QUERY, LEGACY_POST_BY_SLUG_QUERY, BLOG_POSTS_QUERY } from "@/sanity/queries";
import { formatDateWithFallback } from "@/utils/dateUtils";
import Navigation from "@/components/Navigation";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Fetch blog posts to determine if blog link should be shown
  const blogPosts = await client.fetch(BLOG_POSTS_QUERY, {}, options);
  
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
        <Navigation currentPage="blog" hasBlogPosts={blogPosts && blogPosts.length > 0} cafeInfo={null} />
        
        <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4 relative z-10 pt-48 md:pt-32">
        <Link href="/" className="hover:underline">
          ← Back to posts
        </Link>
        <h1 className="text-4xl font-bold mb-8">Post not found</h1>
        <p>The requested post could not be found.</p>
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Available Posts:</h2>
          <p>Currently, there are no blog posts available. Please check back later or contact us for more information.</p>
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
      <Navigation currentPage="blog" hasBlogPosts={blogPosts && blogPosts.length > 0} cafeInfo={null} />
      
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4 relative z-10 pt-48 md:pt-32">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width={550}
          height={310}
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {formatDateWithFallback(post.publishedAt, 'TBD')}</p>
        {Array.isArray(post.content) && <PortableText value={post.content} />}
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
      </main>
    </div>
  );
}