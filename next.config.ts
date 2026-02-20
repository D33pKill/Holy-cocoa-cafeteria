import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // genera la carpeta /out lista para hosting estático
  images: {
    unoptimized: true,       // necesario para export estático (no hay servidor de imágenes)
  },
};

export default nextConfig;
