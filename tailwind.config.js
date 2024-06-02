/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "grad-hov":
          // " repeating-conic-gradient(from var(--d), #fff 0%,#fff 25%,transparent 25%,transparent 50% )",
          "linear-gradient(var(--d), red 50%, transparent 50% )",
      },
      animation: {
        anim: "anim .65s forwards",
        anim1: "anim1 .65s forwards",
      },
      keyframes: {
        anim: {
          to: {
            "--d": "180deg",
          },
        },
        anim1: {
          from: {
            "--d": "180deg",
          },
          to: {
            "--d": "0deg",
          },
        },
      },
      colors: {
        "custom-theme": {
          DEFAULT: "#356c6c",
          50: "#356c6c10",
          100: "#356c6c30",
          200: "#356c6c50",
          300: "#356c6c70",
          400: "#356c6c90",
          500: "#356c6ca0",
          600: "#356c6cb0",
          700: "#356c6cc0",
          800: "#356c6ce0",
          900: "#356c6cd0",
        },

        "btn-theme": {
          DEFAULT: "#16b054",
          50: "#16b05410",
          100: "#16b05430",
          200: "#16b05450",
          300: "#16b05470",
          400: "#16b05490",
          500: "#16b054a0",
          600: "#16b054b0",
          700: "#16b054c0",
          800: "#16b054e0",
          900: "#16b054d0",
        },
      },
    },
  },
  plugins: [],
};
