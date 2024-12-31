import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/interfaces/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1C448E",
        secondary: "#FF4E33",
        carbon: "#212121",
      },
      backgroundColor: {
        primary: {
          DEFAULT: "#1C448E",
          dark: "#1b4188",
        },
        secondary: "#FF4E33",
        carbon: "#212121",
        gray: {
          DEFAULT: "#CCC",
          light: "#EEE",
          "light-2": "#fafafa"          
        },
      },
      borderColor: {
        primary: "#1C448E",
        secondary: "#FF4E33",
        carbon: "#212121",
        gray: {
          DEFAULT: "#CCC",
          light: "#EEE",
        },
      },
      ringColor: {
        primary: "#1C448E",
        secondary: "#FF4E33",
        carbon: "#212121",
        gray: {
          DEFAULT: "#CCC",
          light: "#EEE",
        },
      },
      boxShadow: {
        pressed: "inset 0px 2px 1px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
