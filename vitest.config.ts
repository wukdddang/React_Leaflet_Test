// vitest.config.ts
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
  },
});
