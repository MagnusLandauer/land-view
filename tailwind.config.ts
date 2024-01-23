import type { Config } from "tailwindcss"
const { nextui } = require("@nextui-org/react")

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#111111",
        light: "#f9f8eb",
        leaf: "#76b39d",
        primary: "#589e85",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: "#589e85",
            secondary: "#76b39d",
            background: "#111111",
          },
        },
        light: {
          colors: {
            primary: "#589e85",
            secondary: "#76b39d",
            background: "#efefef",
          },
        },
      },
    }),
  ],
}
export default config
