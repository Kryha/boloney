import resolve from "@rollup/plugin-node-resolve";
import commonJS from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
// eslint-disable-next-line import/no-named-as-default
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

const extensions = [".mjs", ".js", ".ts", ".json"];

export default {
  input: "./src/main.ts",
  external: ["nakama-runtime"],
  plugins: [
    //Alows node_modules resolution
    resolve({ extensions }),

    //Compile typescript
    typescript(),

    json(),

    //Resolve CommonJS modules
    commonJS({ extensions }),

    //Transpile to ES5
    babel({
      extensions,
      babelHelpers: "bundled",
    }),
  ],
  output: {
    file: "build/index.js",
  },
};
