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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#45000e",
        "primary-container": "#631621",
        "on-primary-container": "#e77c83",
        secondary: "#556157",
        "on-surface": "#1c1c18",
        "on-surface-variant": "#554243",
        outline: "#887272",
        "outline-variant": "#dbc0c1",
        amora: {
          cream:      '#fdf9f3',
          parchment:  '#F3EFE6',
          gold:       '#DCA963',
          terracotta: '#C87453',
          rose:       '#D6707C',
          ink:        '#1C1C18',
          faded:      '#887272',
          seal:       '#45000e',
          navy:       '#1C1C18',
          dark:       '#1C1C18',
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        handwriting: ["var(--font-handwriting)", "cursive"],
        ui: ["var(--font-ui)", "sans-serif"],
        "label-caps": ["Hanken Grotesk", "sans-serif"],
        "body-md": ["Libre Caslon Text", "serif"],
        "headline-md": ["Libre Caslon Text", "serif"],
        "ui-standard": ["Hanken Grotesk", "sans-serif"],
        "display-lg-mobile": ["Libre Caslon Text", "serif"],
        "display-lg": ["Libre Caslon Text", "serif"],
        "body-lg": ["Libre Caslon Text", "serif"],
      },
      fontSize: {
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.1em", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "26px", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "40px", fontWeight: "400" }],
        "ui-standard": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "display-lg-mobile": ["36px", { lineHeight: "44px", fontWeight: "400" }],
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "body-lg": ["20px", { lineHeight: "32px", fontWeight: "400" }],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      spacing: {
        "margin-page": "64px",
        "margin-mobile": "24px",
        gutter: "32px",
        unit: "8px",
        "section-gap": "120px",
      },
    },
  },
  plugins: [],
};
export default config;
