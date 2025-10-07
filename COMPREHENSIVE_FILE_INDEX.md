# The Sip-In Cafe - Comprehensive File Index

## 📋 Overview

This document provides a complete index of all files in the `nextjs-the-sip-in-cafe` directory, including their purpose, key features, and technical details.

## 🏗️ Project Structure

```
nextjs-the-sip-in-cafe/
├── src/                          # Source code directory
│   ├── app/                      # Next.js App Router pages
│   ├── components/               # React components
│   ├── contexts/                 # React contexts
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utility libraries
│   ├── sanity/                   # Sanity CMS integration
│   └── utils/                    # Utility functions
├── public/                       # Static assets
├── scripts/                      # Automation scripts
├── studio-the-sip-in-cafe/       # Sanity Studio backend
└── [config files]                # Configuration files
```

## 📁 Configuration Files

### 1. `package.json`
**Purpose**: Project metadata and dependencies
**Key Features**:
- Next.js 15.5.4 with React 19.1.0
- TypeScript 5 support
- Tailwind CSS 4 integration
- Sanity CMS integration
- Framer Motion animations
- Lucide React icons

**Scripts**:
- `dev`: Development server
- `build`: Production build
- `start`: Production server
- `lint`: ESLint checking

### 2. `next.config.ts`
**Purpose**: Next.js configuration
**Key Features**:
- Static export enabled (`output: 'export'`)
- Image optimization disabled for static export
- Sanity image domains configured
- React 19 compatibility
- Webpack fallbacks for Node.js modules

### 3. `tsconfig.json`
**Purpose**: TypeScript configuration
**Key Features**:
- ES2017 target
- ESNext modules
- Bundler module resolution
- Path aliases (`@/*` → `./src/*`)

### 4. `tailwind.config.ts`
**Purpose**: Tailwind CSS configuration
**Key Features**:
- Dark mode with class strategy
- Custom color palette (coffee-themed)
- Premium typography system
- Advanced spacing and border-radius
- Custom animations and keyframes
- Backdrop blur and gradient utilities
- Extended screen breakpoints
- Custom z-index values

### 5. `eslint.config.mjs`
**Purpose**: ESLint configuration
**Key Features**:
- Next.js optimized rules
- TypeScript support
- Accessibility rules

### 6. `postcss.config.mjs`
**Purpose**: PostCSS configuration
**Key Features**:
- Tailwind CSS integration
- Autoprefixer support

## 📄 Source Code Files

### App Router Pages (`src/app/`)

#### 1. `layout.tsx`
**Purpose**: Root layout component
**Key Features**:
- Global CSS imports
- Metadata generation
- Structured data (LocalBusinessSchema)
- Google Analytics integration
- Theme wrapper

#### 2. `page.tsx`
**Purpose**: Homepage
**Key Features**:
- Server-side data fetching
- Cafe info, special offers, testimonials, blog posts, gallery items
- HomePageClient component rendering
- SEO metadata generation

#### 3. `menu/page.tsx`
**Purpose**: Menu page
**Key Features**:
- Menu categories and items fetching
- Special offers integration
- MenuPageClient component rendering

#### 4. `gallery/page.tsx`
**Purpose**: Gallery page
**Key Features**:
- Gallery items fetching
- GalleryPageClient component rendering

#### 5. `contact/page.tsx`
**Purpose**: Contact page
**Key Features**:
- Contact information display
- Contact form
- Cafe info integration

#### 6. `blog/page.tsx`
**Purpose**: Blog listing page
**Key Features**:
- Blog posts fetching
- Grid layout for posts
- Featured image support
- Author and category information

#### 7. `blog/[slug]/page.tsx`
**Purpose**: Dynamic blog post page
**Key Features**:
- Individual blog post fetching
- PortableText rendering
- 404 handling
- Metadata generation

#### 8. `[slug]/page.tsx`
**Purpose**: Dynamic route handler
**Key Features**:
- Legacy blog post support
- Fallback handling

#### 9. `not-found.tsx`
**Purpose**: 404 error page
**Key Features**:
- Animated 404 display
- Navigation links
- Responsive design

#### 10. `sitemap.ts`
**Purpose**: Sitemap generation
**Key Features**:
- Static pages inclusion
- Dynamic blog post pages
- SEO optimization

#### 11. `globals.css`
**Purpose**: Global styles
**Key Features**:
- Google Fonts imports
- Custom font definitions
- CSS variables for theming
- Modern scrollbar styles
- Glassmorphism utilities
- Coffee-themed animations

#### 12. `fonts.css`
**Purpose**: Custom font definitions
**Key Features**:
- Prachason Neue Mono font
- Multiple font weights
- Fallback font families

### Components (`src/components/`)

#### 1. `HomePageClient.tsx`
**Purpose**: Homepage client component
**Key Features**:
- Hero section with logo and tagline
- Location & hours display
- Special offers showcase
- Order & booking section
- Testimonials carousel
- Blog posts preview
- Gallery preview
- Social media links
- Comprehensive fallback data

#### 2. `Navigation.tsx`
**Purpose**: Navigation component
**Key Features**:
- Responsive design
- Mobile menu toggle
- Active page highlighting
- Logo display
- Theme toggle integration
- Framer Motion animations

#### 3. `Footer.tsx`
**Purpose**: Footer component
**Key Features**:
- Contact information
- Opening hours
- Social media links
- Responsive layout
- Fallback data support

#### 4. `MenuPageClient.tsx`
**Purpose**: Menu page client component
**Key Features**:
- Menu categories display
- Menu items grouping
- Special offers integration
- Dietary information
- Allergen warnings
- Comprehensive fallback menu

#### 5. `GalleryPageClient.tsx`
**Purpose**: Gallery page client component
**Key Features**:
- Category filtering
- Image and video support
- Responsive grid layout
- Full-size image viewer
- Video modal
- Error handling
- Fallback placeholders

#### 6. `FloatingActionButton.tsx`
**Purpose**: Floating action button
**Key Features**:
- Quick actions (Order, Call, Directions)
- Animated toggle
- Tooltip support
- Mobile-friendly positioning

#### 7. `ThemeToggle.tsx`
**Purpose**: Theme toggle component
**Key Features**:
- Light/dark mode toggle
- Animated icon transitions
- Accessibility support
- Multiple variants

#### 8. `ThemeWrapper.tsx`
**Purpose**: Theme wrapper component
**Key Features**:
- ThemeProvider integration
- ErrorBoundary wrapper
- Client-side rendering

#### 9. `GoogleAnalytics.tsx`
**Purpose**: Google Analytics integration
**Key Features**:
- Conditional rendering
- Page view tracking
- Script optimization

#### 10. `LoadingSpinner.tsx`
**Purpose**: Loading spinner component
**Key Features**:
- Size variants
- Custom text support
- Smooth animations

#### 11. `ErrorBoundary.tsx`
**Purpose**: Error boundary component
**Key Features**:
- Error catching
- Fallback UI
- Error reporting

#### 12. `ThemeAware.tsx`
**Purpose**: Theme-aware component
**Key Features**:
- Conditional rendering based on theme
- Light/dark mode content

### Contexts (`src/contexts/`)

#### 1. `ThemeContext.tsx`
**Purpose**: Theme context provider
**Key Features**:
- Global theme state management
- localStorage persistence
- Theme utilities
- Independent from browser detection
- Hydration error prevention

### Hooks (`src/hooks/`)

#### 1. `useTheme.ts`
**Purpose**: Theme hook re-export
**Key Features**:
- Convenient hook access
- Type safety

### Libraries (`src/lib/`)

#### 1. `metadata.ts`
**Purpose**: Metadata generation utilities
**Key Features**:
- Dynamic meta tag generation
- Open Graph support
- Twitter card support
- SEO optimization
- Image URL generation

#### 2. `structuredData.ts`
**Purpose**: Structured data generation
**Key Features**:
- LocalBusinessSchema generation
- BreadcrumbList schema
- BlogPosting schema
- JSON-LD format

### Sanity Integration (`src/sanity/`)

#### 1. `client.ts`
**Purpose**: Sanity client configuration
**Key Features**:
- Project ID: `cw4sy9ik`
- Dataset: `production`
- API version: `2024-01-01`
- CDN disabled for development

#### 2. `api.ts`
**Purpose**: Sanity API functions
**Key Features**:
- TypeScript interfaces for all content types
- Async data fetching functions
- Error handling
- Revalidation support
- Comprehensive type definitions

#### 3. `queries.ts`
**Purpose**: GROQ queries
**Key Features**:
- Cafe information queries
- Menu queries (categories, items, by category)
- Gallery queries (all, by category, featured)
- Special offers queries (all, active, featured)
- Testimonials queries (all, featured, by rating)
- Blog post queries (all, featured, by category, by slug)

#### 4. `imageUtils.ts`
**Purpose**: Image utility functions
**Key Features**:
- Image URL generation
- Quality settings
- Error handling
- Validation checks
- Specialized quality functions

### Utilities (`src/utils/`)

#### 1. `dateUtils.ts`
**Purpose**: Date utility functions
**Key Features**:
- Date formatting (MM/DD/YYYY)
- Relative time calculation
- Fallback handling

#### 2. `themeUtils.ts`
**Purpose**: Theme utility functions
**Key Features**:
- Theme storage management
- Document theme application
- Theme detection
- Hydration error prevention
- Pure utility functions

## 📁 Public Assets (`public/`)

### Images
- `logo-new.svg`: Main cafe logo
- `logo.png`: Alternative logo format
- `favicon.ico`: Site favicon
- `apple-touch-icon.png`: iOS app icon
- `favicon-16x16.png`: 16x16 favicon
- `favicon.svg`: SVG favicon
- `site.webmanifest`: Web app manifest

### Fonts
- `fonts/Geist/`: Geist font family
- `fonts/Quicksand/`: Quicksand font family

### Gallery
- `gallery/placeholder.jpg`: Gallery placeholder image

### Menu
- `menu/placeholder.jpg`: Menu placeholder image
- `menu/category-placeholder.jpg`: Category placeholder

### Icons
- `globe.svg`: Globe icon
- `next.svg`: Next.js logo
- `vercel.svg`: Vercel logo
- `window.svg`: Window icon
- `file.svg`: File icon

## 📁 Scripts (`scripts/`)

### 1. `populate-sanity.js`
**Purpose**: Populate Sanity CMS with sample data
**Key Features**:
- Cafe information creation
- Menu categories and items
- Special offers
- Testimonials
- Gallery items
- Blog posts
- Error handling

### 2. `check-cafe-data.js`
**Purpose**: Check current cafe data
**Key Features**:
- Data verification
- Update suggestions
- Manual update instructions

### 3. `seed-sanity-data.js`
**Purpose**: Comprehensive data seeding
**Key Features**:
- Complete menu system
- Multiple special offers
- Extensive testimonials
- Gallery items
- Blog posts
- Error handling with token instructions

### 4. `update-cafe-info.js`
**Purpose**: Update cafe information
**Key Features**:
- Existing data detection
- Content updates
- Verification
- Error handling

### 5. `verify-deployment.js`
**Purpose**: Deployment verification
**Key Features**:
- Build directory check
- Configuration verification
- Page and component verification
- Deployment readiness checklist

### 6. `test-api.js`
**Purpose**: API testing
**Key Features**:
- Sanity API connection test
- Data availability check
- Summary reporting
- Troubleshooting guidance

## 📁 Documentation Files

### 1. `README.md`
**Purpose**: Project overview and setup
**Key Features**:
- Project description
- Technology stack
- Getting started instructions
- Project structure
- Customization guidelines
- Deployment options

### 2. `COMPREHENSIVE_FRONTEND_DOCUMENTATION.md`
**Purpose**: Detailed frontend documentation
**Key Features**:
- Complete architecture overview
- Component analysis
- Configuration details
- Styling system
- Performance metrics
- Best practices

### 3. `DEPLOYMENT_GUIDE.md`
**Purpose**: Deployment instructions
**Key Features**:
- Quick start guide
- Vercel deployment
- Alternative platforms
- Pre-deployment checklist
- Environment variables
- Performance optimizations

### 4. `THEME_SYSTEM.md`
**Purpose**: Theme system documentation
**Key Features**:
- Theme architecture
- Usage examples
- CSS classes
- Theme variables
- Implementation details
- Troubleshooting

### 5. `SANITY_DATA_GUIDE.md`
**Purpose**: Sanity CMS setup guide
**Key Features**:
- Step-by-step data entry
- Content structure
- Troubleshooting
- Testing instructions

### 6. `SANITY_UPDATE_GUIDE.md`
**Purpose**: Sanity update instructions
**Key Features**:
- Update procedures
- Content management
- Best practices

### 7. `SIPIN_CAFE_UPDATE_GUIDE.md`
**Purpose**: Cafe-specific update guide
**Key Features**:
- Cafe information updates
- Content management
- Brand consistency

### 8. `HOSTINGER_DEPLOYMENT_GUIDE.md`
**Purpose**: Hostinger deployment guide
**Key Features**:
- Hostinger-specific instructions
- Configuration details
- Troubleshooting

### 9. `HOSTINGER_FINAL_DEPLOYMENT.md`
**Purpose**: Final deployment guide
**Key Features**:
- Production deployment
- Final checks
- Go-live procedures

### 10. `FONT_INSTRUCTIONS.md`
**Purpose**: Font setup instructions
**Key Features**:
- Font installation
- Configuration
- Usage guidelines

## 📁 Studio Backend (`studio-the-sip-in-cafe/`)

### Configuration Files
- `package.json`: Studio dependencies
- `sanity.config.ts`: Sanity configuration
- `sanity.cli.ts`: Sanity CLI configuration
- `studio.config.ts`: Studio configuration
- `tsconfig.json`: TypeScript configuration
- `eslint.config.mjs`: ESLint configuration

### Schema Types (`schemaTypes/`)
- `cafeInfo.ts`: Cafe information schema
- `menuCategory.ts`: Menu category schema
- `menuItem.ts`: Menu item schema
- `galleryItem.ts`: Gallery item schema
- `specialOffer.ts`: Special offer schema
- `testimonial.ts`: Testimonial schema
- `blogPost.ts`: Blog post schema
- `postType.ts`: Post type schema
- `index.ts`: Schema index

### Sample Data (`sample-data/`)
- `cafe-info.json`: Sample cafe information
- `menu-categories.json`: Sample menu categories

### Documentation
- `README.md`: Studio documentation
- `COMPLETE_BACKEND_DOCUMENTATION.md`: Complete backend docs
- `COMPREHENSIVE_BACKEND_DOCUMENTATION.md`: Comprehensive backend docs

## 🎯 Key Features Summary

### Frontend Features
- ✅ Next.js 15 with App Router
- ✅ TypeScript 5 support
- ✅ Tailwind CSS 4 with custom theme
- ✅ Framer Motion animations
- ✅ Responsive design
- ✅ Dark/light theme system
- ✅ SEO optimization
- ✅ Performance optimization
- ✅ Accessibility support

### Backend Features
- ✅ Sanity CMS integration
- ✅ Content management
- ✅ Image optimization
- ✅ API functions
- ✅ Type safety
- ✅ Error handling

### Content Features
- ✅ Cafe information
- ✅ Menu system
- ✅ Gallery
- ✅ Blog posts
- ✅ Special offers
- ✅ Testimonials
- ✅ Contact information
- ✅ Social media integration

### Development Features
- ✅ Hot reload
- ✅ TypeScript checking
- ✅ ESLint integration
- ✅ Build optimization
- ✅ Static export
- ✅ Deployment ready

## 🚀 Deployment Status

The project is fully configured and ready for deployment with:
- ✅ All dependencies installed
- ✅ Configuration files set up
- ✅ Source code complete
- ✅ Documentation comprehensive
- ✅ Scripts functional
- ✅ Studio backend ready

## 📊 File Statistics

- **Total Files**: 100+ files
- **Source Code**: 50+ files
- **Documentation**: 10+ files
- **Scripts**: 6+ files
- **Configuration**: 10+ files
- **Assets**: 20+ files

## 🔧 Maintenance

The project includes comprehensive documentation and scripts for:
- Content management
- Data updates
- Deployment
- Troubleshooting
- Performance monitoring

This index provides a complete overview of the The Sip-In Cafe website project, including all files, their purposes, and key features. The project is well-structured, documented, and ready for production deployment.
