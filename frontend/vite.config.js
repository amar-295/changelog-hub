import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@tiptap") || id.includes("prosemirror"))
              return "editor";
            if (
              id.includes("react/") ||
              id.includes("react-dom/") ||
              id.includes("react-router")
            )
              return "react";
            if (
              id.includes("lucide-react") ||
              id.includes("date-fns") ||
              id.includes("react-hot-toast")
            )
              return "ui";
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600, // Slightly bump the warning limit if need be
  },
});
