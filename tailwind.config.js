module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      dark: "#1A1A1A",
      white: "#ffffff",
      "light-grey": "#E5E5E5",
      grey: "#A9A9B9",
      primary: "#3C7A72",
      secondary: "#D8E4E3",
    },
    maxWidth: {
      wrapper: "980px",
      text: "680px",
      half: "50%",
    },
    spacing: {
      0.25: "0.25rem",
      0.5: "0.5rem",
      0.75: "0.75rem",
      1: "1rem",
      1.25: "1.25rem",
      1.5: "1.5rem",
      1.75: "1.75rem",
      2: "2rem",
      2.25: "2.25rem",
      2.5: "2.5rem",
      2.75: "2.75rem",
      3: "3rem",
      3.25: "3.25rem",
      3.5: "3.5rem",
      3.75: "3.75rem",
      4: "4rem",
      4.25: "4.25rem",
      4.5: "4.5rem",
      4.75: "4rem",
      5: "5rem",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  variants: {
    extend: {
      boxShadow: {
        shadow:
          "0px 16px 20px rgba(0, 0, 0, 0.05), 0px 8px 12px rgba(0, 0, 0, 0.1), 0px 1px 4px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
}
