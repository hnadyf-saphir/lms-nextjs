/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: "#699F11",
        secondaryGreen: "#EDFBCC",
        textColor: "#4F4F4F",
        btnColor: "#E21B44",
      },
      screens: {
        /* xs: "400px",
         "3xl": "1680px",
         "4xl": "2200px",
         */
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },

      borderRadius: {
        "5xl": "40px",
      },

      backgroundImage: {
        'hero-bg': "url('/hero-bg.png')"
      },

      fontFamily: {
        playfair: ["var(--font-playfair)"],
        barlow: ["var(--font-barlow)"],
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  plugins: [],
};
