/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "rose-gold": {
          100: "#e5d0c8",
          200: "#d4b0a4",
          300: "#cba091",
          400: "#ba816d",
          500: "#a96148",
          600: "#874e3a",
          700: "#653a2b",
          800: "#44271d",
          900: "#22130e",
        },
        "dark-blue": {
          100: "#d1d2d9",
          200: "#a3a4b3",
          300: "#75778c",
          400: "#474966",
          500: "#191c40",
          600: "#141633",
          700: "#0f1126",
          800: "#0a0b1a",
          900: "#05060d",
        },
        gold: {
          100: "#f0eade",
          200: "#e0d5bc",
          300: "#d1c19b",
          400: "#c1ac79",
          500: "#b29758",
          600: "#8e7946",
          700: "#6b5b35",
          800: "#473c23",
          900: "#241e12",
        },
        "text-color": {
          100: "#f3f2f2",
          200: "#e7e6e6",
          300: "#dbd9d9",
          400: "#cfcdcd",
          500: "#c3c0c0",
          600: "#9c9a9a",
          700: "#757373",
          800: "#4e4d4d",
          900: "#272626",
        },
        "secondary-blue": {
          100: "#dedfe5",
          200: "#bebfcb",
          300: "#9d9fb0",
          400: "#7d7f96",
          500: "#5c5f7c",
          600: "#4a4c63",
          700: "#37394a",
          800: "#252632",
          900: "#121319",
        },
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0%" },
          to: { opacity: "100%" },
        },
        "fade-out": {
          to: { display: "none", opacity: "0%" },
          from: { display: "block", opacity: "100%" },
        },
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "top center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "bottom center",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 1s ease-in-out",
        "fade-out": "fade-out 0.5s ease-in-out",
        gradient: "gradient 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-3d")],
};
