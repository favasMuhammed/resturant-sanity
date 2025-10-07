#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Hostinger deployment process...\n');

// Step 1: Clean previous builds
console.log('🧹 Cleaning previous builds...');
try {
  if (fs.existsSync('.next')) {
    execSync('rmdir /s /q .next', { stdio: 'inherit' });
  }
  if (fs.existsSync('out')) {
    execSync('rmdir /s /q out', { stdio: 'inherit' });
  }
  console.log('✅ Cleanup completed!\n');
} catch (error) {
  console.log('ℹ️ No previous builds to clean\n');
}

// Step 2: Build the static export
console.log('📦 Building static export...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 3: Check for output directory
let outputDir = null;
if (fs.existsSync('out')) {
  outputDir = 'out';
  console.log('📁 Found "out" directory (static export)');
} else if (fs.existsSync('.next/static')) {
  outputDir = '.next';
  console.log('📁 Found ".next" directory (server build)');
  console.log('⚠️  Note: This is a server build, not static export');
} else {
  console.error('❌ No build output found!');
  process.exit(1);
}

console.log('\n📋 Contents of build directory:');
const buildContents = fs.readdirSync(outputDir);
buildContents.forEach(item => {
  const itemPath = path.join(outputDir, item);
  const stats = fs.statSync(itemPath);
  if (stats.isDirectory()) {
    console.log(`  📁 ${item}/`);
  } else {
    console.log(`  📄 ${item}`);
  }
});

// Step 4: Create deployment package
console.log('\n📦 Creating deployment package...');
const deployDir = 'hostinger-deploy';
if (fs.existsSync(deployDir)) {
  execSync(`rmdir /s /q ${deployDir}`, { stdio: 'inherit' });
}
fs.mkdirSync(deployDir, { recursive: true });

if (outputDir === 'out') {
  // Copy static export
  console.log('📋 Copying static export files...');
  execSync(`xcopy "${outputDir}\\*" "${deployDir}\\" /E /I /H /Y`, { stdio: 'inherit' });
} else {
  // For server build, we need to create a different approach
  console.log('📋 Creating static files from server build...');
  
  // Copy static assets
  if (fs.existsSync('.next/static')) {
    fs.mkdirSync(path.join(deployDir, '_next', 'static'), { recursive: true });
    execSync(`xcopy ".next\\static\\*" "${deployDir}\\_next\\static\\" /E /I /H /Y`, { stdio: 'inherit' });
  }
  
  // Copy public files
  if (fs.existsSync('public')) {
    execSync(`xcopy "public\\*" "${deployDir}\\" /E /I /H /Y`, { stdio: 'inherit' });
  }
  
  // Create a basic index.html for the root
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Sip-In Cafe</title>
    <meta name="description" content="The Sip-In Cafe - Authentic Indian cuisine in Leicester">
    <link rel="icon" href="/favicon.ico">
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { font-size: 3rem; margin-bottom: 1rem; }
        p { font-size: 1.2rem; margin-bottom: 2rem; }
        .btn { 
            display: inline-block; 
            padding: 12px 24px; 
            background: rgba(255,255,255,0.2); 
            color: white; 
            text-decoration: none; 
            border-radius: 8px; 
            margin: 10px;
            transition: background 0.3s;
        }
        .btn:hover { background: rgba(255,255,255,0.3); }
    </style>
</head>
<body>
    <div class="container">
        <h1>🍛 The Sip-In Cafe</h1>
        <p>Welcome to The Sip-In Cafe - Your destination for authentic Indian cuisine in Leicester!</p>
        <p>Our website is currently being updated. Please check back soon!</p>
        <a href="mailto:info@sipincafe.co.uk" class="btn">Contact Us</a>
        <a href="tel:+441234567890" class="btn">Call Us</a>
    </div>
</body>
</html>`;
  
  fs.writeFileSync(path.join(deployDir, 'index.html'), indexHtml);
}

console.log('\n🎯 Hostinger Deployment Instructions:');
console.log('1. 📤 Upload all contents from the "hostinger-deploy" folder to your Hostinger public_html directory');
console.log('2. 🌐 Access your site at: https://sipincafe.co.uk');
console.log('3. 🔧 Make sure your domain is properly configured in Hostinger');

console.log('\n📝 Hostinger File Manager Instructions:');
console.log('1. Login to Hostinger hPanel: https://hpanel.hostinger.com/websites/sipincafe.co.uk');
console.log('2. Go to File Manager');
console.log('3. Navigate to public_html directory');
console.log('4. Delete all existing files (or backup them first)');
console.log('5. Upload all files from the "hostinger-deploy" folder');
console.log('6. Set proper permissions (644 for files, 755 for directories)');

console.log('\n🔗 Your files are ready in the "hostinger-deploy" directory!');
console.log('📂 Upload path: ./hostinger-deploy/* → /public_html/');

// Show what's in the deploy directory
console.log('\n📋 Deployment package contents:');
const deployContents = fs.readdirSync(deployDir);
deployContents.forEach(item => {
  const itemPath = path.join(deployDir, item);
  const stats = fs.statSync(itemPath);
  if (stats.isDirectory()) {
    console.log(`  📁 ${item}/`);
  } else {
    console.log(`  📄 ${item}`);
  }
});
