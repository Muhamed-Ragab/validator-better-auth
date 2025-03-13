import { defineConfig } from "tsup";

export default defineConfig({
  name: "validator-better-auth",
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  clean: true,
  minify: true,
  sourcemap: true,
  dts: true,
  splitting: false,
  target: "es2020",
});
