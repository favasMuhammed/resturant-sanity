# Theme System Documentation

## Overview

The theme system is now **completely independent** from browser theme detection. Users have full control over the theme through manual toggle, and the system remembers their preference.

## Key Features

- ✅ **No Browser Detection**: Completely independent from `prefers-color-scheme`
- ✅ **Manual Control**: Users toggle theme via UI controls
- ✅ **Persistent Storage**: Theme preference saved in localStorage
- ✅ **No Flash**: Prevents theme flash during page load
- ✅ **Global State**: Theme state managed via React Context
- ✅ **TypeScript Support**: Full type safety

## Architecture

### 1. Theme Context (`src/contexts/ThemeContext.tsx`)
- Manages global theme state
- Provides theme utilities to components
- Handles localStorage persistence
- Independent from browser detection

### 2. Theme Toggle Component (`src/components/ThemeToggle.tsx`)
- Animated sun/moon toggle button
- Uses theme context for state management
- Accessible and responsive design

### 3. Theme Wrapper (`src/components/ThemeWrapper.tsx`)
- Client-side wrapper for ThemeProvider
- Prevents hydration issues

### 4. Theme Utilities (`src/utils/themeUtils.ts`)
- Pure utility functions for theme management
- No React dependencies
- Can be used in any context

### 5. Theme-Aware Component (`src/components/ThemeAware.tsx`)
- Conditional rendering based on theme
- Useful for theme-specific content

## Usage

### Basic Theme Toggle
```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, setTheme, toggleTheme, isDark } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

### Theme-Aware Rendering
```tsx
import ThemeAware from '@/components/ThemeAware';

function MyComponent() {
  return (
    <ThemeAware
      light={<div>Light mode content</div>}
      dark={<div>Dark mode content</div>}
    />
  );
}
```

### Using Theme Utilities
```tsx
import { getStoredTheme, setStoredTheme, applyThemeToDocument } from '@/utils/themeUtils';

// Get stored theme
const theme = getStoredTheme();

// Set theme
setStoredTheme('dark');

// Apply to document
applyThemeToDocument('dark');
```

## CSS Classes

### Light Theme (Default)
- Uses default CSS variables
- No additional classes needed

### Dark Theme
- Applied via `.dark` class on `html` element
- Uses dark theme CSS variables

### Tailwind Classes
```tsx
// These automatically adapt to theme
<div className="bg-background text-foreground">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>

// Manual theme-specific classes
<div className="bg-white dark:bg-gray-800">
  <p className="text-gray-900 dark:text-gray-100">Content</p>
</div>
```

## Theme Variables

### Light Theme Variables
```css
:root {
  --background: #fefefe;
  --foreground: #1a0f08;
  --primary: #cd853f;
  --secondary: #daa520;
  --accent: #deb887;
  --muted: #f5f5dc;
  --muted-foreground: #8b7355;
  --border: #e5d5c8;
  --input: #e5d5c8;
  --ring: #cd853f;
}
```

### Dark Theme Variables
```css
.dark {
  --background: #1a0f08;
  --foreground: #f5f5dc;
  --primary: #cd853f;
  --secondary: #daa520;
  --accent: #deb887;
  --muted: #2c1810;
  --muted-foreground: #d2b48c;
  --border: #4a2c17;
  --input: #4a2c17;
  --ring: #cd853f;
}
```

## Implementation Details

### 1. No Browser Detection
- Removed `@media (prefers-color-scheme: dark)` from CSS
- Removed `window.matchMedia('(prefers-color-scheme: dark)')` from JavaScript
- Theme is purely user-controlled

### 2. Flash Prevention
- Inline script in HTML head applies theme before React hydration
- Prevents theme flash during page load
- Graceful fallback to light theme

### 3. State Management
- React Context for global theme state
- localStorage for persistence
- Automatic synchronization between context and DOM

### 4. Type Safety
- TypeScript interfaces for all theme-related types
- Strict typing for theme values ('light' | 'dark')
- Type-safe utility functions

## File Structure

```
src/
├── contexts/
│   └── ThemeContext.tsx          # Theme context provider
├── components/
│   ├── ThemeToggle.tsx           # Theme toggle button
│   ├── ThemeWrapper.tsx          # Client-side wrapper
│   └── ThemeAware.tsx            # Theme-aware component
├── hooks/
│   └── useTheme.ts               # Re-export hook
├── utils/
│   └── themeUtils.ts             # Theme utilities
└── app/
    └── layout.tsx                # Root layout with theme script
```

## Migration Notes

### What Changed
1. **Removed**: `@media (prefers-color-scheme: dark)` CSS
2. **Removed**: Browser theme detection in JavaScript
3. **Added**: Manual theme control system
4. **Added**: Theme context and utilities
5. **Added**: Flash prevention script

### What Stayed the Same
1. **CSS Variables**: Same variable names and values
2. **Tailwind Classes**: All `dark:` classes still work
3. **Component API**: No breaking changes to existing components
4. **Styling**: Visual appearance remains identical

## Best Practices

1. **Always use the theme context** instead of direct localStorage access
2. **Use CSS variables** for theme-aware styling
3. **Test both themes** during development
4. **Use ThemeAware component** for conditional content
5. **Avoid hardcoded colors** in favor of theme variables

## Troubleshooting

### Theme Not Persisting
- Check if localStorage is available
- Verify theme context is properly wrapped
- Ensure theme utilities are used correctly

### Theme Flash on Load
- Verify inline script is in HTML head
- Check if script runs before React hydration
- Ensure theme is applied to document element

### Styling Issues
- Use CSS variables instead of hardcoded colors
- Check if `.dark` class is applied correctly
- Verify Tailwind dark mode configuration
