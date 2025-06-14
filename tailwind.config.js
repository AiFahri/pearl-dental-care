import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                lexend: ["Lexend", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: "#C9B8A6",
                secondary: "#806444",
                tertiary: "#BCA78C",
                vanilla: "#F1E9DC",
            },
        },
    },

    plugins: [forms],
};
