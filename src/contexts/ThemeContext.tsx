'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    try {
      // Load theme from localStorage on mount (independent from browser)
      const savedTheme = localStorage.getItem('theme') as Theme;
      
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setThemeState(savedTheme);
        // Apply theme immediately
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      } else {
        // Default to light theme
        setThemeState('light');
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      // Fallback to light theme if localStorage access fails
      console.warn('Failed to load theme from localStorage:', error);
      setThemeState('light');
      document.documentElement.classList.remove('dark');
    }
    
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Only run on client side and when initialized
    if (typeof window === 'undefined' || !isInitialized) return;

    try {
      // Apply theme to document
      const root = document.documentElement;
      
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }

      // Save to localStorage
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Failed to apply theme or save to localStorage:', error);
    }
  }, [theme, isInitialized]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // During development, provide a fallback to prevent Fast Refresh errors
    if (process.env.NODE_ENV === 'development') {
      console.warn('useTheme called outside of ThemeProvider, using fallback');
      return {
        theme: 'light' as Theme,
        setTheme: () => {},
        toggleTheme: () => {},
        isDark: false
      };
    }
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
