import { getMenuCategories, getMenuItems, getActiveSpecialOffers } from "@/sanity/api";
import MenuPageClient from "@/components/MenuPageClient";

export default async function MenuPage() {
  // Fetch data from Sanity
  const [menuCategories, menuItems, specialOffers] = await Promise.all([
    getMenuCategories(),
    getMenuItems(),
    getActiveSpecialOffers()
  ]);

  return (
    <MenuPageClient 
      menuCategories={menuCategories}
      menuItems={menuItems}
      specialOffers={specialOffers}
    />
  );
}