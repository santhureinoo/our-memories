/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          primary: {
            50: '#fef7f7',
            100: '#fdeaea',
            200: '#fbd5d5',
            300: '#f7b2b2',
            400: '#f18a8a',
            500: '#e85d5d',
            600: '#d63c3c',
            700: '#b42d2d',
            800: '#952929',
            900: '#7c2727',
          },
          romantic: {
            pink: '#ff6b9d',
            rose: '#ff8fab',
            coral: '#ffaab7',
            peach: '#ffc3c3',
            lavender: '#e8b4ff',
            mint: '#b4ffb4',
          },
          timeline: {
            past: '#6b7280',
            present: '#ef4444',
            future: '#8b5cf6',
          }
        },
        fontFamily: {
          sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
          mono: ['var(--font-geist-mono)', 'monospace'],
          script: ['Dancing Script', 'cursive'],
          elegant: ['Playfair Display', 'serif'],
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-up': 'slideUp 0.5s ease-out',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'float': 'float 6s ease-in-out infinite',
          'heart-beat': 'heartBeat 1.5s ease-in-out infinite',
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
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          heartBeat: {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' },
          },
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'romantic-gradient': 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 25%, #ffaab7 50%, #ffc3c3 75%, #e8b4ff 100%)',
        },
      },
    },
    plugins: [],
  }