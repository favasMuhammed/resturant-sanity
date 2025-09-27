# Sanity CMS Update Guide - Sipin Café

## Current Data Status
- **Document ID**: `ef7a2c9e-0788-4c02-893f-98d180011381`
- **Current Name**: The Sip-In Cafe
- **Current Tagline**: Where every sip tells a story

## New Content to Update

### 1. Cafe Name
**Current**: The Sip-In Cafe  
**New**: Sipin Café

### 2. Tagline
**Current**: Where every sip tells a story  
**New**: Freshly brewed coffee & all-day brunch in the heart of Leicester

### 3. Description
**Current**: A cozy corner cafe specializing in single-origin coffees, homemade pastries, and a quiet, welcoming atmosphere.

**New**:
```
Welcome to Sipin Café, Leicester's cozy spot where coffee meets craft.
Our journey began with a simple idea: create a space where every cup feels special and every visit feels like home.

We source ethically grown beans and roast them to perfection for a cup that's smooth, rich, and unforgettable. From the first morning espresso to late-afternoon lattes, each drink is made with care. Our all-day brunch menu celebrates fresh, local ingredients—think buttery pastries, vibrant bowls, and seasonal treats.

Sipin Café isn't just about coffee. It's about moments—catching up with friends, pausing between meetings, or simply taking time for yourself.
```

## Update Methods

### Method 1: Sanity Studio (Recommended)
1. Go to [Sanity Studio](https://cw4sy9ik.api.sanity.io/v2024-01-01/data/manage/production)
2. Find the "Cafe Information" document
3. Click to edit
4. Update the following fields:
   - **Name**: `Sipin Café`
   - **Tagline**: `Freshly brewed coffee & all-day brunch in the heart of Leicester`
   - **Description**: [Paste the new description above]
5. Click "Publish" to save changes

### Method 2: Sanity CLI
```bash
# Install Sanity CLI if not already installed
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Edit the document
sanity documents edit ef7a2c9e-0788-4c02-893f-98d180011381
```

### Method 3: API with Token
If you have a Sanity token with write permissions:
```bash
# Set your token
export SANITY_TOKEN="your-token-here"

# Run the update script
node scripts/update-cafe-info.js
```

## Verification
After updating, run this command to verify the changes:
```bash
node scripts/check-cafe-data.js
```

## Expected Result
The frontend should now display:
- **Cafe Name**: Sipin Café
- **Tagline**: Freshly brewed coffee & all-day brunch in the heart of Leicester
- **Description**: The new detailed description about Sipin Café

## Frontend Impact
These changes will be reflected in:
- Homepage hero section
- Footer branding
- Contact page
- All pages that display cafe information
- SEO meta tags and page titles
