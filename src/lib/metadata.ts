import type { Metadata } from "next";
import type { CafeInfo } from "@/sanity/api";
import { getImageUrl } from "@/sanity/imageUtils";

export function generateMetadata(cafeInfo: CafeInfo | null, pageTitle?: string): Metadata {
  const defaultTitle = "The Sip-In Cafe | Leicester's Premier Coffee Experience";
  const defaultDescription = "Experience the perfect blend of artisanal coffee, gourmet cuisine, and warm hospitality at The Sip-In Cafe. Located in Leicester's heart at 20 Kemble Gallery, LE1 3YT.";
  const defaultKeywords = "premium coffee, artisanal cafe, Leicester, gourmet food, specialty coffee, brunch, lunch, delivery, table booking, The Sip-In Cafe, coffee shop, breakfast, pastries, latte art, barista, organic coffee, fair trade, sustainable, local ingredients";

  const title = pageTitle 
    ? `${pageTitle} | ${cafeInfo?.seo?.metaTitle || cafeInfo?.name || "The Sip-In Cafe"}`
    : cafeInfo?.seo?.metaTitle || defaultTitle;
  
  const description = cafeInfo?.seo?.metaDescription || defaultDescription;
  const keywords = cafeInfo?.seo?.keywords?.join(", ") || defaultKeywords;

  // Generate Open Graph image URL - use existing logo
  const ogImageUrl = cafeInfo?.seo?.ogImage 
    ? getImageUrl(cafeInfo.seo.ogImage, 1200, 630)
    : cafeInfo?.logo 
    ? getImageUrl(cafeInfo.logo, 1200, 630)
    : "/logo-new.svg";

  // Generate X (formerly Twitter) image URL - use existing logo
  const xImageUrl = cafeInfo?.seo?.xImage 
    ? getImageUrl(cafeInfo.seo.xImage, 1200, 600)
    : cafeInfo?.logo 
    ? getImageUrl(cafeInfo.logo, 1200, 600)
    : "/logo-new.svg";

  return {
    title,
    description,
    keywords,
    authors: [{ name: cafeInfo?.name || "The Sip-In Cafe" }],
    creator: cafeInfo?.name || "The Sip-In Cafe",
    publisher: cafeInfo?.name || "The Sip-In Cafe",
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
      title: cafeInfo?.seo?.ogTitle || title,
      description: cafeInfo?.seo?.ogDescription || description,
      url: 'https://thesipincafe.co.uk',
      siteName: cafeInfo?.name || 'The Sip-In Cafe',
      images: [
        {
          url: ogImageUrl || "/logo-new.svg",
          width: 1200,
          height: 630,
          alt: `${cafeInfo?.name || "The Sip-In Cafe"} - Premium Coffee Experience`,
        },
      ],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: cafeInfo?.seo?.xTitle || title,
      description: cafeInfo?.seo?.xDescription || description,
      images: [xImageUrl || "/logo-new.svg"],
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
    icons: {
      icon: [
        {
          url: cafeInfo?.favicon 
            ? getImageUrl(cafeInfo.favicon, 32, 32) || "/favicon.svg"
            : "/favicon.svg",
          sizes: "32x32",
          type: "image/svg+xml",
        },
        {
          url: cafeInfo?.favicon 
            ? getImageUrl(cafeInfo.favicon, 16, 16) || "/favicon-16x16.png"
            : "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: cafeInfo?.appleTouchIcon 
            ? getImageUrl(cafeInfo.appleTouchIcon, 180, 180) || "/apple-touch-icon.png"
            : "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      other: [
        {
          rel: "mask-icon",
          url: "/safari-pinned-tab.svg",
          color: "#3F1F01",
        },
      ],
    },
    manifest: "/site.webmanifest",
  };
}
