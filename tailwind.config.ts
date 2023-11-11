import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        fancy: ["Domine", "serif"],
        modern: ["Red Hat Display", "sans-serif"],
      },
      colors: {
        "mat-black-base": "#121212",
        "mat-black-1": "#1e1e1e",
        "mat-black-2": "#222222",
        "mat-black-3": "#242424",
        "mat-black-4": "#272727",
        "mat-black-5": "#2c2c2c",
        "mat-black-6": "#2e2e2e",
        "mat-black-7": "#333333",
        "mat-black-8": "#343434",
        "mat-black-9": "#383838",
      },
    },
  },
  plugins: [],
};
export default config;
