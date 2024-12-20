import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBackground: "#cea384",  
        customText: "#92959a",
        custombutton:"#d4553a",
        customtextopacity:"#c5c4c4",
        buttonhovercolor:"#f2f2f2",
        texthovercolor:"#6d7178",
        hovercolor3:"#0006",
        detailbuttonbackground:"#e96d00",
        texthovercolor1:"#a8a8a8"
      },
    },
  },
  plugins: [],
};

export default config;
