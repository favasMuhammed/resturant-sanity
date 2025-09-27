# The Sip-In Café - Complete Update Guide

## 🎯 Overview
This guide provides everything needed to update your Sanity CMS with the new "The Sip-In Café" branding and comprehensive menu data.

## 📋 Current Status
- **Document ID**: `ef7a2c9e-0788-4c02-893f-98d180011381`
- **Current Name**: The Sip-In Cafe
- **Current Tagline**: Where every sip tells a story

## 🔄 Updates Required

### 1. Cafe Information Updates

#### **Name**
- **From**: The Sip-In Cafe
- **To**: The Sip-In Café

#### **Tagline**
- **From**: Where every sip tells a story
- **To**: "What's Cooking Inside?"

#### **Description**
- **From**: A cozy corner cafe specializing in single-origin coffees...
- **To**: 
```
Welcome to the Sip-In Cafe — a cozy sanctuary where fresh flavours meet comforting classics. Whether you're fueling your morning or winding down your afternoon, our thoughtfully crafted menu promises something delightful for every palate.

At the Sip-In Cafe, every dish is prepared fresh, with quality ingredients and a whole lot of heart. Come cosy up and savour the flavours. Your perfect cup and plate await.
```

#### **Opening Hours**
- **From**: 7:00 AM - 6:00 PM (varies by day)
- **To**: 8:00 AM - 4:00 PM (Daily)

### 2. Menu Categories to Create/Update

#### **☕ Drinks** (Order: 1)
- Description: Freshly brewed coffees, teas, and specialty beverages
- Icon: coffee
- Color: #8B4513

#### **🥐 Breakfast & Beyond** (Order: 2)
- Description: Hearty and wholesome breakfasts to energise your day
- Icon: sunrise
- Color: #D2691E

#### **🧇 Cafe Specials** (Order: 3)
- Description: Our specials bring extra love and indulgence to your day
- Icon: star
- Color: #CD853F

#### **🍰 Dessert** (Order: 4)
- Description: Sweet treats to end your meal perfectly
- Icon: cake
- Color: #DEB887

### 3. Menu Items to Create

#### **☕ Drinks (25 items)**
**Coffees:**
- Espresso - £2.00
- Double Espresso - £3.00
- Americano - £3.00
- Macchiato - £3.00
- Cappuccino - £3.50
- Latte - £3.50
- Iced Latte - £3.50
- Mocha - £3.50
- Iced Mocha - £3.50
- Iced Americano - £2.00

**Teas:**
- Masala Tea - £2.50
- English Tea - £2.50
- Green Tea - £2.50
- Mint Tea - £2.50
- Earl Grey - £2.50

**Specialties:**
- Chai Latte - £3.49
- Matcha Latte - £3.99
- Classic Hot Chocolate - £2.99
- White Hot Chocolate - £3.49

**Cold Beverages:**
- Watermelon Smoothie - £3.49
- Mixed Fruit Juice - £3.99
- Fresh Grape Juice - £3.49
- Orange & Pineapple Juice - £3.49
- Fresh Orange Juice - £3.49
- Mango Lassi - £3.49
- Banana Milkshake - £3.49

#### **🥐 Breakfast & Beyond (12 items)**
**Toasties and Light Bites:**
- Scrambled Eggs on Toast - £3.49
- Cheesy Scrambled Eggs - £3.79
- Fried or Poached Eggs on Toast - £3.49
- Avocado Toast - £4.29
- Mushrooms, Beans, or Cheese on Toast - £3.79
- Omelette - £4.29

**Breakfast Plates:**
- Traditional English Breakfast - £6.99
- Full English Breakfast - £7.99
- Vegetarian Breakfast - £6.49
- Vegan Breakfast - £5.99
- Gluten-Free Breakfast - £5.49
- Moong Masoor Daal with Indian-Style ½ Omelette - £5.99

#### **🧇 Cafe Specials (8 items)**
- Indian Brunch Plate - £6.99
- Samosa Chaat - £3.99
- Papdi Chaat - £3.99
- Chilli Pop Chicken Platter - £6.99
- Chilli Paneer Platter - £6.99
- Chilli Duo Sharing Meal Platter - £12.99
- Fish & Chips - £4.49
- Kids' Meal - £4.49

#### **🍰 Dessert (3 items)**
- Waffles with Toppings - £6.49
- Pancakes with Toppings - £6.49
- Fruit Platter - £4.99

## 🛠️ Update Methods

### Method 1: Automated Script (Requires Token)
```bash
# Set your Sanity token
export SANITY_TOKEN="your-token-here"

# Run the comprehensive update script
node scripts/update-sipin-cafe.js
```

### Method 2: Sanity Studio (Manual)
1. Go to [Sanity Studio](https://cw4sy9ik.api.sanity.io/v2024-01-01/data/manage/production)
2. Update Cafe Information document
3. Create/Update Menu Categories
4. Create Menu Items (use the data above)

### Method 3: Sanity CLI
```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Login
sanity login

# Edit cafe info
sanity documents edit ef7a2c9e-0788-4c02-893f-98d180011381
```

## 📊 Data Structure for Menu Items

Each menu item should have:
```javascript
{
  _type: 'menuItem',
  name: 'Item Name',
  description: 'Item description',
  price: 2.50,
  currency: 'GBP',
  category: {
    _ref: 'category-id',
    _type: 'reference'
  },
  isAvailable: true,
  isPopular: false, // Set to true for items under £4.00
  isVegetarian: false, // Set based on item
  isVegan: false, // Set based on item
  isGlutenFree: false, // Set based on item
  order: 1
}
```

## ✅ Verification Steps

1. **Check Cafe Info:**
   ```bash
   node scripts/check-cafe-data.js
   ```

2. **Verify Menu Data:**
   - Check categories are created
   - Verify menu items are properly categorized
   - Test frontend display

3. **Test Frontend:**
   - Homepage displays new branding
   - Menu page shows all categories and items
   - Prices and descriptions are correct

## 🎊 Expected Results

After updating, your website will display:
- **New Branding**: "The Sip-In Café" with "What's Cooking Inside?" tagline
- **Updated Hours**: 8:00 AM – 4:00 PM Daily
- **Comprehensive Menu**: 48+ menu items across 4 categories
- **Professional Layout**: Properly categorized and priced items
- **Responsive Design**: Works perfectly on all devices

## 📞 Support

If you encounter any issues:
1. Check the Sanity Studio for data integrity
2. Verify API connections
3. Test frontend rendering
4. Check console for errors

The system is ready for a complete transformation to The Sip-In Café! 🚀
