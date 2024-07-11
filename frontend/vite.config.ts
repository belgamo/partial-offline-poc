import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Partial Offline POC",
        short_name: "POP",
        description: "An example of how to manage offline data on Web Apps",
        theme_color: "#ffffff",
        icons: [
          {
            src: "192x192.jpg",
            sizes: "192x192",
            type: "image/jpg",
          },
          {
            src: "512x512.jpg",
            sizes: "512x512",
            type: "image/jpg",
          },
        ],
      },
    }),
  ],
});
