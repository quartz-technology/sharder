/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'dist',
    experimental: {
        nextScriptWorkers: true,
    },
}

module.exports = nextConfig
