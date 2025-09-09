import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: "index.html",                       //Main entry
        addcourse: "addcourse.html",               //ytterligare webbsida
      },
    },
  },
});

