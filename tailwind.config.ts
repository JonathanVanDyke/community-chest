import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        aqua: {
          "50": "#effefa",
          "100": "#c7fff2",
          "200": "#8affe4",
          "300": "#50f8d7",
          "400": "#1de4c4",
          "500": "#04c8ab",
          "600": "#00a18d",
          "700": "#058071",
          "800": "#0a655c",
          "900": "#0d544c",
          "950": "#003330",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
