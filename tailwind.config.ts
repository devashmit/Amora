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
        amora: {
          cream:      '#FDF6EC',
          parchment:  '#F5E6D3',
          gold:       '#B8976A',
          terracotta: '#C17B5C',
          rose:       '#D4879C',
          ink:        '#2C1810',
          faded:      '#8B7355',
          seal:       '#8B3A3A',
          navy:       '#1a2744',
          dark:       '#1a0f0a',
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
