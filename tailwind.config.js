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
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        1: "0.2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
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
        bronze: {
          DEFAULT: "#83DED5",
          foreground: "#77CDC4",
        },
        "0xPrimary": {},
        "0xblack": {
          DEFAULT: "#080808",
          foreground: "#080808",
        },
        "0xgrey": {
          DEFAULT: "#CFCFCF",
          foreground: "#CFCFCF",
        },
        "0xline": {
          DEFAULT: "var(--primary-foreground)",
          foreground: "var(--primary-foreground)",
        },
        "0xdialog": {
          DEFAULT: "var(--card)",
          foreground: "var(--card)",
        },
        "0xtrans": {
          DEFAULT: "#FFFFFF00",
          foreground: "#FFFFFF00",
        },
        "0xbox": {
          DEFAULT: "#FFFFFF10",
          foreground: "#FFFFFF10",
        },
        "0xboxBackground": {
          DEFAULT: "#FFFFFF08",
          foreground: "#FFFFFF08",
        },
        "0xsmallBoxBackground": {
          DEFAULT: "#2F2F2F",
          foreground: "#2F2F2F",
        },
        "0xgreen": {
          DEFAULT: "#03BB70",
          foreground: "#02A864",
        },
        "0xred": {
          DEFAULT: "#FF4A4A",
          foreground: "#DB4242",
        },
        "0xyellow": {
          DEFAULT: "#E96E27",
          foreground: "#BB5A22",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          hover: "var(--accent-hover)"
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
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
