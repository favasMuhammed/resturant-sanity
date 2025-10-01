# The Sip-In Cafe - Frontend Documentation

## 📋 Overview

This document provides a comprehensive overview of the frontend architecture, components, and implementation details for The Sip-In Cafe website. The frontend is built using Next.js 15, TypeScript, Tailwind CSS, and integrates with Sanity CMS for content management.

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
│   ├── globals.css        # Global styles and CSS variables
│   ├── fonts.css          # Custom font definitions
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── not-found.tsx      # 404 error page
├── components/            # Reusable React components
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

## 🎨 Design System

### Color Palette
The design uses a dark luxury coffee theme with carefully crafted color variables:

#### Primary Colors
- **Background**: `#2c1810` (Dark brown)
- **Foreground**: `#f5f5dc` (Cream text)
- **Primary**: `#ff6b35` (Orange accent)
- **Secondary**: `#8b4513` (Saddle brown)
- **Accent**: `#daa520` (Golden rod)

#### Extended Palette
- **Coffee Colors**: 50-950 scale from `#fefdfb` to `#0d0704`
- **Cream Colors**: Harmonized with logo specifications
- **Semantic Colors**: Success, warning, error variants

### Typography
- **Sans**: Inter (primary font)
- **Serif**: Playfair Display (headings)
- **Mono**: JetBrains Mono (code)
- **Display**: Outfit (display text)
- **Logo**: Space Mono, IBM Plex Mono, JetBrains Mono (brand text)

### Spacing & Layout
- **Container**: Max-width with responsive padding
- **Grid System**: CSS Grid and Flexbox
- **Breakpoints**: Mobile (320px), Tablet (768px), Laptop (1024px), Desktop (1280px+)
- **Spacing Scale**: Extended Tailwind spacing with custom values

## 🧩 Component Architecture

### Core Components

#### 1. Navigation (`Navigation.tsx`)
- **Purpose**: Main site navigation with mobile menu
- **Features**:
  - Responsive design with mobile hamburger menu
  - Logo with brand text
  - Active page highlighting
  - Smooth animations with Framer Motion
- **Props**: `currentPage` (string) - identifies active page

#### 2. HomePageClient (`HomePageClient.tsx`)
- **Purpose**: Main homepage component with all sections
- **Features**:
  - Hero section with logo and tagline
  - Visit Us section (address, hours, contact)
  - Order & Book section (delivery, table booking)
  - Special offers display
  - Testimonials carousel
  - Blog posts preview
  - Gallery preview
  - Social media links
- **Props**: CMS data objects (cafeInfo, specialOffers, testimonials, etc.)

#### 3. MenuPageClient (`MenuPageClient.tsx`)
- **Purpose**: Menu display with categories and items
- **Features**:
  - Dynamic menu categories from CMS
  - Menu items with pricing and descriptions
  - Dietary information badges
  - Special offers section
  - Fallback data if CMS unavailable
- **Props**: Menu data arrays and cafe info

#### 4. GalleryPageClient (`GalleryPageClient.tsx`)
- **Purpose**: Photo and video gallery with filtering
- **Features**:
  - Category-based filtering (coffee, food, atmosphere)
  - Image and video support
  - Hover effects and overlays
  - Responsive grid layout
  - Fallback placeholder content
- **Props**: Gallery items array and cafe info

#### 5. Footer (`Footer.tsx`)
- **Purpose**: Site footer with contact information
- **Features**:
  - Contact details (address, phone, email)
  - Opening hours display
  - Social media links
  - Brand information
  - Responsive layout
- **Props**: Optional cafe info object

#### 6. FloatingActionButton (`FloatingActionButton.tsx`)
- **Purpose**: Quick action buttons for mobile users
- **Features**:
  - Expandable action menu
  - Order, call, and directions buttons
  - Smooth animations
  - Mobile-optimized positioning

#### 7. LoadingSpinner (`LoadingSpinner.tsx`)
- **Purpose**: Loading state indicator
- **Features**:
  - Multiple size options (sm, md, lg)
  - Customizable text
  - Smooth rotation animation

#### 8. ThemeToggle (`ThemeToggle.tsx`)
- **Purpose**: Dark/light theme switcher
- **Features**:
  - System preference detection
  - Local storage persistence
  - Smooth icon transitions
  - CSS class management

### Page Components

#### 1. Homepage (`page.tsx`)
- **Purpose**: Server-side data fetching for homepage
- **Data Sources**: Cafe info, special offers, testimonials, blog posts, gallery items
- **Rendering**: Server component that passes data to HomePageClient

#### 2. Menu Page (`menu/page.tsx`)
- **Purpose**: Server-side data fetching for menu
- **Data Sources**: Menu categories, menu items, special offers, cafe info
- **Rendering**: Server component that passes data to MenuPageClient

#### 3. Gallery Page (`gallery/page.tsx`)
- **Purpose**: Server-side data fetching for gallery
- **Data Sources**: Gallery items, cafe info
- **Rendering**: Server component that passes data to GalleryPageClient

#### 4. Contact Page (`contact/page.tsx`)
- **Purpose**: Contact information and form
- **Features**:
  - Contact details display
  - Contact form (non-functional)
  - Opening hours
  - Responsive layout

#### 5. Dynamic Blog Posts (`[slug]/page.tsx`)
- **Purpose**: Individual blog post pages
- **Features**:
  - Sanity CMS integration
  - PortableText rendering
  - Image optimization
  - SEO metadata

#### 6. 404 Page (`not-found.tsx`)
- **Purpose**: Custom 404 error page
- **Features**:
  - Animated 404 display
  - Navigation back to home
  - Brand-consistent styling

## 🔌 Sanity CMS Integration

### Client Configuration (`sanity/client.ts`)
```typescript
export const client = createClient({
  projectId: "cw4sy9ik",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
```

### Data Types (`sanity/api.ts`)
Comprehensive TypeScript interfaces for all CMS content:
- `CafeInfo`: Business information, contact details, hours
- `MenuCategory`: Menu categories with metadata
- `MenuItem`: Individual menu items with pricing and dietary info
- `GalleryItem`: Images and videos with categorization
- `SpecialOffer`: Promotional offers and discounts
- `Testimonial`: Customer reviews and ratings
- `BlogPost`: Blog content with SEO metadata

### API Functions
- **Cafe Data**: `getCafeInfo()`
- **Menu Data**: `getMenuCategories()`, `getMenuItems()`, `getMenuItemsByCategory()`
- **Gallery Data**: `getGalleryItems()`, `getGalleryItemsByCategory()`, `getFeaturedGalleryItems()`
- **Offers**: `getSpecialOffers()`, `getActiveSpecialOffers()`, `getFeaturedSpecialOffers()`
- **Testimonials**: `getTestimonials()`, `getFeaturedTestimonials()`, `getTestimonialsByRating()`
- **Blog**: `getBlogPosts()`, `getFeaturedBlogPosts()`, `getBlogPostBySlug()`

### Image Utilities (`sanity/imageUtils.ts`)
- **URL Generation**: `getImageUrl()` with width/height parameters
- **Error Handling**: Graceful fallbacks for missing images
- **Type Safety**: Proper TypeScript interfaces for image sources

### GROQ Queries (`sanity/queries.ts`)
Optimized queries for all content types with:
- Proper filtering (active, published, featured)
- Sorting (order, date, rating)
- Field selection for performance
- Parameter support for dynamic queries

## 🎭 Animation System

### Framer Motion Integration
All components use Framer Motion for smooth animations:

#### Page Transitions
- **Initial Load**: Fade in with scale effects
- **Scroll Animations**: `whileInView` for scroll-triggered animations
- **Hover Effects**: Scale, translate, and color transitions

#### Animation Patterns
```typescript
// Initial page load
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: "easeOut" }}

// Scroll-triggered
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
viewport={{ once: true }}

// Hover effects
whileHover={{ scale: 1.05, y: -5 }}
whileTap={{ scale: 0.95 }}
```

#### Custom CSS Animations
- **Float**: Gentle floating motion for decorative elements
- **Pulse Glow**: Glowing effect for interactive elements
- **Coffee Steam**: Steam animation for coffee-themed elements
- **Bean Float**: Coffee bean floating animation

## 📱 Responsive Design

### Breakpoint System
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Laptop**: 1024px - 1279px
- **Desktop**: 1280px+

### Mobile-First Approach
- Base styles for mobile devices
- Progressive enhancement for larger screens
- Touch-friendly interface elements
- Optimized image sizes and loading

### Responsive Components
- **Navigation**: Collapsible mobile menu
- **Grid Layouts**: Responsive grid columns
- **Typography**: Scalable font sizes
- **Spacing**: Adaptive padding and margins

## 🎨 Styling System

### CSS Variables
Comprehensive CSS custom properties for theming:
```css
:root {
  --background: #2c1810;
  --foreground: #f5f5dc;
  --primary: #ff6b35;
  --secondary: #8b4513;
  --accent: #daa520;
  /* ... more variables */
}
```

### Tailwind Configuration
Extended Tailwind with custom:
- **Colors**: Coffee-themed color palette
- **Fonts**: Multiple font families
- **Spacing**: Extended spacing scale
- **Animations**: Custom keyframes and transitions
- **Shadows**: Coffee-themed shadow effects

### Utility Classes
Custom utility classes for common patterns:
- `.btn-modern`: Modern button styling
- `.card-modern`: Card component styling
- `.text-gradient`: Gradient text effects
- `.glass`: Glassmorphism effects
- `.focus-ring`: Accessible focus states

## 🔧 Performance Optimizations

### Image Optimization
- **Next.js Image**: Automatic optimization and lazy loading
- **Sanity Images**: Dynamic sizing and quality adjustment
- **Fallbacks**: Graceful handling of missing images
- **WebP Support**: Modern format with fallbacks

### Code Splitting
- **Dynamic Imports**: Lazy loading of heavy components
- **Route-based Splitting**: Automatic code splitting by page
- **Component Splitting**: Individual component bundles

### Caching Strategy
- **Static Generation**: Pre-built pages where possible
- **ISR**: Incremental Static Regeneration for dynamic content
- **API Caching**: 60-second revalidation for CMS data
- **Browser Caching**: Optimized cache headers

## ♿ Accessibility Features

### Semantic HTML
- Proper heading hierarchy (h1-h6)
- Semantic landmarks (nav, main, section, article)
- Form labels and associations
- ARIA attributes where needed

### Keyboard Navigation
- Tab order management
- Focus indicators
- Keyboard shortcuts
- Skip links

### Screen Reader Support
- Alt text for images
- Descriptive link text
- Form validation messages
- Live regions for dynamic content

### Color Contrast
- WCAG AA compliant color combinations
- High contrast mode support
- Color-blind friendly palette

## 🚀 SEO Implementation

### Metadata Management
- **Dynamic Titles**: Page-specific titles
- **Meta Descriptions**: Compelling descriptions
- **Open Graph**: Social media sharing
- **Twitter Cards**: Twitter-specific metadata
- **Structured Data**: JSON-LD for search engines

### Performance SEO
- **Core Web Vitals**: Optimized loading and interaction
- **Lighthouse Scores**: High performance ratings
- **Mobile-First**: Mobile-optimized experience

### Content SEO
- **Semantic Markup**: Proper HTML structure
- **Heading Hierarchy**: Logical content organization
- **Internal Linking**: Strategic page connections
- **Image Alt Text**: Descriptive image descriptions

## 🔄 State Management

### Client-Side State
- **React Hooks**: useState, useEffect for local state
- **URL State**: Query parameters for filters
- **Local Storage**: Theme preferences and user settings

### Server-Side State
- **Server Components**: Data fetching at build/request time
- **Caching**: Optimized data retrieval
- **Error Handling**: Graceful fallbacks for failed requests

## 🧪 Error Handling

### Component-Level Errors
- **Fallback Data**: Default content when CMS fails
- **Error Boundaries**: React error boundaries for crashes
- **Loading States**: User feedback during data fetching

### API Error Handling
- **Try-Catch Blocks**: Comprehensive error catching
- **Console Logging**: Detailed error information
- **Graceful Degradation**: Fallback to static content

## 📊 Performance Monitoring

### Metrics Tracked
- **Core Web Vitals**: LCP, FID, CLS
- **Bundle Size**: JavaScript and CSS sizes
- **Image Optimization**: Loading performance
- **API Response Times**: CMS query performance

### Optimization Strategies
- **Code Splitting**: Reduce initial bundle size
- **Image Optimization**: WebP format and sizing
- **Caching**: Multiple levels of caching
- **CDN**: Global content delivery

## 🔧 Development Workflow

### Build Process
```bash
# Development
npm run dev

# Production Build
npm run build

# Start Production
npm start

# Linting
npm run lint
```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks

### Testing Strategy
- **Component Testing**: Individual component tests
- **Integration Testing**: Page-level testing
- **E2E Testing**: Full user journey testing
- **Performance Testing**: Load and speed testing

## 🚀 Deployment

### Build Configuration
- **Next.js Config**: Optimized for production
- **Environment Variables**: Secure configuration
- **Static Export**: Optional static generation
- **Image Domains**: Sanity image optimization

### Hosting Options
- **Vercel**: Recommended (Next.js optimized)
- **Netlify**: Alternative static hosting
- **Railway**: Full-stack deployment
- **Self-Hosted**: VPS or dedicated server

## 📈 Future Enhancements

### Planned Features
- **PWA Support**: Progressive Web App capabilities
- **Offline Support**: Service worker implementation
- **Real-time Updates**: WebSocket integration
- **Advanced Analytics**: User behavior tracking

### Performance Improvements
- **Edge Functions**: Serverless functions
- **Image CDN**: Advanced image optimization
- **Caching Strategy**: Enhanced caching layers
- **Bundle Optimization**: Further code splitting

## 🛠️ Maintenance

### Regular Updates
- **Dependencies**: Keep packages updated
- **Security Patches**: Regular security updates
- **Performance Monitoring**: Continuous optimization
- **Content Updates**: CMS content management

### Monitoring
- **Error Tracking**: Real-time error monitoring
- **Performance Metrics**: Continuous performance tracking
- **User Analytics**: Usage pattern analysis
- **Uptime Monitoring**: Service availability tracking

---

## 📝 Conclusion

The Sip-In Cafe frontend is a modern, performant, and accessible web application built with industry best practices. The architecture supports scalability, maintainability, and excellent user experience across all devices. The integration with Sanity CMS provides flexible content management while maintaining high performance and SEO optimization.

The codebase follows React and Next.js best practices with comprehensive TypeScript typing, responsive design principles, and accessibility standards. The component architecture promotes reusability and maintainability, while the animation system provides engaging user interactions.

For technical support or questions about the frontend implementation, refer to the individual component documentation or contact the development team.
