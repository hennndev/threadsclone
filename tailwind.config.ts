import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "primary-light": "var(--bg-primary-light)",
        "primary-dark": "var(--bg-primary-dark)"
      },
      colors: {
        "primary-light": "var(--primary-light)",
        "primary-dark": "var(--primary-dark)"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: ["class"]
}
export default config
