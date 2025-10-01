'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import { BLOG_POSTS_QUERY } from "@/sanity/queries";

const options = { next: { revalidate: 30 } };

export default function NotFound() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts to determine if blog link should be shown
    client.fetch(BLOG_POSTS_QUERY, {}, options).then(setBlogPosts);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dark luxury background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Navigation */}
      <Navigation currentPage="" hasBlogPosts={blogPosts && blogPosts.length > 0} cafeInfo={null} />

      {/* 404 Content */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-48 md:pt-32">
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {/* 404 Number */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-9xl md:text-[12rem] font-black text-gradient leading-none">
                404
              </h1>
            </motion.div>

            {/* Error Message */}
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Oops! Page Not Found
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              The page you&apos;re looking for seems to have vanished like morning mist. 
              Let&apos;s get you back to our cozy cafe!
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/"
                  className="btn-modern inline-flex items-center space-x-2 group"
                >
                  <Home className="w-5 h-5" />
                  <span>Back to Home</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/menu"
                  className="px-8 py-4 rounded-full text-lg font-semibold border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2 group"
                >
                  <span>View Menu</span>
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
