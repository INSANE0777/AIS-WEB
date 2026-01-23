/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // Removed webpack() entirely — Turbopack is now default in Next.js 16+
  // Migrated fallbacks → use resolveAlias with browser condition
  turbopack: {
    // Optional: extend file extensions if pdfjs-dist .mjs imports cause issues
    resolveExtensions: [
      ".mjs", // add this first if needed
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".json",
      // add any others your project uses
    ],

    // Mimic webpack fallback: false for these Node builtins on client
    resolveAlias: {
      fs: { browser: "./empty.js" },
      path: { browser: "./empty.js" },
      crypto: { browser: "./empty.js" },
      stream: { browser: "./empty.js" },
      util: { browser: "./empty.js" },
    },
  },
};

export default nextConfig;
