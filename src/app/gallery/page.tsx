import { getGalleryItems, getCafeInfo } from "@/sanity/api";
import GalleryPageClient from "@/components/GalleryPageClient";

export default async function GalleryPage() {
  // Fetch data from Sanity
  const [galleryItems, cafeInfo] = await Promise.all([
    getGalleryItems(),
    getCafeInfo()
  ]);

  return (
    <GalleryPageClient 
      galleryItems={galleryItems}
      cafeInfo={cafeInfo}
    />
  );
}