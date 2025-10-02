'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'text';
  className?: string;
}

export default function ThemeToggle({ variant = 'icon', className = '' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  if (variant === 'text') {
    return (
      <button
        onClick={toggleTheme}
        className={`text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 ${className}`}
        aria-label="Toggle theme"
      >
        Theme: {isDark ? 'Dark' : 'Light'}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg bg-muted/80 backdrop-blur-sm border border-border/50 hover:bg-muted transition-all duration-300 group focus-ring ${className}`}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 w-5 h-5 text-primary transition-all duration-500 group-hover:scale-110 ${
            isDark ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <Moon 
          className={`absolute inset-0 w-5 h-5 text-accent transition-all duration-500 group-hover:scale-110 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
          }`}
        />
      </div>
    </button>
  );
}
