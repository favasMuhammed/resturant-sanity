import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Sip-In Cafe | Leicester's Premier Coffee Experience",
  description: "Experience the perfect blend of artisanal coffee, gourmet cuisine, and warm hospitality at The Sip-In Cafe. Located in Leicester's heart at 20 Kemble Gallery, LE1 3YT. Premium coffee, fresh food, and unforgettable moments await.",
  keywords: "premium coffee, artisanal cafe, Leicester, gourmet food, specialty coffee, brunch, lunch, delivery, table booking, The Sip-In Cafe, coffee shop, breakfast, pastries, latte art, barista, organic coffee, fair trade, sustainable, local ingredients",
  authors: [{ name: "The Sip-In Cafe" }],
  creator: "The Sip-In Cafe",
  publisher: "The Sip-In Cafe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://thesipincafe.co.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "The Sip-In Cafe | Leicester's Premier Coffee Experience",
    description: "Experience the perfect blend of artisanal coffee, gourmet cuisine, and warm hospitality at The Sip-In Cafe.",
    url: 'https://thesipincafe.co.uk',
    siteName: 'The Sip-In Cafe',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Sip-In Cafe - Premium Coffee Experience',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Sip-In Cafe | Leicester's Premier Coffee Experience",
    description: "Experience the perfect blend of artisanal coffee, gourmet cuisine, and warm hospitality at The Sip-In Cafe.",
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="font-sans antialiased"
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
