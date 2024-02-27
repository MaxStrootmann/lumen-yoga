import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      black: "#000",
      white: "#fff",
      yellow: "#EFAD5B",
      magenta: "#B361A4",
      purple: "#7663A8",
      blue: "#80A5D7",
      green: "#AED9B3",
    },
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      fontFamily: {
        sans: [
          "Inter",
          "Roboto",
          "Helvetica Neue",
          "Arial Nova",
          "Nimbus Sans",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
