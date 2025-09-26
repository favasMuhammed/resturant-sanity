import { getCafeInfo, getFeaturedSpecialOffers } from "@/sanity/api";
import HomePageClient from "@/components/HomePageClient";

export default async function HomePage() {
  // Fetch data from Sanity
  const [cafeInfo, specialOffers] = await Promise.all([
    getCafeInfo(),
    getFeaturedSpecialOffers()
  ]);

  return (
    <HomePageClient 
      cafeInfo={cafeInfo}
      specialOffers={specialOffers}
    />
  );
}