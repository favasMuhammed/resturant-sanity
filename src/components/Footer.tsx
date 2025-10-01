'use client';

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import type { CafeInfo } from "@/sanity/api";

interface FooterProps {
  cafeInfo?: CafeInfo | null;
}

export default function Footer({ cafeInfo }: FooterProps) {
  // Fallback data if CMS data is not available
  const defaultCafeInfo = {
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
    openingHours: [
      { day: "monday", isOpen: true, openTime: "07:00", closeTime: "18:00" },
      { day: "tuesday", isOpen: true, openTime: "07:00", closeTime: "18:00" },
      { day: "wednesday", isOpen: true, openTime: "07:00", closeTime: "18:00" },
      { day: "thursday", isOpen: true, openTime: "07:00", closeTime: "18:00" },
      { day: "friday", isOpen: true, openTime: "07:00", closeTime: "18:00" },
      { day: "saturday", isOpen: true, openTime: "08:00", closeTime: "19:00" },
      { day: "sunday", isOpen: true, openTime: "08:00", closeTime: "19:00" }
    ],
    socialMedia: {
      instagram: "https://instagram.com/thesipincafe",
      facebook: "https://facebook.com/thesipincafe",
      tiktok: "https://tiktok.com/@thesipincafe"
    }
  };

  const cafe = cafeInfo || defaultCafeInfo;

  const socialLinks = [
    {
      name: "Instagram",
      href: cafe.socialMedia?.instagram || "https://instagram.com/thesipincafe",
      icon: Instagram,
      color: "hover:text-pink-500"
    },
    {
      name: "Facebook", 
      href: cafe.socialMedia?.facebook || "https://facebook.com/thesipincafe",
      icon: Facebook,
      color: "hover:text-blue-500"
    },
    {
      name: "TikTok", 
      href: cafe.socialMedia?.tiktok || "https://tiktok.com/@thesipincafe",
      icon: () => (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      color: "hover:text-pink-500"
    }
  ];

  return (
    <footer className="bg-background text-foreground py-20 relative overflow-hidden">
      {/* Background decoration - matching main pages */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-gradient">The Sip-In Cafe</h3>
            <p className="text-muted-foreground mb-8 text-base md:text-lg leading-relaxed max-w-md text-body">
              Your perfect spot for coffee, food, and community in Leicester. 
              Where every sip tells a story and every visit creates memories.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 md:p-4 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-all duration-500 ${social.color} group shadow-lg hover:shadow-xl`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl md:text-2xl font-heading font-semibold mb-6 text-primary">Contact Info</h4>
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-3 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                <div>
                  <p className="text-muted-foreground text-sm md:text-base">{cafe.address?.street || "20 Kemble Gallery"}</p>
                  <p className="text-muted-foreground text-sm md:text-base">{cafe.address?.city || "Leicester"} {cafe.address?.postcode || "LE1 3YT"}</p>
                </div>
              </motion.div>
              
              <motion.a
                href={`tel:${cafe.contact?.phone || "01161234567"}`}
                className="flex items-center space-x-3 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300 text-sm md:text-base">{cafe.contact?.phone || "0116 123 4567"}</span>
              </motion.a>
              
              <motion.a
                href={`mailto:${cafe.contact?.email || "hello@thesipincafe.co.uk"}`}
                className="flex items-center space-x-3 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300 text-sm md:text-base">{cafe.contact?.email || "hello@thesipincafe.co.uk"}</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl md:text-2xl font-heading font-semibold mb-6 text-primary">Opening Hours</h4>
            <div className="space-y-3">
              {cafe.openingHours && cafe.openingHours.length > 0 ? (
                cafe.openingHours.map((hours, index) => (
                  <motion.div 
                    key={hours.day}
                    className={`flex justify-between items-center py-3 ${index < cafe.openingHours!.length - 1 ? 'border-b border-border' : ''}`}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-muted-foreground text-sm md:text-base capitalize">{hours.day}</span>
                    <span className="text-primary font-semibold text-sm md:text-base">
                      {hours.isOpen ? `${hours.openTime} - ${hours.closeTime}` : "Closed"}
                    </span>
                  </motion.div>
                ))
              ) : (
                <>
                  <motion.div 
                    className="flex justify-between items-center py-3 border-b border-border"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-muted-foreground text-sm md:text-base">Monday - Friday</span>
                    <span className="text-primary font-semibold text-sm md:text-base">7:00 AM - 6:00 PM</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex justify-between items-center py-3 border-b border-border"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-muted-foreground text-sm md:text-base">Saturday</span>
                    <span className="text-primary font-semibold text-sm md:text-base">8:00 AM - 7:00 PM</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex justify-between items-center py-2"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-muted-foreground text-sm md:text-base">Sunday</span>
                    <span className="text-primary font-semibold text-sm md:text-base">8:00 AM - 7:00 PM</span>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-border pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-sm md:text-base text-center">
            &copy; 2024 The Sip-In Cafe. All rights reserved. Made with ❤️ in Leicester.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
