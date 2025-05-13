/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{html,ts,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        secondary: '#10B981',
        accent: '#F59E0B',
        dark: '#1F2937',
        light: '#F9FAFB',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Montserrat"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        glow: '0 0 15px rgba(14, 165, 233, 0.5)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(14, 165, 233, 0.25)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            lineHeight: '1.75',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
