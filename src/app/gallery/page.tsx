import { getGalleryItems } from "@/sanity/api";
import GalleryPageClient from "@/components/GalleryPageClient";

export default async function GalleryPage() {
  // Fetch data from Sanity
  const galleryItems = await getGalleryItems();

  return (
    <GalleryPageClient 
      galleryItems={galleryItems}
    />
  );
}