# The Sip-In Cafe Website

A modern, responsive website for The Sip-In Cafe located in Leicester, UK. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🏪 About The Sip-In Cafe

**Address:** 20 Kemble Gallery, Leicester LE1 3YT  
**Phone:** 0116 123 4567  
**Email:** hello@thesipincafe.co.uk

### Opening Hours
- Monday - Friday: 7:00 AM - 6:00 PM
- Saturday - Sunday: 8:00 AM - 7:00 PM

## ✨ Features

### 🏠 Homepage
- **Hero Section** with cafe logo and compelling messaging
- **Location & Hours** information
- **Order Options** with links to delivery platforms:
  - Uber Eats
  - Deliveroo
  - Just Eat
- **Table Booking** functionality
- **Social Media Links** (Instagram, Facebook, TikTok)
- **Gallery Preview** with link to full gallery
- **Contact Information** in footer

### 📋 Menu Page
- **Comprehensive Menu** with categories:
  - Coffee & Drinks
  - Breakfast
  - Lunch
  - Pastries & Desserts
- **Special Offers** section
- **Pricing** for all items
- **Call-to-Action** buttons for ordering

### 📸 Gallery Page
- **Photo Gallery** with placeholder images
- **Category Filtering** (Coffee, Food, Atmosphere)
- **Video Section** for behind-the-scenes content
- **Responsive Grid Layout**

### 🎨 Design Features
- **Modern UI/UX** with warm, cafe-appropriate colors
- **Fully Responsive** design for all devices
- **Smooth Animations** and hover effects
- **Professional Typography** using Geist fonts
- **Accessible** navigation and content structure

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-the-sip-in-cafe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Fonts:** Geist Sans & Geist Mono
- **Icons:** Custom SVG icons
- **Image Optimization:** Next.js Image component

## 📁 Project Structure

```
nextjs-the-sip-in-cafe/
├── src/
│   ├── app/
│   │   ├── gallery/
│   │   │   └── page.tsx          # Gallery page
│   │   ├── menu/
│   │   │   └── page.tsx          # Menu page
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Dynamic blog posts (Sanity CMS)
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Homepage
│   └── sanity/
│       └── client.ts             # Sanity CMS client
├── public/
│   └── logo.png                  # Cafe logo
├── package.json
└── README.md
```

## 🎯 Key Pages

### Homepage (`/`)
- Hero section with logo and tagline
- Order options (delivery + table booking)
- Social media links
- Gallery preview
- Contact information

### Menu (`/menu`)
- Complete menu with pricing
- Special offers
- Category organization
- Order call-to-actions

### Gallery (`/gallery`)
- Photo gallery with filtering
- Video content section
- Responsive grid layout
- Interactive elements

## 🔧 Customization

### Updating Content
- **Menu Items:** Edit `src/app/menu/page.tsx`
- **Gallery Images:** Replace placeholder content in `src/app/gallery/page.tsx`
- **Contact Info:** Update footer sections in all pages
- **Social Links:** Modify social media URLs in navigation and footer

### Styling
- **Colors:** Update Tailwind color classes throughout components
- **Fonts:** Modify font imports in `src/app/layout.tsx`
- **Layout:** Adjust spacing and sizing using Tailwind utilities

### Adding New Pages
1. Create new directory in `src/app/`
2. Add `page.tsx` file
3. Update navigation links in existing pages
4. Follow existing component patterns

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Mobile:** 320px - 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px+

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify:** Use `npm run build` and deploy `out` folder
- **AWS S3:** Upload built files to S3 bucket
- **Traditional Hosting:** Upload files to web server

## 📞 Support

For technical support or questions about the website:
- **Email:** hello@thesipincafe.co.uk
- **Phone:** 0116 123 4567

## 📄 License

© 2024 The Sip-In Cafe. All rights reserved.

---

**Built with ❤️ for The Sip-In Cafe**