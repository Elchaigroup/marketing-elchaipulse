import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // expose on your LAN (0.0.0.0) so other devices can connect
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
