/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
