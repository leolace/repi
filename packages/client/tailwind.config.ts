import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
          "light-2": "#fafafa",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindAnimate],
};
export default config;
