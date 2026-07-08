import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
      "@": path.resolve(__dirname, "src"),
      "next/link": path.resolve(__dirname, "src/vite-shims/Link.tsx"),
      "next/image": path.resolve(__dirname, "src/vite-shims/Image.tsx"),
      "@next/third-parties/google": path.resolve(
        __dirname,
        "src/vite-shims/google.tsx",
      ),
    },
  },
});
