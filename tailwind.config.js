/** @type {import('tailwindcss').Config} */
module.exports = {
  images: {
    domains: ['assets.coingecko.com'],
    formats: ["image/webp"],
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      'xxs': '11px',
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      backgroundImage: theme => ({
        'banner1': "url('../public/banner_2.jpg')",
        'banner2': "url('../public/banner_2.jpg')",
        'banner3': "url('../public/banner_3.jpg')",
      })
    },
  },
  plugins: [],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },

}
