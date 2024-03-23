/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}",],
  theme: {
    colors: {
      "primary": "var(--primary)",
      "secondary": "var(--secondary)",
      "default": "var(--text-default)",
      "verified": "var(--verified-text)",
      "unverified": "var(--unverified-text)"
    },
    extend: {},
  },
  plugins: [],
}

