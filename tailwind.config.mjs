/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./hugo_stats.json",
    "./themes/**/layouts/**/*.html",
    "./layouts/**/*.html",
    "./content/**/*.md",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Sohne", "sans-serif"],
        mono: ["Sohne Mono", "monospace"],
      },
      colors: {
        primary: {
          light: "#fdfbf7",
          DEFAULT: "#2c2c2c",
          dark: "#1a1614",
        },
        secondary: {
          light: "#f5f2ed",
          DEFAULT: "#5a5a5a",
          dark: "#252220",
        },
        accent: {
          light: "#8b6f47",
          DEFAULT: "#8b6f47",
          dark: "#d4a76a",
        },
        "theme-border": {
          DEFAULT: "#E0E0E0",
          dark: "#2A2A2A",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme("fontFamily.inter").join(", "),
            maxWidth: "none",
            color: "var(--color-text-primary)",
            a: {
              color: "var(--color-accent)",
              "&:hover": {
                color: "var(--color-accent-hover)",
              },
              textDecoration: "underline",
            },
            h1: {
              fontFamily: theme("fontFamily.inter").join(", "),
              color: "var(--color-text-primary)",
            },
            h2: {
              fontFamily: theme("fontFamily.inter").join(", "),
              color: "var(--color-text-primary)",
            },
            h3: {
              fontFamily: theme("fontFamily.inter").join(", "),
              color: "var(--color-text-primary)",
            },
            h4: {
              fontFamily: theme("fontFamily.inter").join(", "),
              color: "var(--color-text-primary)",
            },
            code: {
              fontFamily: theme("fontFamily.mono").join(", "),
              color: "var(--color-text-primary)",
              backgroundColor: "var(--color-bg-tertiary)",
              borderRadius: "0.25rem",
              padding: "0.25rem 0.5rem",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            blockquote: {
              borderLeftColor: "var(--color-accent)",
              color: "var(--color-text-secondary)",
            },
          },
        },
      }),
    },
  },
  plugins: [],
};
