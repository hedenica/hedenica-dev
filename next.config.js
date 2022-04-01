/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GRAPH_CMS_API: process.env.GRAPH_CMS_API,
  },
  images: {
    domains: ['media.graphcms.com']
  }
}

module.exports = nextConfig
