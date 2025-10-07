# 🚀 Hostinger Deployment Guide - The Sip-In Cafe

## 📋 Overview

This guide will help you deploy your Next.js cafe website to Hostinger using static hosting. The project is already configured for static export.

## ✅ Pre-Deployment Checklist

### **Current Configuration Status:**
- ✅ `output: 'export'` enabled in `next.config.ts`
- ✅ `trailingSlash: true` for proper routing
- ✅ `unoptimized: true` for static images
- ✅ Sanity CDN patterns configured
- ✅ Static export ready

## 🛠️ Step 1: Build the Project

### **1.1 Install Dependencies**
```bash
cd nextjs-the-sip-in-cafe
npm install
```

### **1.2 Build for Production**
```bash
npm run build
```

This will create an `out` folder with all static files ready for Hostinger.

### **1.3 Verify Build Output**
```bash
# Check if 'out' folder was created
ls -la out/

# You should see:
# - index.html
# - _next/ (static assets)
# - blog/ (blog pages)
# - menu/ (menu page)
# - gallery/ (gallery page)
# - contact/ (contact page)
```

## 🌐 Step 2: Hostinger Setup

### **2.1 Access Hostinger Control Panel**
1. Login to your Hostinger account
2. Go to **File Manager** or **hPanel**
3. Navigate to your domain's `public_html` folder

### **2.2 Upload Files**
1. **Delete existing files** in `public_html` (if any)
2. **Upload the entire `out` folder contents** to `public_html`
3. **Extract/Unzip** if needed
4. **Ensure structure looks like:**
```
public_html/
├── index.html
├── _next/
├── blog/
   ├── menu/
├── gallery/
├── contact/
   └── [other static files]
   ```

## 🔧 Step 3: Configure Hostinger Settings

### **3.1 Enable Gzip Compression**
1. Go to **Advanced** → **Gzip Compression**
2. Enable Gzip compression for better performance

### **3.2 Set Up Redirects (Optional)**
Create `.htaccess` file in `public_html`:
```apache
# Enable Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
```

### **3.3 SSL Certificate**
1. Go to **SSL** section in Hostinger
2. Enable **Let's Encrypt SSL** (free)
3. Force HTTPS redirect

## 🎯 Step 4: Domain Configuration

### **4.1 Point Domain to Hostinger**
1. Update your domain's DNS settings:
   - **A Record**: Point to Hostinger's IP
   - **CNAME**: Point www to your domain
2. Wait for DNS propagation (up to 24 hours)

### **4.2 Custom Domain Setup**
1. In Hostinger, go to **Domains**
2. Add your custom domain
3. Configure DNS settings as needed

## 🚀 Step 5: Deploy and Test

### **5.1 Upload Process**
```bash
# Method 1: File Manager (Recommended)
1. Zip the 'out' folder contents
2. Upload to public_html via File Manager
3. Extract files

# Method 2: FTP/SFTP
1. Use FileZilla or similar FTP client
2. Connect to your Hostinger account
3. Upload 'out' folder contents to public_html
```

### **5.2 Test Your Website**
1. Visit your domain: `https://yourdomain.com`
2. Test all pages:
   - Homepage: `/`
   - Menu: `/menu`
   - Gallery: `/gallery`
   - Contact: `/contact`
   - Blog: `/blog`
3. Check mobile responsiveness
4. Test all interactive elements

## 🔄 Step 6: Update Process

### **6.1 Making Changes**
```bash
# 1. Make your changes to the code
# 2. Rebuild the project
npm run build

# 3. Upload new 'out' folder contents to Hostinger
# 4. Replace old files with new ones
```

### **6.2 Automated Deployment (Optional)**
Create a deployment script:
```bash
#!/bin/bash
# deploy.sh
echo "Building project..."
npm run build

echo "Uploading to Hostinger..."
# Use rsync or FTP to upload
rsync -avz --delete out/ user@yourdomain.com:public_html/

echo "Deployment complete!"
```

## 📊 Step 7: Performance Optimization

### **7.1 Enable Caching**
- Set up browser caching in Hostinger
- Configure CDN if available
- Optimize images before upload

### **7.2 Monitor Performance**
- Use Google PageSpeed Insights
- Check Core Web Vitals
- Monitor with Google Analytics

## 🛡️ Step 8: Security & Maintenance

### **8.1 Security Headers**
The `.htaccess` file above includes basic security headers.

### **8.2 Regular Updates**
- Keep your local development environment updated
- Rebuild and redeploy when making changes
- Monitor for any issues

## 🆘 Troubleshooting

### **Common Issues:**

**1. 404 Errors on Refresh**
- Ensure `trailingSlash: true` in `next.config.ts`
- Check that all routes are properly built

**2. Images Not Loading**
- Verify Sanity CDN configuration
- Check image URLs in browser dev tools

**3. Styling Issues**
- Clear browser cache
- Check if all CSS files are uploaded
- Verify Tailwind CSS is properly built

**4. Blog Posts Not Showing**
- Check Sanity connection
- Verify API endpoints are accessible
- Check browser console for errors

### **Debug Steps:**
1. Check browser console for errors
2. Verify all files are uploaded correctly
3. Test with different browsers
4. Check mobile responsiveness

## 📞 Support

### **Hostinger Support:**
- Live chat available 24/7
- Knowledge base with tutorials
- Community forum

### **Project-Specific Issues:**
- Check the project's GitHub issues
- Review Next.js documentation
- Check Sanity CMS documentation

## 🎉 Success Checklist

- [ ] Project builds successfully (`npm run build`)
- [ ] `out` folder contains all necessary files
- [ ] Files uploaded to Hostinger `public_html`
- [ ] Domain points to Hostinger
- [ ] SSL certificate enabled
- [ ] Website loads correctly
- [ ] All pages work (home, menu, gallery, contact, blog)
- [ ] Mobile responsive
- [ ] Images load properly
- [ ] No console errors

## 🚀 Quick Deploy Commands

```bash
# Complete deployment process
cd nextjs-the-sip-in-cafe
npm install
npm run build
# Upload 'out' folder contents to Hostinger public_html
```

---

**Your dark luxury cafe website is now ready for Hostinger! ☕️✨**

*For any issues, check the troubleshooting section or contact Hostinger support.*
