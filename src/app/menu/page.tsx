import { getMenuCategories, getMenuItems, getActiveSpecialOffers, getCafeInfo } from "@/sanity/api";
import MenuPageClient from "@/components/MenuPageClient";

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