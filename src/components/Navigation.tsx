'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage = "" }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", id: "home" },
    { href: "/menu", label: "Menu", id: "menu" },
    { href: "/#order", label: "Order", id: "order" },
    { href: "/gallery", label: "Gallery", id: "gallery" },
    { href: "/#contact", label: "Contact", id: "contact" }
  ];

  return (
                <motion.nav 
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-primary/10"
                >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
                          <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative">
                              <div className="p-3 bg-muted/80 backdrop-blur-sm rounded-xl shadow-lg border border-primary/10">
                                <Image
                                  src="/logo.png"
                                  alt="The Sip-In Cafe Logo"
                                  width={48}
                                  height={48}
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
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                              <Link 
                                href={item.href}
                                className={`relative px-5 py-2 rounded-lg transition-all duration-300 ease-out font-medium ${
                                  currentPage === item.id 
                                    ? 'text-primary bg-primary/10' 
                                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                                }`}
                              >
                                <span className="relative z-10">{item.label}</span>
                              </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile Menu Button */}
                  <div className="md:hidden flex items-center">
                          <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg bg-muted/80 backdrop-blur-sm border border-primary/20 hover:bg-muted transition-all duration-300 focus-ring"
                            aria-label="Toggle mobile menu"
                          >
                      {isMobileMenuOpen ? (
                        <X className="w-6 h-6 text-foreground" />
                      ) : (
                        <Menu className="w-6 h-6 text-foreground" />
                      )}
                    </button>
                  </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0, 
                  x: isMobileMenuOpen ? 0 : -20 
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                        <Link 
                          href={item.href}
                          className={`block px-6 py-4 rounded-2xl transition-all duration-500 font-medium ${
                            currentPage === item.id 
                              ? 'bg-primary/10 text-primary shadow-lg' 
                              : 'text-foreground hover:bg-primary/5 hover:text-primary'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
