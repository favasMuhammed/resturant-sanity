import { client } from './client'
import {
  CAFE_INFO_QUERY,
  MENU_CATEGORIES_QUERY,
  MENU_ITEMS_QUERY,
  MENU_ITEMS_BY_CATEGORY_QUERY,
  GALLERY_ITEMS_QUERY,
  GALLERY_ITEMS_BY_CATEGORY_QUERY,
  FEATURED_GALLERY_ITEMS_QUERY,
  SPECIAL_OFFERS_QUERY,
  ACTIVE_SPECIAL_OFFERS_QUERY,
  FEATURED_SPECIAL_OFFERS_QUERY,
  TESTIMONIALS_QUERY,
  FEATURED_TESTIMONIALS_QUERY,
  TESTIMONIALS_BY_RATING_QUERY,
  BLOG_POSTS_QUERY,
  FEATURED_BLOG_POSTS_QUERY,
  BLOG_POSTS_BY_CATEGORY_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  LEGACY_POSTS_QUERY,
  LEGACY_POST_BY_SLUG_QUERY,
} from './queries'

// Types
export interface CafeInfo {
  _id: string
  _type: 'cafeInfo'
  name: string
  tagline?: string
  description?: string
  logo?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  address?: {
    street: string
    city: string
    postcode: string
    country: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  contact?: {
    phone: string
    email: string
    website?: string
  }
  openingHours?: Array<{
    day: string
    isOpen: boolean
    openTime: string
    closeTime: string
  }>
  socialMedia?: {
    instagram?: string
    facebook?: string
    tiktok?: string
    twitter?: string
  }
  deliveryPlatforms?: {
    uberEats?: string
    deliveroo?: string
    justEat?: string
  }
  features?: string[]
}

export interface MenuCategory {
  _id: string
  _type: 'menuCategory'
  name: string
  description?: string
  icon: string
  color: string
  isActive: boolean
  order: number
  image?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
}

export interface MenuItem {
  _id: string
  _type: 'menuItem'
  name: string
  description?: string
  price: number
  currency: string
  category: {
    _ref: string
    _type: 'reference'
  }
  image?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  isAvailable: boolean
  isPopular: boolean
  isVegetarian: boolean
  isVegan: boolean
  isGlutenFree: boolean
  allergens?: string[]
  preparationTime?: number
  calories?: number
  order: number
}

export interface GalleryItem {
  _id: string
  _type: 'galleryItem'
  title: string
  description?: string
  type: 'image' | 'video'
  image?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  videoUrl?: string
  videoThumbnail?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  category: string
  tags?: string[]
  isFeatured: boolean
  isActive: boolean
  order: number
  photographer?: string
  takenAt?: string
}

export interface SpecialOffer {
  _id: string
  _type: 'specialOffer'
  title: string
  description: string
  type: string
  discountType?: string
  discountValue?: number
  originalPrice?: number
  offerPrice?: number
  currency: string
  validFrom: string
  validUntil?: string
  timeRestrictions?: {
    startTime?: string
    endTime?: string
    daysOfWeek?: string[]
  }
  applicableItems?: Array<{
    _ref: string
    _type: 'reference'
  }>
  applicableCategories?: Array<{
    _ref: string
    _type: 'reference'
  }>
  image?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  termsAndConditions?: string
  isActive: boolean
  isFeatured: boolean
  order: number
}

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  customerName: string
  customerInitials?: string
  content: string
  rating: number
  customerPhoto?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  customerLocation?: string
  visitDate?: string
  orderItems?: Array<{
    _ref: string
    _type: 'reference'
  }>
  isVerified: boolean
  isFeatured: boolean
  isActive: boolean
  order: number
  socialMedia?: string
  response?: string
}

export interface BlogPost {
  _id: string
  _type: 'blogPost'
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  content?: Array<{
    _type: string
    [key: string]: unknown
  }>
  featuredImage?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  author?: {
    name: string
    role: string
    photo?: {
      _type: 'image'
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
  }
  category: string
  tags?: string[]
  publishedAt: string
  isPublished: boolean
  isFeatured: boolean
  readingTime?: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
}

// Helper function for consistent fetch options
const fetchOptions = {
  next: { revalidate: 60 },
  timeout: 5000
}

// API Functions
export async function getCafeInfo(): Promise<CafeInfo | null> {
  try {
    return await client.fetch(CAFE_INFO_QUERY, {}, fetchOptions)
  } catch (error) {
    console.error('Error fetching cafe info:', error)
    return null
  }
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  try {
    return await client.fetch(MENU_CATEGORIES_QUERY, {}, fetchOptions)
  } catch (error) {
    console.error('Error fetching menu categories:', error)
    return []
  }
}

export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    return await client.fetch(MENU_ITEMS_QUERY, {}, fetchOptions)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return []
  }
}

export async function getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
  try {
    return await client.fetch(MENU_ITEMS_BY_CATEGORY_QUERY, { categoryId }, fetchOptions)
  } catch (error) {
    console.error('Error fetching menu items by category:', error)
    return []
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    return await client.fetch(GALLERY_ITEMS_QUERY, {}, fetchOptions)
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return []
  }
}

export async function getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
  try {
    return await client.fetch(GALLERY_ITEMS_BY_CATEGORY_QUERY, { category }, fetchOptions)
  } catch (error) {
    console.error('Error fetching gallery items by category:', error)
    return []
  }
}

export async function getFeaturedGalleryItems(): Promise<GalleryItem[]> {
  try {
    return await client.fetch(FEATURED_GALLERY_ITEMS_QUERY, {}, fetchOptions)
  } catch (error) {
    console.error('Error fetching featured gallery items:', error)
    return []
  }
}

export async function getSpecialOffers(): Promise<SpecialOffer[]> {
  try {
    return await client.fetch(SPECIAL_OFFERS_QUERY, {}, fetchOptions)
  } catch (error) {
    console.error('Error fetching special offers:', error)
    return []
  }
}

export async function getActiveSpecialOffers(): Promise<SpecialOffer[]> {
  try {
    return await client.fetch(ACTIVE_SPECIAL_OFFERS_QUERY, {}, fetchOptions)
  } catch (error) {
    console.error('Error fetching active special offers:', error)
    return []
  }
}

export async function getFeaturedSpecialOffers(): Promise<SpecialOffer[]> {
  try {
    return await client.fetch(FEATURED_SPECIAL_OFFERS_QUERY, {}, fetchOptions)
  } catch (error) {
    console.error('Error fetching featured special offers:', error)
    return []
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await client.fetch(TESTIMONIALS_QUERY, {}, fetchOptions)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    return await client.fetch(FEATURED_TESTIMONIALS_QUERY, {}, fetchOptions)
  } catch (error) {
    console.error('Error fetching featured testimonials:', error)
    return []
  }
}

export async function getTestimonialsByRating(minRating: number): Promise<Testimonial[]> {
  try {
    return await client.fetch(TESTIMONIALS_BY_RATING_QUERY, { minRating }, fetchOptions)
  } catch (error) {
    console.error('Error fetching testimonials by rating:', error)
    return []
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await client.fetch(BLOG_POSTS_QUERY, {}, fetchOptions)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    return await client.fetch(FEATURED_BLOG_POSTS_QUERY, {}, fetchOptions)
  } catch (error) {
    console.error('Error fetching featured blog posts:', error)
    return []
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    return await client.fetch(BLOG_POSTS_BY_CATEGORY_QUERY, { category }, fetchOptions)
  } catch (error) {
    console.error('Error fetching blog posts by category:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug }, fetchOptions)
  } catch (error) {
    console.error('Error fetching blog post by slug:', error)
    return null
  }
}

// Legacy support
export async function getLegacyPosts(): Promise<Array<{
  _id: string
  _type: string
  title: string
  slug: { current: string }
  [key: string]: unknown
}>> {
  try {
    return await client.fetch(LEGACY_POSTS_QUERY, {}, fetchOptions)
  } catch (error) {
    console.error('Error fetching legacy posts:', error)
    return []
  }
}

export async function getLegacyPostBySlug(slug: string): Promise<{
  _id: string
  _type: string
  title: string
  slug: { current: string }
  [key: string]: unknown
} | null> {
  try {
    return await client.fetch(LEGACY_POST_BY_SLUG_QUERY, { slug }, fetchOptions)
  } catch (error) {
    console.error('Error fetching legacy post by slug:', error)
    return null
  }
}
