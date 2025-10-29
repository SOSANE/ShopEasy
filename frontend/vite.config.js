import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import babel from "vite-plugin-babel";
import { extname } from "path";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";

// https://masteringjs.io/tutorials/node/__dirname-is-not-defined
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: ["babel-plugin-react-compiler", "@babel/plugin-syntax-jsx"],
        // loader: path => {
        //   if (extname(path) === ".jsx") {
        //     return "jsx";
        //   }
        // },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // https://testing-library.com/docs/react-testing-library/setup
  // https://vitest.dev/config/
  test: {
    globals: true,
    environment: "jsdom",
  },
});
