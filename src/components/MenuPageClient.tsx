'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, Coffee, Utensils, Clock, Percent } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import { getImageUrl } from "@/sanity/imageUtils";
import type { MenuCategory, MenuItem, SpecialOffer, CafeInfo } from "@/sanity/api";

interface MenuPageClientProps {
  menuCategories: MenuCategory[];
  menuItems: MenuItem[];
  specialOffers: SpecialOffer[];
  cafeInfo: CafeInfo | null;
}

export default function MenuPageClient({ 
  menuCategories, 
  menuItems, 
  specialOffers,
  cafeInfo
}: MenuPageClientProps) {
  // Group menu items by category
  const groupedMenuItems = menuCategories.map(category => ({
    ...category,
    items: menuItems.filter(item => item.category._ref === category._id)
  }));

  // Fallback menu data if Sanity data is not available
  const fallbackCategories = [
    {
      title: "Coffee & Drinks",
      items: [
        { name: "Espresso", price: "£2.50", description: "Rich and bold single shot" },
        { name: "Americano", price: "£3.00", description: "Espresso with hot water" },
        { name: "Latte", price: "£3.50", description: "Espresso with steamed milk" },
        { name: "Cappuccino", price: "£3.50", description: "Espresso with foamed milk" },
        { name: "Flat White", price: "£3.75", description: "Double espresso with microfoam" },
        { name: "Mocha", price: "£4.00", description: "Espresso with chocolate and milk" },
        { name: "Cold Brew", price: "£3.25", description: "Smooth cold-brewed coffee" },
        { name: "Iced Coffee", price: "£3.50", description: "Chilled coffee over ice" }
      ]
    },
    {
      title: "Breakfast",
      items: [
        { name: "Full English", price: "£12.50", description: "Eggs, bacon, sausage, beans, toast" },
        { name: "Avocado Toast", price: "£8.50", description: "Smashed avocado on sourdough" },
        { name: "Pancakes", price: "£7.50", description: "Fluffy pancakes with maple syrup" },
        { name: "Eggs Benedict", price: "£9.50", description: "Poached eggs on English muffin" },
        { name: "Granola Bowl", price: "£6.50", description: "Greek yogurt with fresh berries" },
        { name: "Breakfast Wrap", price: "£7.00", description: "Scrambled eggs with bacon" }
      ]
    },
    {
      title: "Lunch",
      items: [
        { name: "Club Sandwich", price: "£9.50", description: "Chicken, bacon, lettuce, tomato" },
        { name: "Caesar Salad", price: "£8.50", description: "Romaine, parmesan, croutons" },
        { name: "Quiche of the Day", price: "£7.50", description: "Freshly baked with side salad" },
        { name: "Soup & Sandwich", price: "£8.00", description: "Soup of the day with choice of bread" },
        { name: "Burger", price: "£11.50", description: "Beef patty with chips" },
        { name: "Veggie Wrap", price: "£7.50", description: "Fresh vegetables in tortilla" }
      ]
    },
    {
      title: "Pastries & Desserts",
      items: [
        { name: "Croissant", price: "£2.50", description: "Buttery French pastry" },
        { name: "Danish Pastry", price: "£3.00", description: "Fruit-filled pastry" },
        { name: "Muffin", price: "£2.75", description: "Blueberry or chocolate chip" },
        { name: "Cake Slice", price: "£4.50", description: "Selection of homemade cakes" },
        { name: "Cheesecake", price: "£4.75", description: "New York style cheesecake" },
        { name: "Brownie", price: "£3.50", description: "Rich chocolate brownie" }
      ]
    }
  ];

  const displayCategories = groupedMenuItems.length > 0 ? groupedMenuItems : fallbackCategories;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dark luxury background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>

      {/* Navigation */}
      <Navigation currentPage="menu" />

      {/* Modern Menu Header */}
      <section className="relative py-20 px-6 pt-24 md:pt-32">
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              <span className="text-gradient">Our Menu</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Fresh ingredients, carefully prepared. From morning coffee to afternoon treats, 
              we&apos;ve got something for everyone.
            </p>
            
            {/* Menu highlights */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                { icon: Coffee, text: "Premium Coffee" },
                { icon: Utensils, text: "Fresh Food" },
                { icon: Star, text: "Quality Ingredients" },
                { icon: Clock, text: "Made Fresh Daily" }
              ].map((highlight, index) => (
                <motion.div
                  key={highlight.text}
                  className="flex items-center space-x-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 300 }}
                >
                  <highlight.icon className="w-5 h-5 text-amber-500" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{highlight.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Menu Categories */}
      <section className="py-12 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {displayCategories.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex} 
              className="mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Category Image */}
              {'image' in category && category.image && (
                <div className="mb-8 text-center">
                  <Image
                    src={getImageUrl(category.image, 400, 200) || "/menu/category-placeholder.jpg"}
                    alt={category.name}
                    width={400}
                    height={200}
                    className="w-full max-w-2xl h-48 object-cover rounded-2xl mx-auto shadow-lg"
                  />
                </div>
              )}
              
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-12 text-center"
                whileInView={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="text-gradient">
                  {'name' in category ? category.name : category.title}
                </span>
              </motion.h2>
              
              {/* Category Description */}
              {'description' in category && category.description && (
                <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  {category.description}
                </p>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                {(category.items || []).map((item, itemIndex) => (
                  <motion.div 
                    key={itemIndex} 
                    className="card-modern p-6 rounded-2xl group"
                    whileHover={{ y: -5, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: itemIndex * 0.05, duration: 0.5, type: "spring", stiffness: 300 }}
                    viewport={{ once: true }}
                  >
                    {/* Menu Item Image */}
                    {'image' in item && item.image && (
                      <div className="mb-4">
                        <Image
                          src={getImageUrl(item.image, 300, 200) || "/menu/placeholder.jpg"}
                          alt={item.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-xl"
                        />
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-xl font-bold text-gradient">
                        {typeof item.price === 'number' ? `£${item.price.toFixed(2)}` : item.price}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    
                  {/* Dietary information */}
                  <div className="flex flex-wrap gap-2">
                    {'isVegetarian' in item && item.isVegetarian && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Vegetarian
                      </span>
                    )}
                    {'isVegan' in item && item.isVegan && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Vegan
                      </span>
                    )}
                    {'isGlutenFree' in item && item.isGlutenFree && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Gluten Free
                      </span>
                    )}
                    {'isPopular' in item && item.isPopular && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Allergens */}
                  {'allergens' in item && item.allergens && item.allergens.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Contains: {item.allergens.join(', ')}
                      </p>
                    </div>
                  )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modern Special Offers */}
      {specialOffers && specialOffers.length > 0 && (
        <section className="py-20 px-6 relative z-10">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-gradient">Special Offers</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Don&apos;t miss out on our amazing deals and discounts
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {specialOffers.slice(0, 3).map((offer, index) => (
                <motion.div
                  key={offer._id}
                  className="bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-900/20 p-8 rounded-2xl card-modern group"
                  whileHover={{ y: -10, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center">
                    {/* Special Offer Image */}
                    {offer.image && (
                      <div className="mb-6">
                        <Image
                          src={getImageUrl(offer.image, 300, 200) || "/offers/placeholder.jpg"}
                          alt={offer.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-xl mx-auto shadow-lg"
                        />
                      </div>
                    )}
                    
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Percent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg font-medium">
                      {offer.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                      Valid until {new Date(offer.validUntil || new Date()).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fallback Special Offers if no Sanity data */}
      {(!specialOffers || specialOffers.length === 0) && (
        <section className="py-20 px-6 relative z-10">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-gradient">Special Offers</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Don&apos;t miss out on our amazing deals and discounts
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Morning Special",
                  description: "Any coffee + pastry for just £5.50",
                  valid: "Valid 7:00 AM - 11:00 AM",
                  icon: Coffee,
                  color: "from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-900/20"
                },
                {
                  title: "Lunch Deal", 
                  description: "Soup + Sandwich + Drink for £10",
                  valid: "Valid 12:00 PM - 3:00 PM",
                  icon: Utensils,
                  color: "from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-900/20"
                },
                {
                  title: "Student Discount",
                  description: "10% off with valid student ID", 
                  valid: "All day, every day",
                  icon: Percent,
                  color: "from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-900/20"
                }
              ].map((offer, index) => (
                <motion.div
                  key={offer.title}
                  className={`bg-gradient-to-br ${offer.color} p-8 rounded-2xl card-modern group`}
                  whileHover={{ y: -10, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <offer.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg font-medium">
                      {offer.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                      {offer.valid}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modern Call to Action */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              <span className="text-gradient">Ready to Order?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Choose from our delivery partners or book a table to enjoy your meal in our cozy cafe.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/#order" 
                  className="btn-modern inline-flex items-center space-x-2 group"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/#contact" 
                  className="px-8 py-4 rounded-full text-lg font-semibold border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2 group"
                >
                  <span>Book a Table</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer cafeInfo={cafeInfo} />

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}
