'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Coffee, Heart, Users, Clock, MapPin, Phone, ShoppingCart, Calendar, ExternalLink, Camera } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getImageUrl, getHighQualityImageUrl, getMediumQualityImageUrl } from "@/sanity/imageUtils";
import { formatDateWithFallback } from "@/utils/dateUtils";
import type { CafeInfo, SpecialOffer, Testimonial, GalleryItem } from "@/sanity/api";

interface HomePageClientProps {
  cafeInfo: CafeInfo | null;
  specialOffers: SpecialOffer[];
  testimonials: Testimonial[];
  galleryItems: GalleryItem[];
}

export default function HomePageClient({ 
  cafeInfo, 
  specialOffers,
  testimonials,
  galleryItems
}: HomePageClientProps) {
  // Show loading state if no data is available
  if (!cafeInfo && !specialOffers && !testimonials && !galleryItems) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading cafe information..." />
      </div>
    );
  }

  // Always use fallback data if CMS data is not available
  const hasSpecialOffers = specialOffers && specialOffers.length > 0;
  const hasTestimonials = testimonials && testimonials.length > 0;
  const hasGalleryItems = galleryItems && galleryItems.length > 0;

  // Fallback data if Sanity data is not available
  const defaultCafeInfo = {
    name: "The Sip-In Cafe",
    tagline: "Where every sip tells a story",
    description: "Experience the perfect blend of coffee, community, and comfort in the heart of Leicester.",
    logo: null,
    address: {
      street: "20 Kemble Gallery",
      city: "Leicester",
      postcode: "LE1 3YT",
      country: "United Kingdom"
    },
    contact: {
      phone: "0116 123 4567",
      email: "hello@thesipincafe.co.uk"
    },
    openingHours: null,
    socialMedia: {
      instagram: "https://instagram.com/thesipincafe",
      facebook: "https://facebook.com/thesipincafe",
      tiktok: "https://tiktok.com/@thesipincafe"
    },
    deliveryPlatforms: {
      uberEats: "https://www.ubereats.com",
      deliveroo: "https://deliveroo.co.uk",
      justEat: "https://www.just-eat.co.uk"
    }
  };

  const cafe = cafeInfo || defaultCafeInfo;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dark luxury background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>
      
      {/* Navigation */}
      <Navigation currentPage="home" hasBlogPosts={false} cafeInfo={cafeInfo} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-48 md:pt-32">
        <div className="container mx-auto text-center relative z-10">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Logo Section */}
            <motion.div 
              className="relative mb-12"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              <div className="relative inline-block">
                <div className="relative p-8 bg-white rounded-2xl shadow-2xl">
                  <div className="relative z-10">
                    {cafe.logo && cafe.logo.asset ? (
                      <Image
                        src={getHighQualityImageUrl(cafe.logo, 300, 300) || "/logo-new.svg"}
                        alt={`${cafe.name} Logo`}
                        width={300}
                        height={200}
                        priority
                        className="rounded-xl"
                      />
                    ) : (
                      <Image
                        src="/logo-new.svg"
                        alt={`${cafe.name} Logo`}
                        width={200}
                        height={200}
                        priority
                        className="rounded-xl"
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                {cafe.tagline || "Where every sip tells a story"}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                {cafe.description || "Experience the perfect blend of coffee, community, and comfort in the heart of Leicester."}
              </p>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                { icon: Coffee, text: "Premium Coffee", description: "Artisanal blends" },
                { icon: Heart, text: "Made with Love", description: "Handcrafted daily" },
                { icon: Users, text: "Community", description: "Gathering place" },
                { icon: Star, text: "Excellence", description: "5-star quality" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{feature.text}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modern Location & Hours */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Visit Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience our cozy atmosphere in the heart of Leicester
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Address Card */}
            <motion.div 
              className="bg-muted p-8 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Address</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {cafe.address?.street || "20 Kemble Gallery"}<br />
                  {cafe.address?.city || "Leicester"} {cafe.address?.postcode || "LE1 3YT"}
                </p>
                <motion.a
                  href={`https://maps.google.com/?q=${cafe.address?.street || "20 Kemble Gallery"}+${cafe.address?.city || "Leicester"}+${cafe.address?.postcode || "LE1 3YT"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 mt-4 text-primary hover:text-primary/80 font-semibold group"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>Get Directions</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </motion.div>

            {/* Hours Card */}
            <motion.div 
              className="bg-muted p-8 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Opening Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  {cafe.openingHours && cafe.openingHours.length > 0 ? (
                    cafe.openingHours.map((hours, index) => (
                      <p key={index} className="flex justify-between">
                        <span className="capitalize">{hours.day}</span>
                        <span className="font-semibold">
                          {hours.isOpen ? `${hours.openTime} - ${hours.closeTime}` : "Closed"}
                        </span>
                      </p>
                    ))
                  ) : (
                    <>
                      <p className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-semibold">7:00 AM - 6:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-semibold">8:00 AM - 7:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-semibold">8:00 AM - 7:00 PM</span>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div 
              className="bg-muted p-8 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Contact</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Call us for reservations or questions
                </p>
                <motion.a
                  href={`tel:${cafe.contact?.phone || "01161234567"}`}
                  className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {cafe.contact?.phone || "0116 123 4567"}
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-muted/30 p-8 rounded-2xl max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Located in the heart of Leicester, we&apos;re your perfect spot for morning coffee, 
                afternoon meetings, or evening relaxation. Our cozy atmosphere and premium coffee 
                make every visit memorable.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Special Offers Section */}
      {hasSpecialOffers ? (
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="text-gradient">Special Offers</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Don&apos;t miss out on our amazing deals and discounts
              </p>
            </motion.div>

            <div className={`grid gap-8 max-w-6xl mx-auto ${specialOffers.length === 1 ? 'grid-cols-1 justify-center' : specialOffers.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
              {specialOffers.slice(0, 3).map((offer, index) => (
                <motion.div
                  key={offer._id}
                  className="bg-muted p-8 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 h-full group"
                  whileHover={{ y: -10, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center">
                    {/* Special Offer Image */}
                    {offer.image && offer.image.asset && (
                      <div className="mb-6">
                        <Image
                          src={getHighQualityImageUrl(offer.image, 500, 350) || "/offers/placeholder.jpg"}
                          alt={offer.title}
                          width={500}
                          height={200}
                          className="w-full h-48 object-cover rounded-xl mx-auto shadow-lg"
                        />
                      </div>
                    )}
                    
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Star className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-lg font-medium">
                      {offer.description}
                    </p>
                    <p className="text-sm text-muted-foreground/80 font-semibold">
                      Valid until {formatDateWithFallback(offer.validUntil || new Date(), 'TBD')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="text-gradient">Special Offers</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Don&apos;t miss out on our amazing deals and discounts
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Happy Hour Special",
                  description: "20% off all drinks from 3-5 PM on weekdays",
                  type: "discount",
                  validUntil: "2024-12-31"
                },
                {
                  title: "Student Discount",
                  description: "15% off with valid student ID",
                  type: "student",
                  validUntil: "2024-12-31"
                },
                {
                  title: "Loyalty Rewards",
                  description: "Earn points with every purchase and redeem for free items",
                  type: "loyalty",
                  validUntil: "2024-12-31"
                }
              ].map((offer, index) => (
                <motion.div
                  key={offer.title}
                  className="bg-muted p-8 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 h-full group"
                  whileHover={{ y: -10, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Star className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-lg font-medium">
                      {offer.description}
                    </p>
                    <p className="text-sm text-muted-foreground/80 font-semibold">
                      Valid until {formatDateWithFallback(offer.validUntil, 'TBD')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modern Order & Booking Section */}
      <section id="order" className="py-16 relative pt-48 md:pt-32">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Order & Book
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get your favorite coffee and food delivered or book a table for the perfect dining experience
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Delivery Options */}
            <motion.div 
              className="bg-muted p-8 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Delivery</h3>
                <div className="space-y-4">
                  {[
                    { name: "Uber Eats", href: cafe.deliveryPlatforms?.uberEats || "https://www.ubereats.com", color: "bg-black hover:bg-gray-800" },
                    { name: "Deliveroo", href: cafe.deliveryPlatforms?.deliveroo || "https://deliveroo.co.uk", color: "bg-green-600 hover:bg-green-700" },
                    { name: "Just Eat", href: cafe.deliveryPlatforms?.justEat || "https://www.just-eat.co.uk", color: "bg-orange-500 hover:bg-orange-600" }
                  ].map((platform, index) => (
                    <motion.a
                      key={platform.name}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block ${platform.color} text-white p-4 rounded-lg text-center font-semibold transition-all duration-300 group`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <span>Order on {platform.name}</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Table Booking */}
            <motion.div 
              className="bg-muted p-8 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Table Booking</h3>
                <p className="text-muted-foreground mb-6">
                  Reserve your table for the perfect dining experience
                </p>
                <motion.button 
                  className="w-full bg-primary text-primary-foreground p-4 rounded-lg text-center font-semibold hover:bg-primary/90 transition-colors mb-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a Table
                </motion.button>
                <p className="text-sm text-muted-foreground/80">
                  Call us at <strong>{cafe.contact?.phone || "0116 123 4567"}</strong> or book online
                </p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              className="bg-muted p-8 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <motion.a
                    href={`tel:${cafe.contact?.phone || "01161234567"}`}
                    className="block bg-secondary text-secondary-foreground p-4 rounded-lg text-center font-semibold hover:bg-secondary/90 transition-colors group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Call Now</span>
                    </span>
                  </motion.a>
                  <motion.a
                    href={`https://maps.google.com/?q=${cafe.address?.street || "20 Kemble Gallery"}+${cafe.address?.city || "Leicester"}+${cafe.address?.postcode || "LE1 3YT"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-secondary text-secondary-foreground p-4 rounded-lg text-center font-semibold hover:bg-secondary/90 transition-colors group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Get Directions</span>
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {hasTestimonials ? (
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="text-gradient">What Our Customers Say</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Hear from our happy customers about their experience at The Sip-In Cafe
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.slice(0, 6).map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  className="bg-muted p-8 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 h-full"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center">
                    {/* Customer Photo */}
                    {testimonial.customerPhoto && testimonial.customerPhoto.asset && (
                      <div className="mb-6">
                        <Image
                          src={getMediumQualityImageUrl(testimonial.customerPhoto, 120, 120) || "/testimonials/placeholder.jpg"}
                          alt={testimonial.customerName}
                          width={120}
                          height={80}
                          className="w-20 h-20 rounded-full mx-auto object-cover shadow-lg"
                        />
                      </div>
                    )}
                    
                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground mb-6 italic leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    
                    <div className="border-t border-border pt-4">
                      <h4 className="font-bold text-foreground mb-1">{testimonial.customerName}</h4>
                      {testimonial.customerLocation && (
                        <p className="text-sm text-muted-foreground">{testimonial.customerLocation}</p>
                      )}
                      {testimonial.isVerified && (
                        <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Verified Customer
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="text-gradient">What Our Customers Say</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Hear from our happy customers about their experience at The Sip-In Cafe
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  customerName: "Sarah Johnson",
                  content: "The best coffee in Leicester! The atmosphere is cozy and the staff is incredibly friendly. I come here every morning before work.",
                  rating: 5,
                  customerLocation: "Leicester"
                },
                {
                  customerName: "Mike Chen",
                  content: "Amazing food and excellent service. The avocado toast is to die for! Highly recommend this place to anyone looking for quality breakfast.",
                  rating: 5,
                  customerLocation: "Leicester"
                },
                {
                  customerName: "Emma Williams",
                  content: "Perfect spot for studying or catching up with friends. The coffee is consistently great and the WiFi is reliable. Love the quiet atmosphere.",
                  rating: 5,
                  customerLocation: "Leicester"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.customerName}
                  className="bg-muted p-8 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 h-full"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground mb-6 italic leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    
                    <div className="border-t border-border pt-4">
                      <h4 className="font-bold text-foreground mb-1">{testimonial.customerName}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.customerLocation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Featured Gallery Section */}
      {hasGalleryItems ? (
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="text-gradient">Featured Moments</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A glimpse into our cafe life, delicious food, and happy moments
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {galleryItems.slice(0, 8).map((item, index) => (
                <motion.div
                  key={item._id}
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    {item.image && item.image.asset && (
                      <Image
                        src={getHighQualityImageUrl(item.image, 500, 500) || "/gallery/placeholder.jpg"}
                        alt={item.title}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                        {item.category && (
                          <p className="text-sm opacity-90 capitalize">{item.category}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/gallery" 
                className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
              >
                View Full Gallery
              </Link>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="text-gradient">Featured Moments</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A glimpse into our cafe life, delicious food, and happy moments
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[
                { title: "Artisan Coffee", category: "coffee" },
                { title: "Fresh Pastries", category: "food" },
                { title: "Cozy Interior", category: "atmosphere" },
                { title: "Latte Art", category: "coffee" },
                { title: "Breakfast Platter", category: "food" },
                { title: "Outdoor Seating", category: "atmosphere" },
                { title: "Espresso Machine", category: "coffee" },
                { title: "Happy Customers", category: "atmosphere" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-sm text-muted-foreground mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground/70 capitalize">{item.category}</p>
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                        <p className="text-sm opacity-90 capitalize">{item.category}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/gallery" 
                className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
              >
                View Full Gallery
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Social Media */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              <span className="text-gradient">Follow Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with our latest news, special offers, and behind-the-scenes content!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Instagram Card */}
          <motion.div 
              className="bg-muted p-8 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 h-full group"
              initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">Instagram</h3>
                <p className="text-muted-foreground mb-6 text-lg font-medium">
                  Follow us for daily coffee moments and behind-the-scenes content
                </p>
              <motion.a 
                  href={cafeInfo?.socialMedia?.instagram || "#"}
                target="_blank" 
                rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-semibold group"
                  whileHover={{ scale: 1.05 }}
              >
                  <span>Follow @thesipincafe</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              </div>
            </motion.div>
            {/* Facebook Card */}
            <motion.div 
              className="bg-muted p-8 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 h-full group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">Facebook</h3>
                <p className="text-muted-foreground mb-6 text-lg font-medium">
                  Connect with our community and stay updated on events
                </p>
              <motion.a 
                  href={cafeInfo?.socialMedia?.facebook || "#"}
                target="_blank" 
                rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-semibold group"
                  whileHover={{ scale: 1.05 }}
              >
                  <span>Like our page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              </div>
            </motion.div>
            {/* TikTok Card */}
            <motion.div 
              className="bg-muted p-8 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 h-full group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">TikTok</h3>
                <p className="text-muted-foreground mb-6 text-lg font-medium">
                  Watch our creative coffee content and fun moments
                </p>
                <motion.a 
                  href={cafeInfo?.socialMedia?.tiktok || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-semibold group"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>Follow us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
          </motion.div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <Footer cafeInfo={cafeInfo} />

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}
