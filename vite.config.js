import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "بلوم اپ| دکتر بلوم",
        short_name: "بلوم",
        description: "بلوم دستیار دیجیتال همراه گل و گیاه",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#49b779",
        orientation: "portrait-primary",
        start_url: "/",
        icons: [
          {
            src: "/src/assets/512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/src/assets/192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/src/assets/144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/api");
            },
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
