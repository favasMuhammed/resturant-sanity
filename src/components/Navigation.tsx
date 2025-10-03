'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { getImageUrl, getMediumQualityImageUrl } from "@/sanity/imageUtils";
import ThemeToggle from "./ThemeToggle";

interface NavigationProps {
  currentPage?: string;
  hasBlogPosts?: boolean;
  cafeInfo?: {
    logo?: {
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
      };
    };
  } | null;
}

export default function Navigation({ currentPage = "", hasBlogPosts = false, cafeInfo }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", id: "home" },
    { href: "/menu", label: "Menu", id: "menu" },
    { href: "/#order", label: "Order", id: "order" },
    { href: "/gallery", label: "Gallery", id: "gallery" },
    ...(hasBlogPosts ? [{ href: "/blog", label: "Blog", id: "blog" }] : []),
    { href: "/contact", label: "Contact", id: "contact" }
  ];

  // Helper function to determine if a nav item is active
  const isActive = (item: typeof navItems[0]) => {
    if (currentPage === item.id) return true;
    if (item.href === "/" && (currentPage === "" || currentPage === "home")) return true;
    return false;
  };

  return (
                <motion.nav 
                  initial={false}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-primary/10"
                >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3 md:space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
                          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
                            {/* Mobile Logo - Simplified */}
                            <div className="md:hidden relative">
                              <div className="p-2 bg-muted/80 backdrop-blur-sm rounded-lg shadow-md border border-primary/10">
                                <Image
                                  src={cafeInfo?.logo && cafeInfo.logo.asset ? getMediumQualityImageUrl(cafeInfo.logo, 64, 64) || "/logo-new.svg" : "/logo-new.svg"}
                                  alt="The Sip-In Cafe Logo"
                                  width={32}
                                  height={32}
                                  priority
                                  className="rounded transition-all duration-300 group-hover:scale-105"
                                />
                              </div>
                            </div>
                            
                            {/* Desktop Logo */}
                            <div className="hidden md:block relative">
                              <div className="p-3 bg-muted/80 backdrop-blur-sm rounded-xl shadow-lg border border-primary/10">
                                <Image
                                  src={cafeInfo?.logo && cafeInfo.logo.asset ? getMediumQualityImageUrl(cafeInfo.logo, 96, 96) || "/logo-new.svg" : "/logo-new.svg"}
                                  alt="The Sip-In Cafe Logo"
                                  width={48}
                                  height={48}
                                  priority
                                  className="rounded-lg transition-all duration-300 group-hover:scale-105"
                                />
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-start group-hover:scale-105 transition-transform duration-300">
                              <span className="logo-name-nav">THE SIP-IN</span>
                              <span className="logo-cafe-nav">CAFE</span>
                            </div>
                          </Link>
          </motion.div>
          
                  {/* Desktop Navigation */}
                  <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                              <Link 
                                href={item.href}
                                className={`relative px-5 py-2 rounded-lg transition-all duration-300 ease-out font-medium ${
                                  isActive(item)
                                    ? 'text-primary bg-primary/10' 
                                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                                }`}
                              >
                                <span className="relative z-10">{item.label}</span>
                              </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Theme Toggle & Mobile Menu Button */}
                  <div className="flex items-center gap-2 md:gap-3">
                    {/* Desktop Theme Toggle */}
                    <div className="hidden md:block">
                      <ThemeToggle />
                    </div>
                    
                    {/* Mobile Theme Toggle - Smaller */}
                    <div className="md:hidden">
                      <ThemeToggle className="p-1.5" />
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                      <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2.5 rounded-lg bg-muted/90 backdrop-blur-sm border border-primary/30 hover:bg-muted hover:border-primary/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 z-50 relative"
                        aria-label="Toggle mobile menu"
                        type="button"
                      >
                        {isMobileMenuOpen ? (
                          <X className="w-5 h-5 text-foreground" />
                        ) : (
                          <Menu className="w-5 h-5 text-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={false}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0, 
                  x: isMobileMenuOpen ? 0 : -20 
                }}
                transition={{ 
                  delay: isMobileMenuOpen ? index * 0.1 : 0, 
                  duration: 0.3 
                }}
              >
                        <Link 
                          href={item.href}
                          className={`block px-6 py-4 rounded-2xl transition-all duration-500 font-medium ${
                            isActive(item)
                              ? 'bg-primary/10 text-primary shadow-lg' 
                              : 'text-foreground hover:bg-primary/5 hover:text-primary'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
              </motion.div>
            ))}
            
            {/* Theme Toggle in Mobile Menu - Text Version */}
            <motion.div
              initial={false}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0, 
                x: isMobileMenuOpen ? 0 : -20 
              }}
              transition={{ 
                delay: isMobileMenuOpen ? navItems.length * 0.1 : 0, 
                duration: 0.3 
              }}
              className="px-6 py-4"
            >
              <ThemeToggle variant="text" className="w-full text-left" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
