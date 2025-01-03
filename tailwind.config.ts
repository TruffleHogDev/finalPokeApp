import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "off-white": "#fffffe",
        cardstock: "#f9f4ef",
        highlight: "#8c7851",
        secondary: "#eaddcf",
      },
    },
  },
  plugins: [],
} satisfies Config;
