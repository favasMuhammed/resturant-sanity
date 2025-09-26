'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Coffee, Heart, Users, Clock, MapPin, Phone, ShoppingCart, Calendar, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import { getImageUrl } from "@/sanity/imageUtils";
import type { CafeInfo, SpecialOffer, Testimonial, BlogPost, GalleryItem } from "@/sanity/api";

interface HomePageClientProps {
  cafeInfo: CafeInfo | null;
  specialOffers: SpecialOffer[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  galleryItems: GalleryItem[];
}

export default function HomePageClient({ 
  cafeInfo, 
  specialOffers,
  testimonials,
  blogPosts,
  galleryItems
}: HomePageClientProps) {
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
      <Navigation currentPage="home" />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
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
                    {cafe.logo ? (
                      <Image
                        src={getImageUrl(cafe.logo, 200, 200) || "/logo.png"}
                        alt={`${cafe.name} Logo`}
                        width={200}
                        height={200}
                        className="rounded-xl"
                      />
                    ) : (
                      <Image
                        src="/logo.png"
                        alt={`${cafe.name} Logo`}
                        width={200}
                        height={200}
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
      {specialOffers && specialOffers.length > 0 && (
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

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                      Valid until {new Date(offer.validUntil || new Date()).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modern Order & Booking Section */}
      <section id="order" className="py-20 relative pt-32">
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
      {testimonials && testimonials.length > 0 && (
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
                    {testimonial.customerPhoto && (
                      <div className="mb-6">
                        <Image
                          src={getImageUrl(testimonial.customerPhoto, 80, 80) || "/testimonials/placeholder.jpg"}
                          alt={testimonial.customerName}
                          width={80}
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
                            i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
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
      )}

      {/* Blog Posts Preview Section */}
      {blogPosts && blogPosts.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="text-gradient">Latest News & Stories</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Stay updated with our latest news, coffee tips, and behind-the-scenes stories
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {blogPosts.slice(0, 3).map((post, index) => (
                <motion.article
                  key={post._id}
                  className="bg-background rounded-2xl shadow-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-500 h-full"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                >
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getImageUrl(post.featuredImage, 400, 300) || "/blog/placeholder.jpg"}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                        {post.category}
                      </span>
                      {post.readingTime && (
                        <span className="text-sm text-muted-foreground">
                          {post.readingTime} min read
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {post.author?.photo && (
                          <Image
                            src={getImageUrl(post.author.photo, 32, 32) || "/authors/placeholder.jpg"}
                            alt={post.author.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="text-sm font-semibold text-foreground">{post.author?.name || "The Sip-In Cafe"}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="text-primary hover:text-primary/80 font-semibold flex items-center space-x-1 group"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
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
                href="/blog" 
                className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
              >
                View All Posts
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Featured Gallery Section */}
      {galleryItems && galleryItems.length > 0 && (
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
                    {item.image && (
                      <Image
                        src={getImageUrl(item.image, 300, 300) || "/gallery/placeholder.jpg"}
                        alt={item.title}
                        width={300}
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
      )}

      {/* Social Media */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Follow Us</h2>
          <p className="text-xl text-muted-foreground mb-12">Stay updated with our latest news, special offers, and behind-the-scenes content!</p>
          <div className="flex justify-center space-x-8">
            {cafe.socialMedia?.instagram && (
              <a 
                href={cafe.socialMedia.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full hover:scale-110 transition-transform"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281h-1.531v1.531h1.531v-1.531zm-5.347 1.531c.85 0 1.531.681 1.531 1.531s-.681 1.531-1.531 1.531-1.531-.681-1.531-1.531.681-1.531 1.531-1.531zm5.347 4.347c0 .85-.681 1.531-1.531 1.531s-1.531-.681-1.531-1.531.681-1.531 1.531-1.531 1.531.681 1.531 1.531z"/>
                </svg>
              </a>
            )}
            {cafe.socialMedia?.facebook && (
              <a 
                href={cafe.socialMedia.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-4 rounded-full hover:scale-110 transition-transform"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            )}
            {cafe.socialMedia?.tiktok && (
              <a 
                href={cafe.socialMedia.tiktok} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black text-white p-4 rounded-full hover:scale-110 transition-transform"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            )}
          </div>
          <p className="text-muted-foreground mt-8 text-lg">
            Stay updated with our latest news, special offers, and behind-the-scenes content!
          </p>
        </div>
      </section>

      {/* Gallery Preview */}
      <section id="gallery" className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Gallery</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take a peek at our cozy atmosphere, delicious food, and happy customers
          </p>
          <Link 
            href="/gallery" 
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
          >
            View Full Gallery
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer cafeInfo={cafeInfo} />

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}
