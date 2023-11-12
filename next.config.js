/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    experimental: {
        nextScriptWorkers: true,
    },
    images: { unoptimized: true },
}

module.exports = nextConfig
