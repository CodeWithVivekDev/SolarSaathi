/**
 * SolarSaathi Shared Design Tokens
 * Derived from docs/design-reference.jpg visual direction
 */

export const tokens = {
  colors: {
    canvas: {
      default: '#eaedf0',
      subtle: '#f4f6f8',
    },
    surface: {
      default: '#ffffff',
      elevated: '#fcfdfd',
      sage: '#f0f7ee',
      sageBorder: '#d4e7cd',
    },
    brand: {
      green: '#2e7d32',
      greenHover: '#256629',
      greenLight: '#e8f5e9',
      greenSubtle: '#f0f7ee',
      dark: '#111418',
      darkHover: '#1f242d',
    },
    text: {
      primary: '#111827',
      secondary: '#4b5563',
      muted: '#6b7280',
      light: '#9ca3af',
    },
    accent: {
      gold: '#f59e0b',
      amber: '#d97706',
      sky: '#0284c7',
    }
  },
  typography: {
    fontDisplay: 'Outfit, system-ui, sans-serif',
    fontBody: 'Plus Jakarta Sans, system-ui, sans-serif',
  },
  radii: {
    frame: '28px',
    card: '18px',
    pill: '9999px',
  },
  shadows: {
    mockup: '0 30px 60px -15px rgba(0, 0, 0, 0.10), 0 10px 25px -5px rgba(0, 0, 0, 0.04)',
    card: '0 16px 36px -8px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
    pill: '0 4px 14px rgba(0, 0, 0, 0.08)',
  }
} as const;
