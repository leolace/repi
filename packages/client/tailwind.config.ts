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
        primary: "#1C448E",
				secondary: "#FF4E33",
        carbon: "#212121",
      },
      backgroundColor: {
        primary: "#1C448E",
				secondary: "#FF4E33",
        carbon: "#212121",
      },
      borderColor: {
        primary: "#1C448E",
				secondary: "#FF4E33",
        carbon: "#212121",
        gray: "#CCC",
      }
    },
  },
  plugins: [],
};
export default config;
