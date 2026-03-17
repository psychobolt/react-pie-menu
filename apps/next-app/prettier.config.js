import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/** @type {import('prettier').Config} */
const config = {
  plugins: [
    require.resolve("prettier-plugin-sh"),
    require.resolve("prettier-plugin-packagejson"),
  ],
  overrides: [
    {
      files: [".*", "*.sh"],
      excludeFiles: [".*.yml"],
      options: {
        parser: "sh",
      },
    },
  ],
};

export default config;
