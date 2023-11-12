/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'dist',
    experimental: {
        nextScriptWorkers: true,
    },
    images: { unoptimized: true },
}

module.exports = nextConfig
