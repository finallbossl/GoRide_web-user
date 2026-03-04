import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1C1917",
          muted: "#44403C",
        },
        cta: {
          DEFAULT: "#CA8A04",
          hover: "#A16207",
        },
        accent: {
          DEFAULT: "#EAB308",
        },
        surface: "#FAFAF9",
        border: "#E7E5E4",
        'rich-text': "#0C0A09",
      },
      borderRadius: {
        'luxury': '12px',
        'luxury-lg': '20px',
        'luxury-xl': '40px',
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      fontFamily: {
        sans: ["Jost", "sans-serif"],
        heading: ["Bodoni Moda", "serif"],
      },
      boxShadow: {
        'soft-md': '0 4px 6px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 15px rgba(0, 0, 0, 0.08)',
        'luxury-xl': '0 20px 25px rgba(0, 0, 0, 0.12)',
        'luxury-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};
export default config;
