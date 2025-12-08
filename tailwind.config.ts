import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        '720': '720px',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Mint Cream Brand Colors
        mint: {
          50: "#E8FAF0",
          100: "#C9F4D4",
          200: "#80EFC0",
          300: "#9DE8B0",
          400: "#6AE8BC",
        },
        // Text Colors
        "text-primary": "#1E5A3B",
        "text-secondary": "#2D7A52",
        "text-subtle": "#4A9A6A",
        // Complementary Colors
        "complementary": {
          "blush-pink": "#FFE5EC",
          "butter-yellow": "#FFFBCC",
          "powder-blue": "#D4E4F7",
          "warm-beige": "#F5F1E8",
        },
        primary: {
          DEFAULT: "#1E5A3B",
          50: "#E8FAF0",
          100: "#C9F4D4",
          200: "#80EFC0",
          300: "#9DE8B0",
          400: "#6AE8BC",
          500: "#1E5A3B",
          600: "#2D7A52",
          700: "#4A9A6A",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#2D7A52",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#80EFC0",
          foreground: "#1E5A3B",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

