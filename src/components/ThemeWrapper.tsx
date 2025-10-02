'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </ErrorBoundary>
  );
}
