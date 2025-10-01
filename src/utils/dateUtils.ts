/**
 * Date utility functions for consistent formatting across server and client
 */

/**
 * Format a date consistently for display
 * Uses a fixed format to prevent hydration mismatches
 * @param date - Date string or Date object
 * @returns Formatted date string (MM/DD/YYYY)
 */
export function formatDate(date: string | Date): string {
  const dateObj = new Date(date);
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  // Format as MM/DD/YYYY to ensure consistency between server and client
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${month}/${day}/${year}`;
}

/**
 * Format a date for display with a fallback
 * @param date - Date string or Date object
 * @param fallback - Fallback text if date is invalid
 * @returns Formatted date string or fallback
 */
export function formatDateWithFallback(date: string | Date, fallback: string = 'TBD'): string {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return fallback;
  }
  
  return formatDate(dateObj);
}

/**
 * Get relative time (e.g., "2 days ago", "in 3 days")
 * @param date - Date string or Date object
 * @returns Relative time string
 */
export function getRelativeTime(date: string | Date): string {
  const dateObj = new Date(date);
  const now = new Date();
  const diffInMs = dateObj.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  if (diffInDays === 0) {
    return 'Today';
  } else if (diffInDays === 1) {
    return 'Tomorrow';
  } else if (diffInDays === -1) {
    return 'Yesterday';
  } else if (diffInDays > 0) {
    return `In ${diffInDays} day${diffInDays === 1 ? '' : 's'}`;
  } else {
    return `${Math.abs(diffInDays)} day${Math.abs(diffInDays) === 1 ? '' : 's'} ago`;
  }
}
