/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // JS/CSS com hash gerados pelo Next.js — cache imutável de 1 ano
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Imagens otimizadas pelo next/image
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ]
  },
}

export default nextConfig
