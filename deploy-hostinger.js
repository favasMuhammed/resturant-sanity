#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Hostinger deployment process...\n');

// Step 1: Build the static export
console.log('📦 Building static export...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 2: Check if dist directory exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Dist directory not found. Build may have failed.');
  process.exit(1);
}

console.log('📁 Dist directory created successfully!');
console.log('📋 Contents of dist directory:');
const distContents = fs.readdirSync(distPath);
distContents.forEach(item => {
  const itemPath = path.join(distPath, item);
  const stats = fs.statSync(itemPath);
  if (stats.isDirectory()) {
    console.log(`  📁 ${item}/`);
  } else {
    console.log(`  📄 ${item}`);
  }
});

console.log('\n🎯 Next steps for Hostinger deployment:');
console.log('1. 📤 Upload all contents from the "dist" folder to your Hostinger public_html directory');
console.log('2. 🌐 Access your site at: https://sipincafe.co.uk');
console.log('3. 🔧 Make sure your domain is properly configured in Hostinger');

console.log('\n📝 Hostinger File Manager Instructions:');
console.log('1. Login to Hostinger hPanel: https://hpanel.hostinger.com/websites/sipincafe.co.uk');
console.log('2. Go to File Manager');
console.log('3. Navigate to public_html directory');
console.log('4. Delete all existing files (or backup them first)');
console.log('5. Upload all files from the "dist" folder');
console.log('6. Set proper permissions (644 for files, 755 for directories)');

console.log('\n🔗 Your files are ready in the "dist" directory!');
console.log('📂 Upload path: ./dist/* → /public_html/');
