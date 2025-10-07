# 🚀 Hostinger Deployment Guide for The Sip-In Cafe

## 📋 Prerequisites
- ✅ Next.js project configured for static export
- ✅ Hostinger account with domain: sipincafe.co.uk
- ✅ Access to Hostinger hPanel
- ✅ Node.js and npm installed locally

## 🔧 Configuration Changes Made

### 1. Next.js Configuration (`next.config.ts`)
```typescript
const nextConfig: NextConfig = {
  // Enable static export for Hostinger
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  
  images: {
    // Disable image optimization for static export
    unoptimized: true,
    // ... rest of config
  },
};
```

## 🚀 Deployment Steps

### Step 1: Build the Static Export
```bash
# Run the deployment script
node deploy-hostinger.js

# Or manually:
npm run build
```

### Step 2: Access Hostinger hPanel
1. Go to: https://hpanel.hostinger.com/websites/sipincafe.co.uk
2. Login with your Hostinger credentials
3. Navigate to **File Manager**

### Step 3: Upload Files to Hostinger
1. **Navigate to public_html directory**
   - Path: `/public_html/`
   - URL: https://srv708-files.hstgr.io/0cded92fed994b9a/files/public_html/

2. **Clear existing files** (backup first if needed)
   - Delete all files in public_html
   - Keep the directory structure clean

3. **Upload dist contents**
   - Upload ALL files from `./dist/` folder
   - Upload to `/public_html/` directory
   - Maintain folder structure

### Step 4: Set Proper Permissions
- **Files**: 644 permissions
- **Directories**: 755 permissions
- **Main files**: index.html, _next/, etc.

### Step 5: Domain Configuration
1. **DNS Settings** (if needed)
   - Ensure domain points to Hostinger servers
   - Check A records and CNAME records

2. **SSL Certificate**
   - Enable SSL in Hostinger hPanel
   - Force HTTPS redirect

## 📁 File Structure After Upload
```
public_html/
├── index.html
├── _next/
│   ├── static/
│   └── ...
├── blog/
│   ├── index.html
│   └── [slug]/
├── gallery/
├── menu/
├── contact/
├── robots.txt
├── sitemap.xml
└── ... (all other static files)
```

## 🔍 Verification Steps

### 1. Test Main Pages
- ✅ Homepage: https://sipincafe.co.uk/
- ✅ Blog: https://sipincafe.co.uk/blog/
- ✅ Gallery: https://sipincafe.co.uk/gallery/
- ✅ Menu: https://sipincafe.co.uk/menu/
- ✅ Contact: https://sipincafe.co.uk/contact/

### 2. Test Dynamic Routes
- ✅ Blog posts: https://sipincafe.co.uk/blog/[slug]/
- ✅ Individual pages: https://sipincafe.co.uk/[slug]/

### 3. Test Assets
- ✅ Images loading correctly
- ✅ CSS/JS files loading
- ✅ Fonts loading
- ✅ Sanity CMS integration working

## 🛠️ Troubleshooting

### Common Issues:

#### 1. 404 Errors on Refresh
**Problem**: Dynamic routes return 404 when refreshed
**Solution**: 
- Ensure all routes are properly exported
- Check that trailing slashes are configured
- Verify file structure in public_html

#### 2. Images Not Loading
**Problem**: Sanity images not displaying
**Solution**:
- Check Sanity project ID: `cw4sy9ik`
- Verify image URLs are accessible
- Check CORS settings in Sanity

#### 3. CSS/JS Not Loading
**Problem**: Styling broken or JavaScript not working
**Solution**:
- Check file permissions (644 for files)
- Verify _next folder is uploaded correctly
- Clear browser cache

#### 4. Domain Not Working
**Problem**: Site not accessible via domain
**Solution**:
- Check DNS propagation
- Verify domain configuration in Hostinger
- Check SSL certificate status

## 📊 Performance Optimization

### 1. Enable Compression
- Enable GZIP compression in Hostinger
- Optimize images before upload
- Minify CSS/JS files

### 2. Caching Headers
- Set appropriate cache headers
- Use CDN if available in Hostinger

### 3. Monitor Performance
- Use Google PageSpeed Insights
- Monitor Core Web Vitals
- Check mobile responsiveness

## 🔄 Update Process

### For Future Updates:
1. Make changes to the codebase
2. Run `npm run build`
3. Upload new `dist` contents to Hostinger
4. Clear any caches
5. Test the updated site

## 📞 Support

### Hostinger Support:
- 📧 Email: support@hostinger.com
- 💬 Live Chat: Available in hPanel
- 📚 Documentation: https://support.hostinger.com

### Project Support:
- 🔧 Technical issues: Check console errors
- 🐛 Bugs: Review browser developer tools
- 📝 Documentation: Refer to project README

## ✅ Success Checklist

- [ ] Static export built successfully
- [ ] All files uploaded to public_html
- [ ] Permissions set correctly
- [ ] Domain accessible
- [ ] SSL certificate active
- [ ] All pages loading correctly
- [ ] Images and assets working
- [ ] Mobile responsive
- [ ] SEO elements working
- [ ] Analytics tracking (if configured)

---

**🎉 Your The Sip-In Cafe website is now live on Hostinger!**

**🌐 Live URL**: https://sipincafe.co.uk
