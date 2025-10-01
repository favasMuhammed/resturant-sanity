
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getCafeInfo, getBlogPosts } from "@/sanity/api";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cafeInfo = await getCafeInfo();
  return generatePageMetadata(cafeInfo, "Contact");
}

export default async function ContactPage() {
  // Fetch cafe info and blog posts from Sanity
  const [cafeInfo, blogPosts] = await Promise.all([
    getCafeInfo(),
    getBlogPosts()
  ]);
  
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
    ]
  };

  const cafe = cafeInfo || defaultCafeInfo;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dark luxury background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>
      
      {/* Navigation */}
      <Navigation currentPage="contact" hasBlogPosts={blogPosts && blogPosts.length > 0} cafeInfo={cafeInfo} />

      {/* Hero Section */}
      <section className="relative py-20 px-6 pt-48 md:pt-32">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gradient">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We&apos;d love to hear from you. Get in touch with us for reservations, 
              questions, or just to say hello!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="card-modern p-8">
                <h2 className="text-3xl font-heading font-bold mb-8 text-primary">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        {cafe.address?.street || "20 Kemble Gallery"}<br />
                        {cafe.address?.city || "Leicester"} {cafe.address?.postcode || "LE1 3YT"}<br />
                        {cafe.address?.country || "United Kingdom"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Phone</h3>
                      <p className="text-muted-foreground">
                        <a href={`tel:${cafe.contact?.phone || "01161234567"}`} className="hover:text-primary transition-colors">
                          {cafe.contact?.phone || "0116 123 4567"}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-muted-foreground">
                        <a href={`mailto:${cafe.contact?.email || "hello@thesipincafe.co.uk"}`} className="hover:text-primary transition-colors">
                          {cafe.contact?.email || "hello@thesipincafe.co.uk"}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Opening Hours</h3>
                      <div className="text-muted-foreground space-y-1">
                        {cafe.openingHours && cafe.openingHours.length > 0 ? (
                          cafe.openingHours.map((hours: { day: string; isOpen: boolean; openTime: string; closeTime: string }) => (
                            <p key={hours.day}>
                              <span className="capitalize">{hours.day}</span>: {hours.isOpen ? `${hours.openTime} - ${hours.closeTime}` : "Closed"}
                            </p>
                          ))
                        ) : (
                          <>
                            <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                            <p>Saturday: 8:00 AM - 7:00 PM</p>
                            <p>Sunday: 8:00 AM - 7:00 PM</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="card-modern p-8">
                <h2 className="text-3xl font-heading font-bold mb-8 text-primary">Send us a Message</h2>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-muted-foreground/60"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-muted-foreground/60"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-muted-foreground/60"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-muted-foreground/60"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/60"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-modern text-center"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      <Footer cafeInfo={cafeInfo} />
      <FloatingActionButton />
    </div>
  );
}
