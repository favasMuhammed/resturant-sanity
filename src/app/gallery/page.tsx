import { getGalleryItems, getCafeInfo } from "@/sanity/api";
import GalleryPageClient from "@/components/GalleryPageClient";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cafeInfo = await getCafeInfo();
  return generatePageMetadata(cafeInfo, "Gallery");
}

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