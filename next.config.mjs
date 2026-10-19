/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // three.js tidak perlu di-bundle dua kali di SSR
  transpilePackages: ["three"],
  experimental: {
    // Tree-shake import barrel yang berat (drei/fiber/motion)
    optimizePackageImports: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "framer-motion",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],

    // Responsive device widths for srcset generation.
    // Matches the widths in lib/imageSizes.ts and scripts/optimize-images.mjs.
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],

    // Image widths that Next.js will generate (for the Image Optimization API).
    // These are the sizes available in the srcset.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 768, 1024],

    // Prefer modern formats. Browsers that support AVIF get it; others get WebP.
    formats: ["image/avif", "image/webp"],

    // Minimum threshold (bytes) before Next.js optimizes an image.
    // Images under 6KB are served as-is to avoid overhead on tiny icons.
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  async headers() {
    return [
      {
        // Immutable cache untuk aset build + gambar optimasi
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // Keamanan + hemat bandwidth untuk halaman HTML
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
