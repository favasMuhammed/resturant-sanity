# 🚀 Deployment Guide - The Sip-In Cafe

## Quick Start (Recommended: Vercel)

### 1. **Prepare Your Repository**
```bash
# Make sure all changes are committed
git add .
git commit -m "Ready for deployment - Dark luxury design complete"
git push origin main
```

### 2. **Deploy on Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Next.js settings
6. **No environment variables needed** (Sanity project ID is hardcoded)

### 3. **Your Site Will Be Live!**
- Vercel provides a free domain: `your-project-name.vercel.app`
- Custom domain can be added later
- Automatic HTTPS and CDN included

---

## Alternative Deployment Options

### **Netlify Deployment**
```bash
# Build the project
npm run build

# Deploy to Netlify
# 1. Go to netlify.com
# 2. Drag and drop the 'out' folder
# 3. Or connect GitHub repository
```

### **Railway Deployment (Full-Stack)**
```bash
# 1. Go to railway.app
# 2. Connect GitHub
# 3. Deploy both frontend and backend
# 4. Railway handles everything automatically
```

### **Self-Hosted (VPS/Server)**
```bash
# Build for production
npm run build

# Start production server
npm start

# Or use PM2 for better process management
npm install -g pm2
pm2 start npm --name "cafe-website" -- start
pm2 save
pm2 startup
```

---

## 🔧 Pre-Deployment Checklist

### ✅ **Project Configuration**
- [x] Next.js 15.5.4 configured
- [x] Tailwind CSS 4 setup
- [x] Sanity CMS integration
- [x] Image optimization configured
- [x] TypeScript configured
- [x] ESLint configured

### ✅ **Build Configuration**
- [x] `output: 'standalone'` enabled
- [x] Image optimization enabled
- [x] Compression enabled
- [x] Turbopack build system

### ✅ **Sanity Configuration**
- [x] Project ID: `cw4sy9ik`
- [x] Dataset: `production`
- [x] CDN disabled for development
- [x] API version: `2024-01-01`

---

## 🌐 **Environment Variables (Optional)**

If you want to use environment variables instead of hardcoded values:

### **Create `.env.local` file:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=cw4sy9ik
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### **Update `src/sanity/client.ts`:**
```typescript
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
});
```

---

## 📱 **Mobile & Performance**

### **Performance Optimizations Already Included:**
- ✅ Image optimization with Next.js Image
- ✅ Static generation where possible
- ✅ Code splitting and lazy loading
- ✅ CSS optimization with Tailwind
- ✅ Font optimization
- ✅ Compression enabled

### **Mobile Responsiveness:**
- ✅ Responsive design for all screen sizes
- ✅ Touch-friendly navigation
- ✅ Optimized images for mobile
- ✅ Fast loading on mobile networks

---

## 🔒 **Security & Best Practices**

### **Already Implemented:**
- ✅ TypeScript for type safety
- ✅ ESLint for code quality
- ✅ Sanity CMS for content management
- ✅ Image optimization and security
- ✅ HTTPS ready (Vercel/Netlify provide automatically)

---

## 🎨 **Design Features Deployed**

### **Dark Luxury Theme:**
- ✅ Dark brown background (`#2c1810`)
- ✅ Cream text (`#f5f5dc`)
- ✅ Orange accents (`#ff6b35`)
- ✅ Professional typography
- ✅ Smooth animations
- ✅ Mobile-responsive design

### **Sections Included:**
- ✅ Hero section with logo
- ✅ Visit Us (Address, Hours, Contact)
- ✅ Order & Book (Delivery, Table Booking, Quick Contact)
- ✅ Follow Us (Social Media)
- ✅ Gallery preview
- ✅ Navigation with mobile menu

---

## 🚀 **Deployment Commands**

### **Build for Production:**
```bash
cd nextjs-the-sip-in-cafe
npm run build
```

### **Start Production Server:**
```bash
npm start
```

### **Check Build:**
```bash
npm run lint
```

---

## 📞 **Support & Maintenance**

### **After Deployment:**
1. **Content Management**: Use Sanity Studio at `your-domain.com/studio`
2. **Analytics**: Add Google Analytics or Vercel Analytics
3. **Custom Domain**: Configure in Vercel/Netlify dashboard
4. **SSL**: Automatically provided by Vercel/Netlify

### **Monitoring:**
- Vercel provides built-in analytics
- Monitor performance and uptime
- Check error logs in deployment dashboard

---

## 🎯 **Recommended: Vercel**

**Why Vercel?**
- ✅ Made by Next.js creators
- ✅ Zero configuration needed
- ✅ Automatic deployments from GitHub
- ✅ Global CDN included
- ✅ Free tier available
- ✅ Perfect for Next.js applications

**Deploy Now:**
1. Push to GitHub
2. Connect to Vercel
3. Deploy in 2 minutes!

---

*Your dark luxury cafe website is ready for deployment! 🎉☕️*
