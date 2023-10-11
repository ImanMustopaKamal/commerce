/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
})
const nextConfig = withPWA({
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-ecommerce.havidmohamad.com',
        port: '',
        pathname: '/storage/**'
      }
    ]
  }
})

module.exports = nextConfig
