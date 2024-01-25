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
      flexBasis: {
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
      },
      boxShadow: {
        top: "0rem -1px 7px #ccc",
      },
    },
  },
  plugins: [],
};
export default config;
