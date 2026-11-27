/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--color-bg-main, #0B0D0F)',
          secondary: 'var(--color-bg-secondary, #14171A)',
          card: 'var(--color-bg-card, #1B1F23)',
          elevated: 'var(--color-bg-elevated, #242A30)',
        },
        primary: {
          DEFAULT: 'var(--color-primary, #FF6B24)',
          hover: 'var(--color-primary-hover, #FF8C42)',
          dark: '#E0530E',
        },
        text: {
          DEFAULT: 'var(--color-text-main, #FFFFFF)',
          secondary: 'var(--color-text-secondary, #A1A7AE)',
          muted: '#6B7280',
        },
        border: {
          DEFAULT: 'var(--color-border, #2C3238)',
          light: '#3D444D',
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Sora', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(255, 107, 36, 0.4)',
        'glow-subtle': '0 0 15px -3px rgba(255, 107, 36, 0.2)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
