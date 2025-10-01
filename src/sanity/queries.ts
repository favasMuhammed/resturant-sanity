// Cafe Information Queries
export const CAFE_INFO_QUERY = `*[_type == "cafeInfo"][0]{
  _id,
  _type,
  name,
  tagline,
  description,
  logo,
  address,
  contact,
  openingHours,
  socialMedia,
  deliveryPlatforms,
  features,
  seo,
  favicon,
  appleTouchIcon
}`

// Menu Queries
export const MENU_CATEGORIES_QUERY = `*[_type == "menuCategory" && isActive == true] | order(order asc) {
  _id,
  _type,
  name,
  description,
  icon,
  color,
  isActive,
  order,
  image
}`

export const MENU_ITEMS_QUERY = `*[_type == "menuItem" && isAvailable == true] | order(order asc) {
  _id,
  _type,
  name,
  description,
  price,
  currency,
  category,
  image,
  isAvailable,
  isPopular,
  isVegetarian,
  isVegan,
  isGlutenFree,
  allergens,
  preparationTime,
  calories,
  order
}`

export const MENU_ITEMS_BY_CATEGORY_QUERY = `*[_type == "menuItem" && isAvailable == true && references($categoryId)] | order(order asc) {
  _id,
  _type,
  name,
  description,
  price,
  currency,
  category,
  image,
  isAvailable,
  isPopular,
  isVegetarian,
  isVegan,
  isGlutenFree,
  allergens,
  preparationTime,
  calories,
  order
}`

// Gallery Queries
export const GALLERY_ITEMS_QUERY = `*[_type == "galleryItem" && isActive == true] | order(order asc) {
  _id,
  _type,
  title,
  description,
  type,
  image,
  videoUrl,
  videoThumbnail,
  category,
  tags,
  isFeatured,
  isActive,
  order,
  photographer,
  takenAt
}`

export const GALLERY_ITEMS_BY_CATEGORY_QUERY = `*[_type == "galleryItem" && isActive == true && category == $category] | order(order asc) {
  _id,
  _type,
  title,
  description,
  type,
  image,
  videoUrl,
  videoThumbnail,
  category,
  tags,
  isFeatured,
  isActive,
  order,
  photographer,
  takenAt
}`

export const FEATURED_GALLERY_ITEMS_QUERY = `*[_type == "galleryItem" && isActive == true && isFeatured == true] | order(order asc) {
  _id,
  _type,
  title,
  description,
  type,
  image,
  videoUrl,
  videoThumbnail,
  category,
  tags,
  isFeatured,
  isActive,
  order,
  photographer,
  takenAt
}`

// Special Offers Queries
export const SPECIAL_OFFERS_QUERY = `*[_type == "specialOffer" && isActive == true] | order(order asc) {
  _id,
  _type,
  title,
  description,
  type,
  discountType,
  discountValue,
  originalPrice,
  offerPrice,
  currency,
  validFrom,
  validUntil,
  timeRestrictions,
  applicableItems,
  applicableCategories,
  image,
  termsAndConditions,
  isActive,
  isFeatured,
  order
}`

export const ACTIVE_SPECIAL_OFFERS_QUERY = `*[_type == "specialOffer" && isActive == true && validFrom <= now() && (validUntil == null || validUntil >= now())] | order(order asc) {
  _id,
  _type,
  title,
  description,
  type,
  discountType,
  discountValue,
  originalPrice,
  offerPrice,
  currency,
  validFrom,
  validUntil,
  timeRestrictions,
  applicableItems,
  applicableCategories,
  image,
  termsAndConditions,
  isActive,
  isFeatured,
  order
}`

export const FEATURED_SPECIAL_OFFERS_QUERY = `*[_type == "specialOffer" && isActive == true && isFeatured == true] | order(order asc) {
  _id,
  _type,
  title,
  description,
  type,
  discountType,
  discountValue,
  originalPrice,
  offerPrice,
  currency,
  validFrom,
  validUntil,
  timeRestrictions,
  applicableItems,
  applicableCategories,
  image,
  termsAndConditions,
  isActive,
  isFeatured,
  order
}`

// Testimonials Queries
export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && isActive == true] | order(order asc) {
  _id,
  _type,
  customerName,
  customerInitials,
  content,
  rating,
  customerPhoto,
  customerLocation,
  visitDate,
  orderItems,
  isVerified,
  isFeatured,
  isActive,
  order,
  socialMedia,
  response
}`

export const FEATURED_TESTIMONIALS_QUERY = `*[_type == "testimonial" && isActive == true && isFeatured == true] | order(order asc) {
  _id,
  _type,
  customerName,
  customerInitials,
  content,
  rating,
  customerPhoto,
  customerLocation,
  visitDate,
  orderItems,
  isVerified,
  isFeatured,
  isActive,
  order,
  socialMedia,
  response
}`

export const TESTIMONIALS_BY_RATING_QUERY = `*[_type == "testimonial" && isActive == true && rating >= $minRating] | order(rating desc) {
  _id,
  _type,
  customerName,
  customerInitials,
  content,
  rating,
  customerPhoto,
  customerLocation,
  visitDate,
  orderItems,
  isVerified,
  isFeatured,
  isActive,
  order,
  socialMedia,
  response
}`

// Blog Queries
export const BLOG_POSTS_QUERY = `*[_type == "blogPost" && isPublished == true] | order(publishedAt desc) {
  _id,
  _type,
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  author,
  category,
  tags,
  publishedAt,
  isPublished,
  isFeatured,
  readingTime,
  seo
}`

export const FEATURED_BLOG_POSTS_QUERY = `*[_type == "blogPost" && isPublished == true && isFeatured == true] | order(publishedAt desc) {
  _id,
  _type,
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  author,
  category,
  tags,
  publishedAt,
  isPublished,
  isFeatured,
  readingTime,
  seo
}`

export const BLOG_POSTS_BY_CATEGORY_QUERY = `*[_type == "blogPost" && isPublished == true && category == $category] | order(publishedAt desc) {
  _id,
  _type,
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  author,
  category,
  tags,
  publishedAt,
  isPublished,
  isFeatured,
  readingTime,
  seo
}`

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  author,
  category,
  tags,
  publishedAt,
  isPublished,
  isFeatured,
  readingTime,
  seo
}`

// Legacy Posts (for backward compatibility)
export const LEGACY_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc)`
export const LEGACY_POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0]`
