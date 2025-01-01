import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "REPI",
    short_name: "Repi",
    description: "Encontre a sua moradia universitária aqui!",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48 16x16 32x32",
        type: "image/x-icon",
      },
      {
        src: "/public/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
