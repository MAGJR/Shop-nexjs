/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["files.stripe.com"],
  },

  experimental: {
    images: {
      domains: {
        
      },
  allowFutureImage: true,
    } 
  }
}

module.exports = nextConfig
