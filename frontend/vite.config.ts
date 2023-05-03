import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
      jsxRuntime: "classic",
    }),
  ],
  assetsInclude: ["**/*.md"],
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
