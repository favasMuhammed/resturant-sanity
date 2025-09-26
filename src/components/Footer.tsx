'use client';

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/thesipincafe",
      icon: Instagram,
      color: "hover:text-pink-500"
    },
    {
      name: "Facebook", 
      href: "https://facebook.com/thesipincafe",
      icon: Facebook,
      color: "hover:text-blue-500"
    }
  ];

  return (
    <footer className="bg-coffee-900 dark:bg-coffee-950 text-cream-100 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-coffee-800/20 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-mesh opacity-5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-display font-bold mb-6 text-gradient">The Sip-In Cafe</h3>
            <p className="text-cream-300 mb-8 text-lg leading-relaxed max-w-md text-body">
              Your perfect spot for coffee, food, and community in Leicester. 
              Where every sip tells a story and every visit creates memories.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-2xl bg-coffee-800 hover:bg-coffee-700 transition-all duration-500 ${social.color} group shadow-lg hover:shadow-xl`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="w-6 h-6" />
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
            <h4 className="text-2xl font-heading font-semibold mb-6 text-primary">Contact Info</h4>
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-3 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                <div>
                  <p className="text-neutral-300 text-body">20 Kemble Gallery</p>
                  <p className="text-neutral-300 text-body">Leicester LE1 3YT</p>
                </div>
              </motion.div>
              
              <motion.a
                href="tel:01161234567"
                className="flex items-center space-x-3 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                <span className="text-neutral-300 group-hover:text-white transition-colors duration-300 text-body">0116 123 4567</span>
              </motion.a>
              
              <motion.a
                href="mailto:hello@thesipincafe.co.uk"
                className="flex items-center space-x-3 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                <span className="text-neutral-300 group-hover:text-white transition-colors duration-300 text-body">hello@thesipincafe.co.uk</span>
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
            <h4 className="text-2xl font-heading font-semibold mb-6 text-primary">Opening Hours</h4>
            <div className="space-y-3">
              <motion.div 
                className="flex justify-between items-center py-3 border-b border-neutral-700"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-neutral-300 text-body">Monday - Friday</span>
                <span className="text-primary font-semibold">7:00 AM - 6:00 PM</span>
              </motion.div>
              
              <motion.div 
                className="flex justify-between items-center py-3 border-b border-neutral-700"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-neutral-300 text-body">Saturday</span>
                <span className="text-primary font-semibold">8:00 AM - 7:00 PM</span>
              </motion.div>
              
              <motion.div 
                className="flex justify-between items-center py-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-neutral-300 text-body">Sunday</span>
                <span className="text-primary font-semibold">8:00 AM - 7:00 PM</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-neutral-700 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-neutral-400 text-body">
            &copy; 2024 The Sip-In Cafe. All rights reserved. Made with ❤️ in Leicester.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
