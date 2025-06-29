export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px'
} as const;

export const CONTAINER_SIZES = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
} as const;

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem'
} as const;

// For Penpot Design System
export const DESIGN_TOKENS = {
  fontSizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem'
  },
  animations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms'
  }
} as const;

// Temporary GIF placeholders
export const PLACEHOLDER_GIFS = {
  loading: '/loading-placeholder.gif',
  success: '/success-placeholder.gif',
  error: '/error-placeholder.gif'
} as const;