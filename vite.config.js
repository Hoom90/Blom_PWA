import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "Blom",
        short_name: "بلوم",
        description:
          "Blom is application which you can send your plant detail to understand what is wrong or what happend to your plant and get medical prescription to cure.",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#49b779",
        orientation: "portrait-primary",
        start_url: "/",
        icons: [
          {
            src: "https://blom-server.iran.liara.run/library/images/icon.avif",
            sizes: "512x512",
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
