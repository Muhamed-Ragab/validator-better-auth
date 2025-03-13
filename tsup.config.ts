import { defineConfig } from "tsup";

export default defineConfig({
  name: "validator-better-auth",
  entry: ["index.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  clean: true,
  minify: true,
  sourcemap: true,
  dts: true,
});
