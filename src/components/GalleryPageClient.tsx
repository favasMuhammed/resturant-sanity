'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Camera, Play } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import { getImageUrl } from "@/sanity/imageUtils";
import type { GalleryItem } from "@/sanity/api";

interface GalleryPageClientProps {
  galleryItems: GalleryItem[];
}

export default function GalleryPageClient({ galleryItems }: GalleryPageClientProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  // Fallback gallery data if Sanity data is not available
  const fallbackImages = [
    {
      id: 1,
      src: "/gallery/coffee-1.jpg",
      alt: "Artisan coffee preparation",
      category: "coffee"
    },
    {
      id: 2,
      src: "/gallery/food-1.jpg",
      alt: "Fresh pastries and sandwiches",
      category: "food"
    },
    {
      id: 3,
      src: "/gallery/atmosphere-1.jpg",
      alt: "Cozy cafe interior",
      category: "atmosphere"
    },
    {
      id: 4,
      src: "/gallery/coffee-2.jpg",
      alt: "Latte art",
      category: "coffee"
    },
    {
      id: 5,
      src: "/gallery/food-2.jpg",
      alt: "Breakfast platter",
      category: "food"
    },
    {
      id: 6,
      src: "/gallery/atmosphere-2.jpg",
      alt: "Outdoor seating area",
      category: "atmosphere"
    },
    {
      id: 7,
      src: "/gallery/coffee-3.jpg",
      alt: "Espresso machine",
      category: "coffee"
    },
    {
      id: 8,
      src: "/gallery/food-3.jpg",
      alt: "Lunch specials",
      category: "food"
    },
    {
      id: 9,
      src: "/gallery/atmosphere-3.jpg",
      alt: "Customers enjoying their coffee",
      category: "atmosphere"
    }
  ];

  // Process gallery items from Sanity or use fallback
  const processedImages = galleryItems.length > 0 
    ? galleryItems.map(item => ({
        id: item._id,
        src: item.image ? getImageUrl(item.image, 400, 400) : "/gallery/placeholder.jpg",
        alt: item.title,
        category: item.category,
        type: item.type as 'image' | 'video',
        videoUrl: item.videoUrl,
        videoThumbnail: item.videoThumbnail ? getImageUrl(item.videoThumbnail, 400, 400) : null
      }))
    : fallbackImages.map(item => ({
        ...item,
        type: 'image' as const,
        videoUrl: undefined,
        videoThumbnail: null
      }));

  const filters = [
    { id: "all", label: "All", icon: Camera },
    { id: "coffee", label: "Coffee", icon: Camera },
    { id: "food", label: "Food", icon: Camera },
    { id: "atmosphere", label: "Atmosphere", icon: Camera }
  ];

  const filteredImages = activeFilter === "all" 
    ? processedImages 
    : processedImages.filter(img => img.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Navigation */}
      <Navigation currentPage="gallery" />

      {/* Modern Gallery Header */}
      <section className="relative py-20 px-6 pt-24">
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Take a visual journey through The Sip-In Cafe experience. From our carefully crafted coffee to our cozy atmosphere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modern Gallery Filter */}
      <section className="py-8 px-6 relative z-10">
        <div className="container mx-auto">
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filters.map((filter, index) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900/20'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <filter.icon className="w-4 h-4" />
                <span>{filter.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modern Gallery Grid */}
      <section className="py-12 px-6 relative z-10">
        <div className="container mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredImages.map((image, index) => (
              <motion.div 
                key={image.id} 
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 card-modern"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {image.type === 'video' && image.videoUrl ? (
                  // Video item
                  <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center relative">
                    {image.videoThumbnail ? (
                      <Image
                        src={image.videoThumbnail}
                        alt={image.alt}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {image.alt}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 capitalize font-semibold">
                          {image.category}
                        </p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <motion.button 
                        className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(image.videoUrl, '_blank')}
                      >
                        Watch Video
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  // Image item
                  <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center">
                    {image.src && image.src !== "/gallery/placeholder.jpg" ? (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {image.alt}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 capitalize font-semibold">
                          {image.category}
                        </p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <motion.button 
                        className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Full Size
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modern Video Section */}
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
              <span className="text-gradient">Behind the Scenes</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Watch our baristas in action and see what makes The Sip-In Cafe special
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Coffee Making Process",
                description: "Watch our baristas craft the perfect cup",
                icon: Play
              },
              {
                title: "Cafe Atmosphere", 
                description: "Experience our welcoming environment",
                icon: Play
              }
            ].map((video, index) => (
              <motion.div
                key={video.title}
                className="bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 aspect-video flex items-center justify-center card-modern group cursor-pointer"
                whileHover={{ y: -10, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 300 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <video.icon className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-bold text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {video.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              <span className="text-gradient">Ready to Visit?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience The Sip-In Cafe for yourself. Book a table or order online today!
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
      <Footer />

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}
