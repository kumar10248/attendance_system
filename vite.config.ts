import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import GlobPlugin from "vite-plugin-glob";

export default defineConfig({
  plugins: [
    react({
      // Babel config for optimizations
      babel: {
        plugins: [
          // Add plugins if needed
        ],
      },
    }), 
    GlobPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Performance optimizations
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-avatar', '@radix-ui/react-dropdown-menu', '@radix-ui/react-slot'],
          'icons': ['lucide-react', '@tabler/icons-react'],
          'xlsx': ['xlsx'],
        },
      },
    },
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Server optimizations
  server: {
    // Enable HMR
    hmr: true,
    // Port
    port: 5173,
  },
  // Dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['xlsx'], // Lazy load heavy dependencies
  },
});
