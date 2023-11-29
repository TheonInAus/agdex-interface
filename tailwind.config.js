const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "app/**/*.{ts,tsx,js}",
    "components/**/*.{ts,tsx,js}",
    "pages/**/*.{ts,tsx,js}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        boxBackground: "#FFFFFF15",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        "0xgrey": {
          DEFAULT: "#CFCFCF",
          foreground: "#CFCFCF",
        },
        "0xbox": {
          DEFAULT: "#FFFFFF10",
          foreground: "#FFFFFF10",
        },
        "0xboxBackground": {
          DEFAULT: "#FFFFFF08",
          foreground: "#FFFFFF08",
        },
        "0xgreen": {
          DEFAULT: "#03BB70",
          foreground: "#02A864",
        },
        "0xred": {
          DEFAULT: "hsl(0 72.2% 50.6%)",
          foreground: "hsl(0 85.7% 97.3%)",
        },
        "0xredLighter": {
          DEFAULT: "#FF4A4A",
          foreground: "#FF4A4A",
        },
        "0xyellow": {
          DEFAULT: "hsl(20.5 90.2% 48.2%)",
          foreground: "hsl(60 9.1% 97.8%)",
        },
        "0xyellow-lighter": {
          DEFAULT: "#E0A202",
          foreground: "#E0A202",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
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
        xl: `calc(var(--radius) + 2px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
