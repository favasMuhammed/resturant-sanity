/**
 * Theme utility functions for managing theme state
 * Independent from browser theme detection
 */

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

/**
 * Get the current theme from localStorage
 * @returns Theme or null if not set
 */
export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
}

/**
 * Set the theme in localStorage
 * @param theme - The theme to store
 */
export function setStoredTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Get the default theme (light)
 * @returns 'light'
 */
export function getDefaultTheme(): Theme {
  return 'light';
}

/**
 * Toggle between light and dark themes
 * @param currentTheme - The current theme
 * @returns The opposite theme
 */
export function toggleTheme(currentTheme: Theme): Theme {
  return currentTheme === 'light' ? 'dark' : 'light';
}

/**
 * Apply theme to document element
 * @param theme - The theme to apply
 */
export function applyThemeToDocument(theme: Theme): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * Get the current theme from the document element
 * @returns Theme based on document class
 */
export function getThemeFromDocument(): Theme {
  if (typeof document === 'undefined') return 'light';
  
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/**
 * Initialize theme on page load
 * This should be called before React hydration to prevent flash
 */
export function initializeTheme(): Theme {
  const storedTheme = getStoredTheme();
  const theme = storedTheme || getDefaultTheme();
  
  applyThemeToDocument(theme);
  return theme;
}
