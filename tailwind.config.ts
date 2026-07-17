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
      },
    },
  },
  plugins: [],
};
export default config;
