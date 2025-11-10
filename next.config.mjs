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
  webpack: (config, { isServer }) => {
    // Handle pdfjs-dist worker files and ES modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
      }
    }
    
    // Handle pdfjs-dist ES modules
    config.module.rules.push({
      test: /node_modules[\\/]pdfjs-dist[\\/].*\.mjs$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    })
    
    return config
  },
}

export default nextConfig
