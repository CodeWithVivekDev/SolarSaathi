/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#eaedf0',
          subtle: '#f4f6f8',
        },
        surface: {
          DEFAULT: '#ffffff',
          elevated: '#fcfdfd',
          sage: '#f0f7ee',
        },
        brand: {
          green: '#2e7d32',
          'green-hover': '#256629',
          'green-light': '#e8f5e9',
          'green-border': '#d4e7cd',
          dark: '#111418',
          'dark-hover': '#1f242d',
        },
        solar: {
          amber: '#f59e0b',
          gold: '#d97706',
          sky: '#0284c7',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'frame': '28px',
        'card': '18px',
      },
      boxShadow: {
        'mockup': '0 30px 60px -15px rgba(0, 0, 0, 0.10), 0 10px 25px -5px rgba(0, 0, 0, 0.04)',
        'elevated': '0 16px 36px -8px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'pill': '0 4px 14px rgba(0, 0, 0, 0.08)',
        'hover': '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.2)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
