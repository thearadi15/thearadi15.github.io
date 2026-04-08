/** @type {import('next').NextConfig} */
module.exports = { 
  reactStrictMode: false, 
  transpilePackages: ['three'],
  output: 'export',
  images: {
    unoptimized: true
  }
}
