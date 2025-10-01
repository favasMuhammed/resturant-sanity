import { getCafeInfo, getSpecialOffers, getTestimonials, getGalleryItems } from "@/sanity/api";
import HomePageClient from "@/components/HomePageClient";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cafeInfo = await getCafeInfo();
  return generatePageMetadata(cafeInfo);
}

export default async function HomePage() {
  // Fetch data from Sanity
  const [cafeInfo, specialOffers, testimonials, galleryItems] = await Promise.all([
    getCafeInfo(),
    getSpecialOffers(),
    getTestimonials(),
    getGalleryItems()
  ]);


  return (
    <HomePageClient 
      cafeInfo={cafeInfo}
      specialOffers={specialOffers}
      testimonials={testimonials}
      galleryItems={galleryItems}
    />
  );
}