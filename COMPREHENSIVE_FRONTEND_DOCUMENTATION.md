# The Sip-In Cafe - Comprehensive Frontend Documentation

## 📋 Overview

This document provides a complete, line-by-line analysis of the frontend architecture, components, and implementation details for The Sip-In Cafe website. The frontend is built using Next.js 15, TypeScript, Tailwind CSS, and integrates with Sanity CMS for content management.

## 🏗️ Architecture

### Technology Stack
- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion 12.23.22
- **Icons**: Lucide React 0.544.0
- **CMS**: Sanity CMS (next-sanity 11.3.0)
- **Image Optimization**: Next.js Image component with Sanity image URLs

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── [slug]/            # Dynamic blog post pages
│   ├── contact/           # Contact page
│   ├── gallery/           # Gallery page
│   ├── menu/              # Menu page
│   ├── favicon.ico        # Site favicon
│   ├── fonts.css          # Custom font definitions
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   ├── not-found.tsx      # 404 error page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── FloatingActionButton.tsx
│   ├── Footer.tsx
│   ├── GalleryPageClient.tsx
│   ├── HomePageClient.tsx
│   ├── LoadingSpinner.tsx
│   ├── MenuPageClient.tsx
│   ├── Navigation.tsx
│   └── ThemeToggle.tsx
└── sanity/               # Sanity CMS integration
    ├── api.ts            # API functions and types
    ├── client.ts         # Sanity client configuration
    ├── imageUtils.ts     # Image URL utilities
    └── queries.ts        # GROQ queries
```

## 🔧 Configuration Files

### Next.js Configuration (`next.config.ts`)
```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/files/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  output: 'standalone',
  compress: true,
};
```

### Tailwind Configuration (`tailwind.config.ts`)
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
        coffee: {
          50: "#fdf7f0",
          100: "#f9e6d3",
          200: "#f2cca3",
          300: "#e8a96f",
          400: "#dd8540",
          500: "#d16b1a",
          600: "#c25510",
          700: "#a1420f",
          800: "#823614",
          900: "#6b2e13",
          950: "#3a1608",
        },
        cream: {
          50: "#fefdfb",
          100: "#fdf9f3",
          200: "#faf2e6",
          300: "#f6e8d1",
          400: "#f0d9b5",
          500: "#e8c794",
          600: "#ddb06f",
          700: "#d1964a",
          800: "#c67d3e",
          900: "#b86538",
          950: "#6b2e13",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
```

## 🎨 Styling System

### Global Styles (`globals.css`)
The global styles define CSS custom properties for theming and include utility classes:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 25 95% 53%;
  --primary-foreground: 0 0% 98%;
  --secondary: 210 40% 98%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 98%;
  --accent-foreground: 222.2 84% 4.9%;
  --success: 142 76% 36%;
  --warning: 38 92% 50%;
  --error: 0 84% 60%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 25 95% 53%;
  --primary-foreground: 222.2 84% 4.9%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --success: 142 76% 36%;
  --warning: 38 92% 50%;
  --error: 0 84% 60%;
}
```

### Custom Fonts (`fonts.css`)
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

:root {
  --font-inter: 'Inter', system-ui, sans-serif;
  --font-playfair: 'Playfair Display', serif;
}
```

## 🧩 Component Analysis

### 1. HomePageClient Component (`src/components/HomePageClient.tsx`)

**Purpose**: Main homepage component that displays cafe information, special offers, testimonials, blog posts, and gallery items.

**Key Features**:
- **Hero Section**: Logo display, tagline, description, and feature highlights
- **Location & Hours**: Address, opening hours, and contact information
- **Special Offers**: Dynamic special offers from Sanity CMS
- **Order & Booking**: Delivery platform links and table booking
- **Testimonials**: Customer reviews with ratings and photos
- **Blog Posts**: Latest blog posts with featured images
- **Gallery Preview**: Featured gallery items
- **Social Media**: Instagram, Facebook, and TikTok links

**Props Interface**:
```typescript
interface HomePageClientProps {
  cafeInfo: CafeInfo | null;
  specialOffers: SpecialOffer[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  galleryItems: GalleryItem[];
}
```

**Fallback Data**: Comprehensive fallback data structure for when Sanity CMS data is unavailable.

### 2. Navigation Component (`src/components/Navigation.tsx`)

**Purpose**: Responsive navigation bar with mobile menu support.

**Key Features**:
- **Logo Display**: Cafe logo with animated hover effects
- **Desktop Navigation**: Horizontal menu items
- **Mobile Menu**: Collapsible mobile navigation
- **Active State**: Current page highlighting
- **Smooth Animations**: Framer Motion animations

**Props Interface**:
```typescript
interface NavigationProps {
  currentPage?: string;
}
```

**Navigation Items**:
- Home (`/`)
- Menu (`/menu`)
- Order (`/#order`)
- Gallery (`/gallery`)
- Contact (`/contact`)

### 3. Footer Component (`src/components/Footer.tsx`)

**Purpose**: Site footer with contact information, opening hours, and social media links.

**Key Features**:
- **Brand Section**: Cafe name and description
- **Contact Info**: Address, phone, and email
- **Opening Hours**: Dynamic hours from CMS or fallback data
- **Social Media**: Instagram, Facebook, and TikTok links
- **Responsive Design**: Mobile-friendly layout

**Props Interface**:
```typescript
interface FooterProps {
  cafeInfo?: CafeInfo | null;
}
```

### 4. MenuPageClient Component (`src/components/MenuPageClient.tsx`)

**Purpose**: Menu display page with categories, items, and special offers.

**Key Features**:
- **Category Display**: Menu categories with images and descriptions
- **Menu Items**: Individual items with prices, descriptions, and dietary information
- **Special Offers**: Featured special offers
- **Fallback Menu**: Complete fallback menu data
- **Dietary Information**: Vegetarian, vegan, gluten-free labels
- **Allergen Information**: Allergen warnings

**Props Interface**:
```typescript
interface MenuPageClientProps {
  menuCategories: MenuCategory[];
  menuItems: MenuItem[];
  specialOffers: SpecialOffer[];
  cafeInfo: CafeInfo | null;
}
```

### 5. GalleryPageClient Component (`src/components/GalleryPageClient.tsx`)

**Purpose**: Gallery page with image filtering and video support.

**Key Features**:
- **Image Filtering**: Filter by category (all, coffee, food, atmosphere)
- **Video Support**: Video items with thumbnails
- **Responsive Grid**: Masonry-style grid layout
- **Hover Effects**: Interactive hover states
- **Fallback Images**: Placeholder images when CMS data unavailable

**Props Interface**:
```typescript
interface GalleryPageClientProps {
  galleryItems: GalleryItem[];
  cafeInfo: CafeInfo | null;
}
```

### 6. FloatingActionButton Component (`src/components/FloatingActionButton.tsx`)

**Purpose**: Floating action button for quick actions.

**Key Features**:
- **Quick Actions**: Order, call, and directions
- **Animated Toggle**: Smooth open/close animation
- **Tooltip Support**: Hover tooltips for actions
- **Responsive Design**: Mobile-friendly positioning

**Actions**:
- Order Now (`#order`)
- Call Us (`tel:01161234567`)
- Directions (Google Maps link)

### 7. LoadingSpinner Component (`src/components/LoadingSpinner.tsx`)

**Purpose**: Reusable loading spinner component.

**Key Features**:
- **Size Variants**: Small, medium, and large sizes
- **Custom Text**: Optional loading text
- **Smooth Animation**: Rotating animation

**Props Interface**:
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}
```

### 8. ThemeToggle Component (`src/components/ThemeToggle.tsx`)

**Purpose**: Dark/light theme toggle component.

**Key Features**:
- **System Preference**: Respects system dark mode preference
- **Local Storage**: Persists theme choice
- **Smooth Transitions**: Animated icon transitions
- **Accessibility**: Proper ARIA labels

## 📄 Page Components

### 1. Home Page (`src/app/page.tsx`)

**Purpose**: Server-side rendered homepage that fetches data from Sanity CMS.

**Data Fetching**:
```typescript
const [cafeInfo, specialOffers, testimonials, blogPosts, galleryItems] = await Promise.all([
  getCafeInfo(),
  getActiveSpecialOffers(),
  getFeaturedTestimonials(),
  getFeaturedBlogPosts(),
  getFeaturedGalleryItems()
]);
```

### 2. Menu Page (`src/app/menu/page.tsx`)

**Purpose**: Menu page that fetches menu data from Sanity CMS.

**Data Fetching**:
```typescript
const [menuCategories, menuItems, specialOffers, cafeInfo] = await Promise.all([
  getMenuCategories(),
  getMenuItems(),
  getActiveSpecialOffers(),
  getCafeInfo()
]);
```

### 3. Gallery Page (`src/app/gallery/page.tsx`)

**Purpose**: Gallery page that fetches gallery data from Sanity CMS.

**Data Fetching**:
```typescript
const [galleryItems, cafeInfo] = await Promise.all([
  getGalleryItems(),
  getCafeInfo()
]);
```

### 4. Contact Page (`src/app/contact/page.tsx`)

**Purpose**: Contact page with form and contact information.

**Key Features**:
- **Contact Form**: Name, email, subject, and message fields
- **Contact Information**: Address, phone, email, and hours
- **Responsive Layout**: Two-column layout on desktop

### 5. Dynamic Blog Post Page (`src/app/[slug]/page.tsx`)

**Purpose**: Dynamic route for individual blog posts.

**Key Features**:
- **Portable Text**: Rich text content rendering
- **Image Support**: Featured image display
- **Metadata**: Publication date and author information
- **Error Handling**: 404 handling for missing posts

### 6. 404 Not Found Page (`src/app/not-found.tsx`)

**Purpose**: Custom 404 error page.

**Key Features**:
- **Animated 404**: Large animated 404 number
- **Navigation Links**: Back to home and menu
- **Responsive Design**: Mobile-friendly layout

## 🔌 Sanity CMS Integration

### Client Configuration (`src/sanity/client.ts`)

```typescript
export const client = createClient({
  projectId: "cw4sy9ik",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
```

### API Functions (`src/sanity/api.ts`)

**Comprehensive API functions for all content types**:

- `getCafeInfo()`: Cafe information
- `getMenuCategories()`: Menu categories
- `getMenuItems()`: Menu items
- `getGalleryItems()`: Gallery items
- `getSpecialOffers()`: Special offers
- `getTestimonials()`: Customer testimonials
- `getBlogPosts()`: Blog posts

**Error Handling**: All functions include try-catch blocks with console error logging and fallback to empty arrays or null.

### Image Utilities (`src/sanity/imageUtils.ts`)

**Image URL generation with validation**:

```typescript
export const getImageUrl = (source: SanityImageSource, width?: number, height?: number) => {
  // Validation checks
  if (!source || typeof source !== 'object') return null;
  if (!('_type' in source) || source._type !== 'image' || !('asset' in source) || !source.asset) return null;
  
  const builder = urlFor(source);
  if (!builder) return null;
  
  try {
    let imageBuilder = builder;
    if (width) imageBuilder = imageBuilder.width(width);
    if (height) imageBuilder = imageBuilder.height(height);
    return imageBuilder.url();
  } catch (error) {
    console.warn('Error generating image URL:', error);
    return null;
  }
};
```

### GROQ Queries (`src/sanity/queries.ts`)

**Comprehensive query library**:

- **Cafe Info**: Complete cafe information query
- **Menu Queries**: Categories, items, and category-specific items
- **Gallery Queries**: All items, by category, and featured items
- **Special Offers**: All offers, active offers, and featured offers
- **Testimonials**: All testimonials, featured, and by rating
- **Blog Posts**: All posts, featured, by category, and by slug

## 🎯 Key Features

### 1. Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: sm, md, lg, xl responsive breakpoints
- **Flexible Grids**: CSS Grid and Flexbox layouts
- **Touch-Friendly**: Appropriate touch targets

### 2. Performance Optimization
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Code Splitting**: Automatic code splitting by Next.js
- **Lazy Loading**: Images and components loaded on demand
- **Caching**: Sanity CDN and Next.js caching

### 3. Accessibility
- **Semantic HTML**: Proper HTML structure
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus states

### 4. SEO Optimization
- **Meta Tags**: Dynamic meta tags
- **Structured Data**: Rich snippets support
- **Sitemap**: Automatic sitemap generation
- **Open Graph**: Social media sharing

### 5. Animation & Interactions
- **Framer Motion**: Smooth animations
- **Hover Effects**: Interactive hover states
- **Loading States**: Loading spinners and skeletons
- **Transitions**: Smooth page transitions

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Sanity CLI

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🚀 Deployment

### Vercel (Recommended)
- Automatic deployments from Git
- Edge functions support
- Global CDN
- Environment variables

### Other Platforms
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔍 Code Quality

### TypeScript
- **Strict Mode**: Enabled for type safety
- **Interface Definitions**: Comprehensive type definitions
- **Generic Types**: Reusable type definitions

### ESLint
- **Next.js Rules**: Optimized for Next.js
- **TypeScript Rules**: TypeScript-specific rules
- **Accessibility Rules**: A11y best practices

### Code Organization
- **Component Structure**: Logical component organization
- **File Naming**: Consistent naming conventions
- **Import/Export**: Clean import/export structure

## 📊 Performance Metrics

### Core Web Vitals
- **LCP**: Optimized for < 2.5s
- **FID**: Optimized for < 100ms
- **CLS**: Optimized for < 0.1

### Bundle Size
- **JavaScript**: Optimized bundle size
- **CSS**: Tailwind CSS purging
- **Images**: WebP/AVIF optimization

## 🛠️ Maintenance

### Regular Updates
- **Dependencies**: Regular dependency updates
- **Security**: Security patch updates
- **Performance**: Performance optimizations

### Monitoring
- **Error Tracking**: Error monitoring
- **Performance**: Performance monitoring
- **Analytics**: User analytics

## 📝 Conclusion

The Sip-In Cafe frontend is a modern, responsive, and performant web application built with industry best practices. It features a comprehensive component library, robust Sanity CMS integration, and excellent user experience across all devices. The codebase is well-structured, type-safe, and maintainable, making it easy for developers to extend and modify.

The application successfully balances functionality with performance, providing a smooth user experience while maintaining clean, readable code. The extensive use of TypeScript ensures type safety, while the modular component structure promotes code reusability and maintainability.
