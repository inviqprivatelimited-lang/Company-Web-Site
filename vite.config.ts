import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase warning limit slightly; large images are in /public not the bundle
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split vendor chunks for better long-term caching
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-accordion", "@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-tooltip", "@radix-ui/react-tabs"],
          icons: ["lucide-react"],
        },
      },
    },
    // Drop console & debugger in production
    minify: "esbuild",
    // Inline small assets (< 4 KB) as base64 to save HTTP requests
    assetsInlineLimit: 4096,
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
