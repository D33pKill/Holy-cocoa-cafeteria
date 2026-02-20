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
                cream: {
                    DEFAULT: "#FFFDF9",
                    50: "#FFFDF9",
                    100: "#FFF8EE",
                    200: "#FDEFD8",
                },
                choco: {
                    DEFAULT: "#2D1810",
                    light: "#5C3A2A",
                    medium: "#8B5E3C",
                },
                gold: {
                    DEFAULT: "#D4AF37",
                    light: "#F0D060",
                    dark: "#A8861A",
                },
                "pink-pastel": "#FCE7E9",
                "pink-light": "#F8D7DA",
                caramel: "#D4915A",
            },
            fontFamily: {
                display: ["var(--font-playfair)", "Georgia", "serif"],
                body: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            boxShadow: {
                card: "0 4px 24px -2px rgba(45,24,16,0.10)",
                "card-hover": "0 18px 48px -4px rgba(212,175,55,0.22)",
                "glow-gold": "0 0 22px rgba(212,175,55,0.45)",
            },
        },
    },
    plugins: [],
};

export default config;
