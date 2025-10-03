import type { CafeInfo } from '@/sanity/api'

export function generateLocalBusinessSchema(cafeInfo: CafeInfo | null) {
  const baseUrl = 'https://thesipincafe.co.uk'
  
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": cafeInfo?.name || "The Sip-In Cafe",
    "description": cafeInfo?.description || "Leicester's premier coffee experience - artisanal coffee, gourmet cuisine, and warm hospitality",
    "url": baseUrl,
    "logo": cafeInfo?.logo ? `https://cdn.sanity.io/images/cw4sy9ik/production/${cafeInfo.logo.asset._ref}` : `${baseUrl}/logo-new.svg`,
    "image": `${baseUrl}/og-image.jpg`,
    "telephone": cafeInfo?.contact?.phone || "0116 123 4567",
    "email": cafeInfo?.contact?.email || "hello@thesipincafe.co.uk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": cafeInfo?.address?.street || "20 Kemble Gallery",
      "addressLocality": cafeInfo?.address?.city || "Leicester",
      "postalCode": cafeInfo?.address?.postcode || "LE1 3YT",
      "addressCountry": cafeInfo?.address?.country || "United Kingdom",
      "addressRegion": "Leicestershire"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": cafeInfo?.address?.coordinates?.lat || 52.6369,
      "longitude": cafeInfo?.address?.coordinates?.lng || -1.1398
    },
    "openingHoursSpecification": cafeInfo?.openingHours?.map(hours => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": `https://schema.org/${hours.day.charAt(0).toUpperCase() + hours.day.slice(1)}`,
      "opens": hours.isOpen ? hours.openTime : null,
      "closes": hours.isOpen ? hours.closeTime : null
    })).filter(hours => hours.opens && hours.closes) || [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "19:00"
      }
    ],
    "servesCuisine": ["Coffee", "Breakfast", "Lunch", "Pastries", "Desserts"],
    "priceRange": "££",
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
    "currenciesAccepted": "GBP",
    "hasMenu": `${baseUrl}/menu`,
    "sameAs": [
      cafeInfo?.socialMedia?.instagram,
      cafeInfo?.socialMedia?.facebook,
      cafeInfo?.socialMedia?.tiktok,
      cafeInfo?.socialMedia?.x
    ].filter(Boolean),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "WiFi",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Outdoor Seating",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Wheelchair Accessible",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Parking Available",
        "value": true
      }
    ]
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export function generateBlogPostSchema(post: {
  title: string
  description?: string
  publishedAt: string
  author?: { name: string }
  image?: string
  url: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "The Sip-In Cafe"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Sip-In Cafe",
      "logo": {
        "@type": "ImageObject",
        "url": "https://thesipincafe.co.uk/logo-new.svg"
      }
    },
    "image": post.image,
    "url": post.url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url
    }
  }
}
