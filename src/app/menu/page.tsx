import { getMenuCategories, getMenuItems, getActiveSpecialOffers, getCafeInfo } from "@/sanity/api";
import MenuPageClient from "@/components/MenuPageClient";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cafeInfo = await getCafeInfo();
  return generatePageMetadata(cafeInfo, "Menu");
}

export default async function MenuPage() {
  // Fetch data from Sanity
  const [menuCategories, menuItems, specialOffers, cafeInfo] = await Promise.all([
    getMenuCategories(),
    getMenuItems(),
    getActiveSpecialOffers(),
    getCafeInfo()
  ]);

  return (
    <MenuPageClient 
      menuCategories={menuCategories}
      menuItems={menuItems}
      specialOffers={specialOffers}
      cafeInfo={cafeInfo}
    />
  );
}