import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const { projectId, dataset } = client.config()

export const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

export const getImageUrl = (source: SanityImageSource, width?: number, height?: number, quality: number = 90) => {
  // Check if source is valid and has required properties
  if (!source || typeof source !== 'object') {
    console.warn('Invalid source provided to getImageUrl:', source)
    return null
  }
  
  // Check if it's a valid image object with asset
  if (!('_type' in source) || source._type !== 'image' || !('asset' in source) || !source.asset) {
    console.warn('Source is not a valid image object:', source)
    return null
  }
  
  const builder = urlFor(source)
  if (!builder) {
    console.warn('Failed to create image URL builder for source:', source)
    return null
  }
  
  try {
    let imageBuilder = builder
    if (width) imageBuilder = imageBuilder.width(width)
    if (height) imageBuilder = imageBuilder.height(height)
    
    // Add quality parameter for better image quality
    imageBuilder = imageBuilder.quality(quality)
    
    // Add format optimization
    imageBuilder = imageBuilder.format('auto')
    
    const url = imageBuilder.url()
    return url
  } catch (error) {
    console.warn('Error generating image URL:', error, 'Source:', source)
    return null
  }
}

// High-quality image function for gallery and hero images
export const getHighQualityImageUrl = (source: SanityImageSource, width?: number, height?: number) => {
  return getImageUrl(source, width, height, 95) // 95% quality for high-res images
}

// Medium quality for thumbnails and cards
export const getMediumQualityImageUrl = (source: SanityImageSource, width?: number, height?: number) => {
  return getImageUrl(source, width, height, 85) // 85% quality for balanced size/quality
}

// Low quality for small icons and avatars
export const getLowQualityImageUrl = (source: SanityImageSource, width?: number, height?: number) => {
  return getImageUrl(source, width, height, 75) // 75% quality for small images
}
