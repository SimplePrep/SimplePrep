/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'laptop': '1024px',  // New custom breakpoint for laptops
        'monitor': '1440px',  // New custom breakpoint for monitors
      },
      maxWidth: {
        'laptop': '900px',   // Custom max-width for laptops
        'monitor': '1200px', // Custom max-width for monitors
      },
      fontFamily:{
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'montserrat': ["Montserrat", 'sans-serif'],
        'opensans': ["Open Sans", 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        blink: {
          '0%, 50%, 100%': { opacity: 1 },
          '25%, 75%': { opacity: 0 },
        },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        shimmer: 'shimmer 1.5s infinite',
        blink: 'blink 10s ease-in-out infinite',

      },
    },
  },
  plugins: [],
}

