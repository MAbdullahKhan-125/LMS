/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22"
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f"
        }
      },
      boxShadow: {
        "glow-emerald":
          "0 0 25px rgba(5, 150, 105, 0.20), 0 0 60px rgba(5, 150, 105, 0.10)",
        "glow-gold":
          "0 0 25px rgba(217, 119, 6, 0.18), 0 0 60px rgba(217, 119, 6, 0.08)",
        floating:
          "0 20px 50px rgba(15, 23, 42, 0.12), 0 8px 24px rgba(15, 23, 42, 0.08)"
      }
    }
  }
};