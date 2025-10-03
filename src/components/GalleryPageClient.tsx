'use client';

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Camera, Play, X, ZoomIn } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import { getImageUrl, getHighQualityImageUrl, getMediumQualityImageUrl } from "@/sanity/imageUtils";
import type { GalleryItem, CafeInfo, BlogPost } from "@/sanity/api";

interface GalleryPageClientProps {
  galleryItems: GalleryItem[];
  cafeInfo: CafeInfo | null;
  blogPosts?: BlogPost[];
}

export default function GalleryPageClient({ galleryItems, cafeInfo, blogPosts = [] }: GalleryPageClientProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; category: string } | null>(null);

  // Filter videos from gallery items
  const videoItems = galleryItems.filter(item => item.type === 'video' && item.videoUrl);




  // Process gallery items from Sanity CMS only
  const processedImages = galleryItems.map((item) => {
        // Try to get image URL with different approaches
        let imageUrl = null;
        
        if (item.image && item.image.asset) {
          // Use high quality for gallery images with larger dimensions
          imageUrl = getHighQualityImageUrl(item.image, 800, 800);
          
          // If that fails, try with medium quality
          if (!imageUrl) {
            imageUrl = getMediumQualityImageUrl(item.image, 600, 600);
          }
          
          // Final fallback
          if (!imageUrl) {
            imageUrl = getImageUrl(item.image);
          }
          
          // If still no URL, try to construct it manually from asset reference
          if (!imageUrl && item.image.asset._ref) {
            try {
              // Extract the asset ID from the reference
              const assetRef = item.image.asset._ref;
              
              // Remove the 'image-' prefix and file extension
              const assetId = assetRef
                .replace('image-', '')
                .replace(/-jpg$/, '.jpg')
                .replace(/-png$/, '.png')
                .replace(/-webp$/, '.webp')
                .replace(/-jpeg$/, '.jpeg');
              
              // Construct the URL
              imageUrl = `https://cdn.sanity.io/images/cw4sy9ik/production/${assetId}`;
            } catch (error) {
              console.error('Error constructing manual URL:', error);
            }
          }
          
          // Final fallback - try to use the asset reference directly
          if (!imageUrl && item.image.asset._ref) {
            imageUrl = `https://cdn.sanity.io/images/cw4sy9ik/production/${item.image.asset._ref}`;
          }
        }
        
        const videoThumbnailUrl = item.videoThumbnail && item.videoThumbnail.asset ? 
          getHighQualityImageUrl(item.videoThumbnail, 800, 800) : null;
        
        
        // Only return items that have valid image URLs
        if (!imageUrl) {
          return null; // Skip items without valid images
        }
        
        return {
          id: item._id,
          src: imageUrl,
          alt: item.title || "Gallery Image",
          category: item.category || "general",
          type: item.type as 'image' | 'video',
          videoUrl: item.videoUrl,
          videoThumbnail: videoThumbnailUrl
        };
      }).filter(Boolean); // Remove null values

  const filters = [
    { id: "all", label: "All", icon: Camera },
    { id: "coffee", label: "Coffee", icon: Camera },
    { id: "food", label: "Food", icon: Camera },
    { id: "atmosphere", label: "Atmosphere", icon: Camera }
  ];

  // Use only processed images from CMS
  const displayImages = processedImages;

  const filteredImages = activeFilter === "all" 
    ? displayImages 
    : displayImages.filter((img) => img && img.category === activeFilter);

  // Navigation functions for keyboard support
  const navigateToNext = useCallback(() => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex((img) => img && img.src === selectedImage.src);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      const nextImage = filteredImages[nextIndex];
      if (nextImage) {
        setSelectedImage({
          src: nextImage.src,
          alt: nextImage.alt,
          category: nextImage.category
        });
      }
    }
  }, [selectedImage, filteredImages]);

  const navigateToPrevious = useCallback(() => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex((img) => img && img.src === selectedImage.src);
    if (currentIndex !== -1) {
      const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
      const prevImage = filteredImages[prevIndex];
      if (prevImage) {
        setSelectedImage({
          src: prevImage.src,
          alt: prevImage.alt,
          category: prevImage.category
        });
      }
    }
  }, [selectedImage, filteredImages]);

  // Enhanced keyboard support with navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (event.key) {
        case 'Escape':
          setSelectedImage(null);
          break;
        case 'ArrowLeft':
          event.preventDefault();
          navigateToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          navigateToNext();
          break;
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, filteredImages, navigateToNext, navigateToPrevious]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dark luxury background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>

      {/* Navigation */}
      <Navigation currentPage="gallery" hasBlogPosts={blogPosts && blogPosts.length > 0} cafeInfo={cafeInfo} />

      {/* Modern Gallery Header */}
      <section className="relative py-20 px-6 pt-48 md:pt-32">
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
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
                    : 'bg-muted/80 text-foreground hover:bg-primary/10'
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
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Images Available
              </h3>
              <p className="text-muted-foreground">
                Please upload images to your CMS to see them here.
              </p>
            </div>
          ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
            layout
          >
              {filteredImages.map((image, index: number) => image && (
              <motion.div 
                key={image.id} 
                className="group relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-muted"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {image.type === 'video' && image.videoUrl ? (
                  // Video item
                  <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center relative rounded-xl">
                    {image.videoThumbnail ? (
                      <div className="relative w-full h-full">
                      <Image
                        src={image.videoThumbnail}
                        alt={image.alt}
                        width={400}
                        height={400}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        {/* Always visible play button overlay for thumbnails */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-4 md:p-8">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
                        </div>
                        <p className="text-muted-foreground font-medium group-hover:text-primary transition-colors text-sm md:text-base">
                          {image.alt}
                        </p>
                        <p className="text-xs md:text-sm text-muted-foreground/70 mt-1 md:mt-2 capitalize font-semibold">
                          {image.category}
                        </p>
                      </div>
                    )}
                    {/* Mobile-friendly click overlay */}
                    <div 
                      className="absolute inset-0 bg-transparent hover:bg-amber-500/10 transition-all duration-300 flex items-center justify-center cursor-pointer rounded-xl"
                        onClick={() => {
                          if (image.videoUrl) {
                            try {
                              const newWindow = window.open(image.videoUrl, '_blank', 'noopener,noreferrer');
                              if (!newWindow) {
                                window.location.href = image.videoUrl;
                              }
                             } catch {
                              window.location.href = image.videoUrl;
                            }
                          } else {
                            alert('Video URL not available');
                          }
                        }}
                      >
                      {/* Desktop hover button */}
                      <motion.button 
                        className="hidden md:flex opacity-0 group-hover:opacity-100 bg-background text-foreground px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-4 h-4" />
                        <span className="text-sm md:text-base">Watch Video</span>
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  // Image item
                  <div className="aspect-square bg-transparent flex items-center justify-center relative overflow-hidden group rounded-xl">
                    
                    {image.src && image.src !== null && image.src !== "" ? (
                      <div 
                        className="relative w-full h-full z-10 cursor-pointer bg-transparent"
                        onClick={() => {
                          setSelectedImage({
                            src: image.src,
                            alt: image.alt,
                            category: image.category
                          });
                        }}
                      >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105 bg-transparent"
                        style={{ backgroundColor: 'transparent' }}
                        onError={(e) => {
                            // Hide the image and show placeholder instead
                          e.currentTarget.style.display = 'none';
                            // Show the fallback placeholder
                            const container = e.currentTarget.parentElement;
                            if (container) {
                              const placeholder = container.querySelector('.fallback-placeholder') as HTMLElement;
                              if (placeholder) {
                                placeholder.style.display = 'flex';
                              }
                            }
                        }}
                      />
                      
                      {/* Fallback placeholder - hidden by default */}
                      <div className="fallback-placeholder absolute inset-0 flex items-center justify-center text-center p-8 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/30 dark:via-orange-900/20 dark:to-yellow-900/30 rounded-xl" style={{ display: 'none' }}>
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                          <Camera className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-center">
                          <p className="text-primary font-medium mb-2">
                            {image.alt}
                          </p>
                          <p className="text-accent text-sm font-semibold tracking-wider uppercase">
                            {image.category}
                          </p>
                        </div>
                      </div>
                        {/* Mobile-friendly click indicator overlay */}
                        <div className="absolute inset-0 bg-transparent group-hover:bg-amber-500/10 transition-all duration-300 rounded-xl flex items-center justify-center">
                          <div className="opacity-0 md:group-hover:opacity-100 bg-background bg-opacity-90 text-foreground px-2 py-1 md:px-3 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center space-x-1 md:space-x-2">
                            <ZoomIn className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="hidden sm:inline">Click to view</span>
                            <span className="sm:hidden">View</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="text-center p-4 md:p-8 relative z-10 cursor-pointer"
                        onClick={() => {
                          // Placeholder clicked - no action needed
                        }}
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                          <Camera className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        
                        {/* Elegant decorative elements */}
                        <div className="flex justify-center space-x-1 mb-2">
                          <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                        </div>
                        
                        <p className="text-primary font-medium group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors mb-1 md:mb-2 text-sm md:text-base">
                          {image.alt}
                        </p>
                        <p className="text-accent text-xs md:text-sm font-semibold tracking-wider uppercase">
                          {image.category}
                        </p>
                        
                      </div>
                    )}
                    <div className="absolute inset-0 bg-transparent group-hover:bg-amber-500/20 transition-all duration-300 flex items-center justify-center">
                      {/* Always visible zoom icon in corner - desktop only */}
                      <div className="hidden md:block absolute top-2 right-2 md:top-3 md:right-3 bg-background bg-opacity-90 hover:bg-opacity-100 text-foreground p-1.5 md:p-2 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <ZoomIn className="w-3 h-3 md:w-4 md:h-4" />
                      </div>
                      
                      {/* Main button - hidden on mobile, shown on hover for desktop */}
                      <motion.button 
                        className="hidden md:flex opacity-0 group-hover:opacity-100 bg-background text-foreground px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (image.src && image.src !== "/gallery/placeholder.jpg") {
                            setSelectedImage({
                              src: image.src,
                              alt: image.alt,
                              category: image.category
                            });
                          }
                        }}
                      >
                        <ZoomIn className="w-4 h-4" />
                        <span className="text-sm md:text-base">View Full Size</span>
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
          )}
        </div>
      </section>

      {/* Behind the Scenes Video Section - Only show if videos are available */}
      {videoItems.length > 0 && (
        <section className="py-20 px-6 relative z-10">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="text-gradient">Behind the Scenes</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Watch our baristas in action and see what makes The Sip-In Cafe special
              </p>
            </motion.div>
            
            <div className={`grid gap-4 md:gap-8 max-w-6xl mx-auto ${
              videoItems.length === 1 ? 'grid-cols-1 justify-center' : 
              videoItems.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {videoItems.slice(0, 6).map((video, index) => {
                const videoThumbnailUrl = video.videoThumbnail && video.videoThumbnail.asset ? 
                  getHighQualityImageUrl(video.videoThumbnail, 600, 400) : null;
                
                return (
                  <motion.div
                    key={video._id}
                    className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/10 dark:from-primary/20 dark:via-primary/15 dark:to-accent/20 rounded-xl md:rounded-2xl p-4 md:p-8 aspect-video flex items-center justify-center card-modern group cursor-pointer border border-primary/20 relative overflow-hidden"
                    whileHover={{ y: -5, scale: 1.02 }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 300 }}
                    viewport={{ once: true }}
                    onClick={() => {
                      if (video.videoUrl) {
                        try {
                          const newWindow = window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
                          if (!newWindow) {
                            window.location.href = video.videoUrl;
                          }
                        } catch {
                          window.location.href = video.videoUrl;
                        }
                      }
                    }}
                  >
                    {/* Video Thumbnail Background */}
                    {videoThumbnailUrl && (
                      <div className="absolute inset-0 opacity-20">
                        <Image
                          src={videoThumbnailUrl}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="text-center relative z-10">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
                      </div>
                      <p className="text-foreground font-bold text-base md:text-lg group-hover:text-primary transition-colors">
                        {video.title}
                      </p>
                      <p className="text-sm text-muted-foreground/80 mt-1 md:mt-2 font-medium">
                        {video.description || "Watch this video"}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              <span className="text-gradient">Ready to Visit?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
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
      <Footer cafeInfo={cafeInfo} />

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Full Size Image Viewer Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
            onClick={() => {
              setSelectedImage(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-7xl max-h-[90vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedImage(null);
                }}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Arrows */}
              {filteredImages.length > 1 && (
                <>
                  {/* Previous Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToPrevious();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <ArrowRight className="w-6 h-6 rotate-180" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToNext();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {filteredImages.length > 1 && (
                <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {filteredImages.findIndex((img) => img && img.src === selectedImage.src) + 1} / {filteredImages.length}
                </div>
              )}

              {/* Image Container */}
              <div className="relative bg-background rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  priority
                />
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{selectedImage.alt}</h3>
                  <p className="text-muted-foreground text-sm capitalize">{selectedImage.category}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
