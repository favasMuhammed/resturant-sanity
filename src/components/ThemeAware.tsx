'use client';

import { ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeAwareProps {
  children: ReactNode;
  light?: ReactNode;
  dark?: ReactNode;
  className?: string;
}

export default function ThemeAware({ 
  children, 
  light, 
  dark, 
  className = '' 
}: ThemeAwareProps) {
  const { isDark } = useTheme();

  // If specific light/dark content is provided, use that
  if (light !== undefined || dark !== undefined) {
    return (
      <div className={className}>
        {isDark ? dark : light}
      </div>
    );
  }

  // Otherwise, render children with theme-aware classes
  return (
    <div className={className}>
      {children}
    </div>
  );
}
