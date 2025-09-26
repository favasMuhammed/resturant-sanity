import { getCafeInfo, getFeaturedSpecialOffers, getFeaturedTestimonials, getFeaturedBlogPosts, getFeaturedGalleryItems } from "@/sanity/api";
import HomePageClient from "@/components/HomePageClient";

export default async function HomePage() {
  // Fetch data from Sanity
  const [cafeInfo, specialOffers, testimonials, blogPosts, galleryItems] = await Promise.all([
    getCafeInfo(),
    getFeaturedSpecialOffers(),
    getFeaturedTestimonials(),
    getFeaturedBlogPosts(),
    getFeaturedGalleryItems()
  ]);

  return (
    <HomePageClient 
      cafeInfo={cafeInfo}
      specialOffers={specialOffers}
      testimonials={testimonials}
      blogPosts={blogPosts}
      galleryItems={galleryItems}
    />
  );
}