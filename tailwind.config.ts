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
          cream:      '#FAF7F2',
          parchment:  '#F3EFE6',
          gold:       '#DCA963',
          terracotta: '#C87453',
          rose:       '#D6707C',
          ink:        '#0C231C',
          faded:      '#627D74',
          seal:       '#9B3D3D',
          navy:       '#162722',
          dark:       '#071510',
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
